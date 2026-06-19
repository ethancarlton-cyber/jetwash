# Mobile Design-Token Spec — Same Day Jetwash

**Date:** 2026-06-19 · **Branch:** `claude/mobile-qa-polish` · **Scope:** mobile (≤767px) only; desktop (≥768px) unchanged.

Goal: every page perfect on mobile (nothing cut off, everything readable/usable) **and** visually tightened to feel premium and information-dense — by tightening *decoration* (heading scale, vertical rhythm, dead space), never shrinking text or thumb targets.

This spec was derived by benchmarking four authoritative sources and reconciling them with the brief's "tight chrome, big targets" direction.

---

## 1. Research consensus (mobile tokens)

| Token | Apple HIG | Material 3 | Stripe/Linear/Vercel (live) | WCAG / conversion | **Jetwash target** |
|---|---|---|---|---|---|
| H1 (hero) | 32px | 32px | 32–40 (Stripe 34, Linear 38) | 30px (28–32) | **32px** / lh 1.16 |
| H2 (section) | 26px | 28px | 22–28 (Stripe 22, Linear 24) | 24px (22–26) | **24px** |
| H3 (card) | 20px | 24px | 20px | 20px (18–20) | **20px** |
| Body / readable | 17px | 16px | 16px | 16px (floor) | **≥16px** (base stays 17) |
| Small / meta floor | 13px | 12px | 12–13px | — | **13–15px** (meta only) |
| Section padding | 48px | 32px | 40–56 | 40px | **48px** (was 72) |
| Hero padding | 64px (min 48) | 48px | 72–88 | 48/40 | **44 / 48px** (was 72/96) |
| Container gutter | 16–20px | 16px | 16px | 16px | **16px** (was 24 at 481–767) |
| Primary CTA height | 48px (44 floor) | 48px | 44–48px | 48px | **≥48px** (kept) |
| Input height + font | 48px / **16px** | 48px / 16px | — | 48px / 16px | **kept** (inputs already 16px ✓) |
| Tap target min | 44×44 | 48×48 | 44×44 | 44 (48 pref) | **44px** floor, **48px** primary |
| Card padding | 16–24px | 16–24px | 20–24px | 16–24px | **24px** (kept) |
| Spacing grid | 8pt | 8dp | 8px | 8px | **8px** rhythm |

**Hard rules confirmed by research:**
- iOS Safari auto-zooms any focused `<input>` with rendered font-size <16px — Jetwash inputs are already 16px, so no zoom. Never use `user-scalable=no`.
- 44×44px (Apple) / 48×48dp (Material) is the tap-target floor; visual size may be smaller if the *hit area* (padding) reaches it.
- Body copy ≥16px on mobile for readability; meta/labels (footnotes, captions, overlines, postcodes) may be 12–15px.

Sources: developer.apple.com/design/human-interface-guidelines (typography, layout, accessibility); m3.material.io type scale + layout; css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom; W3C WCAG 2.5.5 / 2.5.8; live computed styles of Stripe / Linear / Vercel / Apple.com.

---

## 2. What we change on mobile (≤767px) — and what we DON'T

**Tighten (decoration / rhythm):**
- Spacing tokens `--space-5/6/7` reduced (48→36, 72→48, 96→56) → tightens hero, sections, footer, CTA banner everywhere at once.
- Hero padding 72/96 → 44/48 (kills the cavernous text-only dead-space band).
- Heading scale capped: H1 36→32, H2 28→24, H3 22→20.
- Container gutter 24→16px (481–767 band; ≤480 was already 16).

**Keep BIG (never shrink — conversion + a11y):**
- Primary CTA buttons full-width, ≥48px tall.
- All form inputs 16px font / ~48px tall (no iOS zoom).
- Phone tap-to-call links.
- **Body / readable text ≥16px** — and we *raise* under-sized readable text to 16px (service descriptions, prices, FAQ answers, "what's included" items, price-card rows, quote sub-text).

**Bug fixes (correctness):**
- `.area-chip` / `.area-pill` (6 service-city pages) were a class-name mismatch → unstyled inline links; aliased to the styled chip component (≈42px pills).
- Footer link tap height raised to ≈40px.
- Calculator preset buttons raised to ≈40px.
- Wide content tables (`.table-wrap`) confirmed scrollable + tighter cells.

**Verified NON-issues (measured false positives — not changed):**
- "Stretched images" (95 pages) → all `object-fit:cover` (crop, not distortion).
- Fascia table "overflow" → inside `.table-wrap{overflow-x:auto}`, scrollable not cut off.
- `visually-hidden` / `.skip-link` / 1×1 honeypot inputs flagged as tiny/offscreen → intentional a11y/anti-spam patterns.
- Footer/meta text at 14–15px → intentional, industry-standard meta sizing.

---

## 3. "Mobile-perfect" checklist (validation gate)

Objective (auto-measured on all 118 pages × {360,390}):
- [ ] `document.scrollWidth ≤ innerWidth` (zero horizontal page overflow)
- [ ] No readable body element <16px (meta/labels excepted)
- [ ] No interactive element with hit area <44×44 (excepting native checkboxes/hidden inputs)
- [ ] No element rendered off-screen / cut off (excepting intentional a11y `skip-link`)
- [ ] No genuinely distorted image (object-fit cover/contain excepted)

Subjective (vision before/after on key templates):
- [ ] Hero fits within ~1 viewport; no cavernous empty bands
- [ ] Reads tighter / more premium than baseline, not broken or cramped
- [ ] One clear primary CTA per screen; CTAs + inputs still big and thumb-friendly
- [ ] Headings proportionate; content density improved
