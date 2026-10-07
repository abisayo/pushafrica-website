# PUSH Africa — Website Redesign (v2.0)

A complete, modern redesign of **pushafrica.org** — a Pan-African NGO working to reduce
poverty and unemployment through vocational education, entrepreneurship and agriculture.

Built as a fast, portable **static site** (HTML + CSS + vanilla JS) with a bespoke
AI assistant named **Ada**.

---

## 1. Quick start

### Option A — open directly
Double-click `index.html`. Everything works from the file system.

### Option B — run a local server (recommended)
Images load from the internet, so any static server works. For example:

```powershell
# from this folder
npx serve .
# or with Node
node -e "require('http').createServer((q,s)=>require('fs').createReadStream('.'+q.url).pipe(s)).listen(8080)"
```

Then open <http://localhost:8080>.

> The header, footer and images are injected by JavaScript, so viewing the site without
> JavaScript enabled will show page content but not the shared navigation.

---

## 2. What's inside

```
/
├─ index.html                 Home
├─ about.html                 Who we are · vision · mission · values · partners
├─ programs.html              Thematic areas + flagship programmes
├─ schools.html               Compare the four schools
├─ school-vocational.html     Vocational Institute
├─ school-health.html         School of Health
├─ school-tech.html           School of Tech
├─ school-media.html          School of Media
├─ impact.html                Results & measurement
├─ news.html                  Newsroom (filterable)
├─ article.html               Article template
├─ get-involved.html          Volunteer + partner forms + FAQ
├─ associate.html             PUSH Associate Program (earn by referring)
├─ admissions.html            4-step application flow + form download
├─ donate.html                Donation flow (amount / frequency / designation)
├─ contact.html               3 offices + enquiry form + map
├─ thank-you.html             Post-submission confirmation
├─ 404.html                   Not-found page
└─ assets/
   ├─ css/styles.css          Full design system (~1,300 lines)
   ├─ js/images.js            Central image library (swap URLs here)
   ├─ js/site.js              Header/footer, nav, search, forms, counters…
   ├─ js/chatbot.js           "Ada" assistant + knowledge base
   └─ img/                    logo.svg · logo-white.svg · favicon.svg
```

---

## 3. The flows (every CTA leads somewhere)

| CTA | Destination |
| --- | --- |
| Apply for Training | `admissions.html` → multi-step form → `thank-you.html` |
| Donate | `donate.html` → amount/frequency/designation → `thank-you.html` |
| Volunteer | `get-involved.html#volunteer` → form → `thank-you.html` |
| Partner With Us | `get-involved.html#partner` → form → `thank-you.html` |
| PUSH Associate | `associate.html#join` → form → `thank-you.html` |
| Contact | `contact.html#form` → form → `thank-you.html` |
| Explore schools | `schools.html` → each school page → Apply |
| Search | Overlay searches 19 indexed destinations |
| Ask Ada | Opens the assistant and pre-asks a relevant question |

Every navigation item, footer link, card and button resolves to a real page or anchor —
verified programmatically (207 internal links, 0 broken).

---

## 4. Ada — the AI assistant

A fully client-side conversational assistant. **No API key, no backend.**

- Floating launcher (bottom-right) → slide-up panel
- Keyword/regex intent matching across **28 intents**: courses, each of the four
  schools, admissions, requirements, fees, scholarships, duration, certification,
  locations, contact/handoff, donate, volunteer, partner, associate programme,
  impact, news, agriculture, women & youth, hours, greetings and more
- Typing indicator, quick-reply chips, and in-message link buttons that route the
  user straight into the right flow
- Sensible fallback with suggested topics
- Exposes `window.Ada.open()` and `window.Ada.ask("…")` so any page/button can
  deep-link a question (used throughout the site, e.g. *"Ask Ada which school fits me"*)

To edit answers, open `assets/js/chatbot.js` and edit the `KB` array.

---

## 5. Design system

**Principle: flat editorial. No shadows. No gradients.**

- **Typography** — `Fraunces` (display serif) · `Archivo` (UI sans) · `IBM Plex Mono` (labels/stats)
- **Colour** — derived from the original brand palette:

| Token | Hex | Use |
| --- | --- | --- |
| `--orange` | `#ED502E` | Brand orange — decorative graphics (bars, ticks, rules) |
| `--orange-ink` | `#BB3818` | Accessible orange — text & solid fills (WCAG AA) |
| `--navy` | `#00344A` | Primary dark surface |
| `--navy-900` | `#00232F` | Footer |
| `--blue` | `#0073A8` | Focus / accents |
| `--yellow` | `#FDCB1E` | Highlights, dark-surface accents |
| `--teal` / `--green` | `#00A88E` / `#3E8E41` | Status / motif |
| `--paper` / `--sand` | `#F7F4EF` / `#EDE6DC` | Warm neutrals |

> **Note on the orange:** the brand orange `#ED502E` fails WCAG contrast for small
> white text (3.6:1). All text and button fills therefore use a deeper shade of the
> same hue (`#BB3818`, 5.7:1), while `#ED502E` is retained for graphics — so the
> brand reads orange throughout and the site scores **100/100** on accessibility.

### Design language

A flat, editorial system with no shadows and no gradients.

- **Motifs** — a 4-colour brand bar, flat geometric tick rules, mono numbered
  indexes, hard 1.5px borders, near-square 2px radii, oversized serif headlines
  with italic accents, and an uppercase mono "eyebrow" with a colour tick.
- **Sections** — alternating cream / white / sand bands, punctuated by deep navy
  impact bands and solid orange CTA bands.
- **Cards** — flat white panels with a 1px border and a 3px top rule that wipes
  in on hover.
- **Motion** — scroll reveals, animated counters, a marquee ticker and hover
  inversions (all respect `prefers-reduced-motion`).

---

## 6. Quality

Verified in a real browser across all 18 pages:

| Check | Result |
| --- | --- |
| Lighthouse — Accessibility | **100** |
| Lighthouse — Best Practices | **100** |
| Lighthouse — SEO | **100** |
| Console errors | 0 |
| Broken images | 0 |
| Horizontal overflow | none |
| Heading-order violations | 0 |
| Internal links resolved | 207 / 207 |

Also implemented: semantic landmarks, skip link, keyboard-accessible menus and dialog,
focus-visible styles, labelled form fields with inline validation, ARIA live regions for
toasts, `aria-expanded`/`aria-current`, and reduced-motion support.

---

## 7. Images

All photography is sourced from **Unsplash** (free for commercial use under the
Unsplash License) and verified to load. Photographs are centralised in
`assets/js/images.js` — change a URL once and it updates everywhere. Markup references
them via `data-img="key"`.

To use your own photography, either replace the URLs in `images.js` or drop files into
`assets/img/` and point the keys there. (The original PUSH Africa logo is *not* reused;
a new flat SVG wordmark lives in `assets/img/`.)

---

## 8. Notes & limitations

- **Header/footer are injected by `site.js`** to keep 18 pages consistent. For a
  server-rendered build, extract the `renderHeader()` / `renderFooter()` output into
  partials.
- **Forms are front-end demos.** They validate, show a toast and route to
  `thank-you.html`, but post nowhere. Point them at your CRM/endpoint (e.g. replace the
  `data-form` submit handler with a `fetch`) to go live.
- **Ada is scripted**, not a live LLM. It answers from a curated knowledge base, which
  means answers are accurate and instant but not open-ended. See `chatbot.js` for a
  single place to add intents, or swap the `best()` matcher for an API call.
- The **map** on the contact page uses OpenStreetMap's key-less embed.
- Content such as statistics, testimonials and course tracks is illustrative; replace
  with verified figures before launch. Fees are intentionally not invented — the
  assistant and forms route users to the admissions team instead.
