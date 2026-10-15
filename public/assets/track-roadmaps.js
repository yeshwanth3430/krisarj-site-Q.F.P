// Track roadmaps opened from the Quant Trading Prep board (e.g. C++ & DSA): an ordered reading path, drawn as a snake of cards.
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
    }
  };
  var BOOK = "M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z M5 19.5A1.5 1.5 0 0 0 6.5 21H19 M9 7h6";

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  function build(root, T) {
    var lanes = [];
    T.steps.forEach(function (s) { if (!lanes.some(function (l) { return l[0] === s.lane; })) lanes.push([s.lane, s.col]); });
    root.innerHTML =
      '<p class="back-link"><a href="#hft" class="to-hft">← Back to Quant Trading Prep</a></p>' +
      '<h2 class="trk-title">' + esc(T.title) + "</h2>" +
      '<p class="trk-intro">' + esc(T.intro) + "</p>" +
      '<div class="trk-lanes">' + lanes.map(function (l) { return '<span style="--c:var(' + l[1] + ')"><i></i>' + esc(l[0]) + "</span>"; }).join("") + "</div>" +
      '<div class="trk"><svg class="trk-edges" aria-hidden="true"><defs><marker id="trk-ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs></svg>' +
      '<div class="trk-grid">' + T.steps.map(function (s, i) {
        return '<div class="trk-card" data-i="' + i + '" style="--c:var(' + s.col + ');--d:' + (i * 0.1) + 's">' +
          '<div class="trk-top"><span class="trk-n">' + (i < 9 ? "0" : "") + (i + 1) + '</span><span class="trk-lane">' + esc(s.lane) + "</span>" +
          '<svg class="trk-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="' + BOOK + '"/></svg></div>' +
          '<div class="trk-book">' + esc(s.book) + '</div><div class="trk-author">' + esc(s.author) + "</div>" +
          '<div class="trk-purpose">' + esc(s.purpose) + "</div></div>";
      }).join("") + "</div></div>";
  }

  // connectors between consecutive cards, following the snake (left→right, then right→left on the next row)
  function draw(root) {
    var box = root.querySelector(".trk"); if (!box || !box.offsetWidth) return;
    var svg = box.querySelector(".trk-edges"), b = box.getBoundingClientRect();
    svg.setAttribute("width", b.width); svg.setAttribute("height", b.height); svg.setAttribute("viewBox", "0 0 " + b.width + " " + b.height);
    svg.querySelectorAll("path.c").forEach(function (p) { p.remove(); });
    var cards = box.querySelectorAll(".trk-card");
    for (var i = 1; i < cards.length; i++) {
      var a = cards[i - 1].getBoundingClientRect(), c = cards[i].getBoundingClientRect(), d;
      var sameRow = Math.abs(a.top - c.top) < 8;
      if (sameRow) {
        var ltr = c.left > a.left, y = a.top + a.height / 2 - b.top;
        var x1 = (ltr ? a.right : a.left) - b.left, x2 = (ltr ? c.left - 6 : c.right + 6) - b.left;
        d = "M" + x1 + " " + y + " L " + x2 + " " + y;
      } else {
        var x = a.left + a.width / 2 - b.left, y1 = a.bottom - b.top, y2 = c.top - b.top - 6, cx = c.left + c.width / 2 - b.left;
        d = Math.abs(x - cx) < 8 ? "M" + x + " " + y1 + " L " + x + " " + y2 : "M" + x + " " + y1 + " C " + x + " " + (y1 + y2) / 2 + ", " + cx + " " + (y1 + y2) / 2 + ", " + cx + " " + y2;
      }
      var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d); p.setAttribute("class", "c"); p.setAttribute("marker-end", "url(#trk-ar)");
      p.style.animationDelay = (0.3 + i * 0.12) + "s";
      svg.appendChild(p);
    }
  }

  function mount() {
    Object.keys(TRACKS).forEach(function (id) {
      var root = document.getElementById(id + "-root"); if (!root) return;
      build(root, TRACKS[id]);
      var box = root.querySelector(".trk");
      if (window.ResizeObserver) new ResizeObserver(function () { draw(root); }).observe(box); else window.addEventListener("resize", function () { draw(root); });
      document.querySelectorAll('[data-tab="' + id + '"]').forEach(function (b) { b.addEventListener("click", function () { setTimeout(function () { draw(root); }, 40); }); });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
