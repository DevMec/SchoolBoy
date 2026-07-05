# 🚗 Auto Garage — Leer Lezen!

A Dutch reading-learning game for a 5-year-old. Complete lessons, earn cars —
from the VW Beetle all the way to the Lamborghini!

## Features

- **Learning module** — Dutch letters first (vowels, then consonants in small
  groups), then simple words with pictures. Exercises: tap-the-letter,
  tap-the-word, and fill-in-the-missing-letter. Every letter and word is spoken
  aloud with Dutch text-to-speech.
- **Car garage** — 7 cars unlock progressively (Kever → Mini → Golf → Jeep →
  Porsche → Ferrari → Lamborghini) as lessons are completed, with a confetti
  celebration on each unlock.
- **Time management** — daily play-time limit (default 45 min). Each completed
  lesson earns bonus minutes (default +10). When time is up, the app blocks
  until tomorrow (or a parent unlocks it).
- **Parent panel** — PIN-protected (default **1234**): view stats, change the
  daily limit and lesson bonus, grant extra time, reset the timer, change the
  PIN, or reset all progress.
- **Offline** — all progress is stored in LocalStorage; a service worker caches
  the app so it works without internet once loaded.

## Run it

```bash
npm install
npm run dev        # development, opens on http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

Open it on a phone/tablet on the same network with `npm run dev -- --host`,
or deploy the `dist/` folder to any static host (GitHub Pages, Netlify, ...).
On Android, use Chrome's "Add to home screen" to install it as an app.

## Notes for parents

- Default PIN: **1234** — change it in the parent panel (👨‍👩‍👦 button).
- Dutch speech uses the device's text-to-speech. On Android, make sure Dutch
  (Nederlands) is installed under Settings → Google Text-to-speech.
- Lesson content lives in `src/data/content.js` — easy to add words.
- Car thresholds live in `src/data/cars.js`.
