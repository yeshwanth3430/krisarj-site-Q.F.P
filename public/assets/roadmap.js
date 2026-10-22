// Roadmap tab: subject dependency map + one branching roadmap per subject.
// Data lives here; the page only needs <div id="roadmap-root"></div>.
(function () {
  "use strict";

  // status: "live" (published, linked), "next" (being written), "soon" (planned)
  var SUBJECTS = [
    { id: "la", n: "01", name: "Linear Algebra", tag: "Portfolios as vectors, hedges as equations", state: "now", col: 0, row: 0, url: "linear-algebra/index.html",
      lessons: [4, 31],   // live, total — shown on the map node
      about: "Vectors, matrices, elimination, vector spaces, orthogonality, determinants, eigenvalues and the SVD. The language every portfolio, hedge and factor model is written in.",
      groups: [
        { name: "Solving equations", topics: [
          ["Vectors & linear equations", "mixing products into a payoff", "live", "linear-algebra/topic-01.html"],
          ["Elimination, A = LU & permutations", "solving for the lots", "live", "linear-algebra/topic-02.html"],
          ["Inverses & transposes", "one recipe for every payoff", "live", "linear-algebra/topic-03.html"] ] },
        { name: "The four subspaces", topics: [
          ["Vector spaces, column space & nullspace", "what you can build, what is free", "live", "linear-algebra/topic-04.html"],
          ["Independence, rank & the four subspaces", "is the market complete?", "live", "linear-algebra/topic-05.html"],
          ["Graphs & networks", "price loops and arbitrage", "live", "linear-algebra/topic-06.html"] ] },
        { name: "Geometry & fitting", topics: [
          ["Orthogonality & projections", "the best possible hedge", "live", "linear-algebra/topic-07.html"],
          ["Least squares & Gram–Schmidt", "beta and clean factors", "next"],
          ["Determinants & Cramer's rule", "redundant products, exact lots", "soon"] ] },
        { name: "Eigenvalues & beyond", topics: [
          ["Eigenvalues, diagonalization & powers", "where risk sits, compounding", "soon"],
          ["ODEs, Markov chains & Fourier", "mean reversion, regimes, seasonality", "soon"],
          ["Positive definite matrices & minima", "valid covariance, optimal portfolios", "soon"],
          ["Complex matrices, FFT & Jordan form", "cycles in prices", "soon"],
          ["SVD & linear transformations", "factor models", "soon"],
          ["Change of basis & pseudoinverse", "hedging with spare products", "soon"] ] }
      ] },
    { id: "svc", n: "02", name: "Single Variable Calculus", tag: "How a price changes", state: "later", col: 0, row: 1, url: "single-variable-calculus/index.html", lessons: [0, 102],
      about: "Limits, derivatives, integrals, series and Taylor expansions: the base toolkit for pricing, sensitivities and compounding.",
      groups: [
        { name: "Change", topics: [
          ["Limits & continuity", "what 'instant' means", "soon"],
          ["Derivatives & their rules", "delta as a rate of change", "soon"],
          ["Using derivatives", "max/min, rates, linear approximation", "soon"] ] },
        { name: "Accumulation", topics: [
          ["Integrals & the fundamental theorem", "adding up tiny changes", "soon"],
          ["Exponentials & logarithms", "continuous compounding, log returns", "soon"],
          ["Integration techniques", "areas under payoff curves", "soon"] ] },
        { name: "Approximation", topics: [
          ["Series & convergence", "when infinite sums settle", "soon"],
          ["Taylor series", "P&L for a small Nifty move: delta + gamma", "soon"] ] }
      ] },
    { id: "mvc", n: "03", name: "Multivariable Calculus", tag: "Many inputs at once", state: "later", col: 1, row: 0, url: "multivariable-calculus/index.html", lessons: [0, 102],
      about: "Partial derivatives, gradients, Lagrange multipliers, multiple integrals and vector calculus: optimisation when a price depends on many things.",
      groups: [
        { name: "Many inputs", topics: [
          ["Functions of several variables", "premium as a surface over spot and vol", "soon"],
          ["Partial derivatives & gradients", "every Greek on its own", "soon"],
          ["The chain rule", "how risk flows through a model", "soon"] ] },
        { name: "Optimisation", topics: [
          ["Maxima & minima", "the best mix of products", "soon"],
          ["Lagrange multipliers", "best portfolio under a budget", "soon"] ] },
        { name: "Integrals & fields", topics: [
          ["Double & triple integrals", "probabilities over regions", "soon"],
          ["Line integrals & Green's theorem", "path-dependent quantities", "soon"],
          ["Divergence & Stokes", "the vector-calculus finale", "soon"] ] }
      ] },
    { id: "pr", n: "04", name: "Probability", tag: "Uncertainty and expected payoffs", state: "later", col: 1, row: 1, url: "probability/index.html", lessons: [0, 34],
      about: "Random variables, distributions, expectation, conditioning and limit theorems: the core of every quant model.",
      groups: [
        { name: "Foundations", topics: [
          ["Counting & probability rules", "how likely is a move?", "soon"],
          ["Conditioning & Bayes", "updating on new information", "soon"],
          ["Random variables", "a payoff that depends on chance", "soon"] ] },
        { name: "Distributions", topics: [
          ["Binomial & Poisson", "up/down steps, rare jumps", "soon"],
          ["Normal & lognormal", "returns and prices", "soon"],
          ["Joint distributions & covariance", "how Nifty and BankNifty move together", "soon"] ] },
        { name: "Limits & inference", topics: [
          ["Expectation & variance", "fair value and risk", "soon"],
          ["Law of large numbers & CLT", "why averages are reliable", "soon"],
          ["Estimation & confidence", "trusting a backtest", "soon"] ] }
      ] },
    { id: "de", n: "05", name: "Differential Equations", tag: "Change over time", state: "later", col: 1, row: 2, url: "differential-equations/index.html", lessons: [0, 39],
      about: "First and second order ODEs, systems, Laplace transforms, and the road to the PDEs behind option pricing.",
      groups: [
        { name: "First order", topics: [
          ["Growth & decay", "compounding and discounting", "soon"],
          ["Linear first-order equations", "mean reversion and half-life", "soon"] ] },
        { name: "Second order & systems", topics: [
          ["Oscillations & damping", "a basis that overshoots and settles", "soon"],
          ["Systems & e^(At)", "several quantities moving together", "soon"],
          ["Laplace transforms", "solving with a change of view", "soon"] ] },
        { name: "Towards PDEs", topics: [
          ["The heat equation", "the shape behind Black–Scholes", "soon"] ] }
      ] },
    { id: "ra", n: "06", name: "Real Analysis", tag: "Calculus, proved properly", state: "later", col: 2, row: 0, url: "real-analysis/index.html", lessons: [0, 25],
      about: "Sequences, limits, continuity and integration done rigorously: the proofs that make stochastic calculus and probability theory sound.",
      groups: [
        { name: "Foundations", topics: [
          ["Sequences & limits", "what convergence really means", "soon"],
          ["Continuity & differentiability", "when calculus works", "soon"] ] },
        { name: "Integration", topics: [
          ["The Riemann integral", "areas, rigorously", "soon"],
          ["Series of functions", "when limits can be swapped", "soon"] ] }
      ] },
    { id: "opt", n: "07", name: "Optimization", tag: "Finding the best choice", state: "later", col: 2, row: 1, url: "optimization/index.html", lessons: [0, 27],
      about: "Gradients, convexity, constraints and Lagrange multipliers, and the algorithms that find the best portfolio or the best-fitting model.",
      groups: [
        { name: "Foundations", topics: [
          ["Convexity", "when a minimum is the minimum", "soon"],
          ["Gradient descent", "walking downhill", "soon"] ] },
        { name: "Constraints", topics: [
          ["Lagrange multipliers & KKT", "the best mix under a budget", "soon"],
          ["Linear & quadratic programming", "portfolio optimisation", "soon"] ] }
      ] },
    { id: "st", n: "08", name: "Statistics", tag: "Learning from data", state: "later", col: 2, row: 2, url: "statistics/index.html", lessons: [0, 22],
      about: "Estimation, confidence intervals, hypothesis tests, regression and Bayesian thinking: deciding what the data really says.",
      groups: [
        { name: "Inference", topics: [
          ["Estimation & likelihood", "best guesses from data", "soon"],
          ["Confidence intervals", "how sure you can be", "soon"],
          ["Hypothesis testing", "is the edge real?", "soon"] ] },
        { name: "Models", topics: [
          ["Regression", "fitting returns to factors", "soon"],
          ["Bayesian statistics", "updating beliefs with evidence", "soon"],
          ["Principal component analysis", "the main directions in data", "soon"] ] }
      ] },
    { id: "dsp", n: "11", name: "Discrete Stochastic Processes", tag: "Randomness step by step", state: "later", col: 3, row: 1, url: "discrete-stochastic-processes/index.html", lessons: [0, 25],
      about: "Poisson processes, Markov chains, random walks and martingales: the models behind order arrivals, regimes and fair prices.",
      groups: [
        { name: "Arrivals", topics: [
          ["Poisson processes", "orders arriving at random", "soon"],
          ["Renewal processes", "time between events", "soon"] ] },
        { name: "States & walks", topics: [
          ["Markov chains", "regimes and transitions", "soon"],
          ["Random walks & martingales", "fair games and prices", "soon"] ] }
      ] },
    { id: "ca", n: "09", name: "Complex Analysis", tag: "Calculus with complex numbers", state: "later", col: 2, row: 3, url: "complex-analysis/index.html", lessons: [0, 13],
      about: "Complex functions, contour integrals and residues: the tools behind Fourier methods for pricing options quickly.",
      groups: [
        { name: "Complex functions", topics: [
          ["Analytic functions", "derivatives in the complex plane", "soon"],
          ["Contour integrals & residues", "integrals that evaluate themselves", "soon"] ] },
        { name: "Transforms", topics: [
          ["Fourier & Laplace transforms", "fast option pricing", "soon"] ] }
      ] },
    { id: "ts", n: "10", name: "Time-Series Analysis", tag: "Data that unfolds over time", state: "later", col: 3, row: 0, url: "time-series/index.html", lessons: [0, 23],
      about: "Stationarity, ARMA models, volatility models and forecasting: modelling returns, spreads and volatility as they evolve.",
      groups: [
        { name: "Models", topics: [
          ["Stationarity & autocorrelation", "does the past predict the future?", "soon"],
          ["ARMA models", "memory in returns", "soon"],
          ["Volatility models (GARCH)", "risk that clusters", "soon"] ] }
      ] },
    { id: "sc", n: "12", name: "Stochastic Calculus", tag: "Calculus for random paths", state: "later", col: 3, row: 2, url: "stochastic-calculus/index.html", lessons: [0, 6],
      about: "Brownian motion, Itô's lemma and stochastic differential equations: the language of Black–Scholes and continuous-time models.",
      groups: [
        { name: "Continuous randomness", topics: [
          ["Brownian motion", "the continuous random walk", "soon"],
          ["Itô's lemma", "the chain rule for random paths", "soon"],
          ["Stochastic differential equations", "from GBM to Black–Scholes", "soon"] ] }
      ] },
    { id: "fin", n: "13", name: "Maths for Finance", tag: "Where it all comes together", state: "later", col: 4, row: 0, url: "maths-for-finance/index.html", lessons: [0, 26],
      about: "Stochastic processes, Itô calculus, Black–Scholes, portfolio theory and time series: the payoff of every stage before.",
      groups: [
        { name: "Randomness in time", topics: [
          ["Random walks & Brownian motion", "price paths", "soon"],
          ["Itô calculus", "calculus for random paths", "soon"] ] },
        { name: "Pricing", topics: [
          ["Binomial trees & risk-neutral pricing", "pricing without forecasting", "soon"],
          ["Black–Scholes & the Greeks", "pricing Nifty options", "soon"] ] },
        { name: "Portfolios & data", topics: [
          ["Mean-variance portfolios", "the best risk/return mix", "soon"],
          ["Factor models & PCA", "what really drives returns", "soon"],
          ["Time series & volatility", "modelling and testing on data", "soon"] ] }
      ] }
  ];
  // which subject builds on which (arrows in the main map)
  // arrows: [from, to] = "required" (MIT's stated prerequisites); a third entry "help" = helpful, not required
  var EDGES = [["la", "mvc"], ["svc", "mvc"], ["svc", "pr"], ["la", "de"], ["svc", "de"], ["la", "pr"], ["pr", "st"], ["la", "st"], ["st", "dsp"], ["pr", "dsp"], ["la", "opt"], ["mvc", "opt"],
    ["mvc", "ra"], ["mvc", "ca"], ["de", "ca"], ["st", "ts"], ["dsp", "sc"], ["mvc", "sc"], ["ra", "sc", "help"],
    // Maths for Finance follows MIT 18.642, whose syllabus requires 18.06, 18.03 and probability; the rest only help
    ["la", "fin"], ["pr", "fin"], ["de", "fin"], ["st", "fin", "help"], ["dsp", "fin", "help"], ["opt", "fin", "help"], ["ts", "fin", "help"], ["sc", "fin", "help"], ["ca", "fin", "help"]];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function count(s) { var all = 0, live = 0; s.groups.forEach(function (g) { g.topics.forEach(function (t) { all++; if (t[2] === "live") live++; }); }); return { all: all, live: live }; }
  var STATE_TXT = { now: "In progress", later: "Later" };
  var TOPIC_TXT = { live: "Live", next: "Next up", soon: "Planned" };

  function mapHTML() {
    var cols = [0, 1, 2, 3, 4].map(function (c) {
      var items = SUBJECTS.filter(function (s) { return s.col === c; }).sort(function (a, b) { return a.row - b.row; });
      return '<div class="rmm-col">' + items.map(function (s) {
        var k = s.lessons ? { live: s.lessons[0], all: s.lessons[1] } : null;   // lessons on the node, never topics
        var pct = k ? Math.round(100 * k.live / k.all) : 0;
        var tag = s.url ? "a" : "div";   // only subjects that have started open a page
        return '<' + tag + ' class="rmm-node rmm-' + s.state + (s.url ? "" : " rmm-static") + '"' + (s.url ? ' href="' + s.url + '"' : "") + ' data-id="' + s.id + '">' +
          '<span class="rmm-n">' + s.n + '</span>' +
          '<span class="rmm-body"><span class="rmm-name">' + esc(s.name) + '</span><span class="rmm-tag">' + esc(s.tag) + '</span>' +
          '<span class="rmm-bar"><i style="--w:' + pct + '%"></i></span>' +
          '<span class="rmm-meta">' + (k ? (s.state === "now" ? "In progress · " : "") + k.live + ' / ' + k.all + ' lessons live' : 'Lessons open soon') + '</span></span></' + tag + '>';
      }).join("") + '</div>';
    }).join("");
    return '<div class="rmm-scroll"><div class="rmm" id="rmm"><svg class="rmm-edges" aria-hidden="true"><defs><marker id="rmm-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs></svg>' + cols + '</div></div>' +
      '<div class="rmm-legend"><span><i class="lg-now"></i>In progress</span><span><i class="lg-later"></i>Later</span><span><i class="lg-edge"></i>required</span><span><i class="lg-help"></i>helpful</span><span class="rmm-hint">Click any subject to open its lesson list</span></div>';
  }

  function subjectHTML(s) {
    var k = count(s), pct = k.live / k.all, R = 26, C = 2 * Math.PI * R;
    var ring = '<svg class="rms-ring" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="' + R + '" class="rr-bg"/><circle cx="32" cy="32" r="' + R + '" class="rr-fg" style="stroke-dasharray:' + C.toFixed(1) + ';--off:' + (C * (1 - pct)).toFixed(1) + ';stroke-dashoffset:' + C.toFixed(1) + '"/><text x="32" y="37" text-anchor="middle">' + Math.round(100 * pct) + '%</text></svg>';
    var side = 0;
    var groups = s.groups.map(function (g, gi) {
      var nodes = g.topics.map(function (t) {
        var inner = '<span class="rmt-name">' + esc(t[0]) + '</span><span class="rmt-why">' + esc(t[1]) + '</span><span class="rmt-st">' + TOPIC_TXT[t[2]] + '</span>';
        var cls = 'rmt rmt-' + t[2] + ' rv ' + (side++ % 2 ? 'rmt-r' : 'rmt-l');
        return t[3] ? '<a class="' + cls + '" href="' + t[3] + '"><i class="rmt-dot"></i>' + inner + '</a>' : '<div class="' + cls + '"><i class="rmt-dot"></i>' + inner + '</div>';
      }).join("");
      return '<div class="rmg"><div class="rmg-head rv"><span class="rmg-k">Branch ' + (gi + 1) + '</span>' + esc(g.name) + '</div>' + nodes + '</div>';
    }).join("");
    return '<section class="rms" id="rm-' + s.id + '" data-id="' + s.id + '">' +
      '<header class="rms-head rv">' + ring + '<div><div class="rms-k">Stage ' + s.n + ' · ' + STATE_TXT[s.state] + '</div><h2 class="rms-title">' + esc(s.name) + '</h2><p class="rms-about">' + esc(s.about) + '</p>' +
      (s.state === "later" ? '<p class="rms-note">Planned outline; topics may be adjusted when this subject starts.</p>' : '') + '</div></header>' +
      '<div class="rms-tree"><div class="rms-trunk"><i></i></div>' + groups + '<div class="rms-end rv">' + (s.id === "fin" ? 'Destination: price, hedge and manage risk on Nifty options from first principles' : 'Next stage → ' + esc(SUBJECTS[SUBJECTS.indexOf(s) + 1].name)) + '</div></div></section>';
  }

  function build(root) {
    root.innerHTML =
      '<div class="rm-intro rv"><h2 id="rm-map" style="margin-top:8px">The big picture</h2><p>Thirteen subjects. The map shows the order and what each subject builds on.</p></div>' +
      mapHTML();
  }

  // ---- draw the map's arrows between node edges (works for column and stacked layouts) ----
  function drawEdges() {
    var box = document.getElementById("rmm"); if (!box || !box.offsetWidth) return;
    var svg = box.querySelector(".rmm-edges"), b = box.getBoundingClientRect();
    svg.setAttribute("width", b.width); svg.setAttribute("height", b.height); svg.setAttribute("viewBox", "0 0 " + b.width + " " + b.height);
    svg.querySelectorAll("path.e").forEach(function (p) { p.remove(); });
    var stacked = getComputedStyle(box).flexDirection === "column";
    var list = stacked ? SUBJECTS.slice(1).map(function (t, i) { return [SUBJECTS[i].id, t.id]; }) : EDGES;
    list.forEach(function (e, i) {
      var a = box.querySelector('[data-id="' + e[0] + '"]').getBoundingClientRect(), c = box.querySelector('[data-id="' + e[1] + '"]').getBoundingClientRect(), d;
      var sameCol = !stacked && Math.abs(a.left - c.left) < 4;   // e.g. Statistics → Discrete Stochastic Processes, stacked in one column
      if (sameCol) {
        var vx = a.left + a.width * 0.5 - b.left, vy1 = a.bottom - b.top, vy2 = c.top - b.top - 4;
        d = "M" + vx + " " + vy1 + " L " + vx + " " + vy2;
      } else if (!stacked) {
        var x1 = a.right - b.left, y1 = a.top + a.height / 2 - b.top, x2 = c.left - b.left - 4, y2 = c.top + c.height / 2 - b.top, m = (x1 + x2) / 2;
        d = "M" + x1 + " " + y1 + " C " + m + " " + y1 + ", " + m + " " + y2 + ", " + x2 + " " + y2;
      } else {
        var off = 0;
        var sx = a.left + a.width / 2 + off - b.left, sy = a.bottom - b.top, ex = c.left + c.width / 2 + off - b.left, ey = c.top - b.top - 4, my = (sy + ey) / 2;
        d = "M" + sx + " " + sy + " C " + sx + " " + my + ", " + ex + " " + my + ", " + ex + " " + ey;
      }
      var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d); p.setAttribute("class", "e" + (e[0] === "la" ? " e-now" : "") + (e[2] === "help" ? " e-help" : "")); p.setAttribute("data-from", e[0]); p.setAttribute("data-to", e[1]); p.setAttribute("marker-end", "url(#rmm-ar)");
      p.style.animationDelay = (i * 0.08) + "s";
      svg.appendChild(p);
    });
  }

  // ---- scroll effects: reveal, trunk fill, active chip ----
  function effects(root) {
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var rv = root.querySelectorAll(".rv, .rms-ring, .rmm");
    if (reduce || !("IntersectionObserver" in window)) rv.forEach(function (el) { el.classList.add("in"); });
    else {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
      rv.forEach(function (el) { io.observe(el); });
    }
    var chips = root.querySelectorAll(".rm-chips a"), secs = root.querySelectorAll(".rms"), ticking = false;
    function onScroll() {
      ticking = false;
      var vh = window.innerHeight, active = null;
      secs.forEach(function (s) {
        var r = s.getBoundingClientRect(), tree = s.querySelector(".rms-tree").getBoundingClientRect();
        var f = Math.max(0, Math.min(1, (vh * 0.65 - tree.top) / Math.max(1, tree.height)));
        s.querySelector(".rms-trunk i").style.height = (f * 100) + "%";
        if (r.top < vh * 0.4 && r.bottom > vh * 0.4) active = s.dataset.id;
      });
      chips.forEach(function (c) { c.classList.toggle("on", c.dataset.id === active); });
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  }


  // ---- hover a subject: a small card below it lists its prerequisites; their nodes and arrows light up ----
  function prereqs(box) {
    var tip = document.createElement("div"); tip.className = "rmm-tip"; tip.setAttribute("role", "tooltip"); document.body.appendChild(tip);
    var byId = {}; SUBJECTS.forEach(function (s) { byId[s.id] = s; });
    function show(node) {
      var id = node.getAttribute("data-id"), s = byId[id];
      var pre = EDGES.filter(function (e) { return e[1] === id && e[2] !== "help"; }).map(function (e) { return byId[e[0]]; }).sort(function (a, b) { return a.n < b.n ? -1 : 1; });
      tip.innerHTML = '<span class="rmm-tip-k">' + (pre.length ? "Prerequisites" : "Starting point") + "</span>" +
        (pre.length ? '<span class="rmm-tip-list">' + pre.map(function (p) { return '<span class="rmm-tip-chip"><b>' + p.n + "</b>" + esc(p.name) + "</span>"; }).join("") + "</span>"
                    : '<span class="rmm-tip-none">No prerequisites: start here</span>');
      var r = node.getBoundingClientRect(), vw = document.documentElement.clientWidth;
      tip.style.visibility = "hidden"; tip.classList.add("on");
      var w = tip.offsetWidth, h = tip.offsetHeight, x = r.left + r.width / 2 - w / 2;
      x = Math.max(8, Math.min(vw - w - 8, x));
      var below = r.bottom + 10 + h < window.innerHeight;   // flip above the node near the bottom of the screen
      tip.classList.toggle("up", !below);
      tip.style.left = x + "px"; tip.style.top = (below ? r.bottom + 10 : r.top - h - 10) + "px";
      tip.style.setProperty("--ax", (r.left + r.width / 2 - x) + "px");
      tip.style.visibility = "";
      box.classList.add("rmm-focus");
      box.querySelectorAll(".rmm-node").forEach(function (n) {
        var nid = n.getAttribute("data-id");
        n.classList.toggle("rmm-me", nid === id);
        n.classList.toggle("rmm-pre", pre.some(function (p) { return p.id === nid; }));
      });
      box.querySelectorAll("path.e").forEach(function (p) { p.classList.toggle("e-hot", p.getAttribute("data-to") === id && !p.classList.contains("e-help")); });
    }
    function hide() {
      tip.classList.remove("on"); box.classList.remove("rmm-focus");
      box.querySelectorAll(".rmm-node").forEach(function (n) { n.classList.remove("rmm-me", "rmm-pre"); });
      box.querySelectorAll("path.e").forEach(function (p) { p.classList.remove("e-hot"); });
    }
    box.querySelectorAll(".rmm-node").forEach(function (n) {
      n.addEventListener("mouseenter", function () { show(n); });
      n.addEventListener("mouseleave", hide);
    });
    window.addEventListener("scroll", hide, { passive: true });
    box.parentNode.addEventListener("scroll", hide, { passive: true });
  }
  function mount() {
    var root = document.getElementById("roadmap-root"); if (!root) return;
    build(root);
    effects(root);
    var box = document.getElementById("rmm");
    prereqs(box);
    if (window.ResizeObserver) new ResizeObserver(drawEdges).observe(box); else window.addEventListener("resize", drawEdges);
    document.querySelectorAll('[data-tab="roadmap"]').forEach(function (b) { b.addEventListener("click", function () { setTimeout(drawEdges, 30); }); });
    // smooth scroll for in-roadmap links (map nodes + chips)
    root.addEventListener("click", function (ev) {
      var a = ev.target.closest('a[href^="#rm-"]'); if (!a) return;
      var t = document.getElementById(a.getAttribute("href").slice(1)); if (!t) return;
      ev.preventDefault(); history.replaceState(null, "", a.getAttribute("href"));
      t.scrollIntoView({ behavior: "smooth", block: "start" });
      t.classList.remove("flash"); void t.offsetWidth; t.classList.add("flash");
    });
    setTimeout(drawEdges, 50);
    // a shared link like #rm-la opens the Roadmap tab and scrolls to that subject
    var h = location.hash;
    if (/^#rm-/.test(h)) {
      var tb = document.querySelector('.tabs [data-tab="roadmap"]'); if (tb) tb.click();
      history.replaceState(null, "", h);
      setTimeout(function () { var t = document.getElementById(h.slice(1)); if (t) t.scrollIntoView({ block: "start" }); drawEdges(); }, 80);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
