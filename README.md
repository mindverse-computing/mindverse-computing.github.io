# site-v2 — Mindverse Computing website

Static HTML in the original site's visual language. Flat layout: all six pages
at the folder root. The previous multi-subdomain site is preserved in
`website/arxiv/mindverse-0.1/`. No build step, no framework.
Open `index.html` in a browser.

## Structure — exactly the original six pages

| Page | Owns |
|---|---|
| `index.html` | The pitch: what we build, the is/is-not box, the evidence teaser |
| `platform.html` | **All architecture** — 4-layer stack, the twin, the agent lifecycle, the harmonisation matrix |
| `services.html` | **All research products** — Superlearning, clinical disorder studies, publications |
| `market.html` | **All market reasoning** — three routes, the gap, why it compounds, segments |
| `investors.html` | **All investment framing** — why us, honest status, why now |
| `contact.html` | Enquiry routes, message form, location |

Nav order matches the original exactly: Home, Platform, Services, Market,
Investors, Contact.

## One idea, one home

The previous draft explained the stack, the QVM, and the agents on nearly every
page. Each concept now has exactly one owner:

| Concept | Lives on | Elsewhere |
|---|---|---|
| 4-layer stack | platform | nowhere |
| Agent lifecycle (5 stages) | platform | nowhere |
| Harmonisation matrix | platform | nowhere |
| "Agents advise, people decide" | platform | nowhere |
| is/is-not box | index | nowhere |
| Twin-of-data argument | platform (full) | index (box only) |
| Head-to-head results | services (full) | index + investors (one-line teaser, linked) |
| Compounding argument | market | investors (one line, linked) |

Verified by automated check: **zero duplicated content sentences between any two
pages** (the four shared strings are nav and footer boilerplate).

## Theme: the original stylesheets, used as-is

This draft does **not** reimplement the look. It copies the original's asset
tree verbatim and builds pages from the original's own markup patterns:

| Borrowed | How |
|---|---|
| `css/` (12 files, 384 KB) | Copied byte-for-byte — Bootstrap, style.css, investor-enhancements.css, home-custom.css, animate, AOS, Owl, Fancybox |
| `js/` (15 files, 412 KB) | Copied byte-for-byte, including `brain-network.js`, `custom.js`, `investor-effects.js` |
| `fonts/`, `images/` | Copied verbatim (icomoon, flaticon, logo, favicon) |
| Nav | The original `<nav class="site-nav">` block, links swapped |
| Hero | The original `.fresh-hero` / `.fresh-title` / `brain-network-container` structure |
| Sections | The original `.investor-section-premium` + inline navy gradients |
| Headings | `.section-title-glow` at the original's 2.5rem |
| Cards | The original `.domain-card` |
| Footer | The original footer block, retired-vertical links retargeted |
| Scripts | The same 12 script tags in the same order |

Verified by MD5: `style.css`, `investor-enhancements.css`, `home-custom.css`,
`brain-network.js` and `custom.js` are identical to the originals.

**Everything I added lives in one ~5 KB file**, `css/site-additions.css` — and
only for components the original has no class for: the is/is-not box, the
layered stack diagram, the harmonisation matrix, status pills, comparison rows,
note/callout blocks, and contact-form fields. Type scale, colours, gradients,
spacing and animation all come from the original stylesheets.

This also means AOS scroll animations, the sticky nav, and the brain network all
work exactly as they do on the live site.


## The framing

**"The tech stack for the agentic quantum digital twin learned from BCI data."**

The tagline names its own source. "Of the mind" would overclaim the very thing
the is/is-not box exists to qualify; "learned from BCI data" states the scope in
the headline itself.

The QVM is a twin of the dynamics in BCI data, **not a replica of the biological
brain**. Stated as an is/is-not box on the home page and argued in full on the
platform page: a model of the biological brain would be unfalsifiable; a model
of BCI dynamics can be tested and shown wrong. The smaller claim is the
defensible one.

The healthy and clinical directions are the same agent stack pointed in
opposite directions — the perturbation stage is literally the same operation. That is
what makes "one stack, two products" structural rather than marketing.

## Editorial rules

Public pages name the method class ("quantum port-Hamiltonian") — published
terminology, not proprietary. Verified absent: operator notation, architecture
names, tuned parameters, dataset names, metric names, numeric results.

"Quantum" is never a performance claim. The is/is-not box states plainly that no
quantum speed-up has been demonstrated.

## Checks that pass

- Zero broken internal links; all section anchors resolve
- Zero HTML nesting errors across all six pages
- Zero undefined CSS classes
- Zero duplicated content sentences between pages
- All text/background pairs meet WCAG AA, computed with alpha compositing
- Responsive at 991px with a working mobile menu

Not verified in a browser — the sandbox has no rendering engine. **Open locally
before sharing.**

## Placeholders

- Contact email on `contact.html` — currently `[ add contact address ]`
- The contact form has no backend wired; it says so beneath the button
- Paper links on `services.html` — currently "request the manuscripts"

## Relationship to the old site

Nothing modified. `mindverse-computing.github.io/`, `bci/` and `_strategy/` are
untouched. This is a parallel draft.

## Naming notes

**"Q-EHR" retired.** It named a record category that does not exist yet, which
invites a question the research cannot answer. The clinical direction is now
described by what it does — **Neurological Perturbation Studies**, with
**Longitudinal Neural State Record** as the proposed product inside it.

**No modelling method named.** An earlier draft said "quantum port-Hamiltonian"
throughout. Removed: it commits the platform to one approach when different
twins may need different models, and it is more specific than a public page
needs. The generic framing — executable quantum-classical state model, routed
into agentic workflows — is the original site's own language.

## Claim discipline and tone

The site is accurate about status without being apologetic about it. Two rules
run together:

**Never overclaim.** No page says published, validated, proven, or demonstrated
about work that is in preparation. Every product carries a status label —
Proposed, In preparation, In development. The is/is-not box states plainly that
the model is not a replica of a biological brain, not a medical device, and that
quantum speed-up is not part of the claim. Where conventional methods lead, the
site says so.

**Never apologise.** Status is stated forward-looking, not as a disclaimer.
"Three manuscripts are in preparation" replaces "nothing is peer-reviewed or
published". "Larger cohorts and independent replication are the next milestones"
replaces "we make no claim it would survive replication". "Validation study
designed and scheduled" replaces "validation planned, not yet run".

The distinction: naming what is not yet done once, as a milestone, is precision.
Repeating it as a hedge on every page reads as a lack of confidence in work that
is genuinely promising. 25 apologetic constructions were rewritten this way —
including a disclaimer that had been repeating on all six pages via the footer.

Verified by automated check: zero instances of "not peer-reviewed",
"unpublished", "small sample", "run by us", "nothing more", or "not a proven
result"; and zero overclaims of published, validated, proven, deployed, or
quantum speed-up.


## Colour themes per direction

Following the original's per-domain colour convention:

| Direction | Colour | Source |
|---|---|---|
| Core state model (QVM) | cyan `#00f2fe` | the original's `--neural-accent`, its BCI/Mind colour |
| Superlearning (healthy) | green `#00e676` | the original's Omics green |
| Neurological studies (clinical) | magenta `#FF00FF` | the original's Matter magenta |

The rule is applied strictly: anything about Superlearning is green, anything
clinical is magenta, the core platform and everything shared is cyan. This
covers icons, icon circles, glass-card top bars and borders, tinted-box left
borders and labels, `research-list` bullet markers, and status pills. Verified
card-by-card rather than by global find-and-replace — the audit caught a
shared-machinery box wrongly tinted magenta and a clinical box left neutral.

Every tinted box, icon circle, glass-card top bar, status pill and list marker
in a section takes that section's colour. All three pass WCAG AA on navy and on
their own tint backgrounds (magenta 4.66, green 8.76, cyan 10.53).

## Visual components — all from the original

Long prose blocks were replaced with the original site's own devices:

| Component | Original source |
|---|---|
| `glass-card` with gradient top bar | the original's market/domain cards |
| `building-box` — tinted box, coloured left border, uppercase label | the original's "What We're Building" blocks |
| `impact-card-*` — icon circle + heading + body | the original's home-page impact cards |
| `research-list` — `›` bullet lists | the original's "What It Does" panels |
| Two-column domain sections | the original's services-page layout |
| `status-chip` pills | the original's inline chip treatment |

**Icons:** all 23 icon names were validated against the actual Unicons v4.2.0
font (1,206 line icons, fetched from the npm registry), so none render as blank
squares. Each is semantically matched to its card — `stethoscope` for clinical,
`graduation-cap` for learning, `microscope` for research, `brain` for the model,
`shield-check` for the consistency guarantee.

## The one typography override

`css/site-additions.css` carries a single `.fresh-title` size override. The
original's `clamp(2.8rem, 6.2vw, 4.8rem)` is tuned to its own longest hero line
(~9.4em); ours is 10.0em and overran the `col-lg-6` column, forcing a mid-phrase
wrap. Same clamp shape at `clamp(2rem, 4.3vw, 3.4rem)`, checked from 390px to
1440px. Every other type size comes from the original stylesheets untouched.

## Footer

The inherited footer was rebuilt. It had been carrying the retired verticals
(QVF — Markets, QVMa — Matter, QVO — Cell), four "Workspace" links that all
resolved to the same page after the subdomains were dropped, and a newsletter
signup wired to a Google Sheets endpoint that no longer applies.

Four columns now, matching the site as it actually is:

| Column | Contents |
|---|---|
| Mindverse Computing | What we build, plus the early-stage/not-a-medical-device framing; social links unchanged |
| The platform | How it works, the four layers, the agent layer, where the evidence stands |
| Research directions | Superlearning (green) and Neurological studies (magenta), each tagged "proposal"; all research products |
| Company | Market, Investors, Contact, Ask for the drafts |

The research-direction links carry their section colours, so the footer follows
the same cyan/green/magenta rule as the rest of the site. The bottom bar now
carries the R&D notice and states that three manuscripts are in preparation and
none are peer-reviewed.

Two new anchors were added to `platform.html` (`#stack`, `#agents`) so the
footer's deep links resolve. Every footer link and anchor is checked by the
validation pass.

## End-to-end consistency audit

A full scan of the flattened site (28 checks) found and fixed three things:

1. **No canonical URLs or `og:url`** — the original site had both; every page now
   carries `<link rel="canonical">` and `og:url` pointing at
   `https://www.mindversecomputing.com/`, plus `og:site_name`.
2. **Two WCAG AA contrast failures** — magenta `#FF00FF` on its own 6% tint
   (4.48) and footer fine print at 40% white (3.58). Magenta text on magenta
   backgrounds now uses `#FF66FF` (5.75); footer fine print is 55% white (5.42).
3. **Missing `robots.txt` and `sitemap.xml`** — both added, sitemap listing all
   six pages with priorities.

Also removed: `js/index.html` (a directory-listing stub that would have been
served) and a stray `.DS_Store`.

Everything else passed: HTML nesting, 253 links and anchors, asset resolution,
nav/footer/script consistency across all six pages, unique titles and
descriptions, retired terminology at zero, no duplicated prose, concept
ownership, no orphan pages, 21 icon names verified against the real font, icon
colour matching section theme on all 32 icons, one h1 per page, image alt text,
lang and viewport.

**Open items:** the contact email placeholder on `contact.html`, the contact
form backend, and five unreferenced legacy assets kept from the original
(`bootstrap-datepicker`, `jarallax`, and three page-specific CSS files) — ~53 KB
total, harmless but removable.

## Card typography scale

Card titles were set only 1.11-1.15x their body text, which reads as a single
undifferentiated block. The original site runs its card titles at 1.37-1.80x
(`.glass-card-title` 1.8rem over 1.0rem body; `.highlight-title` 1.3rem over
0.95rem).

All box titles are now on a consistent ~1.35x step:

| Component | Title | Body | Ratio |
|---|---|---|---|
| Icon cards | 1.30rem | 0.96rem | 1.35 |
| Stack layers | 1.28rem | 0.95rem | 1.35 |
| What-it-is boxes | 1.32rem | 0.97rem | 1.36 |
| Glass cards | 1.35rem | 1.00rem | 1.35 |
| Services product cards | 1.26rem | 0.95rem | 1.33 |
| is/is-not boxes | 1.30rem | 0.94rem | 1.38 |
| Footer columns | 1.22rem | 0.93rem | 1.31 |
| Product names (inline with pill) | 1.18rem | 0.95rem | 1.24 |

The `building-label` eyebrow stays deliberately small (0.86rem) — it is
differentiated by uppercase, letter-spacing, weight and colour rather than size,
which is the original site's own pattern for that component.

## Page structure: one landing page, five direct pages

`index.html` is the only landing page — full-height hero, the brain-network
animation, and the staged reveal. It is the page that has to sell before it
informs.

The other five open with a compact page head: title, one-line summary, then
straight into content. No full-height hero, no animation, no scroll before the
first real section. Someone arriving on Platform or Investors already knows what
they came for.

Mechanically:
- `.fresh-hero` and `brain-network-container` appear on `index.html` only
- `brain-network.js` is loaded on `index.html` only — the other five pages drop
  it (11 scripts instead of 12)
- Page heads use `.page-head` at `padding: 130px 0 56px` on flat `#151b3b`,
  which runs continuously into the first section's gradient rather than creating
  a dark-light-dark band
- Page titles are `clamp(1.9rem, 3.4vw, 2.7rem)` — 43px at desktop against the
  home hero's 54px, so the hierarchy between landing and interior pages is
  visible
- Hero CTAs were dropped with the hero; every destination they pointed to is
  still linked from within the page body

## Platform page: two layout fixes

**"A twin of the data, not of the brain"** — the right column stacked two
`impact-card` boxes that each carried `height: 100%`. Inside a flex column that
makes both boxes claim the full column height, and the second one's text was
pushed out of view. The section is now a full-width lede with the tinted
callout, then the two cards side by side in a proper 6/6 row using Bootstrap's
`h-100` (which equalises heights correctly) instead of inline `height: 100%`.
The same bug was present on `contact.html` where Email and Location were stacked
the same way; those are now one card with an internal divider.

**"Agents work the whole lifecycle"** — the eight specialists were a bullet list
of five-word fragments ("Data steward — tracks consent and provenance"), which
read as a placeholder. Each is now a card with 170-270 characters explaining what
that agent actually does and why it matters — including the cases where an agent
refuses (the model builder reporting that data will not support a fit) and where
it surfaces disagreement rather than resolving it (the consistency checker).

`Track designer` is green and `Intervention planner` is magenta, since those two
are the direction-specific agents; the other six are cyan.

The five pipeline stage cards were also made compact (1.5rem padding, 40px icon,
1.05rem title) — they carry one line each and the previous 2rem/56px treatment
left them mostly empty.
