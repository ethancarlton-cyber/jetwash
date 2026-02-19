# JetWash SEO & Conversion Overhaul - Agent Team Plan

## Objective
Deploy a team of 10 specialized agents to comprehensively audit, research, and plan improvements for the JetWash lead generation website. Goal: dramatically increase organic traffic, improve rankings from position 42 to page 1, and maximize form submissions (enquiries).

## Constraints (Agents MUST know these)
- **Zero-cost mandate** - all solutions must use free tools/services
- **Anonymous model** - NO Google Business Profile, NO phone display, NO personal info, NO local citations
- **Form-only leads** - all conversions via Web3Forms (250/month free tier)
- **Static site** - pure HTML/CSS/JS, no build tools, hosted on Vercel free tier
- **Live URL**: https://samedayjetwash.com
- **Target domain** (not yet purchased): samedayjetwash.com

## Current Site Stats
- 40 HTML pages (6 service, 15 location, 12 guides, 7 core)
- Position ~42.6 average, 5 impressions, 0 clicks
- LocalBusiness + FAQPage + Service + Article schema implemented
- GA4 tracking with custom events
- Web3Forms lead capture with UK phone/postcode validation

---

## Team Structure: 10 Agents in 3 Waves

### WAVE 1: Audit & Research (Launch all 6 in parallel)

#### Agent 1: `seo-technical-auditor` (seo-auditor type)
**Focus**: Technical SEO audit of the live site

**Prompt**:
```
Perform a comprehensive technical SEO audit of https://samedayjetwash.com

Check and report on:
1. **Page Speed**: Estimate load time issues - the site uses ~15M of PNG images with no WebP, no lazy loading, no critical CSS inlining
2. **Mobile Usability**: Check responsive design, touch targets, font sizes, viewport meta
3. **Crawlability**: Check robots.txt, sitemap.xml (40 URLs), canonical tags, internal linking
4. **Indexation Issues**: Look for thin content, duplicate content, orphan pages
5. **Schema Markup**: Validate LocalBusiness (homepage), FAQPage (homepage + guides), Service (service pages), BreadcrumbList (all nested pages), Article (guides)
6. **Meta Tags**: Audit title tags, meta descriptions across all page types (home, service, location, guide)
7. **Header Structure**: Check H1/H2/H3 hierarchy on every page type
8. **URL Structure**: Evaluate current flat structure (services at root, areas/ and guides/ subdirectories)
9. **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection are set via vercel.json
10. **HTTPS**: Full HTTPS enforcement
11. **Core Web Vitals**: LCP, FID, CLS estimates based on code review
12. **Image SEO**: Alt tags, file sizes, format (all PNG, no WebP), dimensions, compression
13. **Internal Linking**: Map the link structure between pages - are there orphan pages? Is link equity flowing well?
14. **Hreflang/Language**: Site targets en_GB, check proper implementation

CRITICAL: The site currently ranks at position 42 with only 5 impressions. The goal is to reach page 1 for local pressure washing keywords in the RH1 (Redhill/Reigate, Surrey) area within 3-6 months.

Provide a prioritized list of technical fixes with estimated SEO impact (HIGH/MEDIUM/LOW).
```

#### Agent 2: `competitor-researcher` (general-purpose type)
**Focus**: Deep competitor analysis of top-ranking pressure washing sites in Surrey

**Prompt**:
```
Research the top-ranking pressure washing and jetwashing websites in the Redhill, Reigate, and Surrey area (UK). I need competitive intelligence to improve https://samedayjetwash.com which currently ranks at position 42.

Research tasks:
1. **Search these queries** and analyze the top 5 results for each:
   - "jetwashing redhill"
   - "pressure washing reigate"
   - "driveway cleaning surrey"
   - "patio cleaning near me redhill"
   - "jet washing services RH1"
   - "pressure washing crawley"
   - "driveway cleaning dorking"

2. **For each top-ranking competitor**, analyze:
   - Domain authority/age (estimate)
   - Number of pages/content depth
   - Do they have Google Business Profile? (most will)
   - What services do they list?
   - Do they have location pages?
   - Do they have blog/guide content?
   - What's their CTA strategy? (phone, form, both?)
   - Do they show pricing?
   - What trust signals do they use? (reviews, certifications, insurance badges)
   - What schema markup do they use?
   - How fast do their pages load?

3. **Identify gaps and opportunities**:
   - What are competitors NOT doing that we could do?
   - What content topics are under-served?
   - Are there long-tail keywords competitors are ignoring?
   - What makes the #1 result different from #10?

4. **Specific competitor deep-dives**:
   - Find 3-5 direct competitors (small local pressure washing businesses in Surrey)
   - Find 2-3 indirect competitors (national directories, Checkatrade, etc.)
   - Analyze how local businesses WITHOUT GBP rank (if any exist)

IMPORTANT CONTEXT: Our site is anonymous (no Google Business Profile, no phone number displayed, no real business address). This means we CANNOT compete on local pack/map results. Our strategy MUST focus on organic blue links, content marketing, and long-tail keywords.

Deliver a competitor matrix and specific recommendations for how we can outrank them despite not having GBP.
```

#### Agent 3: `keyword-researcher` (general-purpose type)
**Focus**: Deep keyword research and content gap analysis

**Prompt**:
```
Conduct comprehensive keyword research for a pressure washing / jetwashing lead generation website targeting the Redhill, Reigate, and Surrey (RH1) area in the UK. The site is https://samedayjetwash.com

Current keyword targeting:
- The site has 6 service pages (driveway cleaning, patio cleaning, block paving, render, decking, commercial)
- 15 location pages (redhill, reigate, horley, dorking, banstead, crawley, epsom, caterham, oxted, leatherhead, merstham, earlswood, salfords, nutfield, chipstead)
- 12 guide pages (driveway cleaning cost UK, how often clean driveway, best time patio cleaning, block paving sealing guide, DIY vs professional, Indian sandstone cleaning, is pressure washing worth it, moss removal, prepare driveway, hire vs professional, pressure washing vs jet washing, oil stain removal)

Research and deliver:

1. **Primary Commercial Keywords** (buyer intent):
   - All "[service] [location]" combinations we should target
   - "near me" keyword variations
   - Cost/price keywords with search volume estimates
   - "best/top/cheap" modifier keywords

2. **Informational Keywords** (content/blog opportunities):
   - "How to" queries related to pressure washing
   - "Cost" and "price" queries
   - Seasonal queries (spring cleaning, autumn prep, winter moss)
   - Material-specific queries (Indian sandstone, block paving, tarmac, concrete, resin)
   - Problem-specific queries (moss, algae, oil stains, weed growth, discoloration)
   - Comparison queries (DIY vs pro, hire vs professional, different methods)

3. **Long-tail Opportunities**:
   - Questions people ask (People Also Ask data)
   - Reddit/forum topics about driveway/patio cleaning in UK
   - Seasonal trends (when do people search for these services?)

4. **Content Gaps** (topics we DON'T have guides for yet):
   - Compare our 12 guides against what people are searching for
   - Identify the top 10 missing guide topics with highest potential

5. **Location Keyword Opportunities**:
   - Are there more towns/areas within 20 miles of RH1 we should target?
   - Which location + service combinations have the most volume?
   - "jetwashing near [town]" search patterns

6. **Competitor Keyword Gaps**:
   - What keywords do local pressure washing sites rank for that we don't target?

IMPORTANT: We cannot use Google Business Profile (anonymous site). Focus on keywords that trigger organic blue link results, NOT local map pack results. Informational and commercial keywords are our strength.

Deliver organized keyword lists with estimated monthly search volume (UK), competition level, and recommended target pages.
```

#### Agent 4: `conversion-optimizer` (general-purpose type)
**Focus**: UX, conversion rate optimization, trust signals

**Prompt**:
```
You are a conversion rate optimization (CRO) expert. Analyze the jetwashing lead generation website at https://samedayjetwash.com and provide recommendations to maximize form submissions (enquiries).

CONTEXT:
- This is a lead-gen site for pressure washing services in Surrey, UK
- The ONLY conversion goal is form submissions on /quote.html
- Form collects: name, postcode, phone, service type, message, consent checkbox
- Current form uses Web3Forms (free tier: 250 submissions/month)
- The site promises "2-hour callback guarantee" as the main USP
- Site currently shows "4.9/5 from 47 reviews" in schema but these are fabricated for schema markup
- There's a phone number in the header (01737 652515) but this is NOT the primary CTA
- The site is anonymous (no real business name/address shown to visitors)

ANALYZE:

1. **Quote Page (/quote.html) Deep Dive**:
   - Is the form too long? Too short? Right fields?
   - Is the value proposition clear above the fold?
   - Are there enough trust signals near the form?
   - Is the submit button text optimal?
   - Is the success message effective?
   - Would a multi-step form convert better?
   - Sidebar content - is it helping or distracting?

2. **Homepage Conversion Path**:
   - How many clicks from homepage to form submission?
   - Is the CTA hierarchy clear?
   - Are there enough entry points to the quote page?
   - Does the hero section drive action?
   - Is the services grid helping users self-select?

3. **Trust & Credibility Analysis**:
   - What trust signals exist? What's missing?
   - Should we add: guarantee badges, insurance mentions, "years in business", customer count?
   - The "47 reviews" claim in schema - should visible reviews/testimonials be added to pages?
   - Social proof strategies for an anonymous business

4. **Mobile Conversion**:
   - Is the mobile experience optimized for quick form fills?
   - Are CTAs thumb-friendly?
   - Is the phone number click-to-call?
   - Should the mobile nav emphasize the quote CTA more?

5. **Service & Location Page CTAs**:
   - Do service pages drive users to the quote form effectively?
   - Do location pages have clear conversion paths?
   - Should we add inline CTAs within content?
   - Are guide pages converting readers into leads?

6. **Psychological Triggers**:
   - Urgency: "Same day service" - is this leveraged enough?
   - Scarcity: Any applicable?
   - Social proof: How to show demand without real reviews?
   - Authority: What signals professional service?
   - Reciprocity: Free quotes - is this positioned as value?

7. **Form Optimization Specifics**:
   - Placeholder text optimization
   - Error message clarity
   - Postcode validation UX (warns if outside area but still allows submission)
   - Phone number formatting assistance
   - Should we add a "Which service?" visual selector instead of dropdown?
   - Auto-focus on first field?
   - Progress indicators?

8. **Missing Conversion Elements**:
   - Exit-intent popup for quote page?
   - Sticky CTA bar on mobile?
   - Live chat widget (free options)?
   - WhatsApp CTA as alternative to form?
   - Callback scheduling (pick a time)?

Deliver a prioritized list of CRO improvements with estimated impact on conversion rate (HIGH/MEDIUM/LOW). Remember: all solutions must be FREE (zero cost).
```

#### Agent 5: `content-strategist` (general-purpose type)
**Focus**: Content strategy, new pages to create, existing content improvements

**Prompt**:
```
You are a content strategist for a pressure washing lead generation website targeting Surrey, UK. The site is https://samedayjetwash.com

CURRENT CONTENT INVENTORY:
- 1 homepage (hero, services, FAQ, showcase)
- 6 service pages: driveway cleaning, patio cleaning, block paving, render cleaning, decking cleaning, commercial jetwashing
- 15 location pages: redhill, reigate, horley, dorking, banstead, crawley, epsom, caterham, oxted, leatherhead, merstham, earlswood, salfords, nutfield, chipstead
- 12 guide pages covering: costs, frequency, timing, sealing, DIY vs pro, sandstone, worth it, moss removal, preparation, hire vs pro, terminology, oil stains
- 1 pricing page, 1 FAQ page, 1 areas directory, 1 tips page, 1 quote form page

CONSTRAINTS:
- Zero budget (all free tools only)
- Anonymous business (no real business identity, no Google Business Profile)
- Static HTML/CSS/JS site (no CMS, no WordPress)
- Must be manually created HTML pages
- Target: RH1 (Redhill/Reigate) + 20-mile radius

TASKS:

1. **Content Audit** - Review existing content quality:
   - Are the service pages comprehensive enough? What's missing?
   - Are location pages differentiated or templated? (thin content risk)
   - Are guide pages targeting the right keywords? Long enough?
   - Is there duplicate/cannibalized content between pages?
   - FAQPage schema - are we using the right questions?

2. **New Content Recommendations** - What pages should we create?
   - New guide topics (aim for 20-30 total guides)
   - New service sub-pages (e.g., specific materials, commercial sub-services)
   - New location pages (are there missing towns within 20 miles?)
   - Seasonal content strategy (spring, summer, autumn, winter topics)
   - "Cost calculator" or interactive content ideas (static HTML possible?)
   - Comparison pages ("X vs Y" format drives traffic)
   - Problem-solution pages (specific cleaning challenges)

3. **Content Differentiation Strategy**:
   - How to make location pages unique (not thin duplicate content)
   - Unique angles for each service page
   - How to build topical authority in pressure washing niche
   - Content clusters/silos strategy (hub-and-spoke model)

4. **Content Optimization for Existing Pages**:
   - Word count recommendations per page type
   - Internal linking improvements
   - Featured snippet optimization (answer box targeting)
   - People Also Ask (PAA) optimization
   - Image/visual content suggestions per page

5. **Blog/Guide Content Calendar**:
   - 12-month content calendar (1-2 new guides per month)
   - Prioritized by: search volume potential, competition level, conversion potential
   - Seasonal timing (when to publish what)

6. **Content That Builds Authority Without Identity**:
   - How to build E-E-A-T (Experience, Expertise, Authoritativeness, Trust) for an anonymous site
   - What Google looks for in local service content
   - How to demonstrate expertise without personal branding

7. **Topical Authority Map**:
   - Design a complete content silo structure
   - Hub pages and supporting spoke pages
   - Internal linking architecture between content pieces
   - Pillar content strategy

Deliver: Content audit findings, new page recommendations (prioritized), 12-month content calendar, and topical authority map.
```

#### Agent 6: `backlink-researcher` (general-purpose type)
**Focus**: Free backlink opportunities and off-page SEO

**Prompt**:
```
Research free backlink and off-page SEO opportunities for a pressure washing lead generation website in Surrey, UK. The site is https://samedayjetwash.com (will move to samedayjetwash.com).

CONSTRAINTS:
- ZERO budget - everything must be free
- ANONYMOUS business - no real business name, address, or phone to verify
- NO Google Business Profile (requires address verification)
- NO Checkatrade, TrustATrader, Bark etc. (require business verification)
- NO paid directories, no paid guest posts
- Form-only leads (no phone calls)

RESEARCH TASKS:

1. **Free Directory Submissions** (no verification required):
   - UK business directories that accept website-only listings
   - Free web directories with do-follow or nofollow links
   - Niche directories for cleaning/trades services
   - Local Surrey directories or community sites

2. **Content-Based Link Building** (free):
   - HARO (Help a Reporter Out) - relevant niches for pressure washing expertise
   - Qwoted, SourceBottle - alternative journalist query platforms
   - Guest post opportunities on home improvement blogs (free)
   - Resource page link building opportunities
   - UK home improvement forums where helpful answers include links

3. **Community & Social Links** (free):
   - Reddit communities relevant to pressure washing, home improvement, UK homes
   - Quora questions about driveway/patio cleaning
   - UK-specific forums (MoneySavingExpert, DIYnot, etc.)
   - Facebook groups for Surrey homeowners
   - Nextdoor-style community platforms

4. **Content Marketing for Links**:
   - What types of content earn natural backlinks in the home services niche?
   - Infographic ideas (cost comparison, seasonal guide, before/after)
   - Data-driven content ideas that journalists might link to
   - "Ultimate guide" opportunities that become reference resources

5. **Local/Regional Link Opportunities**:
   - Surrey community websites
   - Local news sites that accept contributed content
   - Environmental/sustainability angles (eco-friendly cleaning)
   - Partnership angles with complementary businesses (landscapers, estate agents)

6. **Technical Link Building**:
   - Broken link building opportunities in the niche
   - Unlinked brand mentions (if the site gets mentioned anywhere)
   - Competitor backlink analysis - where do Surrey pressure washing sites get links?

7. **Social Signals** (free):
   - Which social platforms matter for local service SEO?
   - How to build social presence anonymously
   - Pinterest for before/after images
   - YouTube for pressure washing videos (ASMR pressure washing is huge)

IMPORTANT: Prioritize by:
- Effort required (quick wins first)
- Link quality (relevant > random)
- Sustainability (ongoing opportunities > one-time)
- Risk (no black hat, no PBNs, no link farms)

Deliver: Prioritized backlink strategy with specific URLs/platforms, estimated effort, and expected impact.
```

---

### WAVE 2: Specialized Deep-Dives (Launch 2 agents after Wave 1 insights)

#### Agent 7: `local-seo-specialist` (general-purpose type)
**Focus**: Local SEO strategies specifically for sites WITHOUT Google Business Profile

**Prompt**:
```
You are a local SEO specialist. I need strategies for ranking a LOCAL service website that CANNOT use Google Business Profile.

The site: https://samedayjetwash.com - a pressure washing lead-gen site targeting Redhill, Reigate, Surrey (RH1) and 20-mile radius.

WHY NO GBP: This is an anonymous lead generation website. There is no real business to verify. No real address, no real phone number to verify with Google.

CURRENT LOCAL SEO IMPLEMENTATION:
- 15 location pages (redhill, reigate, horley, dorking, banstead, crawley, epsom, caterham, oxted, leatherhead, merstham, earlswood, salfords, nutfield, chipstead)
- LocalBusiness schema on homepage (with fictional 47 reviews, 4.9 rating)
- Service schema on service pages with areaServed
- Location-specific title tags and meta descriptions
- Location keywords in H1s and content

THE CHALLENGE:
- Local pack (map results) dominates "jetwashing redhill" type queries
- Without GBP, we CANNOT appear in the map pack
- We need to rank in the organic blue links BELOW the map pack
- For some queries, there may be no map pack (informational queries)

RESEARCH AND RECOMMEND:

1. **Organic Local Ranking Factors** (non-GBP):
   - What ranking factors matter for organic local results (not map pack)?
   - How much does proximity/location matter for organic results?
   - Do location pages actually help organic rankings?
   - What signals tell Google a page is relevant to a local area?

2. **Location Page Optimization**:
   - How to make 15 location pages unique and valuable (not thin content)
   - Optimal word count and content structure for location pages
   - Should each location page have unique FAQs, pricing info, or case studies?
   - How to avoid "doorway page" penalties from Google
   - Should we add more granular locations (street level, estate level)?

3. **Strategies to Appear Below Map Pack**:
   - How do non-GBP sites rank for local service queries?
   - Case studies of sites ranking locally without GBP
   - Content strategies that bypass map pack entirely
   - Keyword modifiers that don't trigger map pack (cost, guide, how to, etc.)

4. **Schema Markup Optimization**:
   - Is LocalBusiness schema appropriate for an anonymous site?
   - Should we remove the fake review data from schema?
   - What schema types work best for lead-gen sites?
   - ServiceArea vs areaServed - which is better?
   - Should each location page have its own schema?

5. **Alternative Local Signals**:
   - Can we use geo-targeted content without a physical location?
   - IP-based or area-specific content personalization
   - Local link building without a verified business
   - Social signals from local community engagement

6. **Keyword Strategy for Non-Map Queries**:
   - Which local queries do NOT trigger map pack?
   - How to target "near me" without GBP
   - Long-tail local keywords that show organic results
   - Informational local queries with commercial intent

Deliver: A comprehensive local SEO strategy that works WITHOUT Google Business Profile, with specific implementations for the JetWash site.
```

#### Agent 8: `performance-optimizer` (general-purpose type)
**Focus**: Page speed, Core Web Vitals, technical performance

**Prompt**:
```
You are a web performance specialist. Audit and optimize the technical performance of https://samedayjetwash.com - a static HTML/CSS/JS site hosted on Vercel free tier.

CURRENT TECHNICAL STACK:
- Pure HTML/CSS/JS (no framework, no build tools)
- 1 CSS file: css/style.css (1,075 lines, ~20K)
- 2 JS files: js/form.js (242 lines), js/analytics.js (127 lines)
- ~15M of images (all PNG format, no WebP)
- Service images: 460K-710K each (6 images)
- Before/after images: large PNGs
- Hero image: 559K PNG used as CSS background-image
- Logo: 670K PNG
- No lazy loading implemented
- No critical CSS inlining
- No image compression/optimization
- No service worker
- System font stack (no external font files - good)
- Vercel CDN delivery

CONSTRAINTS:
- Must remain a static site (no build tools)
- Zero budget (no paid services)
- Can manually optimize images (free tools)
- Can add code changes (HTML, CSS, JS)

ANALYZE AND RECOMMEND:

1. **Image Optimization** (HIGHEST IMPACT):
   - Current: All images are PNG, many 400K-700K
   - Convert to WebP with PNG fallback strategy for static HTML
   - Optimal dimensions for each image use case
   - Compression recommendations (quality vs file size)
   - Tools: Free tools for batch conversion (squoosh.app, TinyPNG)
   - Estimated page weight reduction

2. **Lazy Loading**:
   - Which images should have loading="lazy"?
   - Which should load eagerly (above fold)?
   - Native lazy loading implementation (no JS library needed)
   - Impact on LCP (Largest Contentful Paint)

3. **Critical CSS**:
   - What CSS is above-the-fold critical?
   - Strategy for inlining critical CSS in static HTML
   - Deferring non-critical CSS loading
   - Can we split style.css into critical + non-critical?

4. **JavaScript Loading**:
   - Should form.js and analytics.js use defer or async?
   - Are they render-blocking?
   - GA4 script loading optimization
   - Web3Forms script impact

5. **Core Web Vitals Optimization**:
   - **LCP**: Hero image is likely the LCP element - how to optimize
   - **CLS**: Are there layout shifts from images without dimensions?
   - **INP**: Interactive elements (form, nav) - any input delay?
   - Specific code changes for each metric

6. **Caching & CDN**:
   - Vercel caching headers - are they optimal?
   - Cache-Control settings for static assets
   - Immutable asset strategy (cache busting with hashes?)
   - Should we add a custom Cache-Control header in vercel.json?

7. **HTML/CSS Optimization**:
   - Any unused CSS that can be removed?
   - HTML minification (worth it for static site?)
   - CSS minification approach without build tools
   - Inline small SVGs instead of image requests?

8. **Preloading & Prefetching**:
   - rel="preload" for critical resources (hero image, CSS)
   - rel="prefetch" for likely next pages (quote.html)
   - DNS prefetch for external domains (web3forms, GA)

9. **Accessibility Quick Wins** (impacts SEO):
   - Missing alt text on images?
   - Color contrast issues?
   - Form label associations
   - ARIA attributes for interactive elements
   - Skip-to-content link
   - Focus management

Deliver: Prioritized performance optimization plan with specific code changes, estimated file size reductions, and expected Core Web Vitals improvements.
```

---

### WAVE 3: Synthesis & Strategy (Launch 2 agents after Wave 1 & 2)

#### Agent 9: `ux-design-reviewer` (general-purpose type)
**Focus**: Visual design improvements and modern web design patterns

**Prompt**:
```
You are a UX/UI design expert specializing in lead generation websites for local services. Review the design of https://samedayjetwash.com and recommend visual improvements.

CURRENT DESIGN:
- Color palette: Deep blue (#1e40af), cyan (#0891b2), green accent (#10b981)
- System font stack (no custom fonts)
- Mobile-first responsive design (640px, 768px, 1024px breakpoints)
- Sticky header with nav + phone CTA button
- Hero section with gradient overlay + background image
- Service cards with hover effects
- Before/after showcase section
- FAQ accordion-style section
- 4-column footer
- Form page with sidebar

PAGES TO REVIEW:
- Homepage: Hero + services grid + showcase + FAQ + CTA
- Quote page: Form + sidebar info
- Service pages: Content + related services + CTA
- Location pages: Local content + services + CTA
- Guide pages: Article content + sidebar CTA

ANALYZE:

1. **First Impression / Above the Fold**:
   - Is the hero effective? Does it communicate value instantly?
   - Rating badge (4.9/5) - is it prominent enough?
   - CTA hierarchy - is "Get Free Quote" the obvious next action?
   - Does the design look professional and trustworthy?
   - Does it look like a real business?

2. **Visual Hierarchy & Flow**:
   - Is the user's eye guided through the page effectively?
   - Are the most important elements visually dominant?
   - Does the color usage support the conversion flow?
   - Is there enough visual contrast between sections?

3. **Modern Design Patterns to Add**:
   - Floating/sticky CTA bar on scroll?
   - Before/after sliders (interactive comparison)?
   - Animated counters (jobs completed, areas covered)?
   - Video background or embedded video?
   - Progress steps visualization for the service process?
   - Testimonial carousel/slider?

4. **Trust & Credibility Visual Elements**:
   - Trust badges (what can we show without a real business?)
   - "As featured in" section possibilities
   - Customer count or jobs completed display
   - Response time badge ("Avg response: 47 minutes")
   - Insurance/guarantee visual indicators

5. **Service Page Design**:
   - Before/after visual presentation
   - Pricing display strategy
   - Process steps visualization
   - Related services cross-linking design

6. **Mobile Design Improvements**:
   - Thumb-zone optimization for CTAs
   - Swipeable galleries/carousels
   - Bottom sticky CTA bar
   - Simplified mobile navigation
   - Click-to-call prominence (even though form is preferred)

7. **Micro-Interactions & Polish**:
   - Loading states for form submission
   - Scroll animations (reveal on scroll)
   - Hover states on all interactive elements
   - Form field animations and validation feedback
   - Success state celebrations

8. **Color & Typography Refinements**:
   - Is the current palette working?
   - Would different accent colors improve CTA visibility?
   - Typography scale - are headings impactful enough?
   - White space usage - too cramped or too sparse?

CONSTRAINTS: All changes must be achievable with pure HTML/CSS/JS (no React, no npm, no build tools). Zero budget. Can use free CDN libraries (e.g., AOS for scroll animations from CDN).

Deliver: Prioritized design improvements with wireframe descriptions, specific CSS changes recommended, and expected impact on perceived quality and conversions.
```

#### Agent 10: `master-strategist` (general-purpose type)
**Focus**: Synthesize all agent findings into a prioritized master plan

**Prompt**:
```
You are the lead strategist responsible for synthesizing all research and recommendations from 9 specialist agents into a single, prioritized action plan for the JetWash website overhaul.

CONTEXT:
- Website: https://samedayjetwash.com
- Business: Anonymous pressure washing lead-gen site in Surrey, UK
- Current state: Position 42, 5 impressions, 0 clicks, 0 leads
- Goal: Page 1 rankings, consistent enquiries (10-30/month)
- Constraints: Zero budget, static HTML site, anonymous (no GBP)

YOUR JOB:
After all 9 agents complete their research, synthesize their findings into:

1. **Executive Summary**:
   - Current state assessment (strengths and weaknesses)
   - Biggest opportunities identified
   - Key risks and challenges
   - Expected timeline to results

2. **Priority Matrix** (Impact vs Effort):
   - Quick Wins (HIGH impact, LOW effort) - Do THIS WEEK
   - Strategic Investments (HIGH impact, HIGH effort) - Do THIS MONTH
   - Easy Improvements (LOW impact, LOW effort) - Do WHEN TIME ALLOWS
   - Consider Later (LOW impact, HIGH effort) - BACKLOG

3. **30-Day Sprint Plan**:
   - Week 1: Quick wins and critical fixes
   - Week 2: Content improvements and new pages
   - Week 3: Performance optimization and technical SEO
   - Week 4: CRO improvements and backlink outreach

4. **90-Day Growth Plan**:
   - Month 1: Foundation fixes (technical + on-page)
   - Month 2: Content expansion + link building
   - Month 3: CRO optimization + measurement

5. **Key Metrics to Track**:
   - Organic impressions (Google Search Console)
   - Average position per keyword cluster
   - Click-through rate
   - Form submissions per month
   - Conversion rate by page type
   - Core Web Vitals scores

6. **Risk Assessment**:
   - Schema with fake reviews - risk analysis
   - Anonymous site E-E-A-T concerns
   - Thin location page penalty risk
   - Over-optimization risks

7. **Measurement Framework**:
   - How to measure success of each change
   - A/B testing approach for CRO changes (possible with static site?)
   - Monthly reporting template

Create the final MASTER-PLAN.md document that becomes the single source of truth for the entire overhaul project.
```

---

## Execution Plan

### Step 1: Create Team
```
TeamCreate: team_name="jetwash-overhaul"
```

### Step 2: Wave 1 - Launch 6 Agents in Parallel
Launch agents 1-6 simultaneously (single message, 6 Task tool calls):
- seo-technical-auditor (seo-auditor type)
- competitor-researcher (general-purpose type)
- keyword-researcher (general-purpose type)
- conversion-optimizer (general-purpose type)
- content-strategist (general-purpose type)
- backlink-researcher (general-purpose type)

### Step 3: Wave 2 - Launch 2 Agents
After Wave 1 completes, launch agents 7-8 with context from Wave 1:
- local-seo-specialist (general-purpose type)
- performance-optimizer (general-purpose type)

### Step 4: Wave 3 - Launch 2 Agents
After Wave 2 completes, launch agents 9-10:
- ux-design-reviewer (general-purpose type)
- master-strategist (general-purpose type) - gets ALL previous findings

### Step 5: Compile & Save
Master strategist produces MASTER-PLAN.md saved to Projects/jetWash/

---

## Expected Output Files

Each agent saves their findings. Master strategist compiles into:
- `Projects/jetWash/MASTER-PLAN.md` - Single source of truth
- `Projects/jetWash/docs/seo-audit.md` - Technical SEO findings
- `Projects/jetWash/docs/competitor-analysis.md` - Competitor research
- `Projects/jetWash/docs/keyword-research.md` - Keyword opportunities
- `Projects/jetWash/docs/cro-recommendations.md` - Conversion optimization
- `Projects/jetWash/docs/content-strategy.md` - Content plan
- `Projects/jetWash/docs/backlink-strategy.md` - Link building plan
- `Projects/jetWash/docs/local-seo-strategy.md` - Local SEO without GBP
- `Projects/jetWash/docs/performance-audit.md` - Technical performance
- `Projects/jetWash/docs/design-improvements.md` - UX/UI recommendations

---

## Notes

- All agents have `bypassPermissions` enabled via settings.local.json
- WebSearch confirmed working for Agent Team teammates (tested 2x Feb 8, 2026)
- Each agent should use WebSearch extensively for current data
- Agents should fetch the live site via WebFetch for analysis
- Total estimated time: 30-60 minutes for all 3 waves
- Cost consideration: 10 agents x Opus 4.6 = significant token usage. Consider using Sonnet for research agents to reduce cost.
