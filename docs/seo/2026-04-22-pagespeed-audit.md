# Performance Audit — 2026-04-22

**Method:** PSI API returned 429 (now requires API key). Used direct HTTP timing + static HTML/asset heuristic analysis as fallback.

## Per-URL TTFB / Page Weight (mobile UA)

| URL | Status | HTML size | TTFB cold | TTFB warm | Notes |
|---|---|---|---|---|---|
| `/` | 200 | 40.8 KB | 0.15 s | 0.15 s | Cache HIT, Brotli on |
| `/quote` | 200 | 21.0 KB | 0.31 s | n/a | Smallest page |
| `/driveway-cleaning` | 200 | 33.6 KB | **18.2 s → 10.3 s** | 0.20 s | Cold-start spike (Vercel POP miss) |
| `/areas/redhill` | 200 | 23.8 KB | 2.0 s | 0.13 s | Cold-start spike, milder |
| `/calculator` | 200 | 40.0 KB | 0.39 s | n/a | Fine |

## Cold-Start Finding

Less-trafficked pages suffer 2-18s TTFB on first edge hit because Vercel cold-starts the static handler / fetches from origin to a new POP. Once warm, <200ms. Real users on long-tail pages (the SEO cohort) will hit cold starts often.

**Mitigation options:**
1. Cron warm-up — hit each page every 5 min from a UK Vercel cron / GitHub Action
2. Increase `s-maxage` in Vercel config — currently `Cache-Control: public, max-age=0, must-revalidate`
3. ISR / static generation — pre-render and pin to all edge POPs

## Static Heuristic Findings

**Good (no action needed):**
- All `<img>` have explicit width/height (CLS-safe)
- Below-fold images use `loading="lazy"`
- Hero on home preloaded; service-page hero uses `fetchpriority="high"`
- Brotli compression active
- `style.css` 9.2 KB compressed
- JSON-LD on every page

**Flagged opportunities (highest impact first):**

1. **Google Fonts render-blocking** — Inter (5 weights) + Raleway (3 weights) loaded via fonts.googleapis.com without `rel="preload" as="font"`. Likely #1 LCP/FCP drag. Fix: self-host or preload woff2 files. **Predicted LCP saving: 200-600ms on slow 4G.**
2. **Font weight bloat** — Trim Inter to 2-3 weights actually used. **Saving: 50-150 KB.**
3. **Cache-Control `max-age=0, must-revalidate`** on HTML — forces 304 round-trip every visit. Consider `s-maxage=3600, stale-while-revalidate=86400`. **Saving: 100-300ms TTFB for repeat visitors.**

**Lower priority:**
- Inconsistent `style.css?v=4` vs `?v=3` across pages — repeat visitors redownload unnecessarily
- Verify `analytics.js` is async/defer

## Recommendation

No emergency. Static-perf hygiene is good. Queue items:
- **P1:** Cron warm-up to address Vercel cold-start TTFB
- **P2:** Self-host fonts + trim weights
- **P3:** Cache-Control tuning on HTML

For real Lighthouse scores: provision free PSI API key (10K/day, 5 min on Google Cloud Console).
