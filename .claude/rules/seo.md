# SEO Rules (Always Loaded)

## Current State
- **129 URLs in sitemap** (as of 2026-05-07; ~68 HTML files), 60+ indexed
- **9 SEO phases completed** (Phases 1-7 + visual redesign + calculator/outreach + Phase 9 AI/transactional pivot)
- **Autonomous SEO system active** — invoke `/seo` to run next task

## Tracker (Source of Truth)
`Projects/jetwash/docs/seo/tracker.json` — read before ANY SEO work, update after.

## Key Constraints
- **Lead capture model — GBP + phone + form** — Google Business Profile ACTIVE, phone `01737 652515` prominent everywhere (we WANT calls), NAP consistent across listings, form submissions via Web3Forms as a secondary capture path
- **Zero-cost mandate** — all tools/services must be free
- **Clean URLs** — NEVER use `.html` in href attributes, canonicals, or sitemap
- **Content quality + local signals SEO** — compete on content depth AND map-pack visibility (GBP) AND brand-trust signals

## Target Location
- Primary: RH1 (Redhill & Reigate, Surrey), 20-mile radius
- Postcodes: RH1-RH11, CR3, SM7, KT17-KT24

## On-Page Requirements (Every Page)
1. Unique `<title>` (30-60 chars, include location or keyword)
2. Unique `<meta name="description">` (120-160 chars, include CTA)
3. Exactly one `<h1>` with primary keyword
4. `<link rel="canonical">` with clean URL
5. At least one `<script type="application/ld+json">` schema block
6. `alt` text on all images
7. OG tags: `og:title`, `og:description`, `og:url`, `og:image`
8. **Phone CTA visible** — every page should display `01737 652515` as a tap-to-call link

## Schema Types
- Service pages: HomeAndConstructionBusiness + Service + Offer + FAQPage + BreadcrumbList
- Area pages: HomeAndConstructionBusiness + City + FAQPage + BreadcrumbList
- Guides: Article + BreadcrumbList (+ FAQPage/HowTo where applicable)
- Homepage: LocalBusiness + FAQPage + GeoCircle + GeoCoordinates + OpeningHoursSpecification + PostalAddress

## Full Skill System
Skill: `.claude/skills/seo/SKILL.md`
Workflows: `.claude/skills/seo/workflows/` (execute, strategy, content, audit)
References: `.claude/skills/seo/reference/` (keywords, content-patterns)

## Strategy Pivot Note (2026-04 onwards)
Earlier phases assumed "anonymous model — no GBP, no phone." That was reversed in April 2026 when GBP was activated and the phone number was deployed prominently. Any older session notes referencing the anonymous strategy are SUPERSEDED. The autonomous loop now writes pages with phone CTAs + map-pack-friendly local signals, NOT under the old "no-GBP" rules.
