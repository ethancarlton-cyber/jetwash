# JetWash SEO Deep Analysis & Strategy

**Analysis Date:** 2026-01-19
**Current Position:** Avg. position 45.2, 205 impressions, 0 clicks (28 days)
**Target:** Top 10 for primary local keywords within 90 days

---

## Executive Summary

The JetWash site has solid foundations but is missing critical elements for local SEO success. The biggest gaps are:

1. **No Google Business Profile** - This alone accounts for 32% of local pack ranking
2. **No visible phone number** - Reduces trust and conversion
3. **No physical address** - Hurts local relevance signals
4. **Limited location pages** - Only 10 areas, competitors have more
5. **No reviews** - Reviews account for 15%+ of local ranking

---

## Part 1: Current State Audit

### What We Have (Strengths)
| Element | Status | Notes |
|---------|--------|-------|
| SSL Certificate | Yes | HTTPS enabled |
| Mobile Responsive | Yes | Good mobile design |
| LocalBusiness Schema | Yes | Basic implementation |
| FAQ Schema | Yes | On service pages |
| Service Pages | 6 pages | All core services covered |
| Location Pages | 10 pages | Redhill, Reigate, Horley, Dorking, Banstead, Crawley, Epsom, Caterham, Oxted, Leatherhead |
| Guide Content | 12 pages | Good long-form content |
| Sitemap | Yes | 31 URLs submitted |
| Google Analytics | Yes | GA4 configured |
| Images | Yes | Service + before/after images |

### What's Missing (Critical Gaps)
| Element | Status | Priority |
|---------|--------|----------|
| Google Business Profile | Missing | CRITICAL |
| Phone Number on Site | Hidden | CRITICAL |
| Physical/Service Address | Missing | HIGH |
| Bing Places | Missing | HIGH |
| Apple Maps Listing | Missing | MEDIUM |
| GeoCoordinates in Schema | Missing | HIGH |
| Aggregate Rating Schema | Missing | MEDIUM |
| Review Strategy | None | HIGH |
| Internal Linking Strategy | Weak | MEDIUM |
| Page Speed Optimization | Not tested | MEDIUM |

---

## Part 2: Competitor Analysis

### Top Competitors in Redhill/Reigate Market

| Competitor | Strengths | Weaknesses |
|------------|-----------|------------|
| **Jet Wash Surrey** | Strong location pages, block paving specialist | Limited content marketing |
| **Hydro Pressure Clean** | Eco-friendly positioning, multiple Redhill pages | Less established |
| **High Pressure Cleaning** | 30+ years, 300 Checkatrade reviews | Older website |
| **Genius Cleaning** | Transparent pricing, multi-service | Generic content |

### Competitive Advantages We Can Build
1. **Same-day service** - Unique USP, not emphasized enough
2. **2-hour callback guarantee** - Strong differentiator
3. **Content quality** - Our guides are comprehensive
4. **Fresh, modern website** - Better UX than most competitors
5. **AI-generated imagery** - Consistent visual branding

### Gaps vs Competitors
1. No Checkatrade/TrustATrader presence
2. No reviews anywhere
3. No video content
4. Fewer location pages than some competitors
5. No pricing information (some competitors show this)

---

## Part 3: Local SEO Strategy

### 3.1 Google Business Profile (Priority: CRITICAL)

**Why:** GBP accounts for 32% of local pack ranking. Without it, we're invisible in the map pack.

**Action Items:**
1. Create GBP listing for "Same Day JetWash Reigate"
2. Category: "Pressure Washing Service" (primary)
3. Secondary categories: "Cleaning Service", "Driveway Cleaning Service"
4. Add all service areas (don't just put a radius)
5. Upload 20+ photos (service images, before/after, team)
6. Write complete business description (750 characters)
7. Add all services with descriptions
8. Set business hours (Mon-Sat 8am-6pm, Sun 9am-5pm)
9. Enable messaging
10. Create weekly posts (offers, tips, completed jobs)

**Verification:**
- Can verify by postcard, phone, or email depending on eligibility
- If no physical address, use "Service Area Business" setting

### 3.2 NAP Consistency (Priority: CRITICAL)

**NAP = Name, Address, Phone - Must be IDENTICAL everywhere**

**Recommended NAP:**
```
Name: Same Day JetWash Reigate
Address: Redhill, Surrey RH1 (service area)
Phone: [NEED TO ADD - currently hidden]
Website: https://jetwash-psi.vercel.app
```

**Decision Needed:**
- Does the business have a physical address to use?
- If home-based, can use "Service Area Business" without street address
- Phone number MUST be added to website

### 3.3 Citation Building (Priority: HIGH)

**Phase 1 - Essential (Week 1-2):**
| Directory | Status | Action |
|-----------|--------|--------|
| Google Business Profile | Not done | Create |
| Bing Places | Not done | Create |
| Apple Maps | Not done | Create |
| Yell.com | Not done | Submit |
| Facebook Business | Not done | Create |
| Checkatrade | Not done | Apply (requires vetting) |

**Phase 2 - Trade Directories (Week 3-4):**
- TrustATrader
- MyBuilder
- Bark.com
- RatedPeople
- Which? Trusted Traders

**Phase 3 - General Directories (Week 5-8):**
- Thomson Local
- FreeIndex
- 192.com
- Scoot
- Cylex UK
- Hotfrog UK
- Brown Book

**Target:** 50 quality citations with perfect NAP consistency

### 3.4 Review Generation Strategy (Priority: HIGH)

**The Problem:** Zero reviews = zero social proof = low conversion

**Strategy:**
1. **At Job Completion:**
   - Ask verbally for review
   - Hand out card with QR code linking to Google review

2. **24-48 Hours Post-Job:**
   - Send thank you email with direct review link
   - SMS with review link (if mobile number collected)

3. **One Week Later:**
   - Follow-up email if no review yet

4. **Review Link Format:**
   ```
   https://search.google.com/local/writereview?placeid=[PLACE_ID]
   ```

**What NOT to Do:**
- No incentives (discounts, cash for reviews)
- No fake reviews
- No friends/family reviews

**Target:** 10 reviews in first month, 30 by month 3

---

## Part 4: On-Page SEO Optimization

### 4.1 Schema Markup Enhancements

**Current Schema:** LocalBusiness (basic)

**Enhanced Schema to Add:**

```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Same Day JetWash Reigate",
  "telephone": "+44-XXXX-XXXXXX",
  "email": "info@example.com",
  "url": "https://jetwash-psi.vercel.app",
  "logo": "https://jetwash-psi.vercel.app/images/logo.png",
  "image": "https://jetwash-psi.vercel.app/images/og-image.jpg",
  "description": "Same-day professional pressure washing in Surrey...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Redhill",
    "addressRegion": "Surrey",
    "postalCode": "RH1",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "51.2400",
    "longitude": "-0.1700"
  },
  "areaServed": [
    {"@type": "City", "name": "Redhill", "containedIn": "Surrey"},
    {"@type": "City", "name": "Reigate", "containedIn": "Surrey"},
    {"@type": "City", "name": "Horley", "containedIn": "Surrey"},
    {"@type": "City", "name": "Dorking", "containedIn": "Surrey"},
    {"@type": "City", "name": "Banstead", "containedIn": "Surrey"},
    {"@type": "City", "name": "Crawley", "containedIn": "West Sussex"},
    {"@type": "City", "name": "Epsom", "containedIn": "Surrey"},
    {"@type": "City", "name": "Caterham", "containedIn": "Surrey"},
    {"@type": "City", "name": "Oxted", "containedIn": "Surrey"},
    {"@type": "City", "name": "Leatherhead", "containedIn": "Surrey"}
  ],
  "priceRange": "££",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Pressure Washing Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Driveway Cleaning"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Patio Cleaning"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Block Paving Cleaning"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Render Cleaning"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Decking Cleaning"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Commercial Pressure Washing"}}
    ]
  }
}
```

### 4.2 Title Tag Optimization

**Current Titles vs Optimized:**

| Page | Current | Optimized |
|------|---------|-----------|
| Homepage | Same Day Jetwashing Redhill & Reigate \| 2-Hour Callback \| Free Quote | Same Day Jet Washing Redhill & Reigate \| 2hr Callback Guarantee |
| Driveway | Driveway Cleaning Redhill, Reigate & Surrey \| Professional Pressure Washing | Driveway Cleaning Redhill & Reigate \| From £X \| Same Day Service |
| Patio | Patio Cleaning Redhill, Reigate & Surrey \| Black Spot & Moss Removal | Patio Cleaning Surrey \| Black Spot Removal \| Free Quote |

**Title Tag Best Practices:**
- 50-60 characters max
- Primary keyword first
- Location included
- USP/differentiator
- No keyword stuffing

### 4.3 Internal Linking Strategy

**Current:** Minimal cross-linking between pages

**Improved Strategy:**
1. Every service page links to 2-3 related services
2. Every location page links to all services
3. Every guide links to relevant service page
4. Homepage links to all services with anchor text
5. Add "Related Guides" section to service pages
6. Add breadcrumb navigation

**Example Internal Links to Add:**
- Driveway page → Block Paving page, Oil Stain Guide
- Patio page → Indian Sandstone Guide, Black Spot FAQ
- Location pages → All services + relevant guides

### 4.4 Content Gaps to Fill

**New Location Pages Needed:**
| Town | Postcode | Priority |
|------|----------|----------|
| Merstham | RH1 | High (close to Redhill) |
| Earlswood | RH1 | High |
| Salfords | RH1 | Medium |
| South Park | RH2 | Medium |
| Woodhatch | RH2 | Medium |
| Nutfield | RH1 | Medium |
| Chipstead | CR5 | Medium |
| Coulsdon | CR5 | Medium |
| Purley | CR8 | Medium |
| Warlingham | CR6 | Medium |

**New Guide Content:**
1. "Pressure Washing Prices Surrey 2026" (high search volume)
2. "How to Choose a Pressure Washing Company"
3. "Commercial Pressure Washing for Surrey Businesses"
4. "Seasonal Driveway Maintenance Calendar"
5. "Block Paving Sanding and Sealing Guide"

---

## Part 5: Technical SEO

### 5.1 Page Speed Optimization

**Actions:**
1. Compress all images (currently ~2MB each, should be ~200KB)
2. Convert images to WebP format
3. Enable browser caching via Vercel config
4. Minify CSS/JS
5. Preload critical resources

**Target Metrics:**
- LCP: < 2.5 seconds
- INP: < 200ms
- CLS: < 0.1

### 5.2 Mobile Optimization

**Checklist:**
- [ ] Click-to-call button (needs phone number)
- [ ] Tap targets 48px minimum
- [ ] Form fields properly sized
- [ ] Font size 16px minimum
- [ ] No horizontal scroll

### 5.3 Core Web Vitals Audit

Run audit at:
- PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

---

## Part 6: Off-Page SEO

### 6.1 Local Link Building Opportunities

| Source | Type | Difficulty |
|--------|------|------------|
| Surrey Chamber of Commerce | Membership | Easy |
| Local news sites (Surrey Live) | PR/News | Medium |
| Home improvement blogs | Guest post | Medium |
| Supplier websites | Link exchange | Easy |
| Local business associations | Membership | Easy |
| Charity sponsorships | Donation | Easy |
| Local events | Sponsorship | Medium |

### 6.2 Social Signals

**Platforms to Establish:**
1. **Facebook Business Page** - Essential for local visibility
2. **Instagram** - Before/after photos perform well
3. **Nextdoor** - Highly valuable for local services
4. **YouTube** - Process videos, time-lapses

**Content Ideas:**
- Before/after transformations
- Time-lapse cleaning videos
- Tips and maintenance advice
- Seasonal promotions

---

## Part 7: Tracking & Measurement

### KPIs to Track

| Metric | Current | 30-Day Target | 90-Day Target |
|--------|---------|---------------|---------------|
| GSC Impressions | 205 | 500 | 2,000 |
| GSC Clicks | 0 | 20 | 100 |
| Avg Position | 45.2 | 30 | 15 |
| Indexed Pages | 31 | 45 | 60 |
| GBP Views | 0 | 200 | 1,000 |
| Reviews | 0 | 10 | 30 |
| Citations | ~5 | 25 | 50 |

### Tools to Use
- Google Search Console (set up)
- Google Analytics 4 (set up)
- Google Business Profile Insights
- BrightLocal or Whitespark (citation tracking)
- Rank tracker (SEMrush, Ahrefs, or free alternative)

---

## Part 8: Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
**CRITICAL - Must complete before anything else**

- [ ] Add phone number to website header
- [ ] Create Google Business Profile
- [ ] Create Bing Places listing
- [ ] Submit to Yell.com
- [ ] Create Facebook Business Page
- [ ] Update schema with GeoCoordinates
- [ ] Add click-to-call functionality

### Phase 2: Content & Technical (Week 3-4)

- [ ] Create 5 new location pages
- [ ] Add internal links throughout site
- [ ] Optimize all title tags
- [ ] Compress all images
- [ ] Add breadcrumb navigation
- [ ] Create 2 new guide articles

### Phase 3: Citations & Reviews (Week 5-8)

- [ ] Submit to 20+ directories
- [ ] Apply for Checkatrade
- [ ] Apply for TrustATrader
- [ ] Implement review request system
- [ ] Create review QR code/cards
- [ ] Get first 10 reviews

### Phase 4: Authority Building (Month 3+)

- [ ] Guest post on local blog
- [ ] Create video content
- [ ] Build local backlinks
- [ ] Expand to 20 location pages
- [ ] Create seasonal content
- [ ] Monitor and adjust strategy

---

## Quick Wins (Do This Week)

1. **Add phone number to header** - Increases trust immediately
2. **Create Google Business Profile** - Most impactful single action
3. **Submit sitemap to Bing** - Easy, often overlooked
4. **Add GeoCoordinates to schema** - 5-minute change
5. **Compress images** - Improve page speed

---

## Conclusion

The JetWash site has good content and design but is missing fundamental local SEO elements. The biggest opportunity is creating and optimizing a Google Business Profile - this single action could dramatically improve local visibility.

The "same day service" and "2-hour callback guarantee" are strong USPs that competitors don't match. These should be emphasized more prominently in GBP, titles, and content.

With proper execution of this strategy, achieving top 10 rankings for primary local keywords within 90 days is realistic, with significant improvements visible within 30 days.

---

**Next Step:** Review this analysis and decide on phone number/address details, then begin Phase 1 implementation.
