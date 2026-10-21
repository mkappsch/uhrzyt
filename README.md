# Uhrzyt lerne

A small app that teaches children to read the clock — in Züritüütsch, Hochdeutsch, English and French.

**Open it:** https://mkappsch.github.io/uhrzyt/ — on a phone, add it to the home screen; it then works offline.

- **Üebe / Practise** – drag the hands and see how the time is said, or set it to now
- **Stell d'Uhr / Set clock** – set the clock to a spoken (or 24-hour digital) time
- **Wie spoot? / What time?** – read the clock and pick the right phrase
- Four levels (half hours → every minute), help for the typical mistakes, stars, stickers and medals

## How it is built

Plain static files, no build step — GitHub Pages serves them as they are.

| File | What it holds |
|---|---|
| `index.html` | the page structure |
| `app.css` | all styles |
| `app.js` | clock, modes, settings, stars and medals |
| `lang/*.js` | one file per language: texts, time rules, voice, flag |
| `sw.js` | offline cache |
| `tools/layout-audit.html` | checks every screen size, language and state |
| `tools/language-check.html` | checks a language file |

Run it locally with any static server, e.g. `python -m http.server 8765`, then open http://localhost:8765/.

## Add your language

See [LANGUAGES.md](LANGUAGES.md) — copy one file, fill it in, check it, send a pull request.
