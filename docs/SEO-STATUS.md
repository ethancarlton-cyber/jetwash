# JetWash SEO Status & Next Steps

**Last Updated:** 2026-01-19

## Current Status: Phase 1-3 Complete

### Google Search Console Stats (Before - 28 days ending Jan 18, 2026)
- Impressions: 205
- Clicks: 0
- Average Position: 45.2

---

## Completed Tasks

### Phase 1: Technical Fixes
- [x] Fixed postcode validation (added CR, SM, KT prefixes)
- [x] Updated sitemap dates to 2026-01-18
- [x] Added Google Analytics 4 (G-YSH4MVSPDJ) to all 31 pages
- [x] Verified GA4 is receiving data (Realtime confirmed working)

### Phase 2: Content Improvements
- [x] Added FAQ sections with JSON-LD schema to all 6 service pages:
  - driveway-cleaning.html
  - patio-cleaning.html
  - block-paving-cleaning.html
  - render-cleaning.html
  - decking-cleaning.html
  - commercial-jetwashing.html
- [x] Added Related Services sections to service pages
- [x] Expanded 3 existing guide pages to 1500+ words

### Phase 3: New Content
- [x] Created 3 new long-tail keyword guide pages:
  - guides/how-to-clean-indian-sandstone-patio.html
  - guides/moss-removal-from-driveways.html
  - guides/pressure-washer-hire-vs-professional.html

### Phase 4: Images
- [x] Generated 8 service images using OpenRouter API (Gemini 3 Pro)
- [x] Generated 5 before/after images using Nano Banana model
- [x] Created OG image for social sharing

---

## Next Steps (Manual Tasks)

### Immediate (This Week)

#### 1. Submit Sitemap to Google Search Console
1. Go to https://search.google.com/search-console
2. Select property: jetwash-psi.vercel.app
3. Navigate to: Indexing > Sitemaps
4. Enter: `sitemap.xml`
5. Click Submit

#### 2. Request Indexing for Key Pages
In GSC, go to URL Inspection and request indexing for:
- Homepage: https://jetwash-psi.vercel.app/
- New guides (priority):
  - /guides/how-to-clean-indian-sandstone-patio.html
  - /guides/moss-removal-from-driveways.html
  - /guides/pressure-washer-hire-vs-professional.html

### This Month

#### 3. Directory Submissions (Priority 1)
See: [DIRECTORY-SUBMISSION-CHECKLIST.md](./DIRECTORY-SUBMISSION-CHECKLIST.md)

Start with these free high-authority directories:
- [ ] Yell.com - https://www.yell.com/free-listing/
- [ ] FreeIndex - https://www.freeindex.co.uk/
- [ ] Yelp UK - https://biz.yelp.co.uk/
- [ ] Cylex UK - https://www.cylex-uk.co.uk/
- [ ] Thomson Local - https://www.thomsonlocal.com/

#### 4. Google Business Profile
- [ ] Create/claim Google Business Profile for "Same Day JetWash Reigate"
- [ ] Add all service areas
- [ ] Upload before/after photos
- [ ] Add services with descriptions

### Ongoing

#### 5. Monitor & Iterate
- Check GSC weekly for:
  - New impressions/clicks
  - Position changes
  - Crawl errors
  - Index coverage
- Check GA4 for:
  - Traffic sources
  - Top landing pages
  - User behavior

---

## Key Metrics to Track

| Metric | Current | Target (30 days) | Target (90 days) |
|--------|---------|------------------|------------------|
| Impressions | 205 | 500+ | 2,000+ |
| Clicks | 0 | 10+ | 50+ |
| Avg Position | 45.2 | 30 | 15 |
| Indexed Pages | ~20 | 31 | 35+ |

---

## Technical Details

### Analytics
- **GA4 Measurement ID:** G-YSH4MVSPDJ
- **Stream ID:** 13326844393
- **Tracking file:** js/analytics.js

### Site Structure
- **Total pages:** 31
- **Service pages:** 6
- **Location pages:** 10
- **Guide pages:** 12
- **Other pages:** 3 (pricing, faq, quote)

### Schema Markup Implemented
- LocalBusiness (all pages)
- FAQPage (service pages)
- Service (service pages)
- Article (guide pages)
- BreadcrumbList (all pages)

---

## Resources

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Directory Submission Checklist](./DIRECTORY-SUBMISSION-CHECKLIST.md)
- [Live Site](https://jetwash-psi.vercel.app/)
