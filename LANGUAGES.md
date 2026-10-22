# Adding a language

Uhrzyt lerne teaches children to read the clock. Every language — or dialect — lives in one file in
[`lang/`](lang/). It contains the app's texts, the rules for saying a time, the voice for reading aloud
and a small flag. You can add yours without touching the rest of the app.

## 1. Copy the template

Copy [`lang/_template.js`](lang/_template.js) to `lang/<code>.js`, for example `lang/it.js` for Italian
or `lang/ch-be.js` for Bärndütsch. Pick a short, unique code and put it in `Uhrzyt.addLanguage("<code>", …)`.

## 2. Fill it in

- **`name`, `flag`** – the language's own name and a small SVG flag (it is shown round).
- **`say(h, m)`** – how a time is said, for every hour (1–12) and minute (0–59). Mark the hour part with
  `HR(…)` (shown blue) and the minute part with `M(…)` (shown orange).
- **`next`** – from which minute your language names the *next* hour. This drives the glowing hour number
  and the help for the classic mistakes:

  | Language | 3:35 | `next` |
  |---|---|---|
  | English | twenty-five *to four* | 31 |
  | Deutsch | fünf nach halb *vier* | 21 |
  | Français | *quatre heures* moins vingt-cinq | 35 |
  | ภาษาไทย | สามนาฬิกาสามสิบห้านาที (always forward) | 60 |

- **`hours`** – the 13 hour names (0 and 12 are both twelve), as they fit into the help texts
  («It's not *four* yet!»).
- **`second`** – optionally another language shown as a second line under each phrase (English and French
  show Züritüütsch), or `null`.
- **`texts`** – every text of the app. Keep `${…}` placeholders and HTML tags. Anything you leave out falls
  back to English, so you can start small.
- **Dialects** that belong together (Swiss German) share a heading in the language list: add
  `group`, `groupFlag` and `dialect` (see [`lang/ch-zh.js`](lang/ch-zh.js)).

## 3. Check it

Run the app locally (any static server works):

```bash
python -m http.server 8765
```

Then open:

- **http://localhost:8765/tools/language-check.html?file=lang/it.js** – checks your file before it is
  part of the app: all 720 times, missing or broken texts, and a preview of every minute to proofread.
- After step 4: **http://localhost:8765/** – try it in the app (⚙ → language).
- **http://localhost:8765/tools/layout-audit.html** – checks that your texts fit on every screen size,
  from small phones to desktops. Every line should read OK.

## 4. Add it to the app

In [`index.html`](index.html), add one line next to the other languages (the order is the order in the
language list):

```html
<script src="lang/it.js"></script>
```

and add the file to the `CORE` list in [`sw.js`](sw.js) so it works offline from the first start.

## 5. Send it

Open a pull request on GitHub with your file and the two small changes. Language files contain code
(the time rules), so every language is reviewed before it goes live — please mention who checked the
phrases (ideally a native speaker, and a child who tried it).
