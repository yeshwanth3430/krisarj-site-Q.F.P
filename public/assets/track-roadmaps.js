// Track roadmaps opened from the Quant Trading Prep board (C++ & DSA books, Low-Latency Systems categories): an ordered path, drawn as a snake of cards.
// Each track renders into <div id="<track>-root"> inside its own hidden tab panel.
(function () {
  "use strict";

  var TRACKS = {
    cpp: {
      title: "C++ & Data Structures and Algorithms",
      intro: "Six books, read in this order: the language first, then algorithms, then speed.",
      steps: [
        { book: "A Tour of C++", author: "Bjarne Stroustrup", purpose: "Learn C++ fundamentals", lane: "C++", col: "--mth-b" },
        { book: "C++ Primer", author: "Lippman, Lajoie & Moo", purpose: "Deepen language knowledge", lane: "C++", col: "--mth-b" },
        { book: "Grokking Algorithms", author: "Aditya Bhargava", purpose: "Build DSA intuition", lane: "DSA", col: "--ex-b" },
        { book: "The Algorithm Design Manual", author: "Steven Skiena", purpose: "Develop deeper algorithmic problem-solving", lane: "DSA", col: "--ex-b" },
        { book: "C++ High Performance", author: "Björn Andrist & Viktor Sehr", purpose: "Learn performance optimization", lane: "Performance", col: "--int-b" },
        { book: "Effective Modern C++", author: "Scott Meyers", purpose: "Master modern C++ practices", lane: "Modern C++", col: "--thm-b" }
      ]
    },
    mkt: {
      type: "depth",
      title: "Market Microstructure & Market Making",
      intro: "Two reading maps: first how markets work, then how to make them.",
      maps: [
        { title: "Map 1 · Market Microstructure",
          objective: "Understand order books, market structure, liquidity, price formation, order flow and adverse selection.",
          steps: [
            { key: "harris", book: "Trading and Exchanges: Market Microstructure for Practitioners", author: "Larry Harris", lane: "Foundation", col: "--def-b",
              purpose: "First choice for a complete picture of market mechanics, order types, dealers, bid–ask spreads, liquidity and trading rules. Its coverage of liquidity suppliers is especially relevant." },
            { key: "lehalle", book: "Market Microstructure in Practice", author: "Charles-Albert Lehalle & Sophie Laruelle", lane: "Practical HFT focus", col: "--fin-b",
              purpose: "A strong bridge between market mechanics and algorithmic trading practice: how microstructure concepts affect trading decisions." },
            { key: "bouchaud", book: "Trades, Quotes and Prices: Financial Markets Under the Microscope", author: "Bouchaud, Bonart, Donier & Gould", lane: "Quantitative depth", col: "--ex-b",
              purpose: "Order-book dynamics, price impact, order flow and the empirical behaviour of financial markets." },
            { key: "hasbrouck", book: "Empirical Market Microstructure", author: "Joel Hasbrouck", lane: "Empirical analysis", col: "--int-b",
              purpose: "A specialist reference for analysing transaction and quote data, price discovery, transaction costs and liquidity with statistical and econometric methods." },
            { key: "ohara", book: "Market Microstructure Theory", author: "Maureen O'Hara", lane: "Advanced theory", col: "--thm-b",
              purpose: "The classic theory reference: inventory models, information-based models, informed traders and the economics of market making. More mathematical and abstract than Harris." },
            { key: "foucault", book: "Market Liquidity: Theory, Evidence, and Policy", author: "Thierry Foucault, Marco Pagano & Ailsa Röell", lane: "Advanced reference", col: "--warn-b",
              purpose: "A broader academic treatment of liquidity: its economic foundations, empirical evidence and the effects of market design." }
          ] },
        { title: "Map 2 · Market Making",
          objective: "Learn to set quotes, maximise expected trading profits, manage inventory, control adverse selection and build quantitative market-making strategies.",
          steps: [
            { key: "cartea", book: "Algorithmic and High-Frequency Trading", author: "Álvaro Cartea, Sebastian Jaimungal & José Penalva", lane: "Primary quantitative text", col: "--def-b",
              purpose: "Top choice for connecting market mechanics with mathematical trading strategies, optimal execution and market-making models." },
            { key: "gueant", book: "The Financial Mathematics of Market Liquidity: From Optimal Execution to Market Making", author: "Olivier Guéant", lane: "Advanced mathematical market making", col: "--mth-b",
              purpose: "The mathematical formulation of optimal quoting, inventory risk and liquidity provision. Best studied after the fundamentals, with enough probability and optimisation." },
            { key: "ohara", book: "Market Microstructure Theory", author: "Maureen O'Hara", lane: "Why market makers earn or lose", col: "--thm-b",
              purpose: "Study the chapters on markets and market making, inventory models and information-based models: the economic forces behind quoting and spread formation." },
            { key: "harris", book: "Trading and Exchanges", author: "Larry Harris", lane: "Practical foundation", col: "--fin-b",
              purpose: "Revisit dealers, bid–ask spreads, liquidity and informed traders to see the real-world risks that mathematical models simplify." },
            { key: "bouchaud", book: "Trades, Quotes and Prices", author: "Bouchaud, Bonart, Donier & Gould", lane: "Order-flow and price dynamics", col: "--ex-b",
              purpose: "Why fills are often followed by adverse price moves, how order flow moves prices, and why a quoted spread is not guaranteed profit." }
          ] }
      ]
    },
    sys: {
      type: "stack",
      title: "Low-Latency Systems",
      intro: "Six categories, from the silicon up to a deployed trading system. Hover a layer to open it.",
      // learning order is 01 → 06; the stack is drawn as the real system: hardware at the bottom, DevOps wrapping it all
      layers: [
        { n: "05", name: "HFT System Architecture", role: "decide · check risk · send", scale: "tick → trade: single-digit µs", key: "arch",
          topics: ["Event-driven systems", "Market-data pipelines", "Order-book reconstruction", "Risk checks", "Fault recovery"] },
        { n: "04", name: "Computer Networking & Exchange Connectivity", role: "the wire in and out", scale: "kernel stack ≈ 5–10 µs · bypass ≈ 1 µs", key: "net",
          topics: ["TCP/UDP", "Sockets", "Multicast", "NICs", "FIX", "Exchange protocols", "Market-data feeds", "Order gateways"] },
        { n: "03", name: "Low-Latency C++ & Concurrency", role: "the hot path", scale: "no allocation, no locks on the hot path", key: "cpp",
          topics: ["Modern C++", "Compiler optimization", "Atomics", "Synchronization", "Lock-free algorithms", "Predictable execution"] },
        { n: "02", name: "Operating Systems & Linux", role: "get out of the way", scale: "context switch ≈ µs · pin it, don't share it", key: "os",
          topics: ["Processes", "Threads", "Scheduling", "System calls", "Virtual memory", "CPU affinity"] },
        { n: "01", name: "Computer Architecture & Memory", role: "the silicon underneath", scale: "L1 hit ≈ 1 ns · RAM ≈ 100 ns", key: "hw",
          topics: ["CPU", "Caches", "RAM", "NUMA", "Branch prediction", "Memory allocation", "Cache locality"] }
      ],
      rail: { n: "06", name: "Development Tools, Deployment & Projects and DevOps", role: "ship it", key: "ops",
        topics: ["Git", "CMake", "Docker", "CI/CD", "Deployment automation", "AWS / cloud", "HFT systems projects"] }
    }
  };
  var ICONS = {
    book: "M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z M5 19.5A1.5 1.5 0 0 0 6.5 21H19 M9 7h6",
    chip: "M7 7h10v10H7z M9 3v4 M15 3v4 M9 17v4 M15 17v4 M3 9h4 M3 15h4 M17 9h4 M17 15h4"
  };

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  function lanesHTML(steps) {
    var lanes = [];
    steps.forEach(function (s) { if (!lanes.some(function (l) { return l[0] === s.lane; })) lanes.push([s.lane, s.col]); });
    return '<div class="trk-lanes">' + lanes.map(function (l) { return '<span style="--c:var(' + l[1] + ')"><i></i>' + esc(l[0]) + "</span>"; }).join("") + "</div>";
  }
  function gridHTML(steps, icon, mk) {
    return '<div class="trk"><svg class="trk-edges" aria-hidden="true"><defs><marker id="' + mk + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs></svg>' +
      '<div class="trk-grid">' + steps.map(function (s, i) {
        return '<div class="trk-card" data-i="' + i + '" style="--c:var(' + s.col + ');--d:' + (i * 0.1) + 's">' +
          '<div class="trk-top"><span class="trk-n">' + (i < 9 ? "0" : "") + (i + 1) + '</span><span class="trk-lane">' + esc(s.lane) + "</span>" +
          '<svg class="trk-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[icon || "book"] + '"/></svg></div>' +
          '<div class="trk-book">' + esc(s.book) + "</div>" + (s.author ? '<div class="trk-author">' + esc(s.author) + "</div>" : "") +
          '<div class="trk-purpose">' + esc(s.purpose) + "</div></div>";
      }).join("") + "</div></div>";
  }
  function build(root, T, id) {
    var head = '<p class="back-link"><a href="#hft" class="to-hft">← Back to Quant Trading Prep</a></p>' +
      '<h2 class="trk-title">' + esc(T.title) + "</h2>" + '<p class="trk-intro">' + esc(T.intro) + "</p>";
    if (T.type === "maps") {
      root.innerHTML = head + T.maps.map(function (M, k) {
        return '<section class="trk-map"><h3 class="trk-map-title"><span>' + esc(M.title.split(" · ")[0]) + "</span>" + esc(M.title.split(" · ")[1] || "") + "</h3>" +
          '<p class="trk-obj"><b>Objective</b> ' + esc(M.objective) + "</p>" + lanesHTML(M.steps) + gridHTML(M.steps, T.icon, "trk-ar-" + id + "-" + k) + "</section>";
      }).join("");
    } else root.innerHTML = head + lanesHTML(T.steps) + gridHTML(T.steps, T.icon, "trk-ar-" + id);
  }

  // connectors between consecutive cards, following the snake (left→right, then right→left on the next row)
  function draw(box) {
    if (!box || !box.offsetWidth) return;
    var svg = box.querySelector(".trk-edges"), W = box.offsetWidth, H = box.offsetHeight, mk = svg.querySelector("marker").id;
    svg.setAttribute("width", W); svg.setAttribute("height", H); svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.querySelectorAll("path.c").forEach(function (p) { p.remove(); });
    // layout boxes (offset*), so the cards' fade-in transform never skews the connectors
    var grid = box.querySelector(".trk-grid"), gx = grid.offsetLeft, gy = grid.offsetTop;
    var cards = [].map.call(box.querySelectorAll(".trk-card"), function (c) { var l = gx + c.offsetLeft, t = gy + c.offsetTop; return { left: l, top: t, right: l + c.offsetWidth, bottom: t + c.offsetHeight, width: c.offsetWidth, height: c.offsetHeight }; });
    for (var i = 1; i < cards.length; i++) {
      var a = cards[i - 1], c = cards[i], d;
      if (Math.abs(a.top - c.top) < 8) {
        var ltr = c.left > a.left, y = a.top + Math.min(a.height, c.height) / 2;
        d = "M" + (ltr ? a.right : a.left) + " " + y + " L " + (ltr ? c.left - 6 : c.right + 6) + " " + y;
      } else {
        var x = a.left + a.width / 2, y1 = a.bottom, y2 = c.top - 6, cx = c.left + c.width / 2;
        d = Math.abs(x - cx) < 8 ? "M" + x + " " + y1 + " L " + x + " " + y2 : "M" + x + " " + y1 + " C " + x + " " + (y1 + y2) / 2 + ", " + cx + " " + (y1 + y2) / 2 + ", " + cx + " " + y2;
      }
      var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d); p.setAttribute("class", "c"); p.setAttribute("marker-end", "url(#" + mk + ")");
      p.style.animationDelay = (0.3 + i * 0.12) + "s";
      svg.appendChild(p);
    }
  }


  // ---- "stack" tracks: a live latency stack (layers, a packet running tick → trade, a side rail) ----
  function buildStack(root, T, id) {
    var chips = function (arr) { return arr.map(function (t, i) { return '<span class="lls-chip" style="--k:' + i + '">' + esc(t) + "</span>"; }).join(""); };
    root.innerHTML =
      '<p class="back-link"><a href="#hft" class="to-hft">← Back to Quant Trading Prep</a></p>' +
      '<h2 class="trk-title">' + esc(T.title) + "</h2>" +
      '<p class="trk-intro">' + esc(T.intro) + "</p>" +
      '<div class="lls" id="lls-' + id + '">' +
        '<div class="lls-bar"><i></i><i></i><i></i><span class="lls-ttl">latency-stack <b>·</b> tick → trade</span>' +
          '<span class="lls-dir"><b class="lls-dir-t">MKT DATA ↑</b></span><span class="lls-live">t2t <b class="lls-t">0.00</b> µs</span></div>' +
        '<div class="lls-body">' +
          '<div class="lls-stack">' + T.layers.map(function (L) {
            return '<div class="lls-layer" data-key="' + L.key + '" tabindex="0">' +
              '<div class="lls-head"><span class="lls-n">' + L.n + '</span><span class="lls-name">' + esc(L.name) + '</span><span class="lls-role">' + esc(L.role) + "</span></div>" +
              '<div class="lls-scale">' + esc(L.scale) + "</div>" +
              '<div class="lls-chips">' + chips(L.topics) + "</div></div>";
          }).join("") + "</div>" +
          '<div class="lls-lane" aria-hidden="true"><span class="lls-io lls-in">wire in</span><span class="lls-io lls-out">wire out</span><i class="lls-track"></i><i class="lls-pkt"></i></div>' +
          '<div class="lls-rail" data-key="' + T.rail.key + '" tabindex="0"><span class="lls-n">' + T.rail.n + '</span><span class="lls-rail-role">' + esc(T.rail.role) + "</span>" +
            '<span class="lls-rail-name">' + esc(T.rail.name) + '</span><div class="lls-chips">' + chips(T.rail.topics) + "</div></div>" +
        "</div>" +
        '<div class="lls-foot"><span>learn 01 → 06 · the stack reads bottom → top</span><span>latencies are rough orders of magnitude</span></div>' +
      "</div>";
    var box = root.querySelector(".lls"), stackEl = box.querySelector(".lls-stack"), pkt = box.querySelector(".lls-pkt"), lane = box.querySelector(".lls-lane");
    var tEl = box.querySelector(".lls-t"), dirEl = box.querySelector(".lls-dir-t");
    // hover a layer (or the rail): it opens, everything else dims
    box.querySelectorAll(".lls-layer, .lls-rail").forEach(function (el) {
      var on = function () { box.classList.add("focus"); box.querySelectorAll(".lls-layer, .lls-rail").forEach(function (x) { x.classList.toggle("open", x === el); }); };
      var off = function () { box.classList.remove("focus"); el.classList.remove("open"); };
      el.addEventListener("mouseenter", on); el.addEventListener("focus", on); el.addEventListener("mouseleave", off); el.addEventListener("blur", off);
    });
    // the packet: up through the layers as market data, back down as an order (one loop ≈ 5 s)
    var budget = { hw: 0.05, os: 0.35, cpp: 0.6, net: 1.1, arch: 1.4 };   // illustrative µs spent per layer on the way up and down
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, t0 = null;
    function frame(ts) {
      if (!t0) t0 = ts;
      if (!box.offsetParent) { t0 = ts; requestAnimationFrame(frame); return; }   // tab hidden: wait
      var P = 5200, f = ((ts - t0) % P) / P, up = f < 0.5, g = up ? f * 2 : (1 - f) * 2;   // g: 0 = bottom, 1 = top
      var layers = stackEl.querySelectorAll(".lls-layer"), sr = stackEl.getBoundingClientRect(), lr = lane.getBoundingClientRect();
      var y = sr.bottom - g * sr.height;                     // packet height on screen
      pkt.style.transform = "translate(-50%, " + (y - lr.top - 7) + "px)";
      pkt.classList.toggle("down", !up);
      var acc = 0, hit = null;
      [].slice.call(layers).reverse().forEach(function (L) {   // bottom → top
        var r = L.getBoundingClientRect(), b = budget[L.dataset.key] || 0;
        var part = Math.max(0, Math.min(1, (sr.bottom - r.bottom + (r.bottom - y)) / Math.max(1, r.height) - (sr.bottom - r.bottom) / Math.max(1, r.height)));
        if (y <= r.bottom && y >= r.top) hit = L;
        if (y < r.top) acc += b; else if (y <= r.bottom) acc += b * (r.bottom - y) / r.height;
      });
      layers.forEach(function (L) { L.classList.toggle("hit", L === hit); });
      var total = Object.keys(budget).reduce(function (a, k) { return a + budget[k]; }, 0);
      tEl.textContent = (up ? acc : total + (total - acc)).toFixed(2);
      dirEl.textContent = up ? "MKT DATA ↑" : "ORDER ↓";
      dirEl.classList.toggle("down", !up);
      requestAnimationFrame(frame);
    }
    if (!reduce) requestAnimationFrame(frame);
  }

  // ---- "depth" tracks: a market-depth chart. Map 1 = bids (left), Map 2 = asks (right); a book read in both maps is
  // linked across the spread. Mark books as read and the spread narrows; read them all and it closes. ----
  var SHORT = {"harris": "Harris", "lehalle": "Lehalle & Laruelle", "bouchaud": "Bouchaud et al.", "hasbrouck": "Hasbrouck", "ohara": "O'Hara", "foucault": "Foucault, Pagano & Röell", "cartea": "Cartea, Jaimungal & Penalva", "gueant": "Guéant"};
  var SVGNS = "http://www.w3.org/2000/svg";
  function buildDepth(root, T, id) {
    var KEY = "qfp-read-" + id, read = {};
    try { read = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { read = {}; }
    var bids = T.maps[0].steps, asks = T.maps[1].steps, both = {};
    bids.forEach(function (b, i) { asks.forEach(function (a, j) { if (a.key === b.key) both[b.key] = [i + 1, j + 1]; }); });
    var distinct = {}; bids.concat(asks).forEach(function (b) { distinct[b.key] = 1; }); var N = Object.keys(distinct).length;
    root.innerHTML =
      '<p class="back-link"><a href="#hft" class="to-hft">← Back to Quant Trading Prep</a></p>' +
      '<h2 class="trk-title">' + esc(T.title) + "</h2>" +
      '<p class="trk-intro">Two subjects, one order book. Microstructure books are the <b class="dp-g">bids</b>, Market Making books the <b class="dp-r">asks</b>, and the books you read in both are linked across the spread. Click a book to mark it read: the spread narrows, and when you have read them all it closes.</p>' +
      '<div class="dp" id="dp-' + id + '">' +
        '<div class="dp-bar"><i></i><i></i><i></i><span class="dp-ttl">MSMM <b>·</b> depth</span>' +
          '<span class="dp-q dp-qb">BID <b class="dp-bid">0/6</b></span><span class="dp-spr">SPREAD <b class="dp-sv">' + N + '</b> books</span><span class="dp-q dp-qa">ASK <b class="dp-ask">0/5</b></span></div>' +
        '<div class="dp-sides"><div><b>BIDS · Map 1</b> Market Microstructure<span>' + esc(T.maps[0].objective) + '</span></div><div class="dp-r-side"><b>ASKS · Map 2</b> Market Making<span>' + esc(T.maps[1].objective) + "</span></div></div>" +
        '<div class="dp-chart"><svg class="dp-svg" aria-label="Market depth chart of the two reading maps"></svg></div>' +
        '<div class="dp-peek"><span class="dp-pk-k">Hover a step for the book · click to mark it read</span><b>' + N + ' distinct books · 3 read in both maps</b></div>' +
        '<div class="dp-foot"><span>step order = reading order, nearest the mid first</span><button type="button" class="dp-reset">reset</button></div>' +
      "</div>";
    var box = root.querySelector(".dp"), svg = box.querySelector(".dp-svg"), peekEl = box.querySelector(".dp-peek");
    var gapNow = null, raf = null;
    function save() { try { localStorage.setItem(KEY, JSON.stringify(read)); } catch (e) {} }
    function unread() { return Object.keys(distinct).filter(function (k) { return !read[k]; }).length; }
    function el(tag, a, parent) { var e = document.createElementNS(SVGNS, tag); for (var k in a) e.setAttribute(k, a[k]); if (parent) parent.appendChild(e); return e; }

    function render(gapFrac) {
      var W = svg.parentNode.offsetWidth; if (!W) return;
      var narrow = W < 640, H = narrow ? 300 : 380, base = H - 34, pad = 8, top = 64;
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      svg.setAttribute("viewBox", "0 0 " + W + " " + H); svg.setAttribute("width", W); svg.setAttribute("height", H);
      var defs = el("defs", {}, svg);
      [["dpg", "#5fbf87"], ["dpr", "#ef7b70"]].forEach(function (g) {
        var lg = el("linearGradient", { id: g[0] + id, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
        el("stop", { offset: 0, "stop-color": g[1], "stop-opacity": 0.55 }, lg); el("stop", { offset: 1, "stop-color": g[1], "stop-opacity": 0.05 }, lg);
      });
      var glow = el("filter", { id: "dpglow" + id, x: "-50%", y: "-50%", width: "200%", height: "200%" }, defs);
      el("feGaussianBlur", { stdDeviation: 3, result: "b" }, glow); var mg = el("feMerge", {}, glow); el("feMergeNode", { "in": "b" }, mg); el("feMergeNode", { "in": "SourceGraphic" }, mg);
      for (var gy = top; gy <= base; gy += 40) el("line", { x1: 0, x2: W, y1: gy, y2: gy, "class": "dp-grid" }, svg);
      var mid = W / 2, gmax = Math.min(W * 0.17, 150), gmin = 6, g = gmin + (gmax - gmin) * gapFrac;
      var hstep = (base - top - 40) / 6;
      function side(list, dir, color, grad) {
        var span = mid - g - pad, sw = span / list.length, pts = [], steps = [];
        list.forEach(function (b, i) {
          var x0 = mid + dir * (g + i * sw), x1 = mid + dir * (g + (i + 1) * sw), h = base - (i + 1) * hstep - 22;
          steps.push({ b: b, i: i, x0: Math.min(x0, x1), x1: Math.max(x0, x1), y: h });
        });
        var d = "M " + (mid + dir * g) + " " + base;
        steps.forEach(function (s, i) { var xa = dir > 0 ? s.x0 : s.x1, xb = dir > 0 ? s.x1 : s.x0; d += " L " + xa + " " + s.y + " L " + xb + " " + s.y; });
        d += " L " + (mid + dir * (g + span)) + " " + base + " Z";
        el("path", { d: d, fill: "url(#" + grad + id + ")", "class": "dp-area" }, svg);
        var line = "M " + (mid + dir * g) + " " + base; steps.forEach(function (s) { var xa = dir > 0 ? s.x0 : s.x1, xb = dir > 0 ? s.x1 : s.x0; line += " L " + xa + " " + s.y + " L " + xb + " " + s.y; });
        el("path", { d: line, "class": "dp-line", stroke: color }, svg);
        return steps;
      }
      var B = side(bids, -1, "#5fbf87", "dpg"), A = side(asks, 1, "#ef7b70", "dpr");
      // links across the spread for books read in both maps
      Object.keys(both).forEach(function (k) {
        var sb = B[both[k][0] - 1], sa = A[both[k][1] - 1], xb = (sb.x0 + sb.x1) / 2, xa = (sa.x0 + sa.x1) / 2, yb = sb.y - 8, ya = sa.y - 8, cy = Math.min(yb, ya) - 34 - Math.abs(xa - xb) * 0.08;
        el("path", { d: "M " + xb + " " + yb + " C " + xb + " " + cy + ", " + xa + " " + cy + ", " + xa + " " + ya, "class": "dp-link" + (read[k] ? " on" : ""), "data-k": k }, svg);
      });
      // the spread
      el("rect", { x: mid - g, y: top - 20, width: 2 * g, height: base - top + 20, "class": "dp-gap" + (gapFrac < 0.01 ? " closed" : "") }, svg);
      el("line", { x1: mid, x2: mid, y1: top - 26, y2: base, "class": "dp-mid" }, svg);
      var mt = el("text", { x: mid, y: top - 32, "text-anchor": "middle", "class": "dp-midt" }, svg); mt.textContent = gapFrac < 0.01 ? "SPREAD CLOSED" : "MID";
      // steps: hit areas, labels, read state
      function stepEls(steps, sideName, color) {
        steps.forEach(function (s) {
          var k = s.b.key, isBoth = !!both[k], r = !!read[k], w = s.x1 - s.x0;
          var gEl = el("g", { "class": "dp-step" + (r ? " read" : "") + (isBoth ? " both" : ""), "data-k": k, tabindex: 0, style: "--c:" + color }, svg);
          el("rect", { x: s.x0 + 1.5, y: s.y, width: Math.max(1, w - 3), height: base - s.y, "class": "dp-hit" }, gEl);
          el("rect", { x: s.x0 + 1.5, y: s.y - 2, width: Math.max(1, w - 3), height: 4, rx: 2, "class": "dp-cap" }, gEl);
          var cx = (s.x0 + s.x1) / 2;
          var nt = el("text", { x: cx, y: s.y + 20, "text-anchor": "middle", "class": "dp-n" }, gEl); nt.textContent = (r ? "✓ " : "") + (isBoth ? "◆ " : "") + (s.i + 1);
          if (!narrow && w > 54) {
            var words = SHORT[k].split(" "), lines = [], cur = "";
            words.forEach(function (wd) { if ((cur + " " + wd).trim().length > Math.max(8, Math.floor(w / 7.2))) { lines.push(cur.trim()); cur = wd; } else cur += " " + wd; });
            lines.push(cur.trim());
            lines.slice(0, 3).forEach(function (ln, li) { var t = el("text", { x: cx, y: s.y + 38 + li * 14, "text-anchor": "middle", "class": "dp-lbl" }, gEl); t.textContent = ln; });
          }
          gEl.addEventListener("mouseenter", function () { peek(s.b, sideName, s.i + 1); hot(k, true); });
          gEl.addEventListener("mouseleave", function () { hot(k, false); });
          gEl.addEventListener("click", function () { toggle(k); });
          gEl.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); toggle(k); } });
        });
      }
      stepEls(B, "Map 1 · Microstructure", "#5fbf87"); stepEls(A, "Map 2 · Market Making", "#ef7b70");
      var lb = el("text", { x: 10, y: base + 24, "class": "dp-axis" }, svg); lb.textContent = "◀ BIDS · Microstructure";
      var la = el("text", { x: W - 10, y: base + 24, "text-anchor": "end", "class": "dp-axis" }, svg); la.textContent = "Market Making · ASKS ▶";
    }
    function hot(k, on) { box.querySelectorAll('.dp-step[data-k="' + k + '"], .dp-link[data-k="' + k + '"]').forEach(function (e) { e.classList.toggle("hot", on); }); box.classList.toggle("focus", on); }
    function peek(b, sideName, n) {
      var tw = both[b.key];
      peekEl.innerHTML = '<span class="dp-pk-k">' + esc(sideName) + " · step " + n + " · " + esc(b.lane) + (tw ? ' · <em>read in both maps (Map 1 #' + tw[0] + " · Map 2 #" + tw[1] + ")</em>" : "") + "</span>" +
        "<b>" + esc(b.book) + '</b><span class="dp-pk-a">' + esc(b.author) + '</span><span class="dp-pk-t">' + esc(b.purpose) + "</span>" +
        '<span class="dp-pk-s">' + (read[b.key] ? "✓ marked read · click to undo" : "click the step to mark it read") + "</span>";
    }
    function stats() {
      var u = unread(), rb = bids.filter(function (b) { return read[b.key]; }).length, ra = asks.filter(function (b) { return read[b.key]; }).length;
      box.querySelector(".dp-bid").textContent = rb + "/" + bids.length; box.querySelector(".dp-ask").textContent = ra + "/" + asks.length;
      box.querySelector(".dp-sv").textContent = u; box.classList.toggle("closed", u === 0);
      return u / N;
    }
    function animateTo(target) {
      if (raf) cancelAnimationFrame(raf);
      var from = gapNow == null ? target : gapNow, t0 = null;
      function step(ts) { if (!t0) t0 = ts; var f = Math.min(1, (ts - t0) / 600), e = 1 - Math.pow(1 - f, 3); gapNow = from + (target - from) * e; render(gapNow); if (f < 1) raf = requestAnimationFrame(step); }
      raf = requestAnimationFrame(step);
    }
    function toggle(k) { if (read[k]) delete read[k]; else read[k] = 1; save(); animateTo(stats()); }
    box.querySelector(".dp-reset").addEventListener("click", function () { read = {}; save(); animateTo(stats()); });
    var first = true;
    function relayout() { var f = stats(); if (first && box.offsetWidth) { first = false; gapNow = 1; animateTo(f); } else render(gapNow == null ? f : gapNow); }
    if (window.ResizeObserver) new ResizeObserver(relayout).observe(svg.parentNode); else window.addEventListener("resize", relayout);
    document.querySelectorAll('[data-tab="' + id + '"]').forEach(function (b) { b.addEventListener("click", function () { setTimeout(relayout, 40); }); });
  }
  function mount() {
    Object.keys(TRACKS).forEach(function (id) {
      var root = document.getElementById(id + "-root"); if (!root) return;
      if (TRACKS[id].type === "stack") { buildStack(root, TRACKS[id], id); return; }
      if (TRACKS[id].type === "depth") { buildDepth(root, TRACKS[id], id); return; }
      build(root, TRACKS[id], id);
      var redraw = function () { root.querySelectorAll(".trk").forEach(draw); };
      root.querySelectorAll(".trk").forEach(function (box) { if (window.ResizeObserver) new ResizeObserver(function () { draw(box); }).observe(box); });
      if (!window.ResizeObserver) window.addEventListener("resize", redraw);
      document.querySelectorAll('[data-tab="' + id + '"]').forEach(function (b) { b.addEventListener("click", function () { setTimeout(redraw, 40); }); });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
