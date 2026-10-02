#!/usr/bin/env python3
"""Render tree.md and tree-data.js from tree.json. Edit tree.json, never the outputs."""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
data = json.loads((HERE / "tree.json").read_text(encoding="utf-8"))
TICK = chr(96) * 3

ORDER = ["passed", "open", "parked", "locked"]
MARK = {"passed": "PASS", "open": "OPEN", "parked": "PARKED", "locked": "locked"}

nodes = [n for layer in data["layers"] for n in layer["nodes"]]
counts = {s: sum(1 for n in nodes if n["status"] == s) for s in ORDER}

out = []
out.append("# " + data["name"])
out.append("")
out.append(data["goal"])
out.append("")
out.append("Method: " + data["method"])
out.append("")
out.append("Nodes: %d. Passed %d, open %d, parked %d, locked %d." % (len(nodes), counts["passed"], counts["open"], counts["parked"], counts["locked"]))
out.append("")
out.append("Statuses:")
for s in ORDER:
    out.append("- " + s + ": " + data["statuses"][s])
out.append("")
out.append("The ten layers at a glance:")
out.append("")
out.append(TICK + "mermaid")
out.append("flowchart LR")
for i, layer in enumerate(data["layers"]):
    label = layer["id"] + " " + layer["name"]
    if i + 1 < len(data["layers"]):
        out.append("  " + layer["id"] + "[" + label + "] --> " + data["layers"][i + 1]["id"])
    else:
        out.append("  " + layer["id"] + "[" + label + "]")
out.append(TICK)
out.append("")

for layer in data["layers"]:
    passed = sum(1 for n in layer["nodes"] if n["status"] == "passed")
    out.append("## " + layer["name"] + " (" + layer["id"] + ")")
    out.append("")
    out.append("Goal: " + layer["goal"])
    out.append("")
    out.append("Spine: " + layer["spine"])
    out.append("")
    out.append("Progress: %d of %d passed." % (passed, len(layer["nodes"])))
    out.append("")
    for n in layer["nodes"]:
        depth = len(n["id"].split(".")) - 1
        pad = "  " * (depth - 1)
        out.append("%s- **%s %s** [%s] - probe: %s - source: %s" % (pad, n["id"], n["name"], MARK[n["status"]], n["probe"], n["source"]))
    out.append("")

(HERE / "tree.md").write_text("\n".join(out).rstrip() + "\n", encoding="utf-8")
(HERE / "tree-data.js").write_text("const TREE = " + json.dumps(data, indent=2, ensure_ascii=False) + ";\n", encoding="utf-8")
print("rendered tree.md and tree-data.js: %d nodes" % len(nodes))
