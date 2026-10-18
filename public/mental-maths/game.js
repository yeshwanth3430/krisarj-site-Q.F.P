// Mental Engine — the game engine. Screens: home ladder → briefing (learn + try one) → timed drill → result.
// Plus the final boss ("The Open"), an endless mode ("Open Outcry") and a stats board. Progress in localStorage.
(function () {
  "use strict";
  var D = window.MM_DATA, root = document.getElementById("mm");
  if (!D || !root) return;
  var KEY = "qfp-mm-v1";
  var S = { stars: {}, best: {}, bossHi: 0, endlessHi: 0, sound: true, runs: 0 };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  // ---------- tiny sound kit ----------
  var AC = null;
  function beep(f, dur, type, g) {
    if (!S.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var o = AC.createOscillator(), v = AC.createGain();
      o.type = type || "sine"; o.frequency.value = f;
      v.gain.value = g || 0.04; v.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + (dur || 0.08));
      o.connect(v); v.connect(AC.destination); o.start(); o.stop(AC.currentTime + (dur || 0.08));
    } catch (e) {}
  }
  var sOK = function () { beep(880, 0.07); }, sBad = function () { beep(170, 0.16, "square", 0.05); };
  var sStar = function (i) { beep([660, 880, 1100][i] || 660, 0.18); };

  // ---------- helpers ----------
  function totalStars() { var t = 0; for (var k in S.stars) t += S.stars[k]; return t; }
  function rank() { var t = totalStars(), r = D.RANKS[0]; D.RANKS.forEach(function (x) { if (t >= x[0]) r = x; }); return r; }
  function nextRank() { var t = totalStars(); for (var i = 0; i < D.RANKS.length; i++) if (D.RANKS[i][0] > t) return D.RANKS[i]; return null; }
  function unlocked(n) {
    if (n === 1) return true;
    if (n === 12) { for (var i = 1; i <= 11; i++) if (!(S.stars[i] >= 1)) return false; return true; }
    return S.stars[n - 1] >= 1;
  }
  function endlessUnlocked() { return S.stars[1] >= 1 && S.stars[2] >= 1 && S.stars[3] >= 1; }
  function starStr(n) { var h = ""; for (var i = 1; i <= 3; i++) h += '<span class="' + (n >= i ? "" : "off") + '">★</span>'; return h; }
  function fmtT(s) { return Math.floor(s / 60) + ":" + ("0" + Math.floor(s % 60)).slice(-2); }
  function bar(extraRight) {
    return '<div class="mm-bar"><i></i><i></i><i></i><span class="mm-ttl">MENTAL-ENGINE <b>·</b> speed maths bootcamp</span>' +
      '<span class="mm-bar-r">' + (extraRight || "") +
      '<span class="mm-pill">★ <b>' + totalStars() + '</b>/36</span>' +
      '<button class="mm-ico-btn" data-act="sound">' + (S.sound ? "♪ on" : "♪ off") + "</button></span></div>";
  }
  function bind() {
    root.querySelectorAll("[data-act]").forEach(function (el) {
      el.addEventListener("click", function () { ACT[el.dataset.act] && ACT[el.dataset.act](el.dataset.arg); });
    });
  }

  // ---------- HOME ----------
  function home() {
    var r = rank(), nr = nextRank(), t = totalStars();
    var h = bar('<button class="mm-ico-btn" data-act="stats">stats</button>') + '<div class="mm-wrap">';
    h += '<div class="mm-rank"><div class="mm-rank-badge">' + (t >= 36 ? "Σ" : "⚡") + "</div><div>" +
      '<div class="mm-rank-name">' + r[1] + "</div>" +
      '<div class="mm-rank-sub">' + (nr ? nr[0] - t + " ★ to " + nr[1] : "maximum rank — the engine is you") + "</div></div>" +
      '<div class="mm-rank-bar"><i style="width:' + Math.round(100 * t / 36) + '%"></i></div>' +
      '<div class="mm-rank-stars">' + t + " / 36 ★</div></div>";
    var phase = 0;
    D.LEVELS.forEach(function (L) {
      if (L.phase !== phase) { phase = L.phase; var P = D.PHASES[phase]; h += '<div class="mm-phase" style="--ac:var(' + P.c + ')">' + P.name + "</div><div class='mm-ladder'>"; }
      var open = unlocked(L.n), st = S.stars[L.n] || 0, best = S.best[L.n];
      h += '<button class="mm-rung' + (open ? "" : " lock") + (L.boss ? " mm-boss-rung" : "") + '" style="--ac:var(' + D.PHASES[L.phase].c + ')" data-act="' + (open ? "brief" : "locked") + '" data-arg="' + L.n + '">' +
        '<span class="mm-rung-n">' + (L.boss ? "BOSS" : ("0" + L.n).slice(-2)) + "</span><span><span class='mm-rung-t'>" + L.title + "</span><br><span class='mm-rung-s'>" + L.sub + "</span></span>" +
        '<span class="mm-rung-right">' + (open
          ? (L.boss ? '<span class="mm-stars">' + starStr(st) + '</span><span class="mm-best">' + (S.bossHi ? "HI " + S.bossHi : "90s gauntlet") + "</span>"
                    : '<span class="mm-stars">' + starStr(st) + "</span>" + (best ? '<span class="mm-best">best ' + best.acc + "% · " + fmtT(best.t) + "</span>" : '<span class="mm-best">not attempted</span>'))
          : '<span class="mm-lock-ico">LOCKED · ★ level ' + (L.n === 12 ? "1–11" : L.n - 1) + "</span>") + "</span></button>";
      if (L.n === 3 || L.n === 6 || L.n === 9 || L.n === 12) h += "</div>";
    });
    h += '<div class="mm-home-foot">' +
      (endlessUnlocked() ? '<button class="mm-btn alt" data-act="endless">⚡ OPEN OUTCRY · endless mode' + (S.endlessHi ? " · HI " + S.endlessHi : "") + "</button>"
                         : '<span class="mm-pill">endless mode unlocks at ★ on levels 1–3</span>') +
      '<button class="mm-btn alt" data-act="stats">📊 my stats</button></div>';
    h += "</div>";
    root.innerHTML = h; bind();
  }

  // ---------- BRIEFING ----------
  function briefing(n) {
    var L = D.LEVELS[n - 1], P = D.PHASES[L.phase], B = L.brief;
    var h = bar('<button class="mm-ico-btn" data-act="home">← levels</button>') + '<div class="mm-wrap" style="--ac:var(' + P.c + ')">';
    h += '<div class="mm-head"><span class="mm-kicker">' + P.name + " · Level " + ("0" + L.n).slice(-2) + ' · Lecture “' + L.lecture + '”</span></div>' +
      '<div class="mm-h1">' + L.title + '</div><p class="mm-sub">' + B.intro + "</p>";
    h += '<div class="mm-brief">';
    B.cards.forEach(function (c) { h += '<div class="mm-card"><div class="mm-card-k">' + c.k + "</div><p>" + c.body + "</p></div>"; });
    h += '<div class="mm-card"><div class="mm-card-k">Worked examples</div>';
    B.examples.forEach(function (ex) {
      h += '<div class="mm-ex"><span class="mm-ex-q">' + esc(ex.q) + "</span>" +
        ex.steps.map(function (s) { return '<span class="mm-ex-step">' + esc(s) + "</span>"; }).join("") +
        '<span class="mm-ex-a">= ' + esc(ex.a) + "</span></div>";
    });
    h += "</div>";
    h += '<div class="mm-tip">💡 ' + B.tip + "</div>";
    if (!L.boss) h += '<div class="mm-card"><div class="mm-card-k">Try one — no clock</div><div class="mm-try" id="mm-try"></div></div>';
    h += "</div>";
    h += '<div class="mm-brief-foot"><button class="mm-btn' + (L.boss ? " gold" : "") + '" data-act="drill" data-arg="' + n + '">' + (L.boss ? "🔔 RING THE BELL" : "▶ START DRILL") + " · " + (L.boss ? "90s" : L.count + " questions · " + fmtT(L.time)) + "</button>" +
      '<a class="mm-watch" href="https://www.youtube.com/watch?v=' + D.VIDEOS[n] + "&list=" + D.playlist.split("list=")[1] + '" target="_blank" rel="noopener">▶ Watch Lecture ' + ("0" + n).slice(-2) + " ↗</a>" +
      '<span class="mm-pill">gold time ' + (L.boss ? "3,500 pts" : fmtT(L.gold)) + "</span></div>";
    h += "</div>";
    root.innerHTML = h; bind();
    if (!L.boss) tryOne(n);
  }
  var tryTok = 0;   // invalidates pending try-one refresh timers when the briefing changes
  function tryOne(n) {
    var box = document.getElementById("mm-try"); if (!box) return;
    var tok = ++tryTok;
    var q = D.gen[n]();
    var qh = '<div class="mm-try-q">' + esc(q.t === "flash" ? "FLASH — memorize:" : q.q) + (q.note ? ' <span class="mm-q-note">' + esc(q.note) + "</span>" : "") + "</div>";
    if (q.t === "choice") {
      box.innerHTML = qh + '<div class="mm-choices">' + q.choices.map(function (c) { return '<button class="mm-choice" data-v="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + "</div><div class='mm-reveal'></div>";
      var picked = false;
      box.querySelectorAll(".mm-choice").forEach(function (b) {
        b.addEventListener("click", function () {
          if (picked) return; picked = true;
          var ok = b.dataset.v === String(q.a);
          box.querySelector(".mm-reveal").innerHTML = ok ? "<b>✓ correct</b>" : "✗ it’s <b>" + esc(q.a) + "</b>";
          (ok ? sOK : sBad)(); setTimeout(function () { if (tok === tryTok) tryOne(n); }, 1200);
        });
      });
    } else {
      var isFlash = q.t === "flash";
      box.innerHTML = qh + (isFlash ? '<div class="mm-flash">' + q.show.split("").join(" ") + "</div>" : "") +
        '<input class="mm-input" inputmode="numeric" autocomplete="off" ' + (isFlash ? "style='display:none'" : "") + '><div class="mm-reveal"></div>';
      var inp = box.querySelector(".mm-input");
      if (isFlash) setTimeout(function () { if (tok !== tryTok) return; var fl = box.querySelector(".mm-flash"); if (!fl) return; fl.style.display = "none"; inp.value = ""; inp.style.display = ""; inp.focus(); }, q.ms);
      var done = false;
      function judge(submit) {
        if (done) return;
        var v = inp.value.replace(/[^\d]/g, "");
        var ok = q.t === "est" ? (v !== "" && Math.abs(+v - q.a) <= q.tol * q.a) : v === q.a;
        if (q.t === "est" && !submit) return;
        if (ok || (q.t !== "est" && v.length >= String(q.a).length) || submit) {
          done = true;
          box.querySelector(".mm-reveal").innerHTML = ok ? "<b>✓ correct</b>" : "✗ answer: <b>" + (q.t === "est" ? "≈ " + Math.round(q.a).toLocaleString("en-IN") : esc(q.a)) + "</b>";
          (ok ? sOK : sBad)(); setTimeout(function () { if (tok === tryTok) tryOne(n); }, 1400);
        }
      }
      inp.addEventListener("input", function () { inp.value = inp.value.replace(/[^\d]/g, ""); judge(false); });
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") judge(true); });
      if (q.t === "est") box.insertAdjacentHTML("beforeend", '<button class="mm-btn alt" style="padding:9px 16px" id="mm-try-lock">lock in</button>');
      var lk = document.getElementById("mm-try-lock"); if (lk) lk.addEventListener("click", function () { judge(true); });
    }
  }

  // ---------- DRILL (levels, boss, endless share this) ----------
  var run = null, raf = 0;
  function startRun(mode, n) {
    var L = n ? D.LEVELS[n - 1] : null;
    run = { mode: mode, n: n, i: 0, ok: 0, wrong: 0, streak: 0, bestStreak: 0, score: 0, lives: mode === "level" ? Infinity : 3,
      count: mode === "level" ? L.count : Infinity, time: mode === "endless" ? Infinity : (L ? L.time : 90),
      t0: performance.now(), deadline: mode === "endless" ? Infinity : performance.now() + (L ? L.time : 90) * 1000,
      times: [], q: null, lvl: n || 0, done: false };
    nextQ(); paintDrill(); tick();
  }
  function poolPick() {
    var maxL = run.mode === "endless" ? (run.ok < 5 ? 4 : run.ok < 12 ? 7 : 11) : 11;
    var p = D.POOL.filter(function (x) { return x.l <= maxL; });
    var e = p[Math.floor(Math.random() * p.length)];
    return { q: D.gen[e.l](), pts: e.pts, lvl: e.l };
  }
  function nextQ() {
    if (run.mode === "level") { run.q = D.gen[run.n](); run.pts = 100; }
    else { var pk = poolPick(); run.q = pk.q; run.pts = pk.pts; run.lvl = pk.lvl; }
    run.qStart = performance.now(); run.flashDone = false; run.settled = false;
  }
  function mult() { return 1 + Math.min(2, Math.floor(run.streak / 3)); }
  function paintDrill() {
    var L = run.n ? D.LEVELS[run.n - 1] : null, P = D.PHASES[L ? L.phase : 4];
    var head = run.mode === "level"
      ? '<span class="mm-qcount">Q <b>' + (run.i + 1) + "</b>/" + run.count + "</span>"
      : '<span class="mm-lives">' + "♥".repeat(Math.max(0, run.lives)) + '</span><span class="mm-score">' + run.score + " pts</span>" + (run.mode === "boss" ? "" : '<span class="mm-qcount">solved <b>' + run.ok + "</b></span>");
    var h = bar('<button class="mm-ico-btn" data-act="quit">✕ quit</button>') + '<div class="mm-wrap" style="--ac:var(' + (P ? P.c : "--p4") + ')"><div class="mm-drill">' +
      '<div class="mm-drill-top">' + head + '<span class="mm-streak" id="mm-streak">×1</span>' + (run.mode !== "endless" ? '<span class="mm-clock" id="mm-clock"></span>' : "") + "</div>" +
      (run.mode !== "endless" ? '<div class="mm-timer" id="mm-timer"><i></i></div>' : "") +
      '<div class="mm-stage" id="mm-stage"></div></div></div>';
    root.innerHTML = h; bind(); paintQ();
  }
  function paintQ() {
    var q = run.q, st = document.getElementById("mm-stage");
    var tag = run.mode !== "level" ? '<span class="mm-q-note">L' + ("0" + run.lvl).slice(-2) + " · " + run.pts + " pts × " + mult() + "</span>" : (q.note ? '<span class="mm-q-note">' + esc(q.note) + "</span>" : "");
    var sk = '<button class="mm-skip" id="mm-skip">skip (counts as a miss) →</button>';
    if (q.t === "choice") {
      st.innerHTML = '<div class="mm-q">' + esc(q.q) + tag + '</div><div class="mm-choices">' +
        q.choices.map(function (c) { return '<button class="mm-choice" data-v="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + '</div><div class="mm-reveal" id="mm-rev"></div>' + sk;
      st.querySelectorAll(".mm-choice").forEach(function (b) { b.addEventListener("click", function () { settle(b.dataset.v === String(q.a), q); }); });
    } else if (q.t === "flash") {
      st.innerHTML = '<div class="mm-q">MEMORIZE' + tag + '</div><div class="mm-flash" id="mm-flash">' + q.show.split("").join(" ") + '</div>' +
        '<input class="mm-input" id="mm-inp" inputmode="numeric" autocomplete="off" style="display:none"><div class="mm-reveal" id="mm-rev"></div>' + pad() + sk;
      var flashRun = run;
      setTimeout(function () {
        if (!run || run !== flashRun || run.done || run.q !== q) return;
        var fl = document.getElementById("mm-flash"); if (fl) fl.style.display = "none";
        var inp = document.getElementById("mm-inp"); if (!inp) return;
        inp.value = ""; inp.style.display = ""; inp.focus(); run.flashDone = true;   // clear anything typed while digits were visible
      }, q.ms);
      wireInput(q);
    } else {
      st.innerHTML = '<div class="mm-q">' + esc(q.q) + tag + '</div>' +
        '<input class="mm-input" id="mm-inp" inputmode="numeric" autocomplete="off">' +
        (q.t === "est" ? '<button class="mm-btn alt" style="padding:9px 16px" id="mm-lock">lock in ⏎</button>' : "") +
        '<div class="mm-reveal" id="mm-rev"></div>' + pad() + sk;
      wireInput(q);
      var inp = document.getElementById("mm-inp"); if (inp && window.innerWidth >= 700) inp.focus();
    }
    var skb = document.getElementById("mm-skip"); if (skb) skb.addEventListener("click", function () { settle(false, q, true); });
  }
  function pad() {
    return '<div class="mm-pad">' + [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (d) { return '<button class="mm-key" data-k="' + d + '">' + d + "</button>"; }).join("") +
      '<button class="mm-key" data-k="0">0</button><button class="mm-key wide" data-k="back">⌫</button></div>';
  }
  function wireInput(q) {
    var inp = document.getElementById("mm-inp"), settled = false;
    function judge(submit) {
      if (settled || !run || run.done || run.q !== q) return;
      if (q.t === "flash" && !run.flashDone) { inp.value = ""; return; }   // no answering while the digits are still on screen
      var v = inp.value.replace(/[^\d]/g, ""); inp.value = v;
      if (q.t === "est") { if (submit && v !== "") { settled = true; settle(Math.abs(+v - q.a) <= q.tol * q.a, q); } return; }
      if (v === String(q.a)) { settled = true; settle(true, q); }
      else if (v.length >= String(q.a).length && v !== "") { settled = true; settle(false, q); }
    }
    inp.addEventListener("input", function () { judge(false); });
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") judge(true); });
    var lk = document.getElementById("mm-lock"); if (lk) lk.addEventListener("click", function () { judge(true); });
    root.querySelectorAll(".mm-key").forEach(function (k) {
      k.addEventListener("click", function () {
        if (k.dataset.k === "back") inp.value = inp.value.slice(0, -1); else inp.value += k.dataset.k;
        judge(false);
      });
    });
  }
  function settle(ok, q, skipped) {
    if (!run || run.done || run.q !== q || run.settled) return;   // one settle per question (blocks double-clicks on choices/skip)
    run.settled = true;
    var st = document.getElementById("mm-stage"), rev = document.getElementById("mm-rev");
    run.times.push((performance.now() - run.qStart) / 1000);
    if (ok) {
      run.ok++; run.streak++; run.bestStreak = Math.max(run.bestStreak, run.streak);
      if (run.mode !== "level") run.score += run.pts * mult();
      st.classList.add("ok"); sOK();
    } else {
      run.wrong++; run.streak = 0; run.lives--;
      st.classList.add("bad"); sBad();
      if (rev) rev.innerHTML = (skipped ? "skipped — " : "") + "answer: <b>" + (q.t === "est" ? "≈ " + Math.round(q.a).toLocaleString("en-IN") : esc(q.a)) + "</b>";
    }
    var sEl = document.getElementById("mm-streak");
    if (sEl) { sEl.textContent = "×" + mult() + (run.streak ? " · " + run.streak + "🔥" : ""); sEl.className = "mm-streak pop s" + Math.min(3, Math.floor(run.streak / 3) + (run.streak ? 1 : 0)); setTimeout(function () { sEl.classList.remove("pop"); }, 160); }
    run.i++;
    var over = (run.mode === "level" && run.i >= run.count) || (run.mode !== "level" && run.lives <= 0);
    var myRun = run;
    setTimeout(function () {
      if (!run || run !== myRun || run.done) return;
      if (over) return finish();
      nextQ();
      if (run.mode === "level") { var qc = root.querySelector(".mm-qcount"); if (qc) qc.innerHTML = "Q <b>" + (run.i + 1) + "</b>/" + run.count; }
      else { var sc = root.querySelector(".mm-score"); if (sc) sc.textContent = run.score + " pts"; var lv = root.querySelector(".mm-lives"); if (lv) lv.textContent = "♥".repeat(Math.max(0, run.lives)); var oc = root.querySelector(".mm-qcount b"); if (oc) oc.textContent = run.ok; }
      st.classList.remove("ok", "bad"); paintQ();
    }, ok ? 260 : (run.mode === "level" ? 1250 : 950));
  }
  function tick() {
    cancelAnimationFrame(raf);
    if (!run || run.done || run.deadline === Infinity) return;
    var left = Math.max(0, run.deadline - performance.now()), frac = left / (run.time * 1000);
    var bar2 = document.getElementById("mm-timer"), clk = document.getElementById("mm-clock");
    if (bar2) { bar2.querySelector("i").style.transform = "scaleX(" + frac + ")"; bar2.classList.toggle("hurry", frac < 0.22); }
    if (clk) { clk.textContent = fmtT(left / 1000); clk.classList.toggle("hurry", frac < 0.22); }
    if (left <= 0) return finish(true);
    raf = requestAnimationFrame(tick);
  }
  function finish(timeout) {
    if (!run || run.done) return; run.done = true; cancelAnimationFrame(raf);
    S.runs++;
    if (run.mode === "level") {
      var L = D.LEVELS[run.n - 1];
      var unanswered = run.count - run.i; run.wrong += unanswered;      // ran out of clock
      var acc = Math.round(100 * run.ok / run.count), t = Math.min(run.time, (performance.now() - run.t0) / 1000);
      var stars = 0;
      if (run.ok / run.count >= 0.55) stars = 1;
      if (run.ok / run.count >= 0.75) stars = 2;
      if (run.ok / run.count >= 0.9 && t <= L.gold && !timeout) stars = 3;
      var prev = S.stars[run.n] || 0, isNew = stars > prev;
      if (isNew) S.stars[run.n] = stars;
      var pb = S.best[run.n];
      if (!pb || acc > pb.acc || (acc === pb.acc && t < pb.t)) S.best[run.n] = { acc: acc, t: Math.round(t) };
      save();
      result({ kind: "level", n: run.n, stars: stars, isNew: isNew, acc: acc, t: t, avg: avgT(), best: run.bestStreak, timeout: timeout });
    } else if (run.mode === "boss") {
      var st3 = run.score >= 3500 ? 3 : run.score >= 2200 ? 2 : run.score >= 1200 ? 1 : 0;
      var prevB = S.stars[12] || 0; var isNewB = st3 > prevB; if (isNewB) S.stars[12] = st3;
      var hiNew = run.score > S.bossHi; if (hiNew) S.bossHi = run.score;
      save();
      result({ kind: "boss", stars: st3, isNew: isNewB, score: run.score, solved: run.ok, avg: avgT(), best: run.bestStreak, hiNew: hiNew });
    } else {
      var hiNew2 = run.score > S.endlessHi; if (hiNew2) S.endlessHi = run.score;
      save();
      result({ kind: "endless", score: run.score, solved: run.ok, avg: avgT(), best: run.bestStreak, hiNew: hiNew2 });
    }
  }
  function avgT() { return run.times.length ? (run.times.reduce(function (a, b) { return a + b; }, 0) / run.times.length).toFixed(1) : "–"; }

  // ---------- RESULT ----------
  function result(r) {
    var head, sub;
    if (r.kind === "level") { var L = D.LEVELS[r.n - 1]; head = r.stars === 3 ? "GOLD. " + L.title + " mastered." : r.stars === 2 ? "Solid — one push from gold." : r.stars === 1 ? "Cleared. Now make it fast." : (r.timeout ? "The clock won this round." : "Not yet — re-read the briefing."); sub = L.title; }
    else if (r.kind === "boss") { head = r.stars === 3 ? "HUMAN MATCHING ENGINE." : r.stars === 2 ? "The desk goes quiet when you type." : r.stars === 1 ? "You survived the open." : "The open ate you alive. Again."; sub = "THE OPEN · final boss"; }
    else { head = r.score > 0 ? "Session closed." : "Flat day."; sub = "OPEN OUTCRY · endless"; }
    var cells = [];
    if (r.kind === "level") cells = [["" + r.acc + "%", "accuracy"], [fmtT(r.t), "time"], [r.avg + "s", "avg / answer"], ["" + r.best, "best streak"]];
    else cells = [[(r.score || 0).toLocaleString("en-IN"), "score"], ["" + r.solved, "solved"], [r.avg + "s", "avg / answer"], ["" + r.best, "best streak"]];
    var h = bar() + '<div class="mm-wrap"><div class="mm-result">' +
      '<div class="mm-kicker">' + sub + "</div>" +
      (r.kind !== "endless" ? '<div class="mm-res-stars">' + [1, 2, 3].map(function (i) { return '<span class="' + (r.stars >= i ? "on" : "") + '">★</span>'; }).join("") + "</div>" : "") +
      '<div class="mm-res-h">' + head + "</div>" +
      (r.isNew ? '<div class="mm-res-new">NEW BEST — progress saved</div>' : (r.hiNew ? '<div class="mm-res-new">NEW HIGH SCORE</div>' : "")) +
      '<div class="mm-res-grid">' + cells.map(function (c) { return '<div class="mm-res-cell"><b>' + c[0] + "</b><span>" + c[1] + "</span></div>"; }).join("") + "</div>" +
      '<div class="mm-brief-foot" style="justify-content:center">' +
      (r.kind === "level" ? '<button class="mm-btn" data-act="drill" data-arg="' + r.n + '">↻ RETRY</button>' +
        (r.n < 12 && unlocked(r.n + 1) ? '<button class="mm-btn gold" data-act="brief" data-arg="' + (r.n + 1) + '">NEXT LEVEL →</button>' : "") +
        '<button class="mm-btn alt" data-act="brief" data-arg="' + r.n + '">briefing</button>'
        : '<button class="mm-btn" data-act="' + (r.kind === "boss" ? "drill" : "endless") + '" data-arg="12">↻ AGAIN</button>') +
      '<button class="mm-btn alt" data-act="home">levels</button></div></div></div>';
    root.innerHTML = h; bind();
    if (r.kind !== "endless") [0, 1, 2].forEach(function (i) { if (r.stars > i) setTimeout(function () { sStar(i); }, 200 + i * 180); });
  }

  // ---------- STATS ----------
  function stats() {
    var rows = D.LEVELS.map(function (L) {
      var st = S.stars[L.n] || 0, b = S.best[L.n];
      return "<tr><td class='num'>" + ("0" + L.n).slice(-2) + "</td><td>" + L.title + "</td><td class='num'>" + (L.boss ? (S.bossHi || "–") + " pts" : (b ? b.acc + "%" : "–")) + "</td><td class='num'>" + (L.boss ? "" : (b ? fmtT(b.t) : "–")) + "</td><td class='num' style='color:var(--gold)'>" + "★".repeat(st) + "</td></tr>";
    }).join("");
    root.innerHTML = bar('<button class="mm-ico-btn" data-act="home">← levels</button>') + '<div class="mm-wrap">' +
      '<div class="mm-h1">Your tape</div><p class="mm-sub">Rank: <b>' + rank()[1] + "</b> · " + totalStars() + "/36 ★ · endless high " + (S.endlessHi || "–") + " · " + (S.runs || 0) + " drills run</p>" +
      '<div class="mm-card" style="margin-top:12px"><table class="mm-table"><tr><th>#</th><th>level</th><th>best acc</th><th>best time</th><th>stars</th></tr>' + rows + "</table></div>" +
      '<div class="mm-brief-foot"><button class="mm-btn alt" data-act="reset">reset all progress</button><button class="mm-btn" data-act="home">← back</button></div></div>';
    bind();
  }

  // ---------- actions ----------
  var ACT = {
    home: function () { run = null; cancelAnimationFrame(raf); home(); },
    brief: function (n) { briefing(+n); },
    locked: function () { sBad(); },
    drill: function (n) { n = +n; startRun(n === 12 ? "boss" : "level", n); },
    endless: function () { startRun("endless", null); },
    quit: function () { if (run && !run.done) { run.done = true; } ACT.home(); },
    stats: function () { stats(); },
    sound: function () { S.sound = !S.sound; save(); var b = root.querySelector('[data-act="sound"]'); if (b) b.textContent = S.sound ? "♪ on" : "♪ off"; if (S.sound) sOK(); },
    reset: function () { if (confirm("Reset all Mental Engine progress on this device?")) { S = { stars: {}, best: {}, bossHi: 0, endlessHi: 0, sound: S.sound, runs: 0 }; save(); home(); } }
  };

  // debug/test hook (read-only views of live state)
  try { Object.defineProperty(window, "__MM", { value: { get run() { return run; }, get S() { return S; } } }); } catch (e) {}
  home();
})();
