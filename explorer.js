/* Drill-down explorer for the CS layer tree.
   Click a card and it becomes the root. Breadcrumbs walk back up. Depth is unlimited.
   The URL hash holds the current view, so explorer.html#L0 deep-links. */
(function () {
  var root = TreeMath.build(TREE);
  var path = [root];

  var crumbs = document.getElementById("crumbs");
  var stage = document.getElementById("stage");
  var detail = document.getElementById("detail");
  var summary = document.getElementById("summary");

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function cls(n) { return n.isLayer ? "layer" : (n.status || "locked"); }
  function mark(n) {
    if (n.status === "passed") return "\u2713";
    if (n.status === "open") return "\u25B6";
    if (n.status === "parked") return "\u2016";
    if (n.isLayer) return "\u25A0";
    return "\u25CB";
  }
  function pctText(s) { return Math.round(s.pct * 100) + "%"; }
  function bar(s) {
    return '<div class="bar"><i style="width:' + Math.round(s.pct * 100) + '%"></i></div>';
  }
  function unitText(s) {
    var shown = (Math.abs(s.score % 1) < 1e-9) ? String(Math.round(s.score)) : s.score.toFixed(1);
    return shown + " of " + s.weight + (s.weight === 1 ? " unit" : " units");
  }

  function renderCrumbs() {
    crumbs.innerHTML = "";
    path.forEach(function (n, i) {
      var b = document.createElement("button");
      b.className = "crumb";
      b.textContent = n.name;
      b.addEventListener("click", function () { path = path.slice(0, i + 1); render(); });
      crumbs.appendChild(b);
      if (i < path.length - 1) {
        var sep = document.createElement("span");
        sep.className = "sep";
        sep.textContent = "\u203A";
        crumbs.appendChild(sep);
      }
    });
  }

  function renderStage() {
    var cur = path[path.length - 1];
    var s = TreeMath.stats(cur);
    stage.innerHTML = "";

    var box = document.createElement("div");
    box.className = "node current " + cls(cur);
    box.innerHTML =
      '<div class="ctop"><span class="id">' + esc(cur.id === "ROOT" ? "whole tree" : cur.id) + '</span>' +
      '<span class="mark">' + mark(cur) + '</span></div>' +
      '<div class="name">' + esc(cur.name) + '</div>' +
      bar(s) +
      '<div class="meta">' + pctText(s) + " \u00B7 " + unitText(s) + " \u00B7 " + s.passed + " passed \u00B7 " +
      s.open + " open" + (s.parked ? " \u00B7 " + s.parked + " parked" : "") + " \u00B7 " + s.locked + " locked</div>";
    stage.appendChild(box);

    if (cur.children && cur.children.length) {
      var row = document.createElement("div");
      row.className = "children";
      cur.children.forEach(function (ch) {
        var cs = TreeMath.stats(ch);
        var card = document.createElement("button");
        card.className = "node child " + cls(ch);
        card.innerHTML =
          '<div class="ctop"><span class="id">' + esc(ch.id) + '</span><span class="mark">' + mark(ch) + '</span></div>' +
          '<div class="name">' + esc(ch.name) + '</div>' +
          bar(cs) +
          '<div class="meta">' + pctText(cs) + " \u00B7 " + unitText(cs) +
          (ch.children && ch.children.length ? " \u00B7 " + ch.children.length + " children" : "") + '</div>';
        card.addEventListener("click", function () { path.push(ch); render(); });
        row.appendChild(card);
      });
      stage.appendChild(row);
    }
  }

  function renderDetail() {
    var cur = path[path.length - 1];
    var bits = [];
    if (cur.goal) bits.push('<div class="row"><span class="k">goal</span><span class="v">' + esc(cur.goal) + '</span></div>');
    if (cur.spine) bits.push('<div class="row"><span class="k">spine</span><span class="v">' + esc(cur.spine) + '</span></div>');
    if (cur.probe) bits.push('<div class="row"><span class="k">probe</span><span class="v">' + esc(cur.probe) + '</span></div>');
    if (cur.source) bits.push('<div class="row"><span class="k">source</span><span class="v">' + esc(cur.source) + '</span></div>');
    if (cur.status && !cur.isLayer) {
      bits.push('<div class="row"><span class="k">status</span><span class="v">' + esc(cur.status) + '</span></div>');
    }
    if (!cur.children || !cur.children.length) {
      bits.push('<div class="row"><span class="k">sprout</span><span class="v">' +
        (cur.status === "passed"
          ? "learned. children would be new sprouts, added only where a probe fails or curiosity pulls."
          : "a leaf. learn it, then it can sprout children at any depth.") + '</span></div>');
    }
    detail.innerHTML = bits.join("");
  }

  function renderSummary() {
    var s = TreeMath.stats(root);
    summary.innerHTML = '<b>' + Math.round(s.pct * 100) + '%</b> \u00B7 ' + unitText(s) +
      ' \u00B7 <span class="o">' + s.open + " open</span>";
  }

  function syncHash() {
    var cur = path[path.length - 1];
    var want = cur.id === "ROOT" ? "" : cur.id;
    if ((location.hash || "").replace(/^#/, "") !== want) location.hash = want;
  }

  function render() {
    renderSummary();
    renderCrumbs();
    renderStage();
    renderDetail();
    syncHash();
  }

  document.addEventListener("keydown", function (e) {
    if ((e.key === "Backspace" || e.key === "Escape") && path.length > 1) {
      e.preventDefault();
      path = path.slice(0, -1);
      render();
    }
  });

  var start = (location.hash || "").replace(/^#/, "");
  if (start && TreeMath.find(root, start)) path = TreeMath.path(root, start);
  render();
})();
