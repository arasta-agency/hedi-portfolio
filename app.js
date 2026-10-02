const field = document.getElementById("field");
const fctx = field.getContext("2d");
const mouse = { x: innerWidth / 2, y: innerHeight / 2 };

function sizeField() {
  field.width = innerWidth * devicePixelRatio;
  field.height = innerHeight * devicePixelRatio;
  field.style.width = innerWidth + "px";
  field.style.height = innerHeight + "px";
  fctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

const sparks = Array.from({ length: 70 }, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35,
}));

function tickField() {
  fctx.clearRect(0, 0, innerWidth, innerHeight);
  sparks.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const d = Math.hypot(dx, dy) || 1;
    p.x += (dx / d) * (18 / d);
    p.y += (dy / d) * (18 / d);
  });
  sparks.forEach((a, i) => {
    sparks.slice(i + 1).forEach((b) => {
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 140) {
        fctx.strokeStyle = `rgba(110,243,197,${(1 - dist / 140) * 0.22})`;
        fctx.beginPath();
        fctx.moveTo(a.x, a.y);
        fctx.lineTo(b.x, b.y);
        fctx.stroke();
      }
    });
    fctx.fillStyle = "rgba(239,194,122,0.7)";
    fctx.beginPath();
    fctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
    fctx.fill();
  });
  requestAnimationFrame(tickField);
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("resize", sizeField);
sizeField();
tickField();

const nodes = [
  { id: "ml", label: "Machine learning", group: "core", copy: "Benchmarking architectures and turning models into measurable pipelines." },
  { id: "gsp", label: "Graph signals", group: "core", copy: "Structural data, graphs, and the geometry underneath representations." },
  { id: "cv", label: "Computer vision", group: "core", copy: "Detection, extraction, and visual systems — including work on comics text." },
  { id: "xai", label: "XAI", group: "core", copy: "Interpretability as a first-class evaluation, not an afterthought." },
  { id: "py", label: "Python", group: "tools", copy: "Primary language for research code, analysis, and automation." },
  { id: "llm", label: "LLMs / NLP", group: "tools", copy: "Language models, text pipelines, and knowledge extraction." },
  { id: "data", label: "Data handling", group: "tools", copy: "Cleaning, mining, and analysis for experimental work." },
  { id: "plan", label: "Master planning", group: "people", copy: "Time, resources, and metrics — making research operational." },
  { id: "teach", label: "Teaching", group: "people", copy: "TA work, pedagogy training, and curriculum design." },
  { id: "write", label: "Technical writing", group: "people", copy: "Documentation, papers, and transferring methods to others." },
];

const edges = [
  ["ml", "gsp"],
  ["ml", "cv"],
  ["ml", "xai"],
  ["ml", "py"],
  ["cv", "llm"],
  ["data", "py"],
  ["data", "ml"],
  ["plan", "teach"],
  ["teach", "write"],
  ["write", "xai"],
  ["gsp", "data"],
  ["llm", "write"],
];

const graph = document.getElementById("skill-graph");
const titleEl = document.getElementById("skill-title");
const copyEl = document.getElementById("skill-copy");

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("aria-hidden", "true");
graph.appendChild(svg);

nodes.forEach((n) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `node ${n.group}`;
  btn.dataset.id = n.id;
  btn.textContent = n.label;
  btn.addEventListener("mouseenter", () => focusNode(n.id));
  btn.addEventListener("focus", () => focusNode(n.id));
  btn.addEventListener("mouseleave", clearFocus);
  btn.addEventListener("blur", clearFocus);
  graph.appendChild(btn);
  n.el = btn;
});

function placeNodes() {
  const w = graph.clientWidth;
  const h = graph.clientHeight;
  const radius = Math.min(w, h) * 0.34;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("width", w);
  svg.setAttribute("height", h);
  svg.innerHTML = "";
  nodes.forEach((n, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    n.x = w / 2 + Math.cos(angle) * radius;
    n.y = h / 2 + Math.sin(angle) * radius;
    n.el.style.left = `${n.x}px`;
    n.el.style.top = `${n.y}px`;
  });
  edges.forEach(([a, b]) => {
    const na = nodes.find((n) => n.id === a);
    const nb = nodes.find((n) => n.id === b);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", na.x);
    line.setAttribute("y1", na.y);
    line.setAttribute("x2", nb.x);
    line.setAttribute("y2", nb.y);
    line.setAttribute("data-a", a);
    line.setAttribute("data-b", b);
    svg.appendChild(line);
  });
}

function neighbors(id) {
  const set = new Set([id]);
  edges.forEach(([a, b]) => {
    if (a === id) set.add(b);
    if (b === id) set.add(a);
  });
  return set;
}

function focusNode(id) {
  const n = nodes.find((x) => x.id === id);
  titleEl.textContent = n.label;
  copyEl.textContent = n.copy;
  const keep = neighbors(id);
  graph.classList.add("is-focus");
  nodes.forEach((node) => node.el.classList.toggle("dim", !keep.has(node.id)));
  svg.querySelectorAll("line").forEach((line) => {
    const on = keep.has(line.dataset.a) && keep.has(line.dataset.b);
    line.classList.toggle("on", on);
    line.classList.toggle("off", !on);
  });
}

function clearFocus() {
  graph.classList.remove("is-focus");
  nodes.forEach((node) => node.el.classList.remove("dim"));
  svg.querySelectorAll("line").forEach((line) => {
    line.classList.remove("on", "off");
  });
}

placeNodes();
window.addEventListener("resize", placeNodes);
if ("ResizeObserver" in window) new ResizeObserver(placeNodes).observe(graph);
