// Quant Trading Prep tab: a circuit-board map, eight tracks wired into one core. (Per-track resources come later.)
// Data lives here; the page only needs <div id="hft-root"></div>.
(function () {
  "use strict";

  // status: "live" (published, linked), "next" (being written), "soon" (planned)
  var TRACKS = [
    { id: "mm", n: "01", name: "Mental Maths", short: "Mental Maths", tag: "Fast, accurate numbers under pressure", col: "--warn-b",
      about: "Arithmetic at speed, estimation you can trust, and the timed tests trading firms use to screen candidates.",
      groups: [
        { name: "Speed arithmetic", topics: [
          ["Multiplication & division tricks", "two- and three-digit work in your head", "soon"],
          ["Fractions, decimals & percentages", "switching between them instantly", "soon"] ] },
        { name: "Estimation", topics: [
          ["Approximation & orders of magnitude", "close enough, fast enough", "soon"],
          ["Sequences & number patterns", "spotting the rule", "soon"] ] },
        { name: "Test practice", topics: [
          ["Timed arithmetic drills", "speed with accuracy", "soon"],
          ["Trading & market-making games", "quoting under pressure", "soon"] ] }
      ] },
    { id: "eng", n: "02", name: "English", short: "English", tag: "Read fast, write clearly, interview well", col: "--fin-b",
      about: "Reading dense material quickly, writing crisp explanations, and communicating clearly in interviews and on a trading desk.",
      groups: [
        { name: "Reading & writing", topics: [
          ["Reading comprehension", "dense text, quickly and accurately", "soon"],
          ["Clear written communication", "say it once, say it simply", "soon"] ] },
        { name: "Speaking", topics: [
          ["Explaining your reasoning", "thinking out loud in an interview", "soon"],
          ["Behavioural interviews", "stories that show how you work", "soon"] ] }
      ] },
    { id: "qf", n: "03", name: "Mathematics & Quantitative Finance", short: "Maths & Quant Finance", tag: "Probability, statistics and pricing", col: "--def-b", opens: "roadmap", openLabel: "open the maths roadmap →",
      about: "The probability and statistics behind every interview puzzle and every strategy, with the linear algebra and calculus from Mathematics for Finance and the basics of pricing.",
      groups: [
        { name: "Probability", topics: [
          ["Probability & expected value", "the core of every puzzle", "soon"],
          ["Brainteasers & interview puzzles", "structured thinking under time", "soon"] ] },
        { name: "Statistics", topics: [
          ["Distributions & estimation", "what the data can and can't tell you", "soon"],
          ["Regression & correlation", "beta, signals and noise", "soon"] ] },
        { name: "Quant finance", topics: [
          ["Linear algebra & calculus", "from Mathematics for Finance", "soon"],
          ["Stochastic processes & pricing basics", "random walks to option prices", "soon"] ] }
      ] },
    { id: "ml", n: "04", name: "Machine Learning", short: "Machine Learning", tag: "Signal in very noisy data", col: "--thm-b",
      about: "The models, and above all the discipline: features from market data, honest validation, and how not to fool yourself with a backtest.",
      groups: [
        { name: "Foundations", topics: [
          ["Regression & regularisation", "fitting without overfitting", "soon"],
          ["Bias, variance & validation", "why most backtests lie", "soon"] ] },
        { name: "Models", topics: [
          ["Trees & gradient boosting", "workhorses for tabular data", "soon"],
          ["Neural networks", "when they help, when they don't", "soon"] ] },
        { name: "For markets", topics: [
          ["Features from order-book data", "turning ticks into inputs", "soon"],
          ["Time-series validation", "no peeking into the future", "soon"] ] }
      ] },
    { id: "mkt", n: "05", name: "Market Microstructure & Market Making", short: "Market Microstructure & Market Making", tag: "How prices are actually made", col: "--ex-b", opens: "mkt", openLabel: "open the reading maps →",
      about: "The limit order book, how exchanges match orders, and how a market maker earns the spread while managing inventory and adverse selection.",
      groups: [
        { name: "The order book", topics: [
          ["Limit orders, market orders & queues", "price-time priority", "soon"],
          ["Exchange mechanics", "matching engines, tick sizes, fees and rebates", "soon"] ] },
        { name: "Making markets", topics: [
          ["Spreads & inventory", "earning the spread without drowning in position", "soon"],
          ["Adverse selection", "when the other side knows more", "soon"],
          ["Market-making strategies & simulation", "quote, hedge, repeat", "soon"] ] }
      ] },
    { id: "opt", n: "06", name: "Options Trading & Risk Management", short: "Options & Risk", tag: "Pricing, Greeks and staying alive", col: "--int-b",
      about: "Option payoffs and pricing, the Greeks and how to hedge them, volatility surfaces, and the risk limits that keep a desk in business.",
      groups: [
        { name: "Options", topics: [
          ["Payoffs & put–call parity", "the building blocks", "soon"],
          ["The Greeks & hedging", "delta, gamma, vega, theta", "soon"],
          ["Volatility", "implied vol, smiles and surfaces", "soon"] ] },
        { name: "Risk", topics: [
          ["Position & risk limits", "how much can go wrong", "soon"],
          ["Scenario & stress testing", "the day the model breaks", "soon"] ] }
      ] },
    { id: "cpp", n: "07", name: "C++ & Data Structures and Algorithms", short: "C++ & DSA", tag: "Write fast, correct code", col: "--mth-b", opens: "cpp", openLabel: "open the reading path →",
      about: "Modern C++ the way trading firms use it, the data structures and algorithms behind fast systems, and the coding interviews that test both.",
      groups: [
        { name: "Modern C++", topics: [
          ["Core language & the STL", "RAII, references, containers", "soon"],
          ["Templates & move semantics", "zero-cost abstractions", "soon"] ] },
        { name: "DSA", topics: [
          ["Data structures", "arrays, hash maps, heaps, trees", "soon"],
          ["Algorithms & complexity", "sorting, searching, graphs, DP", "soon"],
          ["Coding-interview practice", "clean solutions under time", "soon"] ] }
      ] },
    { id: "sys", n: "08", name: "Computer Systems & Low-Latency Engineering", short: "Low-Latency Systems", tag: "Shaving microseconds", col: "--accent", opens: "sys", openLabel: "open the category map →",
      about: "How the hardware, the operating system and the network really behave, and how to measure and cut latency from tick to trade.",
      groups: [
        { name: "Hardware & OS", topics: [
          ["Computer architecture", "caches, branch prediction, memory", "soon"],
          ["Concurrency", "threads, atomics, lock-free queues", "soon"] ] },
        { name: "Network & speed", topics: [
          ["Networking for trading", "TCP, UDP, multicast, kernel bypass", "soon"],
          ["Measuring & profiling latency", "you can't cut what you can't see", "soon"] ] }
      ] }
  ];

  // simple line icons (24 × 24, stroke)
  var ICON = {
    mm: "M13 2 4 14h7l-1 8 9-12h-7z",
    eng: "M4 5h16v11H9l-5 4z M8 9h8 M8 12h5",
    qf: "M17 4H7l6 8-6 8h10",
    ml: "M5 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0 M5 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0 M15 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0 M9 6l6 5 M9 18l6-5",
    mkt: "M4 20V9 M9 20V5 M14 20v-8 M19 20v-4",
    opt: "M3 18h6l8-12h4 M3 6h6",
    cpp: "M8 6 2 12l6 6 M16 6l6 6-6 6 M14 4l-4 16",
    sys: "M7 7h10v10H7z M9 3v4 M15 3v4 M9 17v4 M15 17v4 M3 9h4 M3 15h4 M17 9h4 M17 15h4"
  };
  var SVGNS = "http://www.w3.org/2000/svg", XLINK = "http://www.w3.org/1999/xlink";

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function count(s) { var all = 0, live = 0; s.groups.forEach(function (g) { g.topics.forEach(function (t) { all++; if (t[2] === "live") live++; }); }); return { all: all, live: live }; }
  var TOPIC_TXT = { live: "Live", next: "Next up", soon: "Planned" };

  function trackHTML(s, i) {
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
    var next = TRACKS[i + 1];
    return '<section class="rms" id="hft-' + s.id + '" data-id="' + s.id + '">' +
      '<header class="rms-head rv">' + ring + '<div><div class="rms-k">Track ' + s.n + ' · Planned</div><h2 class="rms-title">' + esc(s.name) + '</h2><p class="rms-about">' + esc(s.about) + '</p>' +
      '<p class="rms-note">Planned outline; topics will be filled in track by track.</p></div></header>' +
      '<div class="rms-tree"><div class="rms-trunk"><i></i></div>' + groups + '<div class="rms-end rv">' +
      (next ? 'Next track → ' + esc(next.name) : 'Destination: ready for HFT interviews and the desk') + '</div></div></section>';
  }

  function build(root) {
    root.innerHTML = '<div class="hft hft-solo" id="hftb"><svg class="hft-svg" aria-label="Quant trading preparation: eight tracks wired into one goal"></svg></div>';
  }

  function el(tag, attrs, parent) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }

  // ---- the circuit board ----
  function draw() {
    var box = document.getElementById("hftb"); if (!box || !box.offsetWidth) return;
    var svg = box.querySelector(".hft-svg"), W = box.offsetWidth, narrow = W < 680;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var H, cx, cy, CW = narrow ? 120 : 150, CH = narrow ? 70 : 150, nodes = [];
    if (!narrow) {
      H = Math.max(600, Math.min(720, W * 0.66)); cx = W / 2; cy = H / 2;
      var Rx = Math.min(W / 2 - 150, 360), Ry = H / 2 - 104;
      TRACKS.forEach(function (s, i) {
        var a = -Math.PI / 2 + i * 2 * Math.PI / TRACKS.length;
        nodes.push({ x: cx + Rx * Math.cos(a), y: cy + Ry * Math.sin(a), c: Math.cos(a), s: Math.sin(a) });
      });
    } else {
      var step = 104; cx = 16 + CW / 2; cy = 56; H = 150 + TRACKS.length * step;
      TRACKS.forEach(function (s, i) { nodes.push({ x: 52, y: 170 + i * step, c: 0, s: 1 }); });
    }
    svg.setAttribute("viewBox", "0 0 " + W + " " + H); svg.setAttribute("width", W); svg.setAttribute("height", H);

    var defs = el("defs", {}, svg);
    var glow = el("filter", { id: "hft-glow", x: "-60%", y: "-60%", width: "220%", height: "220%" }, defs);
    el("feGaussianBlur", { stdDeviation: "3.5", result: "b" }, glow);
    var mg = el("feMerge", {}, glow); el("feMergeNode", { "in": "b" }, mg); el("feMergeNode", { "in": "SourceGraphic" }, mg);
    var pat = el("pattern", { id: "hft-grid", width: 24, height: 24, patternUnits: "userSpaceOnUse" }, defs);
    el("path", { d: "M24 0H0V24", "class": "hft-gridline" }, pat);
    el("rect", { x: 0, y: 0, width: W, height: H, fill: "url(#hft-grid)" }, svg);

    // traces: node → core, Manhattan style
    var traceG = el("g", { "class": "hft-traces" }, svg);
    var paths = TRACKS.map(function (s, i) {
      var n = nodes[i], d;
      if (narrow) {
        d = "M " + n.x + " " + (n.y - 38) + " V " + (cy + CH / 2);   // one shared bus up into the core
      } else {
        var dx = n.c, dy = n.s, ax = Math.abs(dx) > 0.92, ay = Math.abs(dy) > 0.92;
        var sx = dx > 0 ? 1 : -1, sy = dy > 0 ? 1 : -1;
        if (ay) d = "M " + n.x + " " + (n.y - sy * 38) + " V " + (cy + sy * CH / 2);
        else if (ax) d = "M " + (n.x - sx * 38) + " " + n.y + " H " + (cx + sx * CW / 2);
        else {
          var py = cy + sy * (CH / 2 - 26), px = n.x - sx * 38 * Math.abs(dx);
          d = "M " + px + " " + (n.y - sy * 38 * Math.abs(dy)) + " L " + (px + (cx - px) * 0.35) + " " + (n.y + (py - n.y) * 0.35) + " V " + py + " H " + (cx + sx * CW / 2);
        }
      }
      var bed = el("path", { d: d, "class": "hft-trace-bed" }, traceG);
      var p = el("path", { d: d, id: "hft-tr-" + s.id, "class": "hft-trace", style: "--c:var(" + s.col + ")", "data-id": s.id }, traceG);
      return p;
    });
    // vias at the elbows: small rings at each trace's end on the core
    paths.forEach(function (p, i) {
      var L = p.getTotalLength(), end = p.getPointAtLength(L), via = p.getPointAtLength(L * 0.5);
      el("circle", { cx: via.x, cy: via.y, r: 3.5, "class": "hft-via", style: "--c:var(" + TRACKS[i].col + ")" }, svg);
      el("rect", { x: end.x - 4, y: end.y - 4, width: 8, height: 8, rx: 1.5, "class": "hft-pin", style: "--c:var(" + TRACKS[i].col + ")" }, svg);
      p.style.strokeDasharray = L; p.style.strokeDashoffset = box.classList.contains("in") ? 0 : L;
      // two packets per trace, flowing into the core
      [0, 1].forEach(function (k) {
        var pk = el("rect", { width: 7, height: 7, x: -3.5, y: -3.5, rx: 1.5, "class": "hft-packet", style: "--c:var(" + TRACKS[i].col + ")" }, svg);
        var am = el("animateMotion", { dur: (2.4 + (i % 3) * 0.4) + "s", begin: (i * 0.35 + k * 1.3) + "s", repeatCount: "indefinite", rotate: "auto" }, pk);
        var mp = el("mpath", {}, am); mp.setAttribute("href", "#hft-tr-" + TRACKS[i].id); mp.setAttributeNS(XLINK, "xlink:href", "#hft-tr-" + TRACKS[i].id);
      });
    });

    // the core chip
    var core = el("g", { "class": "hft-core", transform: "translate(" + cx + " " + cy + ")" }, svg);
    el("rect", { x: -CW / 2 - 10, y: -CH / 2 - 10, width: CW + 20, height: CH + 20, rx: 22, "class": "hft-core-halo" }, core);
    el("rect", { x: -CW / 2, y: -CH / 2, width: CW, height: CH, rx: 16, "class": "hft-core-body" }, core);
    for (var q = 0; q < 6; q++) { // decorative pins on every side
      var off = -CW / 2 + 16 + q * (CW - 32) / 5, offy = -CH / 2 + 16 + q * (CH - 32) / 5;
      el("rect", { x: off - 2, y: -CH / 2 - 7, width: 4, height: 7, "class": "hft-core-pin" }, core);
      el("rect", { x: off - 2, y: CH / 2, width: 4, height: 7, "class": "hft-core-pin" }, core);
      if (!narrow) { el("rect", { x: -CW / 2 - 7, y: offy - 2, width: 7, height: 4, "class": "hft-core-pin" }, core); el("rect", { x: CW / 2, y: offy - 2, width: 7, height: 4, "class": "hft-core-pin" }, core); }
    }
    var t1 = el("text", { y: narrow ? -6 : -10, "text-anchor": "middle", "class": "hft-core-t1" }, core); t1.textContent = "QUANT";
    var t2 = el("text", { y: narrow ? 16 : 18, "text-anchor": "middle", "class": "hft-core-t2" }, core); t2.textContent = "TRADER";
    if (!narrow) { var t3 = el("text", { y: 44, "text-anchor": "middle", "class": "hft-core-t3" }, core); t3.textContent = "8 tracks → 1 goal"; }

    // the track nodes
    TRACKS.forEach(function (s, i) {
      var n = nodes[i], k = count(s);
      var a = el("g", { "class": "hft-node" + (s.opens ? " hft-link" : ""), "data-id": s.id, style: "--c:var(" + s.col + ");--i:" + i, tabindex: "0", role: s.opens ? "link" : "img" }, svg);
      if (s.opens) {   // this track opens another tab's roadmap (e.g. Mathematics for Finance)
        var go = function () { var tb = document.querySelector('.tabs [data-tab="' + s.opens + '"]'); if (tb) { tb.click(); window.scrollTo({ top: 0, behavior: "smooth" }); } };
        a.addEventListener("click", go);
        a.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); } });
      }
      var g = el("g", { transform: "translate(" + n.x + " " + n.y + ")" }, a);
      var pop = el("g", { "class": "hft-pop" }, g);
      el("rect", { x: -38, y: -38, width: 76, height: 76, rx: 18, "class": "hft-node-ring" }, pop);
      el("rect", { x: -30, y: -30, width: 60, height: 60, rx: 14, "class": "hft-node-body" }, pop);
      el("path", { d: ICON[s.id], transform: "translate(-12 -15)", "class": "hft-ico" }, pop);
      var nn = el("text", { y: 22, "text-anchor": "middle", "class": "hft-n" }, pop); nn.textContent = s.n;
      var lx, ly, anchor;
      if (narrow) { lx = 50; ly = -6; anchor = "start"; }
      else if (Math.abs(n.s) > 0.92) { lx = 0; ly = n.s < 0 ? -72 : 64; anchor = "middle"; }          // top and bottom: label above / below
      else if (Math.abs(n.c) > 0.92) { lx = 0; ly = -72; anchor = "middle"; }                          // far left and right: label above, so it never clips
      else { lx = n.c > 0 ? 50 : -50; ly = -4; anchor = n.c > 0 ? "start" : "end"; }
      var l1 = el("text", { x: lx, y: ly, "text-anchor": anchor, "class": "hft-name" }, g), extra = 0;
      if (narrow && s.short.length > 24 && s.short.indexOf(" & ") > 0) {   // long names wrap onto two lines on phones
        var cut = s.short.indexOf(" & ") + 2;
        var t1 = el("tspan", { x: lx }, l1); t1.textContent = s.short.slice(0, cut);
        var t2 = el("tspan", { x: lx, dy: 17 }, l1); t2.textContent = s.short.slice(cut + 1);
        extra = 17;
      } else l1.textContent = s.short;
      var l2 = el("text", { x: lx, y: ly + 18 + extra, "text-anchor": anchor, "class": "hft-meta" + (s.opens ? " hft-meta-link" : "") }, g); l2.textContent = s.opens ? s.openLabel : s.groups.length + " branches · " + k.all + " topics";
      var tt = el("title", {}, a); tt.textContent = s.name + ": " + s.tag + (s.opens ? " (click to open its roadmap)" : "");
      a.addEventListener("mouseenter", function () { peek(s); }); a.addEventListener("focus", function () { peek(s); });
      a.addEventListener("mouseleave", function () { peek(null); }); a.addEventListener("blur", function () { peek(null); });
    });
  }
  function peek(s) {
    document.querySelectorAll(".hft-node").forEach(function (a) { a.classList.toggle("hot", !!s && a.getAttribute("data-id") === s.id); });
    document.querySelectorAll(".hft-trace").forEach(function (p) { p.classList.toggle("hot", !!s && p.getAttribute("data-id") === s.id); });
  }

  function mount() {
    var root = document.getElementById("hft-root"); if (!root) return;
    build(root);
    var box = document.getElementById("hftb"), started = false;
    function reveal() {
      if (started || !box.offsetWidth) return;
      var r = box.getBoundingClientRect(); if (r.top > window.innerHeight || r.bottom < 0) return;
      started = true; draw();
      requestAnimationFrame(function () { box.classList.add("in"); box.querySelectorAll(".hft-trace").forEach(function (p) { p.style.strokeDashoffset = 0; }); });
    }
    if (window.ResizeObserver) new ResizeObserver(function () { if (started) draw(); else reveal(); }).observe(box); else window.addEventListener("resize", function () { if (started) draw(); });
    window.addEventListener("scroll", reveal, { passive: true });
    document.querySelectorAll('[data-tab="hft"]').forEach(function (b) { b.addEventListener("click", function () { setTimeout(reveal, 40); }); });
    setTimeout(reveal, 60);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
