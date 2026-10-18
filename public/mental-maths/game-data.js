// Mental Engine — level data + question generators.
// One level per lecture of "Secrets of Mental Math" (Arthur T. Benjamin). Each level teaches the
// technique in a briefing (with worked examples), then drills it against the clock.
// Question shapes: {t:'num', q, a}  typed exact · {t:'est', q, a, tol}  typed within tolerance
//                  {t:'choice', q, choices, a}  buttons · {t:'flash', show, a, ms}  memorize then type.
(function () {
  "use strict";
  var ri = function (lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); };   // inclusive
  var pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
  var shuffle = function (arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var weighted = function (types) { // [[weight, fn], ...]
    var sum = types.reduce(function (s, t) { return s + t[0]; }, 0), r = Math.random() * sum;
    for (var i = 0; i < types.length; i++) { r -= types[i][0]; if (r <= 0) return types[i][1]; }
    return types[types.length - 1][1];
  };
  var num = function (q, a, note) { return { t: "num", q: q, a: String(a), note: note }; };
  var droot = function (n) { return 1 + ((n - 1) % 9); };
  var WD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // ---------- generators, one per level ----------
  var gen = {};

  // L1 · complements
  gen[1] = function () {
    return weighted([[1, function () { var x = ri(11, 99); return num("100 − " + x, 100 - x); }],
                     [1, function () { var x = ri(101, 999); return num("1000 − " + x, 1000 - x); }]])();
  };

  // L2 · left-to-right addition & subtraction
  gen[2] = function () {
    return weighted([
      [1, function () { var a = ri(23, 98), b = ri(23, 98); return num(a + " + " + b, a + b); }],
      [1, function () { var a = ri(123, 879), b = ri(112, 998 - 112); return num(a + " + " + b, a + b); }],
      [1, function () { var a = ri(41, 99), b = ri(12, a - 9); return num(a + " − " + b, a - b); }],
      [1, function () { var a = ri(321, 998), b = ri(112, a - 65); return num(a + " − " + b, a - b); }]
    ])();
  };

  // L3 · first multiplication: 1-digit ×, ×11, squares ending in 5
  gen[3] = function () {
    return weighted([
      [35, function () { var d = ri(3, 9), n = ri(21, 99); return num(d + " × " + n, d * n); }],
      [25, function () { var n = ri(23, 98); return num(n + " × 11", n * 11); }],
      [20, function () { var t = ri(2, 9), n = t * 10 + 5; return num(n + "²", n * n); }],
      [20, function () { var d = ri(3, 9), n = ri(112, 399); return num(d + " × " + n, d * n); }]
    ])();
  };

  // L4 · division: exact quotients, divisibility rules, sevenths & eighths as decimals
  gen[4] = function () {
    return weighted([
      [40, function () { var d = pick([3, 4, 6, 7, 8, 9]), q = ri(13, 99), N = d * q; return num(N + " ÷ " + d, q); }],
      [35, function () {
        var k = pick([3, 4, 6, 9, 11]), N = ri(100, 9800);
        if (Math.random() < 0.5) N = k * Math.max(10, Math.round(N / k));            // make it divisible
        var yes = N % k === 0;
        return { t: "choice", q: "Is " + N.toLocaleString("en-IN") + " divisible by " + k + "?", choices: ["YES", "NO"], a: yes ? "YES" : "NO" };
      }],
      [25, function () {
        if (Math.random() < 0.55) {
          var x = ri(1, 6), cyc = { 1: "0.142857…", 2: "0.285714…", 3: "0.428571…", 4: "0.571428…", 5: "0.714285…", 6: "0.857142…" };
          var opts = shuffle(Object.keys(cyc)).slice(0, 4); if (opts.indexOf(String(x)) < 0) opts[0] = String(x);
          return { t: "choice", q: x + "/7 as a decimal?", choices: shuffle(opts).map(function (k2) { return cyc[k2]; }), a: cyc[x] };
        }
        var e = pick([1, 3, 5, 7]), dec = { 1: "0.125", 3: "0.375", 5: "0.625", 7: "0.875" };
        return { t: "choice", q: e + "/8 as a decimal?", choices: shuffle(["0.125", "0.375", "0.625", "0.875"]), a: dec[e] };
      }]
    ])();
  };

  // L5 · guesstimation: ±5% estimates, Rule of 72, mental percentages
  gen[5] = function () {
    return weighted([
      [30, function () { var a = ri(212, 989), b = ri(21, 98); return { t: "est", q: a + " × " + b, a: a * b, tol: 0.05, note: "estimate · within ±5%" }; }],
      [20, function () { var r = pick([2, 3, 4, 6, 8, 9, 12]); return num("Money doubles at " + r + "%/yr in ≈ ? years", 72 / r, "Rule of 72"); }],
      [30, function () {
        var p = pick([5, 10, 15, 20, 25, 30, 40, 50, 75]), base = pick([20, 40, 60, 80, 120, 160, 200, 240, 300, 360, 400, 480]);
        var v = p * base / 100; if (v !== Math.round(v)) { base = 400; v = p * 4; }
        return num(p + "% of " + base, v);
      }],
      [20, function () { var N = ri(1100, 9900); if (Math.round(Math.sqrt(N)) ** 2 === N) N += 7; return { t: "est", q: "√" + N.toLocaleString("en-IN") + " ≈ ?", a: Math.sqrt(N), tol: 0.05, note: "estimate · within ±5%" }; }]
    ])();
  };

  // L6 · digital roots and casting out nines
  gen[6] = function () {
    return weighted([
      [40, function () { var N = ri(1023, 9876); return num("Digital root of " + N.toLocaleString("en-IN"), droot(N)); }],
      [35, function () {
        var a = ri(214, 987), b = ri(214, 987), c = a + b, ok = Math.random() < 0.5;
        if (!ok) { var d = pick([1, 2, 3, 4, 5, 6, 7, 8]); c += pick([-1, 1]) * d; }       // off by a non-multiple of 9 → check fails
        var pass = droot(droot(a) + droot(b)) === droot(c);
        return { t: "choice", q: a + " + " + b + " = " + c + " — does the mod-9 check pass?", choices: ["PASS", "FAIL"], a: pass ? "PASS" : "FAIL" };
      }],
      [25, function () {
        var a = ri(23, 98), b = ri(23, 98), c = a * b, ok = Math.random() < 0.5;
        if (!ok) { var d2 = pick([1, 2, 3, 4, 5, 6, 7, 8]); c += pick([-1, 1]) * d2; }
        var pass = droot(droot(a) * droot(b)) === droot(c);
        return { t: "choice", q: a + " × " + b + " = " + c.toLocaleString("en-IN") + " — does the mod-9 check pass?", choices: ["PASS", "FAIL"], a: pass ? "PASS" : "FAIL" };
      }]
    ])();
  };

  // L7 · intermediate multiplication: any 2-digit square, close-together tricks
  gen[7] = function () {
    return weighted([
      [35, function () { var n = ri(21, 99); while (n % 10 === 0) n = ri(21, 99); return num(n + "²", n * n); }],
      [25, function () { var t = ri(2, 9), u = pick([1, 2, 3, 4, 6, 7, 8, 9]), a = t * 10 + u, b = t * 10 + (10 - u); return num(a + " × " + b, a * b, "same tens, units sum to 10"); }],
      [20, function () { var a = ri(91, 99), b = ri(91, 99); return num(a + " × " + b, a * b, "both near 100"); }],
      [20, function () { var k = ri(2, 9), a = pick([k * 10 + 8, k * 10 + 9]), b = ri(13, 48); return num(a + " × " + b, a * b, "round up, subtract"); }]
    ])();
  };

  // L8 · fast division: by 9, by 11, by divisors ending in 9
  gen[8] = function () {
    return weighted([
      [40, function () { var q = ri(24, 119), N = 9 * q; return num(N.toLocaleString("en-IN") + " ÷ 9", q); }],
      [25, function () { var q = ri(23, 98), N = 11 * q; return num(N.toLocaleString("en-IN") + " ÷ 11", q); }],
      [35, function () { var d = pick([19, 29, 39, 49]), q = ri(12, 39), N = d * q; return num(N.toLocaleString("en-IN") + " ÷ " + d, q); }]
    ])();
  };

  // L9 · the phonetic (Major) code + flash memory
  var MAJOR = { 0: "S / Z", 1: "T / D", 2: "N", 3: "M", 4: "R", 5: "L", 6: "J / SH / CH", 7: "K / hard G", 8: "F / V", 9: "P / B" };
  var WORDS = [["TuNa", 12], ["NeT", 21], ["DiMe", 13], ["MaT", 31], ["NeMo", 23], ["MooN", 32], ["NaiL", 25], ["LioN", 52],
               ["RaiL", 45], ["LuRe", 54], ["RoCK", 47], ["CaR", 74], ["LaVa", 58], ["FiLe", 85], ["CaP", 79], ["BiKe", 97],
               ["BuS", 90], ["MuMMy", 33], ["RoSe", 40], ["TiRe", 14], ["RaT", 41], ["BeaR", 94], ["RoPe", 49], ["TRaiN", 142]];
  gen[9] = function () {
    return weighted([
      [30, function () {
        var d = ri(0, 9), wrong = shuffle(Object.keys(MAJOR).filter(function (k) { return +k !== d; })).slice(0, 3);
        return { t: "choice", q: "In the phonetic code, the digit " + d + " is the sound…", choices: shuffle([MAJOR[d]].concat(wrong.map(function (k) { return MAJOR[k]; }))), a: MAJOR[d] };
      }],
      [40, function () { var w = pick(WORDS); return num("Decode “" + w[0] + "” (consonant sounds → digits)", w[1], "vowels don’t count"); }],
      [30, function () { var len = ri(6, 8), s = String(ri(1, 9)); while (s.length < len) s += ri(0, 9); return { t: "flash", show: s, a: s, ms: 3500, q: "Memorize it…" }; }]
    ])();
  };

  // L10 · calendar: day of the week for any date (answers checked with the real calendar)
  gen[10] = function () {
    var y = Math.random() < 0.7 ? ri(1950, 2030) : ri(1900, 2099);
    var m = ri(0, 11), dmax = [31, (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];
    var d = ri(1, dmax), wd = new Date(Date.UTC(y, m, d)).getUTCDay();
    return { t: "choice", q: MON[m] + " " + d + ", " + y, choices: WD, a: WD[wd], wide: true };
  };

  // L11 · advanced multiplication: 3-digit squares, 2-digit cubes, hard 2×2
  gen[11] = function () {
    return weighted([
      [40, function () { var k = ri(1, 9), d = ri(1, 12), n = k === 1 ? 100 + d : (k * 100 + pick([-1, 1]) * d); return num(n + "²", n * n); }],
      [30, function () { var n = ri(11, 35); while (n % 10 === 0) n = ri(11, 35); return num(n + "³", n * n * n); }],
      [30, function () { var a = ri(23, 97), b = ri(23, 97); while (a % 10 === 0) a = ri(23, 97); while (b % 10 === 0) b = ri(23, 97); return num(a + " × " + b, a * b); }]
    ])();
  };

  // boss / endless pools: which levels feed the mixed stream, with base points
  var POOL = [{ l: 1, pts: 60 }, { l: 2, pts: 80 }, { l: 3, pts: 100 }, { l: 4, pts: 100 }, { l: 5, pts: 110 },
              { l: 6, pts: 90 }, { l: 7, pts: 150 }, { l: 8, pts: 150 }, { l: 9, pts: 110 }, { l: 10, pts: 160 }, { l: 11, pts: 200 }];

  // ---------- level definitions ----------
  var V = { 1: "UNtxj_2Z8yk", 2: "IYSgdIrDCxw", 3: "Py24Pl--Nyk", 4: "EKv3o9Tz74c", 5: "s3ZCUnoxHn0", 6: "NKixvJ0gVMM",
            7: "0n080BsR4wk", 8: "_T7H57mWsYw", 9: "eOoR1Pghrus", 10: "DSUYA8UNFvg", 11: "vV2gy6nsztQ", 12: "E2aFWywltAo" };

  var LEVELS = [
    { n: 1, phase: 1, title: "Math in Your Head!", sub: "Complements: the distance to the next round number", lecture: "Math in Your Head!",
      count: 10, time: 60, gold: 35,
      brief: {
        intro: "Mental maths runs <b>left to right</b> — the way you read — and leans constantly on <b>complements</b>: how far a number is from the next round number. Master these 10 questions’ worth of reflexes and every later level gets easier.",
        cards: [
          { k: "The complement", body: "The complement of a 2-digit number is its distance to 100. Shortcut: first digits sum to <b>9</b>, last digits sum to <b>10</b>. So for 87: 8+1=9, 7+3=10 → complement <b>13</b>. For 3-digit numbers (distance to 1000): all pairs sum to 9, the last pair to 10. 777 → <b>223</b>." },
          { k: "Why it matters", body: "Complements turn subtraction into addition, power the add-back subtraction (Level 2) and the near-100 trick (Level 7) later, and are exactly how traders think in ticks: “how far from the round level?”" }
        ],
        examples: [
          { q: "100 − 44", steps: ["4 + ? = 9 → 5", "4 + ? = 10 → 6"], a: "56" },
          { q: "1000 − 348", steps: ["3+6 = 9, 4+5 = 9, 8+2 = 10"], a: "652" }
        ],
        tip: "If the number ends in 0 (like 240), take the complement of 24 → 76, then append the 0: 1000 − 240 = 760."
      } },
    { n: 2, phase: 1, title: "Add & Subtract, Left to Right", sub: "Big chunks first, then the details", lecture: "Mental Addition and Subtraction",
      count: 12, time: 100, gold: 60,
      brief: {
        intro: "School makes you add right to left. In your head, go <b>left to right</b>: deal with the big money first, refine as you go — you can even say the answer while still computing it.",
        cards: [
          { k: "Addition", body: "Add the tens (or hundreds), then the rest. <b>38 + 26</b>: 38 + 20 = 58, then + 6 = <b>64</b>. Three digits: <b>314 + 259</b>: +200 → 514, +50 → 564, +9 → <b>573</b>." },
          { k: "Subtraction without borrowing", body: "If subtracting would force borrowing, <b>overshoot to a round number and add back</b>. <b>835 − 467</b>: take away 500 → 335, you took 33 too much (467 = 500 − 33), add it back → <b>368</b>. That add-back is Level 1’s complement." }
        ],
        examples: [
          { q: "52 + 39", steps: ["52 + 30 = 82", "82 + 9 = 91"], a: "91" },
          { q: "121 − 57", steps: ["121 − 60 = 61", "61 + 3 = 64"], a: "64" },
          { q: "835 − 467", steps: ["835 − 500 = 335", "335 + 33 = 368"], a: "368" }
        ],
        tip: "Subtract too much, then give a little back — adding is always easier than borrowing."
      } },
    { n: 3, phase: 1, title: "Go Forth and Multiply", sub: "1-digit ×, the ×11 trick, squares ending in 5", lecture: "Go Forth and Multiply",
      count: 12, time: 110, gold: 70,
      brief: {
        intro: "Multiplication left to right, plus the two most famous party tricks in mental maths — both of which you’ll now own.",
        cards: [
          { k: "One digit × anything", body: "Biggest part first. <b>7 × 48</b>: 7 × 40 = 280, 7 × 8 = 56 → <b>336</b>. <b>4 × 327</b>: 4 × 300 = 1200, 4 × 27 = 108 → <b>1308</b>." },
          { k: "× 11", body: "To multiply a 2-digit number by 11, <b>spread the digits and put their sum in the middle</b>. 53 × 11 → 5 _ 3 with 5+3=8 in the gap → <b>583</b>. If the sum carries: 68 × 11 → 6 (14) 8 → carry the 1 → <b>748</b>." },
          { k: "Squares ending in 5", body: "For n5², take the tens digit t: answer is <b>t × (t+1)</b> followed by <b>25</b>. 65² → 6 × 7 = 42 → <b>4225</b>." }
        ],
        examples: [
          { q: "53 × 11", steps: ["5 … (5+3) … 3"], a: "583" },
          { q: "68 × 11", steps: ["6 (14) 8 → carry the 1"], a: "748" },
          { q: "65²", steps: ["6 × 7 = 42, then append 25"], a: "4225" },
          { q: "9 × 47", steps: ["10 × 47 = 470, minus 47"], a: "423" }
        ],
        tip: "When a factor is 9, round it to 10 and subtract once: 9 × 47 = 470 − 47 = 423. When it’s 8, subtract twice: 8 × 47 = 470 − 94 = 376."
      } },
    { n: 4, phase: 2, title: "Divide and Conquer", sub: "Exact division, divisibility radar, sevenths by heart", lecture: "Divide and Conquer",
      count: 12, time: 110, gold: 70,
      brief: {
        intro: "Division is multiplication in reverse — ask “what times the divisor gets me there?”, biggest digit first. And a divisibility radar tells you instantly whether a division will be clean.",
        cards: [
          { k: "Left-to-right division", body: "<b>168 ÷ 7</b>: 7 into 16 goes 2 (that’s 20), leaving 28; 7 into 28 goes 4 → <b>24</b>." },
          { k: "Divisibility radar", body: "By <b>3</b> or <b>9</b>: digit sum divisible by 3 or 9. By <b>4</b>: last two digits divisible by 4. By <b>6</b>: even and digit-sum divisible by 3. By <b>11</b>: alternating sum (right to left: + − + −) divisible by 11 — e.g. 913 → 9 − 1 + 3 = 11 → yes." },
          { k: "Sevenths — memorize one loop", body: "All sevenths cycle through <b>142857</b>. 1/7 = 0.<b>1</b>42857…, 2/7 = 0.<b>2</b>85714…, 3/7 = 0.<b>4</b>28571…, 4/7 = 0.<b>5</b>71428…, 5/7 = 0.<b>7</b>14285…, 6/7 = 0.<b>8</b>57142…. Same six digits, different starting point. Eighths: 1/8 = .125, 3/8 = .375, 5/8 = .625, 7/8 = .875." }
        ],
        examples: [
          { q: "336 ÷ 8", steps: ["8 into 33 → 4 (that’s 40), remainder 16", "8 into 16 → 2"], a: "42" },
          { q: "Is 8,241 divisible by 3?", steps: ["8+2+4+1 = 15 → divisible by 3"], a: "YES" },
          { q: "3/7 as a decimal", steps: ["the 142857 loop, starting at 4"], a: "0.428571…" }
        ],
        tip: "The sevenths loop in order: 142857 — the starting digits for 1/7…6/7 are 1, 2, 4, 5, 7, 8."
      } },
    { n: 5, phase: 2, title: "The Art of Guesstimation", sub: "±5% answers, the Rule of 72, instant percentages", lecture: "The Art of Guesstimation",
      count: 10, time: 120, gold: 75,
      brief: {
        intro: "Most real-world maths doesn’t need the exact answer — it needs a <b>fast answer with known error</b>. This is the most quant level of all: sizing, sanity checks and compounding in your head.",
        cards: [
          { k: "Estimate products", body: "Round one factor up and the other down. <b>412 × 39</b> ≈ 400 × 40 = <b>16,000</b> (true: 16,068 — inside 1%). Your answer counts if it lands within ±5%." },
          { k: "Square roots: divide & average", body: "<b>√2000</b>: guess 40 → 2000 ÷ 40 = 50 → average 40 and 50 → <b>45</b> (true ≈ 44.7). One round of divide-and-average is almost always inside 5%." },
          { k: "Rule of 72", body: "Money at r% a year doubles in about <b>72 ÷ r</b> years. At 6% → 12 years; at 9% → 8 years. This is compounding’s speed limit, in one line." },
          { k: "Percentages", body: "<b>15% of 80</b>: 10% is 8, half of that is 4 → <b>12</b>. Build any % from 10%, 5%, 1%." }
        ],
        examples: [
          { q: "Estimate 412 × 39", steps: ["≈ 400 × 40"], a: "16,000 ✓ (±5%)" },
          { q: "√2000 ≈ ?", steps: ["guess 40 → 2000/40 = 50 → average"], a: "45" },
          { q: "Money doubles at 8%/yr in…", steps: ["72 ÷ 8"], a: "9 years" }
        ],
        tip: "Round the two factors in opposite directions and the errors fight each other."
      } },
    { n: 6, phase: 2, title: "The Checksum", sub: "Digital roots and casting out nines", lecture: "Mental Math and Paper",
      count: 12, time: 100, gold: 60,
      brief: {
        intro: "Every number has a one-digit shadow — its <b>digital root</b>. Arithmetic done right casts the same shadow, so you can audit a calculation in seconds. This is how you check work without redoing it.",
        cards: [
          { k: "Digital root", body: "Add the digits until one digit remains. <b>4872</b> → 4+8+7+2 = 21 → <b>3</b>. Shortcut: throw away 9s and digit-pairs that sum to 9 (“casting out nines”)." },
          { k: "The mod-9 check", body: "If A + B = C is right, then droot(A) + droot(B) must have the same digital root as C. Same for ×: droot(A) × droot(B) ~ droot(C). <b>314 + 592 = 906</b>: 8 + 7 = 15 → 6, and 906 → 15 → 6 → <b>PASS</b>." },
          { k: "What a PASS means", body: "A FAIL proves the answer is wrong. A PASS means “consistent” — it catches almost every slip, but it can’t prove correctness (an error of exactly 9 slides through). That’s why it’s a checksum, not a proof." }
        ],
        examples: [
          { q: "Digital root of 4,872", steps: ["4+8+7+2 = 21 → 2+1"], a: "3" },
          { q: "436 + 245 = 691 — check?", steps: ["droots: 4 + 2 = 6", "691 → 16 → 7 ≠ 6"], a: "FAIL (it’s 681)" }
        ],
        tip: "Cast out nines as you scan: in 4872, drop the 8+… no — drop 7+2, keep 4+8 → 12 → 3. Pairs that make 9 vanish."
      } },
    { n: 7, phase: 3, title: "Intermediate Multiplication", sub: "Square ANY 2-digit number; close-together tricks", lecture: "Intermediate Multiplication",
      count: 10, time: 150, gold: 95,
      brief: {
        intro: "One beautiful identity powers this whole level: <b>A² = (A+d)(A−d) + d²</b>. Slide to the nearest round number, multiply the easy pair, add the little square back.",
        cards: [
          { k: "Any 2-digit square", body: "<b>23²</b>: slide 3 to reach 20 ↔ 26: 20 × 26 = 520, add 3² → <b>529</b>. <b>67²</b>: slide 3: 70 × 64 = 4480, add 9 → <b>4489</b>. The slide distance is always to the nearest ten." },
          { k: "Same tens, units summing to 10", body: "<b>43 × 47</b>: tens digit t = 4 → t × (t+1) = 20, units 3 × 7 = 21 → <b>2021</b>. (Why: it’s (45−2)(45+2) = 45² − 4.) The units product always takes <b>two digits</b>: 21 × 29 → 2 × 3 = 6, units 1 × 9 = <b>09</b> → 609." },
          { k: "Both near 100", body: "<b>97 × 96</b>: shortfalls are 3 and 4. Left part: 97 − 4 (or 96 − 3) = 93. Right part: 3 × 4 = 12 → <b>9312</b>. The right part always takes <b>two digits</b>: 91 × 99 → left 90, right 1 × 9 = <b>09</b> → 9009." },
          { k: "Ends in 8 or 9? Round and subtract", body: "<b>89 × 23</b> = 90 × 23 − 23 = 2070 − 23 = <b>2047</b>." }
        ],
        examples: [
          { q: "23²", steps: ["20 × 26 = 520", "+ 3² = 9"], a: "529" },
          { q: "84 × 86", steps: ["8 × 9 = 72", "4 × 6 = 24"], a: "7224" },
          { q: "97 × 96", steps: ["97 − 4 = 93", "3 × 4 = 12"], a: "9312" }
        ],
        tip: "For squares, the question is only ever “how far to the nearest ten?” — d is at most 5, so d² is at most 25."
      } },
    { n: 8, phase: 3, title: "The Speed of Vedic Division", sub: "÷9 by running sums; divisors ending in 9", lecture: "The Speed of Vedic Division",
      count: 10, time: 150, gold: 95,
      brief: {
        intro: "Division has its own tricks. Dividing by 9 becomes writing <b>running sums</b>, and any divisor ending in 9 surrenders to a one-step fixed-point trick.",
        cards: [
          { k: "÷ 9: running sums", body: "<b>1233 ÷ 9</b>: quotient digits are running sums of all digits but the last: 1, 1+2=3, 3+3=6 → 136. Then the digit sum settles the remainder: 1+2+3+3 = 9, and <b>every full 9 in it adds +1</b> → <b>137</b>. Two repairs you’ll meet constantly: if a running sum spills past 9, carry the 1 into the digit before it (<b>288 ÷ 9</b>: sums 2, 10 → 30; digit sum 18 = two 9s → +2 → <b>32</b>); and a digit sum of 18 or 27 adds +2 or +3, not +1 (<b>396 ÷ 9</b>: sums 3, 12 → 42; +2 → <b>44</b>). (In this drill every division is exact.)" },
          { k: "Divisors ending in 9", body: "To divide by 19, note 19 = 20 − 1, so N = 19q means <b>q = (N + q) ÷ 20</b>: add your own guess to N, divide by the round number. <b>475 ÷ 19</b>: guess 475/20 ≈ 24 → (475+24)/20 ≈ 24.95 → try 25 → (475+25)/20 = 25 exactly → <b>25</b>. Same for 29 (use 30), 39 (40), 49 (50)." },
          { k: "÷ 11", body: "Estimate with ÷10, then shave: 2871 ÷ 11 — ÷10 says ≈ 287, shave ~10% → try 261: 261 × 11 = 2871 ✓ (check with the ×11 trick from Level 3!)." }
        ],
        examples: [
          { q: "1233 ÷ 9", steps: ["running sums: 1, 3, 6", "digit sum 9 → carry 1"], a: "137" },
          { q: "475 ÷ 19", steps: ["(475 + 24) ÷ 20 ≈ 25", "(475 + 25) ÷ 20 = 25 ✓"], a: "25" },
          { q: "1044 ÷ 29", steps: ["(1044 + 35) ÷ 30 ≈ 36", "(1044 + 36) ÷ 30 = 36 ✓"], a: "36" }
        ],
        tip: "Dividing by 19/29/39/49: your first guess is just N ÷ (next ten) — the fixed point is one nudge away."
      } },
    { n: 9, phase: 3, title: "Memorizing Numbers", sub: "The phonetic code: digits you can say", lecture: "Memorizing Numbers",
      count: 12, time: 130, gold: 85,
      brief: {
        intro: "Numbers are hard to hold; words are easy. The <b>phonetic (Major) code</b> maps every digit to a consonant <i>sound</i> — vowels are free — so any number becomes a word, and any word becomes a number.",
        cards: [
          { k: "The code", body: "<b>0</b> = S/Z · <b>1</b> = T/D · <b>2</b> = N · <b>3</b> = M · <b>4</b> = R · <b>5</b> = L · <b>6</b> = J/SH/CH · <b>7</b> = K/hard G · <b>8</b> = F/V · <b>9</b> = P/B. Memory pegs: 1 has one downstroke (t), 2 has two (n), 3 has three (m), 4 ends “fouR”, 5 is L (Roman 50), 7 looks like a K’s arm, 8 ~ f in script, 9 mirrors P." },
          { k: "Decoding words", body: "Go by <b>sound</b>, not spelling: vowels and w/h/y are free, double letters are one sound. <b>MooN</b> → M, N → <b>32</b>. <b>RoCK</b> → R, K → <b>47</b>. <b>MuMMy</b> → M, M → <b>33</b>." },
          { k: "Why it works", body: "This is how mental-math performers hold 5-digit intermediate results: turn the chunk into a word, park it, keep computing. π’s opening 3.1415 can live in a single silly sentence." }
        ],
        examples: [
          { q: "Decode “CaR”", steps: ["C = K-sound = 7, R = 4"], a: "74" },
          { q: "Decode “TuNa”", steps: ["T = 1, N = 2 (vowels free)"], a: "12" },
          { q: "FLASH 4 7 1 9 2 6", steps: ["chunk it: 47-19-26 or make it words"], a: "471926" }
        ],
        tip: "In the flash rounds, chunk digits into pairs and give each pair a sound — six digits is just three syllables."
      } },
    { n: 10, phase: 4, title: "Calendar Calculating", sub: "The weekday of any date, 1900–2099", lecture: "Calendar Calculating",
      count: 10, time: 180, gold: 110,
      brief: {
        intro: "The crowd-stopper: hear a date, answer the weekday. It’s one addition mod 7: <b>month code + date + year code</b>. Days count from Sunday = 0 to Saturday = 6.",
        cards: [
          { k: "Month codes", body: "Jan <b>6</b> (leap year: 5) · Feb <b>2</b> (leap: 1) · Mar <b>2</b> · Apr <b>5</b> · May <b>0</b> · Jun <b>3</b> · Jul <b>5</b> · Aug <b>1</b> · Sep <b>4</b> · Oct <b>6</b> · Nov <b>2</b> · Dec <b>4</b>. Mnemonic for Mar–Dec: 2-5-0-3-5-1-4-6-2-4." },
          { k: "Year code", body: "For 20YY: <b>YY + ⌊YY/4⌋, mod 7</b>. For 19YY: the same <b>+ 1</b>. Example: 1947 → 47 + 11 = 58 → 58 mod 7 = 2 → +1 → <b>3</b>. Leap years (divisible by 4; 2000 counts, 1900 doesn’t) use the leap codes for Jan and Feb only." },
          { k: "Put it together", body: "<b>15 August 1947</b>: Aug = 1, date = 15, year = 3 → 19 → 19 mod 7 = <b>5 → Friday</b>. India’s independence was a Friday — now you can prove it at parties." }
        ],
        examples: [
          { q: "15 August 1947", steps: ["Aug 1 + 15 + year 3 = 19", "19 mod 7 = 5"], a: "Friday" },
          { q: "26 January 1950", steps: ["Jan 6 + 26 + year 0 = 32", "32 mod 7 = 4"], a: "Thursday" },
          { q: "4 July 2026", steps: ["Jul 5 + 4 + year 4 = 13", "13 mod 7 = 6"], a: "Saturday" }
        ],
        tip: "Subtract 7s early and often: never carry a number bigger than 6 in your head."
      } },
    { n: 11, phase: 4, title: "Advanced Multiplication", sub: "3-digit squares, 2-digit cubes, heavyweight 2×2", lecture: "Advanced Multiplication",
      count: 8, time: 200, gold: 130,
      brief: {
        intro: "The same slide-to-a-round-number identity, with bigger weights on the bar. Nothing new to believe — only more to hold. This is where the memory and left-to-right habits pay off.",
        cards: [
          { k: "3-digit squares", body: "<b>312²</b>: slide 12 → 300 × 324 = 97,200, add 12² = 144 → <b>97,344</b>. <b>208²</b>: 200 × 216 = 43,200, + 64 → <b>43,264</b>. Keep d ≤ 12 and the add-back stays tiny." },
          { k: "2-digit cubes", body: "<b>a³ = (a−d) × a × (a+d) + d²×a</b>. For 23³: 20 × 23 × 26 = 11,960, plus 9 × 23 = 207 → <b>12,167</b>. The middle factor is always a itself." },
          { k: "When all else fails", body: "Any 2×2: break one factor. 73 × 42 = 73 × 40 + 73 × 2 = 2920 + 146 = <b>3066</b>. Say the big part out loud (or peg it as a word) while adding the small part." }
        ],
        examples: [
          { q: "312²", steps: ["300 × 324 = 97,200", "+ 144"], a: "97344" },
          { q: "23³", steps: ["20 × 23 × 26 = 11,960", "+ 9 × 23 = 207"], a: "12167" },
          { q: "73 × 42", steps: ["73 × 40 = 2,920", "+ 73 × 2 = 146"], a: "3066" }
        ],
        tip: "Say the first chunk of the answer out loud — your mouth is spare memory."
      } },
    { n: 12, phase: 4, title: "Masters of Mental Math", sub: "THE OPEN · 90-second mixed gauntlet", lecture: "Masters of Mental Math", boss: true,
      count: 0, time: 90, gold: 0,
      brief: {
        intro: "The final lecture is about putting it all together — so this level is <b>the opening bell</b>. Ninety seconds. Questions from every level, streamed at you like order flow. Three strikes and the session ends.",
        cards: [
          { k: "Scoring", body: "Each correct answer scores its level’s base points × your streak multiplier (<b>×1 → ×2 at streak 3 → ×3 at streak 6</b>). A wrong answer or a skip costs a life and resets the streak." },
          { k: "Stars", body: "★ at <b>1,200</b> points · ★★ at <b>2,200</b> · ★★★ at <b>3,500</b>. The all-time high score is kept on this device." },
          { k: "The masters’ secret", body: "It was never raw speed — it’s choosing the <b>right technique in under a second</b>. See “× 11”? Spread-and-sum. See a square? Slide to the round number. See a date? Codes. Recognition first, then execution." }
        ],
        examples: [
          { q: "The stream looks like:", steps: ["68 × 11 … 1000 − 348 … 43 × 47 … March 14, 2015?"], a: "GO" }
        ],
        tip: "Protect the streak: a skipped hard question costs one life; a broken ×3 streak costs hundreds of points."
      } }
  ];

  window.MM_DATA = { LEVELS: LEVELS, gen: gen, POOL: POOL, VIDEOS: V, WD: WD, MAJOR: MAJOR, WORDS: WORDS,
    PHASES: [null, { name: "Phase I · Foundations", c: "--p1" }, { name: "Phase II · Core Engine", c: "--p2" }, { name: "Phase III · Acceleration", c: "--p3" }, { name: "Phase IV · Mastery", c: "--p4" }],
    RANKS: [[0, "Intern"], [5, "Junior Trader"], [12, "Execution Trader"], [20, "Market Maker"], [27, "Desk Quant"], [33, "HFT Quant"], [36, "Human Matching Engine"]],
    playlist: "https://youtube.com/playlist?list=PLm33tX0lmjCJXbrWgompzr7zY5GsLO0xE" };
})();
