// --- Background Ambient Particle Field ---
const field = document.getElementById("field");
const fctx = field.getContext("2d");
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };

function sizeField() {
  const dpr = window.devicePixelRatio || 1;
  field.width = window.innerWidth * dpr;
  field.height = window.innerHeight * dpr;
  field.style.width = window.innerWidth + "px";
  field.style.height = window.innerHeight + "px";
  fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

const sparks = Array.from({ length: 85 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vx: (Math.random() - 0.5) * 0.38,
  vy: (Math.random() - 0.5) * 0.38,
  radius: Math.random() * 1.6 + 0.9,
  hue: Math.random() > 0.4 ? "cyan" : "gold",
}));

function tickField() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  fctx.clearRect(0, 0, w, h);

  sparks.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    if (mouse.active) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < 160) {
        p.x += (dx / dist) * (18 / dist) * 12;
        p.y += (dy / dist) * (18 / dist) * 12;
      }
    }
  });

  // Connecting lines
  for (let i = 0; i < sparks.length; i++) {
    const a = sparks[i];
    for (let j = i + 1; j < sparks.length; j++) {
      const b = sparks[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 130) {
        const alpha = (1 - dist / 130) * 0.16;
        fctx.strokeStyle = `rgba(110, 243, 197, ${alpha})`;
        fctx.lineWidth = 0.8;
        fctx.beginPath();
        fctx.moveTo(a.x, a.y);
        fctx.lineTo(b.x, b.y);
        fctx.stroke();
      }
    }

    // Node particle
    fctx.fillStyle = a.hue === "cyan" ? "rgba(110, 243, 197, 0.75)" : "rgba(239, 194, 122, 0.75)";
    fctx.beginPath();
    fctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
    fctx.fill();
  }

  requestAnimationFrame(tickField);
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
});
window.addEventListener("mouseleave", () => {
  mouse.active = false;
});
window.addEventListener("resize", sizeField);
sizeField();
tickField();

// --- 24 Interdisciplinary Skills Dataset ---
const nodes = [
  // AI & Deep Learning (group: "ai")
  {
    id: "ml",
    label: "Machine Learning",
    group: "ai",
    groupName: "AI & Deep Learning",
    focus: "Empirical Benchmarking",
    copy: "Benchmarking architectures across deep neural networks, measuring inductive biases, generalization metrics, and training dynamics.",
    applied: "M.Eng. Thesis & DepCoS-RELCOMEX 2026 Publication",
    tools: ["PyTorch", "Scikit-Learn", "TensorFlow", "MLflow"],
    proficiency: "Advanced · Research Level",
  },
  {
    id: "gsp",
    label: "Graph Signals (GSP)",
    group: "ai",
    groupName: "AI & Deep Learning",
    focus: "Spectral Graph Theory",
    copy: "Signal processing on irregular graph topologies, Laplacian eigenspaces, graph Fourier transform, and spatial-temporal representations.",
    applied: "GPson2M Young Researchers School on Mathematics & Mechanics 2025",
    tools: ["PyG (PyTorch Geometric)", "NetworkX", "Graph Laplacian", "Scipy.sparse"],
    proficiency: "Advanced · Research Focus",
  },
  {
    id: "cv",
    label: "Computer Vision",
    group: "ai",
    groupName: "AI & Deep Learning",
    focus: "Detection & Extraction",
    copy: "Text detection and extraction in highly stylized, non-standard graphic layouts (speech balloons, expressive typography in comics).",
    applied: "Research Paper: Text Detection & Extraction in Comics (2026)",
    tools: ["CRAFT", "DBNet", "YOLOv8", "OpenCV", "EasyOCR"],
    proficiency: "Advanced · Publication",
  },
  {
    id: "xai",
    label: "Explainable AI (XAI)",
    group: "ai",
    groupName: "AI & Deep Learning",
    focus: "Model Interpretability",
    copy: "Treating interpretability as a first-class quantitative evaluation: attribution methods, saliency maps, and verifying decision boundaries.",
    applied: "Research on Interpretable Vision Models & Dependability",
    tools: ["SHAP", "LIME", "Integrated Gradients", "Grad-CAM", "Captum"],
    proficiency: "Advanced · Evaluative",
  },
  {
    id: "gnn",
    label: "Graph Neural Nets",
    group: "ai",
    groupName: "AI & Deep Learning",
    focus: "Relational Modeling",
    copy: "Message-passing architectures (GCN, GAT, GraphSAGE) applied to structural data, relational graphs, and manifold embeddings.",
    applied: "Graph Representation Learning & Topological Experiments",
    tools: ["PyTorch Geometric", "DGL", "Spectral Convolutions"],
    proficiency: "Specialized · Architecture",
  },
  {
    id: "llm",
    label: "LLMs & NLP",
    group: "ai",
    groupName: "AI & Deep Learning",
    focus: "Text Understanding",
    copy: "Text extraction pipelines, semantic parsing, transformer tokenizers, and retrieval-augmented systems for domain-specific corpora.",
    applied: "OCR Text Post-Processing & Multimodal Language Pipelines",
    tools: ["Hugging Face", "Transformers", "spaCy", "Vector Embeddings"],
    proficiency: "Proficient · Systems",
  },

  // Systems & Engineering (group: "sys")
  {
    id: "py",
    label: "Python",
    group: "sys",
    groupName: "Systems & Engineering",
    focus: "Scientific Stack",
    copy: "Primary language for research pipelines, machine learning models, automated data analysis, and mathematical computing.",
    applied: "All Core Research Workflows & Model Implementations",
    tools: ["NumPy", "Pandas", "PyTorch", "Matplotlib", "FastAPI"],
    proficiency: "Expert · Daily Driver",
  },
  {
    id: "cpp",
    label: "C / C++",
    group: "sys",
    groupName: "Systems & Engineering",
    focus: "High-Performance Code",
    copy: "Low-level algorithmic implementation, memory-conscious data structures, and deterministic performance profiling.",
    applied: "Computer Engineering M.Eng. Systems & Algorithmic Coursework",
    tools: ["Modern C++ (17/20)", "STL", "GDB", "Valgrind", "CMake"],
    proficiency: "Advanced · Systems",
  },
  {
    id: "docker",
    label: "Docker",
    group: "sys",
    groupName: "Systems & Engineering",
    focus: "Reproducibility",
    copy: "Containerized environments for reproducible research experiments, isolated CUDA toolchains, and multi-stage builds.",
    applied: "Reproducible Research Pipelines & Dpoint Group Software Deployment",
    tools: ["Docker Compose", "Multi-stage builds", "NVIDIA Container Toolkit"],
    proficiency: "Proficient · Pipelines",
  },
  {
    id: "linux",
    label: "Linux & Shell",
    group: "sys",
    groupName: "Systems & Engineering",
    focus: "Environment & HPC",
    copy: "POSIX scripting, remote server administration, cluster compute management, and batch pipeline scheduling.",
    applied: "MBMPL Industrial Infrastructure & Wrocław HPC Cluster Access",
    tools: ["Bash / Zsh", "SSH", "Cron", "Systemd", "Vim / Tmux"],
    proficiency: "Advanced · Infrastructure",
  },
  {
    id: "git",
    label: "Git & CI/CD",
    group: "sys",
    groupName: "Systems & Engineering",
    focus: "Code Integrity",
    copy: "Structured version control, git workflows, automated testing pipelines, and collaborative software engineering.",
    applied: "Dpoint Group Collaboration & Research Versioning",
    tools: ["Git", "GitHub Actions", "Semantic Versioning", "Pre-commit hooks"],
    proficiency: "Advanced · Workflow",
  },
  {
    id: "sql",
    label: "SQL & Databases",
    group: "sys",
    groupName: "Systems & Engineering",
    focus: "Structured Persistence",
    copy: "Relational database schema design, index optimization, query execution plans, and analytical aggregation.",
    applied: "MBMPL Technical Logs & Dpoint Group Backend Services",
    tools: ["PostgreSQL", "SQLite", "Database Normalization", "Query Profiling"],
    proficiency: "Proficient · Backend",
  },

  // Mathematics & Data (group: "math")
  {
    id: "linalg",
    label: "Linear Algebra",
    group: "math",
    groupName: "Math & Data Foundations",
    focus: "Spectral Foundations",
    copy: "Eigen-decomposition, singular value decomposition (SVD), positive semi-definite matrices, and multidimensional geometry.",
    applied: "Graph Signal Processing, Laplacian Eigenvectors & Model Latent Spaces",
    tools: ["Matrix Factorization", "Eigenspaces", "Hermitian Operators"],
    proficiency: "Rigorous · Research Level",
  },
  {
    id: "stats",
    label: "Statistical Rigor",
    group: "math",
    groupName: "Math & Data Foundations",
    focus: "Empirical Validation",
    copy: "Hypothesis testing, ablation design, metric variance, cross-validation, and p-value significance in machine learning benchmarks.",
    applied: "Comparative Evaluation Benchmarking Framework (DepCoS 2026)",
    tools: ["Confidence Intervals", "Ablation Matrices", "ANOVA", "Bootstrapping"],
    proficiency: "Advanced · Evaluative",
  },
  {
    id: "data",
    label: "Data Mining & ETL",
    group: "math",
    groupName: "Math & Data Foundations",
    focus: "Pipeline Engineering",
    copy: "End-to-end data acquisition, cleaning, synthetic augmentation, normalization, and feature extraction for machine learning.",
    applied: "Comics Text Benchmark Dataset Curation & Preprocessing",
    tools: ["Pandas", "Polars", "Feature Extraction", "Automated Cleaning"],
    proficiency: "Advanced · Data Operations",
  },
  {
    id: "depend",
    label: "Dependability",
    group: "math",
    groupName: "Math & Data Foundations",
    focus: "Reliability & Safety",
    copy: "System fault tolerance, safety invariants, error recovery, and dependability of intelligent autonomous systems.",
    applied: "MBMPL Manufacturing Floor & 21st DepCoS-RELCOMEX Wrocław Conference",
    tools: ["Fault Tree Analysis", "Reliability Metrics (MTBF/MTTR)", "Invariants"],
    proficiency: "Specialized · Systems",
  },
  {
    id: "opt",
    label: "Optimization",
    group: "math",
    groupName: "Math & Data Foundations",
    focus: "Loss Landscaping",
    copy: "Convex and non-convex optimization, gradient dynamics, constrained objectives, and regularization techniques.",
    applied: "Deep Learning Loss Formulations & Spectral Clustering",
    tools: ["Stochastic Gradient Descent", "AdamW", "Lagrange Multipliers"],
    proficiency: "Theoretical & Applied",
  },
  {
    id: "dsp",
    label: "Signal Processing",
    group: "math",
    groupName: "Math & Data Foundations",
    focus: "Spectral Filtering",
    copy: "Discrete Fourier transforms, frequency domain filtering, convolution operators, and multirate systems.",
    applied: "Extension of Classical DSP to Irregular Graphs (GSP)",
    tools: ["FFT", "Filter Design", "Wavelets", "Convolution Operators"],
    proficiency: "Fundamental · Bridge to GSP",
  },

  // Pedagogy & Leadership (group: "lead")
  {
    id: "teach",
    label: "University Teaching",
    group: "lead",
    groupName: "Pedagogy & Leadership",
    focus: "Higher Education",
    copy: "Teaching Assistant in Computer Science at University of Sulaimani: lab instruction, grading, and direct student guidance.",
    applied: "University of Sulaimani · College of Science (2022–2023)",
    tools: ["Lab Instruction", "Office Hours", "Student Code Review", "Exams"],
    proficiency: "Experienced · 2+ Semesters",
  },
  {
    id: "pedagogy",
    label: "Curriculum Pedagogy",
    group: "lead",
    groupName: "Pedagogy & Leadership",
    focus: "Teacher Training",
    copy: "Formal training in university-level didactic methodologies, active learning frameworks, and structured curriculum engineering.",
    applied: "Professional Pedagogy & Teacher Training · University of Raparin (2026)",
    tools: ["Constructive Alignment", "Active Learning", "Assessment Rubrics"],
    proficiency: "Certified Coursework",
  },
  {
    id: "write",
    label: "Technical Writing",
    group: "lead",
    groupName: "Pedagogy & Leadership",
    focus: "Scholarly Publishing",
    copy: "Drafting peer-reviewed academic manuscripts, LaTeX document architecture, reproducible diagrams, and rigorous methodology documentation.",
    applied: "Conference Publication DepCoS 2026 & Technical Specifications",
    tools: ["LaTeX", "BibTeX", "TikZ / Vector Figures", "Peer Review"],
    proficiency: "Published Author",
  },
  {
    id: "plan",
    label: "Project Planning",
    group: "lead",
    groupName: "Pedagogy & Leadership",
    focus: "Research Execution",
    copy: "Structuring long-term research deliverables into milestones, managing experimental compute time, and risk mitigation.",
    applied: "M.Eng. Degree Management (Graduated 5.5/5.5 Top 1) & Internship Deliverables",
    tools: ["Roadmapping", "Milestone Tracking", "Agile Sprints", "Resource Budgeting"],
    proficiency: "Practiced · Delivery",
  },
  {
    id: "mentor",
    label: "Mentorship",
    group: "lead",
    groupName: "Pedagogy & Leadership",
    focus: "Talent Development",
    copy: "Coaching junior engineers and undergraduate researchers in algorithmic debugging, academic writing, and graduate scholarship prep.",
    applied: "Sulaimani CS Department & NAWA Scholar Peer Advising",
    tools: ["1-on-1 Advising", "Code Critique", "Scholarship Guidance"],
    proficiency: "Active Mentor",
  },
  {
    id: "bilingual",
    label: "Languages & Culture",
    group: "lead",
    groupName: "Pedagogy & Leadership",
    focus: "Global Research",
    copy: "Trilingual technical fluency: Kurdish (native), English (C1 advanced), Arabic (C1/B2), with Polish language training at NCU Toruń.",
    applied: "International Degree at WUST, Cross-Border Collaborations & Publications",
    tools: ["English C1", "Kurdish Native", "Arabic C1", "Polish (A2/B1)"],
    proficiency: "Fluent Multilingual",
  },
];

const edges = [
  // AI Core Web
  ["ml", "gsp"],
  ["ml", "cv"],
  ["ml", "xai"],
  ["ml", "gnn"],
  ["ml", "llm"],
  ["gsp", "gnn"],
  ["gsp", "linalg"],
  ["gsp", "dsp"],
  ["cv", "llm"],
  ["cv", "xai"],
  ["cv", "data"],
  ["xai", "stats"],
  ["xai", "write"],
  ["gnn", "linalg"],

  // Systems & Code Connections
  ["py", "ml"],
  ["py", "cv"],
  ["py", "gsp"],
  ["py", "data"],
  ["cpp", "py"],
  ["cpp", "linalg"],
  ["cpp", "depend"],
  ["docker", "py"],
  ["docker", "linux"],
  ["docker", "git"],
  ["linux", "docker"],
  ["linux", "git"],
  ["linux", "depend"],
  ["sql", "data"],
  ["sql", "py"],

  // Math & Rigor Connections
  ["linalg", "opt"],
  ["linalg", "stats"],
  ["opt", "ml"],
  ["stats", "ml"],
  ["stats", "depend"],
  ["data", "ml"],
  ["data", "stats"],
  ["dsp", "cv"],
  ["depend", "write"],

  // Pedagogy & Leadership Connections
  ["teach", "pedagogy"],
  ["teach", "write"],
  ["teach", "mentor"],
  ["pedagogy", "plan"],
  ["write", "ml"],
  ["write", "cv"],
  ["plan", "teach"],
  ["plan", "git"],
  ["mentor", "teach"],
  ["bilingual", "write"],
  ["bilingual", "teach"],
];

// --- Skill Graph DOM Elements & State ---
const graphContainer = document.getElementById("skill-graph");
const graphSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
graphSvg.setAttribute("aria-hidden", "true");
graphContainer.appendChild(graphSvg);

const titleEl = document.getElementById("skill-title");
const copyEl = document.getElementById("skill-copy");
const groupEl = document.getElementById("skill-group");
const appliedEl = document.getElementById("skill-applied");
const toolsEl = document.getElementById("skill-tools");
const profEl = document.getElementById("skill-proficiency");
const neighborsListEl = document.getElementById("skill-neighbors-list");

let currentActiveFilter = "all";
let currentSearchTerm = "";
let selectedNodeId = null;

// Build DOM Node Buttons inside Constellation Container
nodes.forEach((n) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `node cluster-${n.group}`;
  btn.dataset.id = n.id;
  btn.setAttribute("aria-label", `${n.label} (${n.groupName})`);

  btn.innerHTML = `
    <span class="node-indicator"></span>
    <span class="node-label">${n.label}</span>
  `;

  btn.addEventListener("mouseenter", () => focusNode(n.id, false));
  btn.addEventListener("focus", () => focusNode(n.id, false));
  btn.addEventListener("click", () => {
    selectedNodeId = selectedNodeId === n.id ? null : n.id;
    focusNode(n.id, true);
  });
  btn.addEventListener("mouseleave", () => {
    if (!selectedNodeId) clearFocus();
  });
  btn.addEventListener("blur", () => {
    if (!selectedNodeId) clearFocus();
  });

  graphContainer.appendChild(btn);
  n.el = btn;
});

// Compute Spatial Geometry with Quad-Cluster Constellation
function placeNodes() {
  const w = graphContainer.clientWidth;
  const h = graphContainer.clientHeight;
  if (!w || !h) return;

  graphSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  graphSvg.setAttribute("width", w);
  graphSvg.setAttribute("height", h);
  graphSvg.innerHTML = "";

  const cx = w / 2;
  const cy = h / 2;

  // 4 Cluster Centers:
  // AI: Top-Left (-135deg), Systems: Top-Right (-45deg), Math: Bottom-Left (135deg), Leadership: Bottom-Right (45deg)
  const clusterAngles = {
    ai: -Math.PI * 0.75,
    sys: -Math.PI * 0.25,
    math: Math.PI * 0.75,
    lead: Math.PI * 0.25,
  };

  const clusterCenterDist = Math.min(w, h) * 0.27;
  const itemSpreadRadius = Math.min(w, h) * 0.17;

  // Group nodes by cluster
  const groups = { ai: [], sys: [], math: [], lead: [] };
  nodes.forEach((n) => groups[n.group]?.push(n));

  Object.entries(groups).forEach(([groupId, groupNodes]) => {
    const baseAngle = clusterAngles[groupId];
    const clusterX = cx + Math.cos(baseAngle) * clusterCenterDist;
    const clusterY = cy + Math.sin(baseAngle) * clusterCenterDist;

    groupNodes.forEach((node, i) => {
      const angle = (i / groupNodes.length) * Math.PI * 2 + baseAngle;
      const r = itemSpreadRadius * (0.65 + (i % 2) * 0.45);
      node.x = Math.max(48, Math.min(w - 48, clusterX + Math.cos(angle) * r));
      node.y = Math.max(30, Math.min(h - 30, clusterY + Math.sin(angle) * r));
      node.el.style.left = `${node.x}px`;
      node.el.style.top = `${node.y}px`;
    });
  });

  // Render SVG Edge Lines
  edges.forEach(([a, b]) => {
    const na = nodes.find((n) => n.id === a);
    const nb = nodes.find((n) => n.id === b);
    if (!na || !nb) return;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", na.x);
    line.setAttribute("y1", na.y);
    line.setAttribute("x2", nb.x);
    line.setAttribute("y2", nb.y);
    line.setAttribute("data-a", a);
    line.setAttribute("data-b", b);
    graphSvg.appendChild(line);
  });
}

function getNeighbors(id) {
  const set = new Set([id]);
  edges.forEach(([a, b]) => {
    if (a === id) set.add(b);
    if (b === id) set.add(a);
  });
  return set;
}

function focusNode(id, persistent = false) {
  const n = nodes.find((x) => x.id === id);
  if (!n) return;

  if (titleEl) titleEl.textContent = n.label;
  if (copyEl) copyEl.textContent = n.copy;
  if (groupEl) {
    groupEl.textContent = n.groupName;
    groupEl.className = `eyebrow group-tag-${n.group}`;
  }
  if (appliedEl) appliedEl.textContent = n.applied;
  if (profEl) profEl.textContent = n.proficiency;

  if (toolsEl) {
    toolsEl.innerHTML = "";
    n.tools.forEach((t) => {
      const tag = document.createElement("span");
      tag.className = "tool-tag";
      tag.textContent = t;
      toolsEl.appendChild(tag);
    });
  }

  const keep = getNeighbors(id);

  if (neighborsListEl) {
    neighborsListEl.innerHTML = "";
    keep.forEach((nid) => {
      if (nid === id) return;
      const neighborNode = nodes.find((x) => x.id === nid);
      if (!neighborNode) return;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = `neighbor-chip cluster-${neighborNode.group}`;
      chip.textContent = neighborNode.label;
      chip.addEventListener("click", () => {
        selectedNodeId = neighborNode.id;
        focusNode(neighborNode.id, true);
      });
      neighborsListEl.appendChild(chip);
    });
  }

  graphContainer.classList.add("is-focus");

  nodes.forEach((node) => {
    const isTarget = node.id === id;
    const isNeighbor = keep.has(node.id);
    node.el.classList.toggle("is-active", isTarget);
    node.el.classList.toggle("is-neighbor", isNeighbor && !isTarget);
    node.el.classList.toggle("dim", !isNeighbor);
  });

  graphSvg.querySelectorAll("line").forEach((line) => {
    const a = line.getAttribute("data-a");
    const b = line.getAttribute("data-b");
    const on = (a === id && keep.has(b)) || (b === id && keep.has(a));
    line.classList.toggle("on", on);
    line.classList.toggle("off", !on);
  });
}

function clearFocus() {
  if (selectedNodeId) return;
  graphContainer.classList.remove("is-focus");
  nodes.forEach((node) => {
    node.el.classList.remove("is-active", "is-neighbor");
    applyFilterAndSearch();
  });
  graphSvg.querySelectorAll("line").forEach((line) => {
    line.classList.remove("on", "off");
  });
}

// Filter and Search Coordinator
function applyFilterAndSearch() {
  const term = currentSearchTerm.toLowerCase().trim();

  nodes.forEach((n) => {
    const matchesFilter = currentActiveFilter === "all" || n.group === currentActiveFilter;
    const matchesSearch =
      !term ||
      n.label.toLowerCase().includes(term) ||
      n.copy.toLowerCase().includes(term) ||
      n.tools.some((t) => t.toLowerCase().includes(term));

    const visible = matchesFilter && matchesSearch;
    n.el.classList.toggle("filter-hidden", !visible);
    n.el.classList.toggle("dim", !visible);

    // Also sync Matrix view card if rendered
    const matrixCard = document.querySelector(`.matrix-card[data-id="${n.id}"]`);
    if (matrixCard) {
      matrixCard.style.display = visible ? "flex" : "none";
    }
  });

  graphSvg.querySelectorAll("line").forEach((line) => {
    const a = line.getAttribute("data-a");
    const b = line.getAttribute("data-b");
    const na = nodes.find((n) => n.id === a);
    const nb = nodes.find((n) => n.id === b);
    const visible =
      na &&
      nb &&
      (currentActiveFilter === "all" || (na.group === currentActiveFilter && nb.group === currentActiveFilter));
    line.style.opacity = visible ? "1" : "0.15";
  });
}

// Build Matrix Grid View
const matrixContainer = document.getElementById("skill-matrix");
if (matrixContainer) {
  matrixContainer.innerHTML = "";
  nodes.forEach((n) => {
    const card = document.createElement("article");
    card.className = `matrix-card cluster-${n.group}`;
    card.dataset.id = n.id;
    card.innerHTML = `
      <div class="matrix-card-head">
        <span class="matrix-dot"></span>
        <span class="matrix-group">${n.groupName}</span>
      </div>
      <h4>${n.label}</h4>
      <p class="matrix-focus">${n.focus}</p>
      <p class="matrix-desc">${n.copy}</p>
      <div class="matrix-tools">
        ${n.tools.map((t) => `<span>${t}</span>`).join("")}
      </div>
    `;

    card.addEventListener("click", () => {
      // Switch to graph or show focus
      focusNode(n.id, true);
      selectedNodeId = n.id;
      // Scroll to detail on mobile or ensure focus
      const detailEl = document.getElementById("skill-detail");
      if (detailEl) detailEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    matrixContainer.appendChild(card);
  });
}

// Category Filter Buttons
document.querySelectorAll(".skill-filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".skill-filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentActiveFilter = btn.dataset.filter || "all";
    selectedNodeId = null;
    clearFocus();
    applyFilterAndSearch();
  });
});

// Search Input Listener
const searchInput = document.getElementById("skill-search");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    currentSearchTerm = e.target.value;
    applyFilterAndSearch();
  });
}

// View Mode Toggle (Constellation vs Matrix)
const viewToggleConstellation = document.getElementById("view-mode-constellation");
const viewToggleMatrix = document.getElementById("view-mode-matrix");
const constellationWrap = document.querySelector(".constellation-wrap");

if (viewToggleConstellation && viewToggleMatrix && constellationWrap && matrixContainer) {
  viewToggleConstellation.addEventListener("click", () => {
    viewToggleConstellation.classList.add("active");
    viewToggleMatrix.classList.remove("active");
    constellationWrap.style.display = "grid";
    matrixContainer.style.display = "none";
    placeNodes();
  });

  viewToggleMatrix.addEventListener("click", () => {
    viewToggleMatrix.classList.add("active");
    viewToggleConstellation.classList.remove("active");
    constellationWrap.style.display = "none";
    matrixContainer.style.display = "grid";
    applyFilterAndSearch();
  });
}

// Initialize Graph Layout
placeNodes();
window.addEventListener("resize", placeNodes);
if ("ResizeObserver" in window) {
  new ResizeObserver(placeNodes).observe(graphContainer);
}

// Default Focus on Core ML Node
setTimeout(() => {
  focusNode("ml", false);
}, 250);

// Copy Email Utility with Animated Toast Feedback
const copyEmailBtn = document.getElementById("copy-email-btn");
const copyToast = document.getElementById("copy-toast");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", () => {
    const email = "hedi.hassan28@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        if (copyToast) {
          copyToast.classList.add("show");
          setTimeout(() => {
            copyToast.classList.remove("show");
          }, 2400);
        }
      })
      .catch(() => {
        window.location.href = `mailto:${email}`;
      });
  });
}

// Abstract Expansion Toggle for Comics Paper
const abstractToggleBtn = document.getElementById("toggle-abstract-btn");
const abstractContent = document.getElementById("paper-abstract-content");
if (abstractToggleBtn && abstractContent) {
  abstractToggleBtn.addEventListener("click", () => {
    const isHidden = abstractContent.classList.contains("hidden");
    if (isHidden) {
      abstractContent.classList.remove("hidden");
      abstractToggleBtn.textContent = "Close paper abstract & methodology";
    } else {
      abstractContent.classList.add("hidden");
      abstractToggleBtn.textContent = "Read paper abstract & benchmark methodology";
    }
  });
}
