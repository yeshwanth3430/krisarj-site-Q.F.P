// Mathematics for Quants — the notebook. Left rail: 13 subjects in learning order.
// Middle: the chosen subject's topics. Canvas: a topic's lessons, each with Notes / Examples / Practice.
(function () {
  "use strict";
  var root = document.getElementById("nb");
  if (!root) return;

  var LA_DIR = "../linear-algebra/";
  function lesson(n, t, f, lab) { return { n: n, t: t, f: f || null, lab: lab || null }; }

  var LA_TOPICS = [
    { n: "01", t: "Vectors & linear equations", covers: "Lines and planes, the row picture vs the column picture, when a system has a solution.",
      lessons: [lesson("L1", "The Geometry of Linear Equations", "01_geometry-of-linear-equations.html", "syslab")] },
    { n: "02", t: "Elimination, A = LU & permutations", covers: "Pivots and row operations, back substitution, the LU factorization, permutation matrices.",
      lessons: [lesson("L2", "Elimination with Matrices", "02_elimination-with-matrices.html", "syslab"),
                lesson("L4", "Factorization into A = LU", "04_factorization-into-a-lu.html", "syslab")] },
    { n: "03", t: "Inverses & transposes", covers: "Matrix multiplication five ways, Gauss–Jordan, inverse rules, Aᵀ and symmetric matrices.",
      lessons: [lesson("L3", "Multiplication and Inverse Matrices", "03_multiplication-and-inverse-matrices.html", "syslab"),
                lesson("L5", "Transposes, Permutations, Vector Spaces", "05_transposes-permutations-vector-spaces.html", "cslab")] },
    { n: "04", t: "Vector spaces, column space & nullspace", covers: "Subspaces, C(A) and N(A), solving Ax = 0 with special solutions, Ax = b with the reduced form R.",
      lessons: [lesson("L6", "Column Space and Nullspace", "06_column-space-and-nullspace.html", "nslab"),
                lesson("L7", "Solving Ax = 0: Pivot Variables, Special Solutions", "07_solving-ax-0-pivot-variables-special-solutions.html", "rreflab"),
                lesson("L8", "Solving Ax = b: Row Reduced Form R", "08_solving-ax-b-row-reduced-form-r.html", "cslab8")] },
    { n: "05", t: "Independence, rank & the four subspaces", covers: "Independence, basis and dimension; rank; the four fundamental subspaces and their sizes.",
      lessons: [lesson("L9", "Independence, Basis and Dimension", "09_independence-basis-and-dimension.html", "basislab"),
                lesson("L10", "The Four Fundamental Subspaces", "10_the-four-fundamental-subspaces.html", "fourlab")] },
    { n: "06", t: "Graphs & networks", covers: "Rank-one matrices, matrix spaces, incidence matrices of graphs, Kirchhoff's laws, small-world networks.",
      lessons: [lesson("L11", "Matrix Spaces; Rank 1; Small World Graphs", "11_matrix-spaces-rank-1-small-world-graphs.html", "r1lab"),
                lesson("L12", "Graphs, Networks, Incidence Matrices", "12_graphs-networks-incidence-matrices.html", "netlab")] },
    { n: "07", t: "Orthogonality & projections", covers: "Orthogonal subspaces, projecting b onto a subspace, p = A(AᵀA)⁻¹Aᵀb and why it matters for regression.",
      lessons: [lesson("L13", "Orthogonal Vectors and Subspaces", "13_orthogonal-vectors-and-subspaces.html", "orthlab"),
                lesson("L14", "Projections onto Subspaces", "14_projections-onto-subspaces.html", "projlab"),
                lesson("L15", "Projection Matrices and Least Squares")] },
    { n: "08", t: "Least squares & Gram–Schmidt", covers: "Fitting lines to data, orthonormal bases, the Gram–Schmidt process and QR.",
      lessons: [lesson("L16", "Orthogonal Matrices and Gram-Schmidt")] },
    { n: "09", t: "Determinants & Cramer's rule", covers: "The three defining properties, cofactor expansion, Cramer's rule, determinant as volume.",
      lessons: [lesson("L17", "Properties of Determinants"),
                lesson("L18", "Determinant Formulas and Cofactors"),
                lesson("L19", "Cramer's Rule, Inverse Matrix and Volume")] },
    { n: "10", t: "Eigenvalues, diagonalization & powers", covers: "Ax = λx, diagonalization S⁻¹AS = Λ, powers of A and difference equations.",
      lessons: [lesson("L20", "Eigenvalues and Eigenvectors"),
                lesson("L21", "Diagonalization and Powers of A")] },
    { n: "11", t: "ODEs, Markov chains & Fourier", covers: "exp(At) for systems of ODEs, Markov matrices and steady states, Fourier series as projection.",
      lessons: [lesson("L22", "Differential Equations and exp(At)"),
                lesson("L23", "Markov Matrices; Fourier Series")] },
    { n: "12", t: "Positive definite matrices & minima", covers: "Symmetric matrices, the energy test xᵀAx > 0, minima, saddle points and covariance matrices.",
      lessons: [lesson("L24", "Symmetric Matrices and Positive Definiteness"),
                lesson("L26", "Positive Definite Matrices and Minima")] },
    { n: "13", t: "Complex matrices, FFT & Jordan form", covers: "Complex vectors and matrices, the Fast Fourier Transform, similar matrices and Jordan form.",
      lessons: [lesson("L25", "Complex Matrices; Fast Fourier Transform (FFT)"),
                lesson("L27", "Similar Matrices and Jordan Form")] },
    { n: "14", t: "SVD & linear transformations", covers: "A = UΣVᵀ — every matrix as rotate–stretch–rotate — and matrices as transformations.",
      lessons: [lesson("L28", "Singular Value Decomposition"),
                lesson("L29", "Linear Transformations and their Matrices")] },
    { n: "15", t: "Change of basis & pseudoinverse", covers: "New coordinates, image compression, left/right inverses and the pseudoinverse A⁺.",
      lessons: [lesson("L30", "Change of Basis; Image Compression"),
                lesson("L31", "Left and Right Inverses; Pseudoinverse")] }
  ];

  var SUBJECTS = [
    { id: "la",  n: "01", name: "Linear Algebra", tag: "Portfolios as vectors, hedges as equations", c: "--def-b",
      course: "MIT OCW 18.06SC", classic: LA_DIR + "index.html", topics: LA_TOPICS },
    { id: "svc", n: "02", name: "Single Variable Calculus", tag: "How a price changes", c: "--ex-b", course: "MIT OCW 18.01SC" },
    { id: "mvc", n: "03", name: "Multivariable Calculus", tag: "Many inputs at once", c: "--ex-b", course: "MIT OCW 18.02SC" },
    { id: "prob", n: "04", name: "Probability", tag: "Uncertainty and expected payoffs", c: "--thm-b", course: "MIT OCW 6.041SC · Harvard Stat 110" },
    { id: "ode", n: "05", name: "Differential Equations", tag: "Change over time", c: "--int-b", course: "MIT OCW 18.03SC" },
    { id: "ra",  n: "06", name: "Real Analysis", tag: "Calculus, proved properly", c: "--mth-b", course: "MIT 18.100B" },
    { id: "opt", n: "07", name: "Optimization", tag: "Finding the best choice", c: "--warn-b", course: "Optimization Bootcamp" },
    { id: "stat", n: "08", name: "Statistics", tag: "Learning from data", c: "--thm-b", course: "MIT OCW 18.650" },
    { id: "ca",  n: "09", name: "Complex Analysis", tag: "Calculus with complex numbers", c: "--mth-b", course: "MIT OCW 18.04" },
    { id: "tsa", n: "10", name: "Time-Series Analysis", tag: "Data that unfolds over time", c: "--fin-b", course: "MIT 14.384" },
    { id: "dsp", n: "11", name: "Discrete Stochastic Processes", tag: "Randomness step by step", c: "--thm-b", course: "MIT OCW 6.262" },
    { id: "sc",  n: "12", name: "Stochastic Calculus", tag: "Calculus for random paths", c: "--int-b", course: "MIT 18.642" },
    { id: "mff", n: "13", name: "Maths for Finance", tag: "Where it all comes together", c: "--fin-b", course: "MIT OCW 18.642 Fall 2024" }
  ];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function byId(id) { for (var i = 0; i < SUBJECTS.length; i++) if (SUBJECTS[i].id === id) return SUBJECTS[i]; return SUBJECTS[0]; }
  function liveCount(s) {
    var live = 0, all = 0;
    (s.topics || []).forEach(function (t) { t.lessons.forEach(function (l) { all++; if (l.f) live++; }); });
    return { live: live, all: all };
  }

  // ---------- render ----------
  function railHTML(cur) {
    return '<aside class="nb-rail" aria-label="Subjects"><div class="nb-rail-h">SUBJECTS <span>in learning order</span></div>' +
      SUBJECTS.map(function (s) {
        var open = !!s.topics;
        return '<button class="nb-sub' + (s.id === cur ? " on" : "") + (open ? "" : " soon") + '" style="--c:var(' + s.c + ')" data-sub="' + s.id + '"' + (open ? "" : ' title="This notebook opens when the subject starts"') + '>' +
          '<i></i><span class="nb-sub-n">' + s.n + '</span><span class="nb-sub-t">' + esc(s.name) + (open ? "" : '<small>soon</small>') + '</span></button>';
      }).join("") + "</aside>";
  }
  function pagesHTML(s, curTopic) {
    if (!s.topics) return "";
    var k = liveCount(s);
    return '<nav class="nb-pages" aria-label="Topics"><div class="nb-pages-h">' + esc(s.name).toUpperCase() +
      '<span>' + s.topics.length + " topics · " + k.all + " lessons · " + k.live + " live</span></div>" +
      s.topics.map(function (t) {
        var live = t.lessons.filter(function (l) { return l.f; }).length;
        return '<button class="nb-pg' + (t.n === curTopic ? " on" : "") + (live ? "" : " soon") + '" data-topic="' + t.n + '">' +
          '<span class="nb-pg-n">' + t.n + '</span><span class="nb-pg-t">' + esc(t.t) + '</span>' +
          '<span class="nb-pg-k">' + (live ? live + "/" + t.lessons.length + " live" : "soon") + "</span></button>";
      }).join("") + "</nav>";
  }
  function chip(label, href, ico) {
    return href ? '<a class="nb-chip" href="' + href + '">' + ico + " " + label + "</a>"
                : '<span class="nb-chip off">' + ico + " " + label + "</span>";
  }
  function lessonCard(l) {
    var base = l.f ? LA_DIR + l.f : null;
    return '<div class="nb-lesson' + (l.f ? "" : " soon") + '">' +
      '<div class="nb-les-head"><span class="nb-les-n">' + l.n + '</span><span class="nb-les-t">' + esc(l.t) + "</span>" +
      (l.f ? '<span class="nb-les-live">LIVE</span>' : '<span class="nb-les-soon">coming soon</span>') + "</div>" +
      '<div class="nb-chips">' +
      chip("Notes", base, "📓") +
      chip("Examples", base ? base + "#examples" : null, "🧪") +
      chip("Practice", base && l.lab ? base + "#" + l.lab : null, "🏋️") +
      "</div></div>";
  }
  function canvasHTML(s, curTopic) {
    if (!s.topics) {
      return '<section class="nb-canvas"><div class="nb-paper nb-empty">' +
        '<p class="nb-kicker">SUBJECT ' + s.n + "</p><h2>" + esc(s.name) + "</h2><p class='nb-tag'>" + esc(s.tag) + ".</p>" +
        '<p class="nb-soonline">This notebook opens when the subject starts. It will follow <b>' + esc(s.course) + "</b>, in the same Notes → Examples → Practice rhythm as Linear Algebra.</p></div></section>";
    }
    var k = liveCount(s);
    if (!curTopic) {
      return '<section class="nb-canvas"><div class="nb-paper">' +
        '<p class="nb-kicker">SUBJECT ' + s.n + " · " + esc(s.course) + "</p><h2>" + esc(s.name) + "</h2>" +
        '<p class="nb-tag">' + esc(s.tag) + ". Every lesson has three moves: read the <b>Notes</b>, walk the <b>Examples</b>, then <b>Practice</b> in the lab until it sticks.</p>" +
        '<div class="nb-progress"><i style="width:' + Math.round(100 * k.live / k.all) + '%"></i></div>' +
        '<p class="nb-progress-k">' + k.live + " of " + k.all + " lessons live</p>" +
        '<div class="nb-topic-grid">' +
        s.topics.map(function (t) {
          var live = t.lessons.filter(function (l) { return l.f; }).length;
          return '<button class="nb-topic-card' + (live ? "" : " soon") + '" data-topic="' + t.n + '">' +
            '<span class="nb-tc-n">' + t.n + '</span><span class="nb-tc-t">' + esc(t.t) + '</span>' +
            '<span class="nb-tc-c">' + esc(t.covers) + '</span>' +
            '<span class="nb-tc-k">' + (live ? live + "/" + t.lessons.length + " lessons live →" : t.lessons.length + " lessons · soon") + "</span></button>";
        }).join("") + "</div>" +
        '<p class="nb-classic"><a href="' + s.classic + '">Prefer the classic list view? Open it ↗</a></p>' +
        "</div></section>";
    }
    var t = null;
    s.topics.forEach(function (x) { if (x.n === curTopic) t = x; });
    if (!t) return canvasHTML(s, null);
    return '<section class="nb-canvas"><div class="nb-paper">' +
      '<p class="nb-kicker"><button class="nb-up" data-topic="">' + esc(s.name) + "</button> · TOPIC " + t.n + "</p>" +
      "<h2>" + esc(t.t) + '</h2><p class="nb-tag">' + esc(t.covers) + "</p>" +
      '<div class="nb-lessons">' + t.lessons.map(lessonCard).join("") + "</div>" +
      '<p class="nb-hint">📓 <b>Notes</b> teach it from zero · 🧪 <b>Examples</b> work the hedging and lots stories · 🏋️ <b>Practice</b> is the interactive lab inside Examples.</p>' +
      "</div></section>";
  }

  var cur = { sub: "la", topic: "" };
  function parseHash() {
    var m = (location.hash || "").replace(/^#/, "").split("/");
    var s = byId(m[0] || "la");
    cur.sub = s.id;
    cur.topic = (s.topics && m[1] && m[1].replace(/^t/, "")) || "";
    if (cur.topic && !s.topics.some(function (t) { return t.n === cur.topic; })) cur.topic = "";
  }
  function setHash() {
    var h = "#" + cur.sub + (cur.topic ? "/t" + cur.topic : "");
    if (location.hash !== h) history.replaceState(null, "", h);
  }
  function render() {
    var s = byId(cur.sub);
    root.innerHTML = railHTML(cur.sub) + pagesHTML(s, cur.topic) + canvasHTML(s, cur.topic);
    root.querySelectorAll("[data-sub]").forEach(function (b) {
      b.addEventListener("click", function () { cur.sub = b.dataset.sub; cur.topic = ""; setHash(); render(); });
    });
    root.querySelectorAll("[data-topic]").forEach(function (b) {
      b.addEventListener("click", function () { cur.topic = b.dataset.topic; setHash(); render(); window.scrollTo({ top: 0 }); });
    });
  }
  window.addEventListener("hashchange", function () { parseHash(); render(); });
  parseHash(); render();
})();
