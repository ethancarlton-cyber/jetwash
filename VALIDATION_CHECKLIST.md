# Software Idea Validation Checklist

**Purpose:** Systematic validation of software opportunities before building
**Created:** January 2026
**Based on:** Mom Test, Lean Startup, Smoke Testing methodologies

---

## Overview: The Validation Spectrum

Validation is NOT black and white. It's a spectrum:

```
NO VALIDATION ←──────────────────────────────────→ FULLY VALIDATED
     │                    │                    │
  "I think         "50 people            "10 paying
  this is          signed up             customers
  a good           for waitlist"         with cards"
  idea"
```

**Goal:** Move as far right as possible BEFORE writing code.

---

## PHASE 1: Problem Validation (Do This First)

### 1.1 Community Evidence Checklist

- [ ] **Find 3+ communities** where target users actively discuss the problem
  - Reddit subreddits (note subscriber count)
  - Facebook groups (note member count)
  - Forums, Discord servers
  - Note: If no community exists, problem may not be painful enough

- [ ] **Find 10+ complaints** about current solutions
  - App store reviews (1-3 stars)
  - Reddit threads with frustration
  - Forum posts asking for alternatives
  - Document exact quotes with links

- [ ] **Verify recency** - complaints within last 12 months
  - Old complaints may have been solved
  - Check if threads are active vs. dead

- [ ] **Check if people tried to solve it themselves**
  - Etsy/Gumroad templates for sale
  - Spreadsheet templates shared
  - DIY tutorials or workarounds
  - This proves willingness to invest effort

### 1.2 Competition Analysis

- [ ] **List ALL existing solutions** (minimum 5)
  - Direct competitors
  - Adjacent solutions people use instead
  - Free alternatives
  - Spreadsheet/manual workarounds

- [ ] **For each competitor, document:**
  - Pricing (especially free tier)
  - User reviews and ratings
  - Last update date (is it maintained?)
  - Funding/backing (VC funded = danger)
  - Market position (dominant, niche, dying)

- [ ] **Identify the gap** - why existing solutions fail
  - Too expensive?
  - Wrong platform? (iOS only, no Android)
  - Crashes/unreliable?
  - Missing key features?
  - Terrible UX?
  - Abandoned/unmaintained?

- [ ] **Verify no well-funded FREE competitor**
  - This is a dealbreaker
  - Check Crunchbase for funding
  - VC-backed free tiers kill small players

### 1.3 Market Size Sanity Check

- [ ] **Estimate total addressable market**
  - How many potential users exist?
  - Minimum viable: 10,000+ potential users
  - Calculate: Users × Willingness to Pay × Frequency

- [ ] **Check Google Trends** - is interest stable/growing?
  - Declining trend = shrinking market
  - Seasonal patterns?

- [ ] **Search volume validation**
  - Use Ubersuggest/Keywords Everywhere
  - Are people searching for solutions?
  - What terms do they use?

---

## PHASE 2: Customer Discovery (Mom Test Interviews)

### 2.1 The Mom Test Rules

**NEVER ask:**
- "Would you use this?" (hypothetical = useless)
- "Do you think this is a good idea?" (ego validation)
- "Would you pay for this?" (people lie)

**ALWAYS ask:**
- "Walk me through the last time you dealt with [problem]"
- "What have you tried to solve this?"
- "How much time/money do you spend on this now?"
- "What happened after that?" (follow-up for specifics)

### 2.2 Interview Checklist

- [ ] **Conduct 10-20 customer discovery interviews**
  - Find people in communities identified in Phase 1
  - Can be async (Reddit DMs, forum posts)
  - Or sync (video calls, phone)

- [ ] **For each interview, document:**
  - How they currently solve the problem
  - Tools/workarounds they use
  - Time spent on the problem
  - Money already spent (proves willingness to pay)
  - Specific frustrations (exact quotes)
  - What would make them switch

- [ ] **Look for patterns across interviews:**
  - Same complaints repeated = real pain
  - Conflicting needs = segment your market
  - "I've been waiting for something like this" = strong signal

### 2.3 Commitment Tests (Critical)

**People stop lying when you ask for commitment:**

- [ ] **Ask for time commitment**
  - "Can I follow up with you in 2 weeks with a prototype?"
  - If they say yes AND give contact info = real interest

- [ ] **Ask for referral**
  - "Do you know 2-3 others who have this problem?"
  - Referrals = they believe in the problem

- [ ] **Ask for money (strongest signal)**
  - "Would you pre-order for $X if I build this?"
  - Credit card = validated
  - "Maybe later" = not validated

---

## PHASE 3: Solution Validation (Before Building)

### 3.1 Smoke Test Landing Page

- [ ] **Create simple landing page** (Carrd, Notion, Google Sites)
  - Clear headline stating value prop
  - 3-5 bullet points of benefits
  - Call to action (waitlist, pre-order, book call)
  - Takes 1-2 hours max

- [ ] **Define success metrics BEFORE launching**
  - What conversion rate = validated?
  - How many signups = proceed?
  - Set a cutoff: "If <X signups in 7 days, pivot"

- [ ] **Drive targeted traffic**
  - Post in communities (with permission/value)
  - Small paid ads ($50-100 budget)
  - Must reach RIGHT audience, not just traffic

- [ ] **Measure and document results**
  - Visitor count
  - Signup/conversion rate
  - Any payments received
  - Qualitative feedback

### 3.2 Concierge MVP (Do It Manually)

- [ ] **Offer to solve the problem manually**
  - You become the product
  - Invoice tool? Do invoices manually for 5 customers
  - Collection tracker? Track collections in a spreadsheet you update

- [ ] **Validate willingness to pay for manual version**
  - If they won't pay for manual, automation won't help
  - Charge something, even if nominal ($5-20)

- [ ] **Document what features matter**
  - What do customers actually ask for?
  - What don't they care about?
  - This informs MVP scope

### 3.3 Pre-Sales / Waitlist

- [ ] **Attempt pre-sales** (strongest validation)
  - "Pay $29 now, get lifetime access when launched"
  - Refundable = lowers barrier
  - Even 3-5 pre-sales = real validation

- [ ] **Build waitlist with commitment**
  - Not just email capture
  - Ask WHY they signed up
  - Ask for referrals on signup
  - Follow up with surveys

---

## PHASE 4: Validation Scorecard

### Score Each Criterion (0-2 points each)

| Criterion | 0 = Fail | 1 = Weak | 2 = Strong |
|-----------|----------|----------|------------|
| **Problem Evidence** | No complaints found | Some complaints, old | Many recent complaints |
| **Community Access** | No community | Small community | Large active community |
| **Competition Gap** | Free competitors | Paid competitors only | Broken/abandoned only |
| **Willingness to Pay** | No signals | Templates/workarounds exist | People paying now |
| **Interview Signals** | Hypothetical interest | Time commitment | Pre-orders/payments |
| **Landing Page Test** | <1% conversion | 1-5% conversion | >5% conversion |
| **Concierge Success** | No takers | Took free help | Paid for manual |
| **Market Trend** | Declining | Stable | Growing |
| **Build Feasibility** | >3 months MVP | 1-3 months | <1 month |
| **Your Advantage** | None | Domain knowledge | Unique insight/access |

**TOTAL: ___/20**

### Interpretation
- **16-20:** Strong validation - proceed to build
- **12-15:** Moderate - address weak areas first
- **8-11:** Weak - needs more validation or pivot
- **0-7:** Fail - find different opportunity

---

## PHASE 5: Red Flags Checklist

### Stop If You See These:

- [ ] **FREE well-funded competitor** (VC-backed free tier)
- [ ] **No one is complaining** about current solutions
- [ ] **Market is declining** (Google Trends down)
- [ ] **Regulatory barriers** (HIPAA, financial compliance)
- [ ] **All interviewees say "nice idea" but won't commit**
- [ ] **Can't find 10 people to interview**
- [ ] **Problem requires mobile app** (higher build cost)
- [ ] **B2B with >3 month sales cycle** (slow validation)
- [ ] **Platform dependency** (Shopify/Twitter could crush you)

---

## Validation Timeline

### Week 1: Problem Validation
- Days 1-2: Community research, find complaints
- Days 3-4: Competition analysis
- Days 5-7: Market size, trends

### Week 2: Customer Discovery
- Days 8-10: Find and contact potential users
- Days 11-14: Conduct 10-20 interviews
- Document patterns and insights

### Week 3: Solution Validation
- Days 15-16: Build landing page
- Days 17-21: Run smoke test
- Days 22-23: Attempt concierge MVP

### Week 4: Decision
- Score validation checklist
- Document findings
- Go / No-Go decision

---

## Tools (All Free)

### Community Research
- Reddit (search, sort by top/controversial)
- Facebook Groups
- Google (site:reddit.com "problem keywords")

### Competition Research
- Capterra, G2, Product Hunt
- App Store / Play Store reviews
- Crunchbase (check funding)

### Landing Pages
- Carrd (free tier)
- Notion (publish as website)
- Google Sites

### Analytics
- Google Analytics (free)
- Plausible (free tier for small sites)

### Surveys & Forms
- Google Forms
- Tally (free tier)
- Typeform (limited free)

---

## Sources & References

### Validation Methodology
- [Shopify Product Validation Guide 2025](https://www.shopify.com/blog/validate-product-ideas)
- [UserJot: Validate SaaS Without Code 2026](https://userjot.com/blog/how-to-validate-saas-idea-without-code)
- [Naviu: 25 Ways to Validate Startup Ideas](https://www.naviu.tech/blog/how-to-validate-your-startup-idea)
- [SaaSMarketStore: 25-Point Validation Checklist](https://saasmarketstore.com/25-key-points-checklist-to-validate-your-micro-saas-idea-before-launching/)

### Mom Test / Customer Interviews
- [Looppanel: Mom Test for Customer Interviews](https://www.looppanel.com/blog/customer-interviews)
- [UX Planet: Mastering Mom Test Principles](https://uxplanet.org/mastering-client-interviews-applying-the-principles-of-the-mom-test-for-effective-questioning-as-9f1e8967d38e)
- [Atlanta Ventures: 3 Rules from The Mom Test](https://www.atlantaventures.com/blog/the-3-rules-to-customer-interviews-from-the-mom-test)

### Micro-SaaS Specific
- [Preetam Nath: Validate Micro SaaS Idea](https://www.preetamnath.com/micro-saas/validate-saas-idea)
- [Rick Blyth: Validating Micro SaaS Ideas](https://www.rickblyth.com/validating-micro-saas-ideas)
- [Indie Hackers: Validated Micro-SaaS Quickly](https://www.indiehackers.com/post/how-i-validated-my-micro-saas-idea-quickly-and-you-can-too-53decf45b9)

### Smoke Testing
- [CXL: Guide to Smoke Testing](https://cxl.com/blog/smoke-test/)
- [Eximius VC: Smoke Testing Guide](https://eximiusvc.com/blogs/guide-to-smoke-testing-for-product-ideas/)
- [FounderFAQs: Smoke Test Landing Page](https://founderfaqs.com/blogs/how-to-run-a-smoke-test-landing-page-to-prove-demand)

---

*Last Updated: January 2026*
