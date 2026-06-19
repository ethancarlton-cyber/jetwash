# Same Day Jetwash — AI-SEO (AEO) Hardening Checklist & Spec

_Compiled 2026-06-19. Evidence-grounded, calibrated to the site's current (already-mature) state. This is the spec the AI-SEO hardening pass enforces on every built or modified page._

**The two evidence-grounded north stars (everything else is secondary):**

1. **Evidence density wins, not layout tricks.** The only *controlled, replicated* lever is adding specific statistics, direct quotations, and cited primary sources. Princeton GEO study: Quotations +41%, Statistics +33%, Cite Sources +28%; keyword stuffing −9% (harmful) — arxiv.org/abs/2311.09735. 2026 replication on live engines: Statistics +61.6%, Definitions +57.3%, Comparisons +55.3%.
2. **Classic SEO + organic rank dominate AI citation.** Position-1 organic is cited in 43% of queries vs 5% at position 7; ~97–99.5% of AI Overview citations come from the top-20 organic results. **Never block Googlebot/Bingbot.** Schema, llms.txt, and clever formatting are cheap insurance, not the engine.

**Skeptic's discount list (do NOT chase or quote these):** any standalone "+40/45%", "3.2× from tables", "13-week rule", "markdown for crawlers" — all trace to one study (content tactics, not schema/tables), correlational vendor tests, or debunked RCTs.

---

## 1. Answer-First / Extractability

AI search chunks pages into ~100–300-word passages, embeds them, retrieves by similarity — each passage must answer its question standalone. Citations cluster in the first third of a document (44.2%).

- BLUF in the **first paragraph** (keep the site's existing `The short answer:` / `The quick answer:` pattern). Lead with the answer, then context. _Enforce "answer is in the opening paragraph", NOT a literal 60-word count — that threshold is folklore._
- **Question-shaped H2/H3 mirroring real queries**, each followed immediately by a direct-answer paragraph. _Caveat: Q&A headings with thin content beneath scored −5.74% — the heading only helps if a substantive, evidence-backed answer follows._
- **Self-contained answers.** Ban "as mentioned above / see below" — each passage must stand alone when lifted. (Validator: grep "as above", "mentioned earlier", "see below".)
- Answer length: 1 tight direct sentence/short paragraph (~40–80 words) under the heading, then expand. Don't pad to a count; don't truncate a real answer.
- **Definitional sentence** where a term is introduced: "Soft washing is a low-pressure (under ~100 psi) cleaning method that uses biocide rather than mechanical force." (Definitions = top 2026 lever, +57.3%.)
- **"Key facts" callout box** on every cost guide, area page, and service hub (3–5 bullets, each a self-contained fact with number + unit). Forces the evidence-density that IS proven.
- Page depth: short answer up top, comprehensive modular depth below.

## 2. Structured Data / schema.org for AEO

**Reality check (most over-hyped area):** Generic schema does NOT causally drive AI citations (Ahrefs 1,885-page diff-in-diff ≈ 0). LLMs read schema as *text*, not parsed structure — a price placed only in JSON-LD was retrieved by none of ChatGPT/Claude/Gemini/Perplexity. Google **dropped FAQ rich results 7 May 2026.** Keep schema (cheap insurance for classic indexing + feature surfaces), but **the citation comes from the visible text, not the markup. Every fact in schema MUST also appear in visible HTML.**

- **All pages:** `Organization`/`LocalBusiness` once, sitewide-consistent. **Fix: `sameAs` is currently an empty array** — populate with real, owned profile URLs only (GBP, genuine Yell/Bark/Trustpilot/Facebook). Do not invent profiles. **(OWNER ACTION — needs real URLs from Ethan/Ben.)**
- **Service hubs:** `Service` + `HomeAndConstructionBusiness` + `BreadcrumbList` (keep).
- **Service×city + area pages:** `Service` with `areaServed`, `HomeAndConstructionBusiness` with `geo`, `BreadcrumbList` (keep; see §7).
- **Guides:** `Article` with real `author`, `datePublished`, `dateModified`, `BreadcrumbList` (keep).
- **Calculator:** `HowTo` + `BreadcrumbList` (keep; HowTo rich results deprecated but markup harmless).
- **FAQPage:** keep, but value is near-zero from markup — the win is the visible Q&A text. **Hard rule: every `Question`/`acceptedAnswer` in JSON-LD must match a visible on-page Q&A verbatim.** Never ship FAQPage schema for questions not visible (fake-schema anti-pattern + manual-action risk).
- **`Offer`/pricing:** only with real numbers that also appear visibly. Put the price in visible text first, schema second.
- **`Review`/`AggregateRating`: DO NOT ADD unless Ben has real, verifiable reviews with a real count.** Fabricating these is the single highest-risk anti-pattern.
- **Speakable: skip** (Google-only, news-limited, zero AI-citation evidence).
- Validator: schema parses AND every schema fact has a visible-HTML twin.

## 3. Comparison Tables & Data Density

**Honest framing:** "tables cited 2.5–4× more" is hype/contradictory. What correlates/causes: **inline citations (~2.1×), word count >2,500 (~1.6×), and stats/comparisons/definitions.** Tables matter as the natural *vehicle* for dense sourced numbers — not their HTML shape. For GPT-family models **HTML tables serialize best** (+6.76% over delimited), which suits this static-HTML site.

- Use real `<table>` (HTML), not CSS-grid "card" pseudo-tables, for tabular data. **Convert the calculator's CSS-grid price guide to a real `<table>`** so numbers are crawler-extractable.
- Tables per page type: cost-by-surface (£/m²) + typical-job total (cost guides); method/surface matrix (service hubs); DIY-vs-pro + method comparison (comparison guides); frequency/cadence (maintenance guides).
- **Numeric specificity + units in every cell:** "£3–£6/m²", "under 100 psi", "every 2–3 years" — never "affordable"/"low pressure"/"regularly".
- **Cite the source per number** (inline `[n]` footnote pattern the site already uses) where it's a claim, not opinion.
- Real `<thead>`/`<th>` header row (helps a non-rendering parser label columns).
- **No fabricated stats.** Every statistic traceable to a real primary source (§5).

## 4. llms.txt / llms-full.txt + robots.txt

**llms.txt — skeptical read confirmed: no major AI engine reads it; 3 independent studies show zero citation benefit** (Ahrefs: 97% of files got zero requests; Google does not support it — Mueller likened it to the dead meta-keywords tag).

- **Keep the existing `llms.txt`** (clean, costs nothing) but **treat as speculative — do not over-invest, do not claim it drives citations.** Maintain only as a low-effort by-product of the sitemap (curated markdown index: H1 → summary → H2 link lists). Keep facts (NAP, phone, areas) identical to the site.
- **Do NOT create `llms-full.txt`** (docs/dev pattern; no benefit for a service site; adds prompt-injection surface).

**robots.txt — the high-leverage file. Current `User-agent: * / Allow: /` + explicit AI-bot allow-list is a valid, citation-maximising stance; the #1 action (Googlebot/Bingbot allowed) is already correct.** Cleanup:

- Keep allowing every retrieval/search/user-fetch bot — these cite you: `OAI-SearchBot`, `ChatGPT-User`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Googlebot`, `Bingbot`, `Applebot`. **Never block Googlebot/Bingbot** (Bingbot grounds Copilot — no separate CopilotBot).
- **Add `Claude-SearchBot` (Allow)** — Anthropic's search crawler, currently missing. Retired tokens `anthropic-ai`/`Claude-Web` can be dropped.
- **Training-only crawlers** (`GPTBot`, `ClaudeBot`, `CCBot`, `Amazonbot`, `Google-Extended`, `Applebot-Extended`, `Bytespider`): blocking removes training use with **zero loss of citation eligibility**. This is a **business call for Ben** — default "allow all" is fine. Flag it.
- Keep `Sitemap:` line + dev-dir `Disallow:`.

## 5. E-E-A-T / Entity & Author Signals

**The one academically-proven E-E-A-T-adjacent lever is citing authoritative primary sources** (Cite Sources +28%, Statistics +33%). Author *schema* causing citations is assumed, not evidenced — low ROI for a local trade business; NAP/LocalBusiness consistency matters far more.

- **Cite real primary sources inline (the proven lever):** BS/EN standards, HSE & .gov.uk, Met Office, BGS geology, manufacturer datasheets (Marshalls, Lithofin, Kärcher). Make standard on every guide/service page. **Never cite a source you haven't verified exists and says what you claim.**
- **Author/byline:** add a single consistent visible byline + minimal `author`. Cheap, plausible — attach no promised number. **Do not invent credentials/certifications/"X years experience".**
- **NAP consistency — high priority.** Identical name / "01737 652515" / service-area string on every page, in `LocalBusiness` schema, in llms.txt, matching GBP. Validator: phone/NAP must match the canonical constant on every page.
- **Freshness — real for ChatGPT/Perplexity, near-zero for Google AI Overviews.** Add a **visible "Last updated: [Month YYYY]"** under the H1 on guides (currently only in schema); keep `dateModified` in sync. **Anti-pattern (critical): never bump the date without a substantive content edit** — cosmetic bumping is detected and harms trust.

## 6. Technical Extractability

**Strongest-evidenced topic. AI crawlers do NOT execute JavaScript** (Vercel/Merj, 500M+ fetches: zero JS execution by GPTBot/OAI-SearchBot/ChatGPT-User/ClaudeBot/PerplexityBot; only Google Gemini via Googlebot WRS + Applebot render). This site is static HTML — **ideal; the rule is "don't regress."**

- **All answer content in the initial HTML source**, never injected on click. Calculator *results* can be JS (computed); every Q&A, table, fact must be in view-source.
- **Accordions/tabs:** content in the DOM, CSS-hidden at most — never JS-on-interaction. Site uses static `faq-item` divs (no JS toggles) — **keep it; do not "upgrade" FAQs to JS accordions.**
- **Single `<h1>`**, logical `<h2>`/`<h3>` nesting (no skipped levels) — how a non-rendering parser segments chunks.
- **Semantic HTML:** `<table>`/`<th>`, `<ul>/<ol>`, `<figure>/<figcaption>`, `<article>`, `<section>` — not div soup.
- **Descriptive image alt text as context** (Claude crawler fetches are 35% images): "Block paving driveway in Reigate after pressure washing, weeds removed and re-sanded" — not keyword spam.
- **Internal linking for entity association:** service ↔ guide ↔ area pages with descriptive anchors.
- **Crawlability:** in sitemap.xml, clean canonical, 200 status, no orphans.

## 7. Local AEO Specifics

AI "near me" / "[service] [town]" answers pull from both GBP and web pages; AI Overviews de-weight physical proximity vs the classic Local Pack (good for a service-area business). AI engines cross-check page content against the GBP services tab.

- **`LocalBusiness`/`HomeAndConstructionBusiness` with `areaServed` (towns + postcodes) and precise `geo` lat/long.** Ensure `areaServed` lists real coverage (RH1–RH11, SM7, CR3, KT17–KT24).
- **Service×city landing pages — biggest risk in the new build.** Near-duplicate town pages = doorway pages; AI **suppresses** thin/templated pages (fewer strong pages beat many weak ones). **Hard gate: each service×city page must carry genuinely local, substantive content** — local substrate/geology (the Reigate RH2 two-substrate matrix is the gold standard), town-specific pricing context, local landmarks/postcodes, area-specific FAQ. If a page can't be made locally distinct, don't ship it.
- Keep NAP/phone identical to GBP on every local page.
- **Owner-only (hand to Ethan/Ben):** GBP categories, service-area, description, Posts, photos, hours, Q&A, responding to reviews.

## 8. Prioritised "DO THIS PER PAGE" Checklist (enforce on EVERY built/modified page)

Ranked by evidence strength × leverage. Items 1–6 are the high-confidence core.

1. **In sitemap, 200, clean canonical, single H1** — classic rank is the #1 citation predictor.
2. **All answer content in raw HTML** — no JS-injected/interaction-gated text.
3. **BLUF answer in the opening paragraph**, then question-shaped H2/H3 each followed by a self-contained direct answer.
4. **Evidence density:** every claim carries a specific number + unit + inline citation to a real primary source. _(The single proven lever.)_
5. **≥1 HTML data table** with sourced numbers (cost-by-surface / method / frequency / DIY-vs-pro as fits).
6. **NAP + "01737 652515" identical** to canonical & GBP, as a `tel:` link, in schema + visible.
7. **"Key facts" callout box** (3–5 sourced, self-contained bullets).
8. **Schema for the page type, every schema fact mirrored in visible HTML**; FAQPage Q&A matches visible verbatim.
9. **Visible "Last updated: [Month YYYY]"** synced with `dateModified` — only after a real content edit.
10. **Definitional sentence** for each key entity/term.
11. **Descriptive alt text** on every image (what + where).
12. **Internal links** to ≥2 related service/guide/area pages with descriptive anchors.
13. **Local distinctiveness** on any area/service×city page — real local content, not a name-swap template. _(Hard gate.)_
14. **Consistent visible byline** + real `author` (no invented credentials).
15. **`Organization.sameAs`** populated with real owned profiles only (OWNER ACTION).

### Anti-patterns — do NOT
- ❌ Fabricate reviews, ratings, star counts, or AggregateRating — highest-risk; violates the NEVER-fabricate mandate.
- ❌ Invent statistics, percentages, "years of experience", or credentials. Every number traces to a real, verified source.
- ❌ FAQPage (or any) schema for content not visible on the page.
- ❌ JS-hidden / interaction-gated answer content; JS accordions/tabs for FAQs.
- ❌ Keyword stuffing — measurably harmful (−9%).
- ❌ Thin/duplicate service×city doorway pages (name-swap templates) — suppressed, not cited.
- ❌ Cosmetic `dateModified` bumping without a real edit.
- ❌ Blocking Googlebot or Bingbot.
- ❌ Chasing `llms-full.txt` or treating llms.txt as a citation driver.
- ❌ Over-investing in schema/Speakable expecting citation lift — the win is the visible text.

---

**Primary sources:** Princeton GEO study (arxiv.org/abs/2311.09735) · Vercel/Merj crawler study (vercel.com/blog/the-rise-of-the-ai-crawler) · Ahrefs freshness / schema / llms.txt studies · Growth Marshal schema-null · SearchVIU schema-as-text · DigitalApplied 1,000-AIO analysis · Indig/Search Engine Land citation distribution · OpenAI/Anthropic/Google/Microsoft/Apple official bot docs.
