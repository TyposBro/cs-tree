/* Pure tree math for the CS layer tree. No DOM in here.
   Loaded by explorer.html, the CLI, and the tests.

   Rule, matching the owner's spec:
   - A leaf is worth one unit: passed 1, open 0.5, parked and locked 0.
   - A node WITH children is a container. Its own probe shows as a badge and does
     not add a unit; its percentage is its children's units, rolled up.
   - A layer is a container too.
   So a node with five children and one learned reads 1 of 5, which is 20%. */
(function (global) {
  function ownScore(status) {
    if (status === "passed") return 1;
    if (status === "open") return 0.5;
    return 0;
  }

  function build(data) {
    var root = { id: "ROOT", name: data.name, isLayer: true, status: "layer", goal: data.goal, children: [] };
    (data.layers || []).forEach(function (layer) {
      var ln = { id: layer.id, name: layer.name, isLayer: true, status: "layer", goal: layer.goal, spine: layer.spine, children: [] };
      (layer.nodes || []).forEach(function (n) {
        ln.children.push({
          id: n.id, name: n.name, isLayer: false, status: n.status,
          probe: n.probe, source: n.source, children: []
        });
      });
      root.children.push(ln);
    });
    return root;
  }

  function stats(node) {
    var kids = node.children || [];
    var isContainer = node.isLayer || kids.length > 0;
    var selfWeight = isContainer ? 0 : 1;
    var s = {
      weight: selfWeight,
      score: selfWeight * ownScore(node.status),
      passed: 0, open: 0, parked: 0, locked: 0,
      isContainer: isContainer,
      children: kids.length
    };
    if (!node.isLayer) {
      if (node.status === "passed") s.passed = 1;
      else if (node.status === "open") s.open = 1;
      else if (node.status === "parked") s.parked = 1;
      else s.locked = 1;
    }
    kids.forEach(function (ch) {
      var r = stats(ch);
      s.weight += r.weight; s.score += r.score;
      s.passed += r.passed; s.open += r.open;
      s.parked += r.parked; s.locked += r.locked;
    });
    s.pct = s.weight ? s.score / s.weight : 0;
    return s;
  }

  function find(node, id) {
    if (node.id === id) return node;
    var kids = node.children || [];
    for (var i = 0; i < kids.length; i++) {
      var hit = find(kids[i], id);
      if (hit) return hit;
    }
    return null;
  }

  function path(node, id) {
    if (node.id === id) return [node];
    var kids = node.children || [];
    for (var i = 0; i < kids.length; i++) {
      var sub = path(kids[i], id);
      if (sub) return [node].concat(sub);
    }
    return null;
  }

  global.TreeMath = { build: build, stats: stats, find: find, path: path, ownScore: ownScore };
  if (typeof module !== "undefined" && module.exports) module.exports = global.TreeMath;
})(typeof window !== "undefined" ? window : globalThis);
