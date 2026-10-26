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
styles.css      the design system: dark, one accent per mode, 390 wide
app.js          state machine, scoring, canvas cards, duel links
data.js         questions + weights, 8 archetypes, 30 daily puzzles
assets/art/     8 archetype pictures + 3 mode icons (generated, PNG)
assets/og.png   1200×630 preview for link unfurls
assets/fonts/   Inter (variable), served from this folder
```

`data.js` is generated from the Telegram prototype's `miniapp/data/quiz.json`
and `data/daily_puzzles.json`; it is plain JS objects, so editing it by hand is
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

## Run it locally

```bash
python3 -m http.server 8099     # then open http://127.0.0.1:8099/
```

Opening `index.html` with `file://` also works — there is nothing to fetch.

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
