# GSC Issues Report — 2026-03-30

## Overall Coverage Stats
- **79 indexed pages** (up from 2 on Jan 27 — massive growth)
- **44 not indexed**
- **488 peak daily impressions** (Mar 27) — trending strongly upward
- **350+ daily impressions** consistently since mid-March

## Issue 1: Page with Redirect (25 pages) — Validation FAILED
**Started**: 2026-03-23 | **Failed**: 2026-03-28

All 25 URLs are expected 301 redirects (not bugs):

### .html variants (21 URLs — handled by Vercel cleanUrls:true)
| URL | Last Crawled |
|-----|-------------|
| /faq.html | 2026-03-28 |
| /privacy.html | 2026-03-25 |
| /areas/banstead.html | 2026-03-21 |
| /areas/redhill.html | 2026-03-20 |
| /guides/diy-vs-professional-pressure-washing.html | 2026-03-19 |
| /areas/crawley.html | 2026-03-19 |
| /areas/earlswood.html | 2026-03-18 |
| /index.html | 2026-03-12 |
| /guides/driveway-cleaning-cost-uk.html | 2026-03-12 |
| /areas/caterham.html | 2026-03-12 |
| /block-paving-cleaning.html | 2026-03-04 |
| /areas/reigate.html | 2026-02-26 |
| /guides/surface-comparison-pressure-washing.html | 2026-02-23 |
| /guides/pressure-washing-service-tiers.html | 2026-02-22 |
| /pressure-washing-guide.html | 2026-02-22 |
| /guides/can-pressure-washing-damage-driveway.html | 2026-02-22 |
| /guides/driveway-cleaning-sealing-cost.html | 2026-02-21 |
| /areas/chipstead.html | 2026-02-20 |
| /guides/moss-removal-from-driveways.html | 2026-02-18 |
| /guides/pressure-washing-vs-jet-washing.html | 2026-02-17 |
| /areas/salfords.html | 2026-02-14 |

### www/http variants (4 URLs — handled by Vercel domain config)
| URL | Last Crawled |
|-----|-------------|
| http://www.samedayjetwash.com/ | 2026-03-23 |
| https://www.samedayjetwash.com/ | 2026-03-23 |
| http://samedayjetwash.com/ | 2026-03-15 |
| https://www.samedayjetwash.com/index.html | 2026-03-12 |

**Root cause**: Google previously crawled .html URLs before cleanUrls was configured. Vercel now 301 redirects them. Google re-checks and confirms they still redirect — "validation failed" because the URLs still redirect (which is correct).

**Growing trend**: 1 page (Jan 27) → 25 pages (Mar 18). Google is discovering more .html variants over time, likely through its own crawl patterns.

## Issue 2: Alternate Page with Proper Canonical Tag (7 pages) — Validation STARTED
**Started**: 2026-02-24

| URL | Last Crawled |
|-----|-------------|
| /guides/how-to-clean-indian-sandstone-patio | 2026-02-15 |
| /guides/pressure-washer-hire-vs-professional | 2026-02-15 |
| /guides/is-pressure-washing-worth-it | 2026-02-15 |
| /guides/how-often-clean-driveway | 2026-02-13 |
| /guides/prepare-driveway-for-pressure-washing | 2026-02-13 |
| /tips | 2026-02-12 |
| /guides/block-paving-sealing-guide | 2026-02-12 |

**NOTE**: These are CLEAN URLs (no .html). Google is saying it found these pages but chose NOT to index them because it considers them alternate versions of another canonical page. This needs investigation:
- `/tips` → redirects to `/guides`, so canonical = /guides. Expected.
- The 6 guide pages → need to check if their canonical tags are correct and if Google is consolidating them with other pages.

**ACTIONABLE**: Check canonical tags on these 6 guide pages. Verify they self-reference (canonical = own URL).

## Issue 3: Redirect Error (10 pages) — Validation STARTED
**No URL drilldown available yet.** Need to export from GSC.

**This is potentially the most serious issue** — means Google found 10 URLs where the redirect itself is broken (redirect loops, too many redirects, or invalid targets).

## Issue 4: Not Found 404 (2 pages) — Validation STARTED
**No URL drilldown available yet.** Need to export from GSC.

## Issue 5: Discovered - Currently Not Indexed — Validation PASSED
Fixed. 5 pages validated.

## Issue 6: Crawled - Currently Not Indexed — Validation PASSED
Fixed.

## GBP Stats (unexpected)
46 profile views reported. GBP was previously documented as NOT being used (anonymous model constraint). User may have set one up — needs clarification.

## Action Plan
1. Check canonical tags on 6 flagged guide pages
2. Export "Redirect error" drilldown from GSC (10 URLs)
3. Export "Not found 404" drilldown from GSC (2 URLs)
4. Fix any incorrect canonicals
5. Fix any broken redirects
6. "Page with redirect" — no fix needed, expected behavior
