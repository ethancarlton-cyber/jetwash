# SEO Rules (Always Loaded)

## Current State
- **67 HTML pages**, 56 in sitemap, 60 indexed (as of Feb 2026)
- **9 SEO phases completed** (Phases 1-7 + visual redesign + calculator/outreach)
- **Autonomous SEO system active** — invoke `/seo` to run next task

## Tracker (Source of Truth)
`Projects/jetwash/docs/seo/tracker.json` — read before ANY SEO work, update after.

## Key Constraints
- **Anonymous model** — no GBP, no phone, no personal info, form submissions only
- **Zero-cost mandate** — all tools/services must be free
- **Clean URLs** — NEVER use `.html` in href attributes, canonicals, or sitemap
- **Content-focused SEO** — no local business signals, compete on content quality

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

## Schema Types
- Service pages: FAQPage + BreadcrumbList
- Area pages: HomeAndConstructionBusiness + FAQPage + BreadcrumbList
- Guides: Article + BreadcrumbList (+ FAQPage/HowTo where applicable)

## Full Skill System
Skill: `.claude/skills/seo/SKILL.md`
Workflows: `.claude/skills/seo/workflows/` (execute, strategy, content, audit)
References: `.claude/skills/seo/reference/` (keywords, content-patterns)
