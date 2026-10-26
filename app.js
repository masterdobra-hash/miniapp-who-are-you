/* Who are you? — static build.
   No server, no API, no build step: scoring, the daily puzzle, the share card
   (canvas) and the duel link all live in this file. */

(() => {
  "use strict";

  const DATA = window.WAY_DATA;
  const $ = (id) => document.getElementById(id);
  const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const QUESTIONS = DATA.questions;
  const ARCHETYPES = DATA.archetypes;
  const PUZZLES = DATA.puzzles;
  const ACCENT = { quiz: "#5b8cff", daily: "#facc15", duel: "#6ee7b7" };

  /* ------------------------------------------------------------- storage */
  const LS = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem("way_" + key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("way_" + key, JSON.stringify(value)); } catch (e) {}
    },
  };

  const S = {
    screen: "s-home",
    mode: "quiz",              // quiz | duel-create | duel-guess
    qIndex: 0,
    answers: [],
    result: null,              // {aid, match, number, answers}
    challenge: null,           // decoded duel from the URL
    lastCard: null,            // the canvas currently on screen
    streak: LS.get("streak", 0),
    lastDay: LS.get("lastDay", null),
    name: LS.get("name", ""),
    history: ["s-home"],
  };

  const UTM = (() => {
    const out = {};
    try {
      const q = new URLSearchParams(location.search);
      ["utm_source", "utm_medium", "utm_campaign"].forEach((k) => {
        const v = q.get(k);
        if (v) out[k] = v;
      });
    } catch (e) {}
    return out;
  })();

  /* --------------------------------------------------------------- utils */
  const randId = (n) => {
    let s = "";
    const buf = new Uint8Array(n);
    (window.crypto || window.msCrypto).getRandomValues(buf);
    for (let i = 0; i < n; i += 1) s += ALPHABET[buf[i] % ALPHABET.length];
    return s;
  };

  const todayKey = () => new Date().toISOString().slice(0, 10);

  const yesterdayKey = () => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - 1);
    return d.toISOString().slice(0, 10);
  };

  const dayIndex = (dateKey) => {
    const [y, m, d] = dateKey.split("-").map(Number);
    return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
  };

  const toast = (msg) => {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2400);
  };

  const show = (id, push = true) => {
    document.querySelectorAll(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
    if (push && S.history[S.history.length - 1] !== id) S.history.push(id);
    S.screen = id;
    window.scrollTo(0, 0);
  };

  const back = () => {
    S.history.pop();
    const prev = S.history[S.history.length - 1] || "s-home";
    if (S.history.length > 1) S.history.pop();
    show(prev, true);
  };

  const accent = (hex) => {
    if (hex) document.documentElement.style.setProperty("--accent", hex);
  };

  const poss = (name) => {
    const n = (name || "").trim();
    if (!n) return "their";
    if (/^(you|your)$/i.test(n)) return "your";
    return n + (n.endsWith("s") ? "'" : "'s");
  };

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* -------------------------------------------------------------- scoring */
  const archetypeById = (id) => ARCHETYPES.find((a) => a.id === id) || ARCHETYPES[0];

  function maxScores() {
    const ids = ARCHETYPES.map((a) => a.id);
    const totals = {};
    ids.forEach((id) => { totals[id] = 0; });
    QUESTIONS.forEach((q) => {
      const best = {};
      ids.forEach((id) => { best[id] = 0; });
      q.options.forEach((o) => {
        Object.keys(o.scores).forEach((id) => { best[id] = Math.max(best[id], o.scores[id]); });
      });
      ids.forEach((id) => { totals[id] += best[id]; });
    });
    return totals;
  }
  const MAX_SCORES = maxScores();

  /** Same algorithm as the prototype's quiz_engine.score(). */
  function scoreAnswers(answers) {
    const ids = ARCHETYPES.map((a) => a.id);
    const raw = {};
    ids.forEach((id) => { raw[id] = 0; });
    answers.forEach((choice, qi) => {
      const opt = QUESTIONS[qi] && QUESTIONS[qi].options[choice];
      if (!opt) return;
      Object.keys(opt.scores).forEach((id) => { raw[id] = (raw[id] || 0) + opt.scores[id]; });
    });
    const norm = {};
    ids.forEach((id) => { norm[id] = MAX_SCORES[id] ? raw[id] / MAX_SCORES[id] : 0; });
    let winner = ids[0];
    ids.forEach((id) => {
      const a = [Math.round(norm[id] * 1e6) / 1e6, raw[id], -ids.indexOf(id)];
      const b = [Math.round(norm[winner] * 1e6) / 1e6, raw[winner], -ids.indexOf(winner)];
      if (a[0] > b[0] || (a[0] === b[0] && (a[1] > b[1] || (a[1] === b[1] && a[2] > b[2])))) winner = id;
    });
    return { winner, raw, norm, match: Math.round(norm[winner] * 100) };
  }

  /* ------------------------------------------------------------ card draw */
  const CARD = { W: 1080, H: 1350, ART_H: 900, BG: "#09090d", FG: "#f4f4f7" };
  const artCache = {};

  function loadImage(url) {
    if (artCache[url]) return artCache[url];
    artCache[url] = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("art failed: " + url));
      img.src = url;
    });
    return artCache[url];
  }

  const rgb = (hex) => {
    const h = (hex || "#5b8cff").replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };
  const rgba = (c, a) => "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
  const fontStr = (weight, size) => weight + " " + size + "px Inter, -apple-system, Segoe UI, Arial, sans-serif";

  function roundRect(ctx, x, y, w, h, r) {
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); return; }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function labelText(ctx, text, x, y, size, weight, color, tracking, alignRight) {
    ctx.font = fontStr(weight, size);
    ctx.fillStyle = color;
    ctx.textBaseline = "top";
    const chars = Array.from(text);
    let width = 0;
    chars.forEach((ch) => { width += ctx.measureText(ch).width + tracking; });
    width -= tracking;
    let cx = alignRight ? x - width : x;
    chars.forEach((ch) => {
      ctx.fillText(ch, cx, y);
      cx += ctx.measureText(ch).width + tracking;
    });
    return width;
  }

  function fitHeadline(ctx, text, maxWidth, start, floor) {
    let size = start;
    while (size > floor) {
      ctx.font = fontStr(700, size);
      if (ctx.measureText(text).width <= maxWidth) return size;
      size -= 4;
    }
    return floor;
  }

  function wrapLines(ctx, text, maxWidth, weight, size) {
    ctx.font = fontStr(weight, size);
    const words = String(text).split(/\s+/);
    const lines = [];
    let cur = "";
    words.forEach((w) => {
      const probe = (cur + " " + w).trim();
      if (ctx.measureText(probe).width <= maxWidth) cur = probe;
      else { if (cur) lines.push(cur); cur = w; }
    });
    if (cur) lines.push(cur);
    return lines;
  }

  const shadeCache = {};

  function gridMotif(ctx, c) {
    const cell = 96;
    const gap = 24;
    const x0 = (CARD.W - (3 * cell + 2 * gap)) / 2;
    const y0 = 250;
    for (let r = 0; r < 3; r += 1) {
      for (let col = 0; col < 3; col += 1) {
        const x = x0 + col * (cell + gap);
        const y = y0 + r * (cell + gap);
        if (r === 1 && col === 1) {
          ctx.strokeStyle = rgba(c, 0.35);
          ctx.lineWidth = 4;
          roundRect(ctx, x, y, cell, cell, 18);
          ctx.stroke();
        } else {
          ctx.fillStyle = rgba(c, 0.125);
          ctx.strokeStyle = rgba(c, 0.59);
          ctx.lineWidth = 3;
          roundRect(ctx, x, y, cell, cell, 18);
          ctx.fill();
          ctx.stroke();
        }
      }
    }
  }

  /**
   * The 1080x1350 poster, drawn with canvas so the browser owns the image.
   * opts: {labelLeft,labelRight,accent,headline,subline,number,footerRight,art,motif}
   */
  async function drawPoster(opts) {
    const W = CARD.W;
    const H = CARD.H;
    const ART_H = CARD.ART_H;
    const c = rgb(opts.accent);
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = CARD.BG;
    ctx.fillRect(0, 0, W, H);

    if (opts.art) {
      try {
        const img = await loadImage(opts.art);
        const off = Math.max(0, Math.floor((W - ART_H) / 2) - 40);
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, ART_H);
        ctx.clip();
        ctx.drawImage(img, 0, -off, W, W);
        ctx.restore();
      } catch (e) {
        opts = Object.assign({}, opts, { motif: opts.motif || "grid" });
      }
    }

    if (opts.art) {
      const g = ctx.createLinearGradient(0, 0, 0, ART_H);
      for (let i = 0; i <= 12; i += 1) {
        const t = i / 12;
        const a = (70 + 185 * Math.pow(t, 2.2)) / 255;
        g.addColorStop(t, "rgba(9,9,13," + a.toFixed(3) + ")");
      }
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, ART_H);
    } else {
      const glow = ctx.createRadialGradient(W / 2, W * 0.18, 0, W / 2, W * 0.18, W * 0.62);
      glow.addColorStop(0, rgba(c, 0.42));
      glow.addColorStop(0.45, rgba(c, 0.16));
      glow.addColorStop(1, "rgba(9,9,13,0)");
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, ART_H);
      ctx.clip();
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, ART_H);
      ctx.restore();
      if (opts.motif === "grid") gridMotif(ctx, c);
    }

    const top = ART_H + 46;

    labelText(ctx, opts.labelLeft, 72, 78, 30, 500, "#ffffff", 6, false);
    labelText(ctx, opts.labelRight, W - 72, 78, 30, 400, rgba(c, 1), 6, true);

    const size = fitHeadline(ctx, opts.headline, W - 144, 104, 54);
    const lines = wrapLines(ctx, opts.subline, W - 150, 400, 36).slice(0, 3);
    const ruleY = H - 92 - 34;

    let headTop = top + 32;
    const naturalSubTop = headTop + size + 26;
    const subBottom = naturalSubTop + lines.length * 46;
    if (subBottom > ruleY - 40) headTop -= subBottom - (ruleY - 40);
    headTop = Math.max(headTop, top + 20);

    ctx.fillStyle = rgba(c, 1);
    roundRect(ctx, 72, headTop - 46, 96, 6, 3);
    ctx.fill();

    ctx.font = fontStr(700, size);
    ctx.fillStyle = CARD.FG;
    ctx.textBaseline = "top";
    ctx.fillText(opts.headline, 70, headTop);

    let y = headTop + size + 26;
    lines.forEach((line) => {
      ctx.font = fontStr(400, 36);
      ctx.fillStyle = "#ced0dc";
      ctx.fillText(line, 72, y);
      y += 46;
    });

    const fy = H - 92;
    ctx.strokeStyle = "#2e2f3a";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(72, fy - 34);
    ctx.lineTo(W - 72, fy - 34);
    ctx.stroke();

    ctx.font = fontStr(500, 34);
    ctx.fillStyle = rgba(c, 1);
    ctx.textBaseline = "top";
    ctx.fillText(opts.number, 72, fy);

    if (opts.footerRight) {
      ctx.font = fontStr(500, 34);
      ctx.fillStyle = "#989aa8";
      ctx.fillText(opts.footerRight, W - 72 - ctx.measureText(opts.footerRight).width, fy);
    }

    return canvas;
  }

  function quizCard(result) {
    const a = archetypeById(result.aid);
    return drawPoster({
      labelLeft: "WHO ARE YOU?",
      labelRight: "AI QUIZ",
      accent: a.color,
      headline: a.name,
      subline: a.tagline,
      number: "RESULT #" + result.number,
      footerRight: result.match + "% MATCH",
      art: "assets/art/" + a.id + ".png",
    });
  }

  function dailyCard(payload) {
    const streak = payload.streak || 0;
    const sub = streak
      ? "Streak: " + streak + " day" + (streak === 1 ? "" : "s") + "."
      : "First solve. Tomorrow counts double.";
    return drawPoster({
      labelLeft: "DAILY PUZZLE",
      labelRight: payload.date,
      accent: ACCENT.daily,
      headline: "Solved in " + payload.seconds + "s",
      subline: sub,
      number: "#" + payload.number,
      footerRight: streak ? streak + " DAY STREAK" : "FIRST SOLVE",
      motif: "grid",
    });
  }

  function duelCard(payload) {
    const a = payload.ownerAid ? archetypeById(payload.ownerAid) : null;
    const pct = payload.total ? Math.round((100 * payload.score) / payload.total) : 0;
    return drawPoster({
      labelLeft: "HOW WELL DO YOU KNOW ME?",
      labelRight: "DUEL",
      accent: a ? a.color : ACCENT.duel,
      headline: pct + "%",
      subline: payload.guesser + " guessed " + payload.score + " of " + payload.total +
        " of " + poss(payload.owner) + " answers.",
      number: "#" + payload.number,
      footerRight: payload.score + "/" + payload.total,
      art: a ? "assets/art/" + a.id + ".png" : null,
      motif: "grid",
    });
  }

  async function paint(canvas, mount) {
    S.lastCard = canvas;
    mount.innerHTML = "";
    canvas.className = "card-preview";
    mount.appendChild(canvas);
    return canvas;
  }

  function canvasBlob(canvas) {
    return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  }

  async function saveCard(canvas, name) {
    const blob = await canvasBlob(canvas);
    if (!blob) { toast("Could not build the image"); return; }
    const file = new File([blob], name + ".png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
      try {
        await navigator.share({ files: [file], title: "Who are you?", text: canvas._shareText || "" });
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return;
      }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name + ".png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast("Saved — the image is in your downloads");
  }

  /* --------------------------------------------------------------- sharing */
  function baseLink(params) {
    const q = new URLSearchParams(params || {});
    const url = location.origin + location.pathname;
    if (UTM.utm_source) q.set("utm_source", UTM.utm_source);
    if (UTM.utm_campaign) q.set("utm_campaign", UTM.utm_campaign);
    const qs = q.toString();
    return url + (qs ? "?" + qs : "");
  }

  async function shareText(text, url) {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Who are you?", text: text, url: url });
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(text + " " + url);
      toast("Copied — paste it anywhere");
    } catch (e) {
      toast("Copy the address bar and send it");
    }
  }

  /* ------------------------------------------------------------ quiz flow */
  function startQuiz(mode) {
    S.mode = mode || "quiz";
    S.answers = [];
    S.qIndex = 0;
    accent(S.mode === "duel-create" ? ACCENT.duel : ACCENT.quiz);
    renderQuestion();
    show("s-quiz");
  }

  function renderQuestion() {
    const q = QUESTIONS[S.qIndex];
    const total = QUESTIONS.length;
    $("quiz-label").textContent =
      S.mode === "duel-create" ? "About you · " + (S.qIndex + 1) + " / " + total :
      S.mode === "duel-guess" ? "Your guess · " + (S.qIndex + 1) + " / " + total :
      "Question " + (S.qIndex + 1) + " / " + total;

    $("quiz-dots").innerHTML = QUESTIONS.map((_, i) =>
      '<i class="' + (i <= S.qIndex ? "done" : "") + '"></i>').join("");

    let frame = "";
    if (S.mode === "duel-guess" && S.challenge) frame = "How well do you know " + esc(S.challenge.name) + "?";
    $("quiz-q").innerHTML = (frame ? '<span class="q-frame">' + frame + "</span>" : "") + esc(q.text);
    $("quiz-note").textContent =
      S.mode === "duel-create" ? "Answer honestly — a friend will guess these." :
      S.mode === "duel-guess" ? "Pick what you think " + S.challenge.name + " chose." :
      "No wrong answers. That is the point.";

    const box = $("quiz-options");
    box.innerHTML = "";
    q.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "option";
      b.innerHTML = '<span class="idx">' + "ABCD"[i] + "</span><span>" + esc(opt.text) + "</span>";
      b.addEventListener("click", () => pick(i, b));
      box.appendChild(b);
    });
  }

  function pick(i, el) {
    if (el.disabled) return;
    document.querySelectorAll("#quiz-options .option").forEach((o) => { o.classList.remove("sel"); o.disabled = true; });
    el.classList.add("sel");
    S.answers.push(i);
    setTimeout(() => {
      if (S.qIndex < QUESTIONS.length - 1) {
        S.qIndex += 1;
        renderQuestion();
      } else {
        finishQuiz();
      }
    }, 180);
  }

  function finishQuiz() {
    if (S.mode === "duel-create") return createDuel();
    if (S.mode === "duel-guess") return guessDuel();
    return showResult();
  }

  /* --------------------------------------------------------- quiz result */
  function showResult() {
    const s = scoreAnswers(S.answers);
    const a = archetypeById(s.winner);
    S.result = {
      aid: a.id,
      match: s.match,
      number: "Q-" + randId(4),
      answers: S.answers.slice(),
      at: Date.now(),
    };
    LS.set("lastResult", S.result);
    renderResult();
    show("s-result");
  }

  function renderResult() {
    const r = S.result;
    const a = archetypeById(r.aid);
    accent(a.color);
    $("res-art").src = "assets/art/" + a.id + ".png";
    $("res-name").textContent = a.name;
    $("res-match").textContent = r.match + "% match";
    $("res-num").textContent = "Result #" + r.number;
    $("res-tagline").textContent = a.tagline;
    $("res-num-2").textContent = r.number;

    const unlocked = (LS.get("unlocked", []) || []).indexOf(r.number) >= 0;
    const lockedTitles = ["Strengths", "What works against you", "Who you fit with", "One thing to try this week"];
    $("res-locked").innerHTML = lockedTitles.map((x) =>
      '<div class="locked-item"><span class="lock">🔒</span><span>' + esc(x) +
      '</span><span class="bar"></span></div>').join("");
    $("res-paywall").hidden = unlocked;
    $("res-reading").hidden = !unlocked;
    if (unlocked) renderReading(a);

    $("res-share").onclick = () => shareText(a.share_line, baseLink({ utm_medium: "result-share" }));
    $("res-card").onclick = async () => {
      const canvas = await quizCard(r);
      canvas._shareText = a.share_line;
      S.lastCard = canvas;
      await saveCard(canvas, "who-are-you-" + r.number);
    };
    $("res-unlock").onclick = () => {
      const list = LS.get("unlocked", []) || [];
      list.push(r.number);
      LS.set("unlocked", list);
      renderResult();
      toast("Unlocked. Your reading is below.");
    };
  }

  function renderReading(a) {
    const partner = archetypeById(a.compatible_id);
    const box = $("res-reading");
    box.innerHTML =
      "<p>" + esc(a.description) + "</p>" +
      '<h4>What you are good at</h4><ul>' + a.strengths.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>" +
      '<h4>What works against you</h4><ul>' + a.weaknesses.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>" +
      '<h4>Who you fit with</h4><div class="compat"><img src="assets/art/' + partner.id + '.png" alt=""><div><b>' +
      esc(partner.name) + "</b><span>" + esc(a.compatible_why) + "</span></div></div>" +
      '<h4>One thing to try this week</h4><p>' + esc(a.challenge) + "</p>" +
      '<h4>Play it with a friend</h4><p>Send this to the friend who would answer differently. ' +
      "Their result is free too.</p>";
  }

  /* ---------------------------------------------------------------- daily */
  function openDaily() {
    accent(ACCENT.daily);
    const day = todayKey();
    const today = PUZZLES[dayIndex(day) % PUZZLES.length];
    const saved = LS.get("daily", null);

    $("daily-date").textContent = day;
    $("daily-prompt").textContent = today.prompt;
    $("daily-detail").textContent = today.detail || "";
    $("daily-timer").textContent = "0.0s";
    $("daily-after").hidden = true;
    $("daily-hint").hidden = true;

    const box = $("daily-choices");
    box.innerHTML = "";
    today.choices.forEach((choice, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.textContent = choice;
      b.addEventListener("click", () => answerDaily(i, b));
      box.appendChild(b);
    });

    if (saved && saved.date === day) {
      restoreDaily(saved, today);
    } else {
      startTimer();
    }
    show("s-daily");
  }

  let timerHandle = null;
  let timerStart = 0;

  function startTimer() {
    timerStart = performance.now();
    clearInterval(timerHandle);
    timerHandle = setInterval(() => {
      $("daily-timer").textContent = ((performance.now() - timerStart) / 1000).toFixed(1) + "s";
    }, 100);
  }

  async function restoreDaily(saved, puzzle) {
    clearInterval(timerHandle);
    document.querySelectorAll("#daily-choices .choice").forEach((b) => { b.disabled = true; });
    const buttons = document.querySelectorAll("#daily-choices .choice");
    buttons[puzzle.answer].classList.add("correct");
    $("daily-timer").textContent = saved.seconds + "s";
    $("daily-hint").hidden = false;
    await paintDaily(saved, puzzle);
  }

  async function answerDaily(i, el) {
    clearInterval(timerHandle);
    const elapsedMs = performance.now() - timerStart;
    const seconds = Math.max(1, Math.round(elapsedMs / 1000));
    const day = todayKey();
    const puzzle = PUZZLES[dayIndex(day) % PUZZLES.length];
    const correct = i === puzzle.answer;

    document.querySelectorAll("#daily-choices .choice").forEach((b) => { b.disabled = true; });
    const buttons = document.querySelectorAll("#daily-choices .choice");
    buttons[puzzle.answer].classList.add("correct");
    if (!correct) el.classList.add("wrong");

    let streak = S.streak || 0;
    if (correct) streak = S.lastDay === yesterdayKey() ? streak + 1 : 1;
    else streak = 0;
    S.streak = streak;
    S.lastDay = correct ? day : S.lastDay;
    LS.set("streak", S.streak);
    LS.set("lastDay", S.lastDay);
    renderStreak();

    const saved = {
      date: day,
      seconds: seconds,
      streak: streak,
      correct: correct,
      answer: i,
      number: "D-" + randId(4),
    };
    LS.set("daily", saved);
    await paintDaily(saved, puzzle);
  }

  async function paintDaily(saved, puzzle) {
    $("daily-verdict").textContent = saved.correct
      ? "Solved in " + saved.seconds + "s"
      : "Not today — it was " + puzzle.choices[puzzle.answer];
    $("daily-explain").textContent = puzzle.explain + (saved.correct
      ? " Streak: " + saved.streak + " day" + (saved.streak === 1 ? "" : "s") + "."
      : " Streak reset. Tomorrow, 00:00 UTC.");
    $("daily-after").hidden = false;

    const wrap = $("daily-cardwrap");
    const shareBtn = $("daily-share");
    if (saved.correct) {
      const canvas = await dailyCard(saved);
      canvas._shareText = "Solved today's puzzle in " + saved.seconds + "s. Streak: " + saved.streak + ". Your turn:";
      await paint(canvas, wrap);
      shareBtn.hidden = false;
      shareBtn.onclick = () => saveCard(canvas, "daily-" + saved.date);
    } else {
      wrap.innerHTML = "";
      shareBtn.hidden = true;
    }
    $("daily-share-link").hidden = false;
    $("daily-share-link").onclick = () => shareText(
      saved.correct ? "Today's puzzle took me " + saved.seconds + "s. Your turn:" : "Today's puzzle beat me. Your turn:",
      baseLink({ utm_medium: "daily-share" })
    );
  }

  function renderStreak() {
    const el = $("home-streak");
    if (S.streak > 0) {
      el.hidden = false;
      el.innerHTML = "🔥 <b>" + S.streak + "</b> day streak";
    } else {
      el.hidden = true;
    }
  }

  /* ----------------------------------------------------------------- duel */
  const b64url = {
    encode(obj) {
      const json = JSON.stringify(obj);
      const bytes = new TextEncoder().encode(json);
      let bin = "";
      bytes.forEach((b) => { bin += String.fromCharCode(b); });
      return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    },
    decode(str) {
      const pad = str.replace(/-/g, "+").replace(/_/g, "/");
      const bin = atob(pad + "=".repeat((4 - (pad.length % 4)) % 4));
      const bytes = Uint8Array.from(bin, (ch) => ch.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    },
  };

  function duelLink(challenge, number) {
    const payload = b64url.encode({
      v: 1,
      n: challenge.name,
      a: challenge.answers,
      c: challenge.aid,
      t: number,
    });
    return baseLink({ utm_medium: "duel" }) + "#d=" + payload;
  }

  function openDuelCreator() {
    accent(ACCENT.duel);
    if (S.name) {
      $("duel-name-input").value = S.name;
    }
    show("s-duel-name");
  }

  function createDuel() {
    const s = scoreAnswers(S.answers);
    const name = (S.name || "").trim() || "your friend";
    const number = "U-" + randId(4);
    const challenge = { name: name, answers: S.answers.slice(), aid: s.winner, number: number };
    const link = duelLink(challenge, number);
    LS.set("lastDuel", Object.assign({ link: link }, challenge));

    $("duel-own-art").src = "assets/art/" + s.winner + ".png";
    $("duel-link").textContent = link;
    $("duel-share").onclick = () => shareText(
      "I answered 5 questions about myself. How many can you guess?", link);
    $("duel-copy").onclick = async () => {
      try {
        await navigator.clipboard.writeText(link);
        toast("Link copied");
      } catch (e) { toast("Copy it from the box"); }
    };
    $("duel-open").onclick = () => { location.href = link; };
    show("s-duel-invite");
  }

  function openDuelFromLink(payloadEncoded) {
    try {
      const p = b64url.decode(payloadEncoded);
      if (!p || !Array.isArray(p.a) || p.a.length !== QUESTIONS.length) throw new Error("bad duel");
      S.challenge = {
        name: p.n || "your friend",
        answers: p.a,
        aid: p.c,
        number: p.t,
      };
      accent(ACCENT.duel);
      $("duel-intro-title").textContent = "How well do you know " + S.challenge.name + "?";
      $("duel-intro-name").value = S.name || "";
      show("s-duel-intro");
      return true;
    } catch (e) {
      toast("That challenge link is broken");
      return false;
    }
  }

  function startGuess() {
    S.name = ($("duel-intro-name").value || "").trim();
    if (S.name) LS.set("name", S.name);
    S.mode = "duel-guess";
    S.answers = [];
    S.qIndex = 0;
    accent(ACCENT.duel);
    renderQuestion();
    show("s-quiz");
  }

  async function guessDuel() {
    const c = S.challenge;
    const score = c.answers.reduce((n, ans, i) => n + (S.answers[i] === ans ? 1 : 0), 0);
    const total = c.answers.length;
    const verdicts = {
      5: "You know them better than they know themselves. Suspicious.",
      4: "Dangerously accurate.",
      3: "Solid. Not psychic, but solid.",
      2: "Most people land here. That is the point.",
      1: "You two should probably talk.",
      0: "Bold of you to try.",
    };
    const payload = {
      number: "U-" + randId(4),
      owner: c.name,
      ownerAid: c.aid,
      guesser: S.name || "A friend",
      score: score,
      total: total,
    };
    S.duelResult = payload;
    LS.set("lastGuess", { payload: payload, at: Date.now() });

    $("duel-result-label").textContent = "You vs " + c.name;
    $("duel-score").textContent = score + " / " + total;
    $("duel-verdict").textContent = verdicts[score] || "";
    show("s-duel-result");

    const canvas = await duelCard(payload);
    canvas._shareText = "I guessed " + score + " of " + total + " of " + c.name + "'s answers.";
    await paint(canvas, $("duel-cardwrap"));

    $("duel-result-share").onclick = async () => {
      const again = await duelCard(payload);
      again._shareText = canvas._shareText;
      await saveCard(again, "duel-" + payload.number);
    };
    $("duel-result-link").onclick = () => shareText(canvas._shareText, baseLink({ utm_medium: "duel-result" }));
    $("duel-start-own").onclick = () => openDuelCreator();
  }

  /* ----------------------------------------------------------------- boot */
  function bind() {
    document.querySelectorAll("[data-back]").forEach((b) => {
      b.addEventListener("click", (e) => { e.preventDefault(); back(); });
    });
    document.querySelectorAll(".mode").forEach((b) => {
      b.addEventListener("click", () => {
        const go = b.dataset.go;
        if (go === "quiz") startQuiz("quiz");
        else if (go === "daily") openDaily();
        else if (go === "duel") openDuelCreator();
      });
    });
    $("duel-name-go").addEventListener("click", () => {
      S.name = ($("duel-name-input").value || "").trim();
      if (S.name) LS.set("name", S.name);
      startQuiz("duel-create");
    });
    $("duel-name-skip").addEventListener("click", () => {
      S.name = "";
      startQuiz("duel-create");
    });
    $("duel-intro-go").addEventListener("click", startGuess);
    $("home-last").addEventListener("click", () => {
      const r = LS.get("lastResult", null);
      if (r) { S.result = r; renderResult(); show("s-result"); }
    });
  }

  async function boot() {
    renderStreak();
    bind();
    const saved = LS.get("lastResult", null);
    $("home-last").hidden = !saved;

    // deep links: #d=<payload> (duel challenge) or #daily / #quiz
    const hash = (location.hash || "").replace(/^#/, "");
    const hq = new URLSearchParams(hash);
    const query = new URLSearchParams(location.search);
    const duelParam = hq.get("d") || query.get("d");
    if (duelParam) {
      if (openDuelFromLink(duelParam)) return;
    } else if (hash === "daily") {
      openDaily();
      return;
    } else if (hash === "quiz") {
      startQuiz("quiz");
      return;
    }
    show("s-home", false);
  }

  // debug hook: lets a test render a card without walking the whole flow
  window.__app = { quizCard: quizCard, dailyCard: dailyCard, duelCard: duelCard, score: scoreAnswers };

  window.addEventListener("error", (e) => {
    document.title = "JSERR " + (e.message || "?") + " @" + (e.lineno || 0);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
