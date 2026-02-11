# Google Search Console Issues - February 2026

**Date**: 2026-02-11
**Status**: 1 FIXED (deployed), 3 require monitoring/action

---

## ✅ Issue 1: 404 Error on `/guides/` - FIXED

**Problem**: `https://samedayjetwash.com/guides/` returned 404
**Root Cause**: No redirect configured for directory URL
**Fix**: Added permanent redirects in `vercel.json`:
- `/guides/` → `/guides.html`
- `/guides/index.html` → `/guides.html`

**Deployed**: 2026-02-11 (commit cdb6842)
**Action Required**:
1. Wait 24-48 hours for Vercel edge cache to clear
2. Request re-indexing in GSC: URL Inspection → `https://samedayjetwash.com/guides/` → Request Indexing

---

## ⚠️ Issue 2: Alternate Page with Proper Canonical Tag

**Affected URLs**:
- `https://www.samedayjetwash.com/` (last crawled Jan 31, 2026)
- `https://www.samedayjetwash.com/areas/salfords.html`

**Problem**: Google is flagging www versions as alternate pages
**Status**: ✅ **NOT A PROBLEM** - This is actually correct behavior

**Why This Is Good**:
- All pages have correct canonical tags pointing to non-www versions
- Google correctly identified these as alternates (not duplicates)
- The www → non-www redirect is working (308 Permanent Redirect verified)

**Action Required**: NONE - This will resolve automatically as Google re-crawls. The canonical tags are correct.

---

## ⚠️ Issue 3: Page with Redirect - Validation Failed

**Affected URLs** (validation failed 2/7/26):
- `https://samedayjetwash.com/index.html` (last crawled Feb 5, 2026)
- `https://www.samedayjetwash.com/index.html` (last crawled Feb 5, 2026)
- `http://www.samedayjetwash.com/` (last crawled Jan 27, 2026)
- `http://samedayjetwash.com/` (last crawled Jan 25, 2026)

**Problem**: Google validation failed, but redirects ARE working
**Status**: ✅ Redirects verified working (curl tests on 2026-02-11):
- `/index.html` → `/` (308 Permanent Redirect) ✅
- `www.samedayjetwash.com` → `samedayjetwash.com` (308 Permanent Redirect) ✅
- HTTP → HTTPS (automatic via Vercel) ✅

**Root Cause**: Timing issue - Google may have crawled during deployment or cached old responses

**Action Required**:
1. Wait 7-14 days for Google to re-crawl
2. If still failing after 2 weeks, request re-validation:
   - GSC → Coverage → "Page with redirect"
   - Click "Validate Fix"
3. Verify redirects are still working: `curl -I https://samedayjetwash.com/index.html`

---

## 🕐 Issue 4: Discovered - Currently Not Indexed (37 Pages)

**Affected Pages**: 37 pages including:
- Area pages: crawley, dorking, earlswood, merstham, redhill
- Service pages: decking-cleaning, driveway-cleaning, patio-cleaning, render-cleaning
- Guide pages: best-time-patio-cleaning, moss-removal, pressure-washing-vs-jet-washing
- Info pages: areas.html, faq.html, pricing.html, quote.html, tips.html

**Problem**: Google discovered these URLs but hasn't crawled/indexed them yet
**Status**: ⏳ NORMAL - New content takes 1-4 weeks to index

**Root Cause**:
- Pages were added in SEO Phase 3 (Feb 8) and Phase 4 (Feb 8-9)
- Google has discovered them (via sitemap/internal links) but hasn't crawled yet
- This is standard behavior for new pages

**Why Not Indexed**:
- ✅ Sitemap submitted: Feb 8, 2026
- ✅ Internal links added: 200+ contextual links in Phase 4
- ✅ IndexNow submitted: 45 URLs to Bing/DuckDuckGo on Feb 8
- ⏳ Google just needs time to crawl

**Action Required**:

### Option 1: Manual Indexing Request (Fastest - Do This)
1. Go to GSC → URL Inspection
2. Enter each priority URL (start with high-value pages):
   - `https://samedayjetwash.com/areas/redhill.html`
   - `https://samedayjetwash.com/areas/reigate.html`
   - `https://samedayjetwash.com/driveway-cleaning.html`
   - `https://samedayjetwash.com/patio-cleaning.html`
   - `https://samedayjetwash.com/guides/driveway-cleaning-cost-uk.html`
3. Click "Request Indexing" for each
4. Limit: 10-15 requests per day (Google's quota)

### Option 2: Wait & Monitor (Passive)
- Check GSC weekly for index status changes
- Most pages should index within 2-4 weeks
- High-quality pages with good internal links index faster

### Option 3: Build More Backlinks (Long-term)
- Submit to free directories (Yell, FreeIndex)
- Post in local Facebook groups
- Answer Quora questions with links to guides
- HARO (Help A Reporter Out) for backlinks

---

## 📊 Summary & Priority Actions

| Priority | Issue | Action | When |
|----------|-------|--------|------|
| 🔴 HIGH | `/guides/` 404 | Request re-indexing in GSC | Now (24hrs after deploy) |
| 🟢 LOW | Canonical tags | None - working correctly | N/A |
| 🟡 MEDIUM | Redirect validation | Wait 7-14 days, then re-validate | Week of Feb 18 |
| 🟡 MEDIUM | 37 pages not indexed | Manual indexing requests (10-15/day) | Start tomorrow |

---

## 🎯 Step-by-Step Action Plan

### Day 1 (Feb 12, 2026 - Tomorrow)
1. ✅ Verify `/guides/` redirect is live: `curl -I https://samedayjetwash.com/guides/`
2. Request indexing for 10 priority pages via GSC URL Inspection:
   - Homepage: `/`
   - Top area pages: `/areas/redhill.html`, `/areas/reigate.html`
   - Top service pages: `/driveway-cleaning.html`, `/patio-cleaning.html`
   - Top guides: `/guides/driveway-cleaning-cost-uk.html`, `/guides/pressure-washing-guide.html`
   - Info pages: `/pricing.html`, `/quote.html`, `/faq.html`

### Day 2 (Feb 13, 2026)
3. Request indexing for next 10 pages:
   - Area pages: `/areas/horley.html`, `/areas/crawley.html`, `/areas/dorking.html`
   - Service pages: `/block-paving-cleaning.html`, `/render-cleaning.html`, `/decking-cleaning.html`
   - Guides: `/guides/patio-cleaning-cost-uk.html`, `/guides/moss-removal-from-driveways.html`
   - Info pages: `/areas.html`, `/guides.html`

### Day 3 (Feb 14, 2026)
4. Request indexing for remaining priority pages:
   - Area pages: `/areas/banstead.html`, `/areas/epsom.html`, `/areas/caterham.html`
   - Guides: `/guides/block-paving-cleaning-cost-uk.html`, `/guides/how-often-clean-driveway.html`
   - Any remaining high-value pages

### Week 2 (Feb 18-24, 2026)
5. Check GSC for redirect validation status
6. If still failing, click "Validate Fix" in GSC Coverage report
7. Monitor indexing progress - expect 10-20 pages indexed by now

### Week 3 (Feb 25 - Mar 3, 2026)
8. Submit to 3-5 free directories (see DIRECTORY-SUBMISSION-CHECKLIST.md)
9. Check GSC - expect 30-40 pages indexed
10. Review GSC Performance tab for first organic clicks

---

## 🔍 How to Monitor Progress

### Google Search Console (Check Weekly)
1. **Coverage Report**:
   - Path: Indexing → Coverage
   - Look for: "Discovered" → "Valid" transitions
   - Target: 45+ indexed pages by March 1

2. **URL Inspection**:
   - Test any URL to see current index status
   - Shows: Last crawl date, indexing status, canonical URL

3. **Performance Report**:
   - Path: Performance → Search Results
   - Look for: Impressions increasing (currently 205/28 days)
   - Target: 500+ impressions/28 days by March 1

### Quick Test Commands (From Terminal)
```bash
# Verify /guides/ redirect (should return 308)
curl -I https://samedayjetwash.com/guides/

# Verify /index.html redirect (should return 308)
curl -I https://samedayjetwash.com/index.html

# Verify www redirect (should return 308 to non-www)
curl -I https://www.samedayjetwash.com/

# Check if page is being served correctly
curl -I https://samedayjetwash.com/areas/redhill.html
```

---

## 📝 Notes

- **Canonical tags**: ✅ All 50 pages have correct canonicals (verified Feb 11)
- **Redirects**: ✅ All redirects working (verified Feb 11)
- **Sitemap**: ✅ Updated Feb 8, 56 URLs
- **Internal links**: ✅ 200+ contextual links added Phase 4
- **Schema markup**: ✅ FAQPage, Article, HomeAndConstructionBusiness on all relevant pages

**Conclusion**: Site is technically sound. The GSC issues are mostly timing-related and will resolve as Google re-crawls. The only critical fix needed was the `/guides/` redirect, which is now deployed.

---

**Created**: 2026-02-11
**Next Review**: 2026-02-18 (check redirect validation status)
