# Who are you? — static build

A five-question personality quiz, a puzzle of the day and a duel with a friend,
as a plain static site. No server, no API, no build step, no CDN: the folder you
are reading is exactly what gets published.

**Live:** https://masterdobra-hash.github.io/miniapp-who-are-you/

| Mode | What happens |
|---|---|
| Quiz | 5 questions → one of 8 archetypes, a % match, a free share card, and the full reading |
| Daily | One puzzle per UTC day (30 in the bank), timed, streak in `localStorage` |
| Duel | You answer 5 about yourself → a link; a friend guesses → their own score and card |

Everything is computed in the browser and stored in `localStorage`. The only
thing that ever leaves the device is a link you send yourself.

## Files

```
index.html      all screens in one page
styles.css      the design system: dark, one accent per mode, 390 wide,
                plus the embedded Cyrillic-capable font
app.js          state machine, scoring, canvas cards, duel links, partner block
data.js         quiz content per language (en + ru): questions + weights,
                8 archetypes, 30 daily puzzles each
i18n.js         interface strings per language: labels, buttons, toasts,
                share texts, the text drawn on the cards
partners.json   the partner list under a result — edit this, not the code
assets/art/     8 archetype pictures + 3 mode icons (generated, PNG)
assets/og.png   1200×630 preview for link unfurls
assets/fonts/   Inter.ttf — the source the embedded subset is cut from
```

`data.js` started as the Telegram prototype's `miniapp/data/quiz.json` and
`data/daily_puzzles.json`; it is plain JS objects, so editing it by hand is
fine — the page picks the change up on reload.

## Cards

The share card (1080×1350) is drawn on a `<canvas>` at the moment you tap
"Get my card as an image", then handed to `navigator.share` (if the browser can
share files) or downloaded as a PNG. Nothing is rendered on a server — the old
Pillow renderer is not part of this build.

Every card carries the site address in small type above the footer, because a
picture posted in a chat with no link is a dead end. If the site moves to its
own domain, change `SITE` at the top of `app.js` (and the links in `README`
and `index.html`) — the cards pick it up.

## Partner block

Under the result card (quiz) and under the puzzle result there is a short block,
"Also worth 30 seconds", with up to three partner bots. The list lives in
`partners.json`:

```json
{ "partners": [
  { "name": "PlayDeck", "url": "https://t.me/PlayDeckBot",
    "description": "250+ free games that run right inside Telegram", "order": 1 }
] }
```

Add `name_ru` / `description_ru` to a partner to localise its line; without
them the base `name` / `description` is shown in both languages.

Change that file to change the list — no code edit, no rebuild. Rules the code
enforces: only `https://t.me/<handle>` links are rendered, `order` sorts them,
the first three are shown, and the file is fetched lazily — only when a result
screen first appears — so it costs nothing on first load. If the fetch fails or
the JSON is broken, the block stays hidden and nothing is logged. Links open in
a new tab with `rel="sponsored noopener noreferrer"`; no UTM, no pixel, no
counter.

## Duel links

A challenge is fully self-contained:

```
…/miniapp-who-are-you/#d=<base64url of {v,n,a,c,t}>
```

`n` = challenger's name, `a` = their five answers, `c` = their archetype,
`t` = the card number. The second player opens the link on any device, guesses,
and the score is computed locally; the challenger's answers never touch a
server. Two consequences worth knowing: anyone who can read the link can decode
it (base64, not encryption — fine for a party game, don't put secrets in it),
and the challenger is never notified when someone plays.

## Languages

The site speaks English and Russian. The language is picked in this order:

1. `?lang=ru` / `?lang=en` in the URL — this is what an ad link or a UTM
   campaign uses, and it beats everything else;
2. a choice the visitor made with the RU/EN switch on the home screen
   (`localStorage.way_lang`);
3. `navigator.language`: anything starting with `ru` gets Russian, everything
   else gets English.

The switch also writes the chosen language into the address bar
(`history.replaceState`), so a copied URL keeps it. Shared links deliberately
carry **no** `lang`: a duel or a result link opens in the receiver's own
language. Duel payloads store answer *indices*, so a Russian challenge works in
an English app and the other way round.

What is translated: every question and answer option, all eight archetypes
(name, tagline, description, strengths, weaknesses, compatibility, challenge,
share line), the result screen and the reading, the paywall copy, the daily
puzzle screen (30 puzzles per language), the duel screens, the partner block
caption, every toast and error message, the share texts — and the canvas card:

- `data.js` → `locales.<lang>.{archetypes,questions,puzzles}`
- `i18n.js` → `<lang>.{…}` for every piece of interface text, with `{placeholders}`

Adding a language means adding one entry to each file and, if the language
needs it, its plural forms in `dayForms` (2 entries for languages with a
singular/plural split, 3 for Slavic-style rules — `plural()` in `app.js` handles
both). Nothing else in the code is language-specific.

Two daily puzzles had to be rebuilt rather than translated, because they only
work on English words: the anagram (LISTEN → SILENT) became КОЛОС → СОКОЛ, and
the letter series (A, C, F, J, O) became the Russian series А, В, Е, И, Н. Both
sit in the same slot as their English twin, and the answer may sit at a
different index — each language has its own puzzle for that day.

## Fonts and Cyrillic

`styles.css` carries Inter as a base64 `data:` URI: Latin + Cyrillic, 40 KB
worth of woff2 (variable weight axis), so the page makes **no font request**
and the canvas cards get real Cyrillic glyphs instead of tofu on a machine with
no Russian system font. It was produced with:

```bash
pyftsubset assets/fonts/Inter.ttf --unicodes-file=uni.txt \
  --layout-features=kern,liga --flavor=woff2 --no-hinting
# opsz was pinned at 20 with fontTools.varLib.instancer first; wght stays variable
```

`uni.txt` is the Latin + Cyrillic + punctuation range; add a range there and
re-run the two commands if a new language needs more glyphs. `canvas` uses the
same family (`fontStr()` in `app.js`), and `ensureFonts()` waits for the face
and pulls the Cyrillic glyphs before the first card is drawn.

## Run it locally

```bash
python3 -m http.server 8099     # then open http://127.0.0.1:8099/
```

Opening `index.html` with `file://` also works: the quiz, the puzzle and the
cards need nothing from the network. The only fetched file is `partners.json`
(same origin), and on `file://` the browser blocks it — the partner block then
simply stays hidden.

## Publish

```bash
git add -A && git commit -m "…" && git push
```

GitHub Pages serves `main` from the repository root. `.nojekyll` is present, so
no file is swallowed by Jekyll.

## What this build deliberately does not have

- **Payments.** The prototype's paid tier (50 Telegram Stars) needs a bot and a
  server to answer `pre_checkout_query` and to open a TON wallet for payouts.
  Here the full reading is unlocked with one tap and labelled "free while in
  beta" — honest, and it keeps the funnel: the reading is what the paid version
  sells.
- **Analytics.** No counter, no third-party script. Attribution is done with UTM
  parameters on the links you post; the app passes `utm_source`/`utm_campaign`
  from the landing URL into the duel links it creates, so a chain of duels keeps
  its origin.
- **Accounts, leaderboards, notifications.** Anything that needs shared state.

## Edit the quiz

`data.js`: each question has 4 options and `scores` (archetype id → points). The
result is normalised per archetype, so adding questions or an archetype does not
silently bias the answer — re-run the prototype's `tests/test_all.py` mental
model: with 8 archetypes and 5×4 slots, no archetype should win more than ~20%.
