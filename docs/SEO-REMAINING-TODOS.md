# JetWash SEO — Remaining Manual TODOs

> **Created**: 2026-02-21 (after SEO Phase 6 completion)
> **Purpose**: Prioritized list of actions that require manual effort and cannot be automated in code.

---

## URGENT (Do This Week)

### 1. Google Search Console Investigation
**What**: Log into GSC for samedayjetwash.com and check:
- Manual Actions tab (any penalties?)
- Coverage report (crawl errors, excluded pages, indexing issues)
- Core Web Vitals report (any failing URLs?)
- Security issues tab

**Why**: Manual actions or crawl errors can silently tank rankings. Must check before assuming SEO changes will have effect. Phase 5 flagged 37 pages as "Discovered - not indexed" which needs monitoring.

**Priority**: URGENT — do before any other SEO work
**Effort**: 15-30 minutes

### 2. Manual Indexing Requests in GSC
**What**: Use GSC's URL Inspection tool to request indexing for 10-15 pages per day. Prioritize:
1. Homepage and 6 service pages (most commercial value)
2. Pillar page (pressure-washing-guide.html)
3. Guide pages (16 total)
4. Expanded area pages (betchworth, godstone + 10 Phase 3 expansions)
5. Postcode pages (RH2, RH4, RH6, RH8, SM7)
6. Remaining area pages

**Why**: 37 pages were "Discovered - not indexed" as of Feb 12. Manual requests accelerate Google's crawl queue. The site has had 6 phases of SEO work that Google hasn't fully indexed yet.

**Priority**: URGENT — start immediately, continue daily for 3-4 days until all pages submitted
**Effort**: 10-15 minutes/day for 3-4 days

---

## HIGH (Do Within 2 Weeks)

### 3. Core Web Vitals Audit via PageSpeed Insights
**What**: After deploying Phase 6 (with compressed images), run PageSpeed Insights on:
- Homepage
- 2-3 service pages
- 2-3 guide pages
- 2-3 area pages

Check LCP, FID/INP, CLS scores. Document any failing metrics.

**Why**: CWV is a confirmed Google ranking factor. Image compression in Phase 6 should improve LCP significantly. Need to verify and document baseline metrics.

**Priority**: HIGH — do after deploying Phase 6 changes
**Effort**: 30-45 minutes

### 4. Consolidate Overlapping DIY-vs-Professional Guides
**What**: Review these 3 guide pairs that cover similar territory and decide whether to merge, differentiate, or leave as-is:
- "Can pressure washing damage your driveway?" vs service-specific damage warnings
- Driveway cleaning cost guide vs driveway cleaning & sealing cost guide
- Patio cleaning cost guide vs block paving cleaning cost guide

Options for each:
- **Merge**: Combine into one stronger page, 301 redirect the other
- **Differentiate**: Ensure distinct keyword targeting and unique content angles
- **Leave**: If they target genuinely different search intents

**Why**: Keyword cannibalization — Google may not know which page to rank. Consolidating into fewer, stronger pages typically improves rankings for both queries.

**Priority**: HIGH — editorial decision required, affects content strategy
**Effort**: 1-2 hours (research + decision + implementation)

---

## MEDIUM (Do Within 1 Month)

### 5. Backlink Building
**What**: Start building backlinks through:
- **HARO/Connectively**: Sign up, monitor for pressure washing / home improvement queries, submit expert quotes (free backlinks from news sites)
- **Linkable assets**: The pillar page (pressure-washing-guide.html) and cost guides are natural link targets. Share in relevant forums/communities
- **Niche directories**: Submit to local business directories (Yell.com, FreeIndex, Thomson Local, Checkatrade if applicable)
- **Local press**: Pitch seasonal stories ("Spring driveway cleaning tips") to Surrey local papers

**Why**: Backlinks remain a top-3 ranking factor. The site has strong on-page SEO but likely weak backlink profile. Even 5-10 quality backlinks can significantly improve domain authority.

**Priority**: MEDIUM — ongoing effort, compound returns over time
**Effort**: 2-3 hours initial setup, then 30 min/week ongoing

### 6. Seasonal Guide Content Overlap
**What**: Review whether seasonal angles (spring cleaning, winter prep, autumn leaf stain removal) overlap with existing guides. Decide:
- Are there seasonal content gaps worth filling?
- Do any existing guides need seasonal sections added?

**Why**: Seasonal content captures time-sensitive search traffic. But adding too many similar pages causes cannibalization.

**Priority**: MEDIUM — plan for seasonal content calendar
**Effort**: 1 hour (editorial decision)

### 7. Weekly Monitoring per SEO-MONITORING-PLAN.md
**What**: Follow the monitoring cadence in `Projects/jetwash/docs/SEO-MONITORING-PLAN.md`:
- Week 1-2: Daily checks (GSC impressions, clicks, indexing status)
- Week 3-4: Every other day
- Month 2+: Weekly

Track: impressions, clicks, CTR, average position for key terms.

**Why**: Need to measure impact of Phase 1-6 SEO work. Without monitoring, can't tell if changes helped or if adjustments are needed.

**Priority**: MEDIUM — start after deployment
**Effort**: 10-15 minutes per check

### 8. Record Baseline Metrics in GSC
**What**: Before deploying Phase 6, screenshot or export current GSC data:
- Total impressions/clicks for last 28 days
- Top 20 queries by impressions
- Top 20 pages by clicks
- Average position for key commercial terms ("pressure washing surrey", "driveway cleaning near me", etc.)

**Why**: Without a baseline, impossible to measure the impact of 6 phases of SEO work. This is the "before" measurement.

**Priority**: MEDIUM — do before deployment ideally, or immediately after
**Effort**: 20-30 minutes

---

## LOW (Do When Time Allows)

### 9. Unique OG Images Per Service Page
**What**: Currently all pages share one sitewide OG image. Create unique images for at least the 6 service pages showing the relevant service (driveway cleaning, patio cleaning, etc.).

**Why**: Improves social media click-through rate when pages are shared. Low SEO impact but good for social signals.

**Priority**: LOW — nice to have, not critical
**Effort**: 2-3 hours (design + implementation)

### 10. Terms of Service Page
**What**: Create a basic terms.html page covering service terms, liability, booking conditions.

**Why**: Trust signal, especially for local service businesses. Not urgent for SEO but good practice.

**Priority**: LOW
**Effort**: 1-2 hours

### 11. Remove Meta Keywords Tags
**What**: Some pages may still have `<meta name="keywords">` tags. These have been ignored by Google since 2009.

**Why**: Harmless but messy. Removing them is pure cleanup — no SEO impact. Only do if editing those files for another reason.

**Priority**: LOW — zero impact, pure housekeeping
**Effort**: 15 minutes (search and remove)

---

## Summary

| Priority | Items | Total Effort |
|----------|-------|-------------|
| URGENT | 2 (GSC investigation, manual indexing) | 1-2 hours |
| HIGH | 2 (CWV audit, guide consolidation) | 2-3 hours |
| MEDIUM | 4 (backlinks, seasonal content, monitoring, baselines) | 4-5 hours + ongoing |
| LOW | 3 (OG images, terms page, meta keywords) | 3-5 hours |

**Recommended order**: GSC investigation -> baseline metrics -> deploy Phase 6 -> manual indexing (daily) -> CWV audit -> guide consolidation decision -> start backlink building -> ongoing monitoring
