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

  function build(root, T, id) {
    var lanes = [];
    T.steps.forEach(function (s) { if (!lanes.some(function (l) { return l[0] === s.lane; })) lanes.push([s.lane, s.col]); });
    root.innerHTML =
      '<p class="back-link"><a href="#hft" class="to-hft">← Back to Quant Trading Prep</a></p>' +
      '<h2 class="trk-title">' + esc(T.title) + "</h2>" +
      '<p class="trk-intro">' + esc(T.intro) + "</p>" +
      '<div class="trk-lanes">' + lanes.map(function (l) { return '<span style="--c:var(' + l[1] + ')"><i></i>' + esc(l[0]) + "</span>"; }).join("") + "</div>" +
      '<div class="trk"><svg class="trk-edges" aria-hidden="true"><defs><marker id="trk-ar-' + id + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs></svg>' +
      '<div class="trk-grid">' + T.steps.map(function (s, i) {
        return '<div class="trk-card" data-i="' + i + '" style="--c:var(' + s.col + ');--d:' + (i * 0.1) + 's">' +
          '<div class="trk-top"><span class="trk-n">' + (i < 9 ? "0" : "") + (i + 1) + '</span><span class="trk-lane">' + esc(s.lane) + "</span>" +
          '<svg class="trk-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[T.icon || "book"] + '"/></svg></div>' +
          '<div class="trk-book">' + esc(s.book) + "</div>" + (s.author ? '<div class="trk-author">' + esc(s.author) + "</div>" : "") +
          '<div class="trk-purpose">' + esc(s.purpose) + "</div></div>";
      }).join("") + "</div></div>";
  }

  // connectors between consecutive cards, following the snake (left→right, then right→left on the next row)
  function draw(root) {
    var box = root.querySelector(".trk"); if (!box || !box.offsetWidth) return;
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
  function mount() {
    Object.keys(TRACKS).forEach(function (id) {
      var root = document.getElementById(id + "-root"); if (!root) return;
      if (TRACKS[id].type === "stack") { buildStack(root, TRACKS[id], id); return; }
      build(root, TRACKS[id], id);
      var box = root.querySelector(".trk");
      if (window.ResizeObserver) new ResizeObserver(function () { draw(root); }).observe(box); else window.addEventListener("resize", function () { draw(root); });
      document.querySelectorAll('[data-tab="' + id + '"]').forEach(function (b) { b.addEventListener("click", function () { setTimeout(function () { draw(root); }, 40); }); });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
