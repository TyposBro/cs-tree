/* Run: node test/progress.test.cjs */
const fs = require("fs");
const path = require("path");
const TM = require(path.join(__dirname, "..", "progress.js"));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "tree.json"), "utf8"));

let n = 0;
function ok(cond, msg) {
  n++;
  if (!cond) { console.error("FAIL: " + msg); process.exit(1); }
}

const root = TM.build(data);
ok(root.children.length > 0, "at least one layer");

data.layers.forEach(function (layer) {
  const s = TM.stats(TM.find(root, layer.id));
  ok(s.weight === layer.nodes.length, layer.id + " unit count matches its node count");
  ok(s.pct >= 0 && s.pct <= 1, layer.id + " percentage is in range");
});

data.layers.forEach(function (layer) {
  layer.nodes.forEach(function (node) {
    ok(TM.find(root, node.id) !== null, "node resolves: " + node.id);
    ok(TM.path(root, node.id).length >= 2, "path resolves: " + node.id);
    ok(["passed", "open", "parked", "locked"].indexOf(node.status) !== -1,
       node.id + " has a valid status");
  });
});

const opens = data.layers.reduce(function (acc, l) {
  return acc + l.nodes.filter(function (n) { return n.status === "open"; }).length;
}, 0);
ok(opens <= 1, "at most one node is open, found " + opens);

/* A container with five children and one learned reads 1 of 5, which is 20 percent. */
const deep = { id: "R", name: "r", isLayer: true, status: "layer", children: [
  { id: "X", name: "x", isLayer: false, status: "passed", children: [
    { id: "X.1", name: "x1", isLayer: false, status: "passed", children: [] },
    { id: "X.2", name: "x2", isLayer: false, status: "locked", children: [] },
    { id: "X.3", name: "x3", isLayer: false, status: "passed", children: [
      { id: "X.3.1", name: "a", isLayer: false, status: "passed", children: [] },
      { id: "X.3.2", name: "b", isLayer: false, status: "locked", children: [] },
      { id: "X.3.3", name: "c", isLayer: false, status: "locked", children: [] },
      { id: "X.3.4", name: "d", isLayer: false, status: "locked", children: [] },
      { id: "X.3.5", name: "e", isLayer: false, status: "locked", children: [] }
    ] }
  ] }
] };
const x3 = TM.stats(deep.children[0].children[2]);
ok(x3.weight === 5, "five children means five units");
ok(Math.abs(x3.pct - 0.2) < 1e-9, "one of five is 20 percent");
const xs = TM.stats(deep.children[0]);
ok(xs.weight === 7 && Math.abs(xs.score - 2) < 1e-9, "rollup across three levels");

console.log("all " + n + " checks pass");
