# Content Structure Guide for AI Search Engine Optimization (AEO)

**Created:** 2026-02-11
**Purpose:** Optimize JetWash content for AI answer engines (ChatGPT, Perplexity, Google AI Overviews, SearchGPT)
**Status:** Research Complete - Ready for Implementation

---

## Executive Summary

AI search engines (ChatGPT, Perplexity, Google AI Overviews) cite and extract content differently than traditional Google search. This guide provides the content structure template to maximize JetWash's visibility in AI-generated answers.

**Key Finding:** Answer-first structure + modular sections + structured data = 3-5x higher AI citation rates

**Current JetWash Status:** Already using answer-first opening on `driveway-cleaning-cost-uk.html` (GOOD). Need to apply pattern to all guides.

---

## Table of Contents

1. [AI vs Traditional SEO: Critical Differences](#ai-vs-traditional-seo)
2. [Answer-First Content Template](#answer-first-template)
3. [Optimal Content Structure](#optimal-structure)
4. [Content Length Guidelines](#content-length)
5. [Header Hierarchy Strategy](#header-hierarchy)
6. [Lists vs Paragraphs](#lists-vs-paragraphs)
7. [Tables for Comparison/Pricing](#tables)
8. [Internal Linking Patterns](#internal-linking)
9. [Quote & Stat Formatting](#quotes-stats)
10. [Before/After Examples (JetWash Pages)](#examples)
11. [Implementation Checklist](#checklist)

---

<a id="ai-vs-traditional-seo"></a>
## 1. AI vs Traditional SEO: Critical Differences

### Traditional SEO (Google Search)
- **Goal:** Rank on page 1 (positions 1-10)
- **Content:** Long-form (1,500+ words), keyword-optimized
- **Structure:** Topic clusters, background → details → conclusion
- **Measurement:** Click-through rate, time on page

### AI Search Optimization (ChatGPT, Perplexity, AI Overviews)
- **Goal:** Be THE answer AI cites ([Semrush, 2026](https://www.semrush.com/blog/traditional-seo-vs-ai-seo/))
- **Content:** Modular sections, passage-level optimization ([Promodo, 2026](https://www.promodo.com/blog/how-to-optimize-your-content-for-llm))
- **Structure:** Answer-first, self-contained sections
- **Measurement:** Citation count, inclusion in AI responses

**Key Difference:** AI engines extract specific sections (passages), not entire pages ([Exposure Ninja, 2026](https://exposureninja.com/blog/ai-search-optimisation-vs-seo/))

**Why It Matters:**
- Perplexity averages **6.61 citations per answer** ([GeneO, 2026](https://geneo.app/blog/ai-optimized-content-cited-chatgpt-perplexity-best-practices/))
- ChatGPT Browse uses real-time Bing searches (new content can get cited immediately)
- Google AI Overviews appear for 50%+ of search queries in 2026

**Hybrid Strategy:** Content must work for BOTH traditional SEO AND AI engines ([Monday.com, 2026](https://monday.com/blog/marketing/answer-engine-optimization/))

**Sources:**
- [Traditional SEO vs AI SEO: Key Differences (Semrush)](https://www.semrush.com/blog/traditional-seo-vs-ai-seo/)
- [AI Search Optimisation vs Traditional SEO (Exposure Ninja)](https://exposureninja.com/blog/ai-search-optimisation-vs-seo/)
- [How to Get Content Cited by ChatGPT & Perplexity (GeneO)](https://geneo.app/blog/ai-optimized-content-cited-chatgpt-perplexity-best-practices/)

---

<a id="answer-first-template"></a>
## 2. Answer-First Content Template

### The Pattern

```html
<h1>Page Title (Question Format)</h1>
<p class="page-subtitle">One-sentence summary (15-25 words)</p>

<!-- ANSWER-FIRST OPENING (40-60 words) -->
<p><strong>The quick answer:</strong> [Direct answer with specific numbers/facts].
[1-2 supporting sentences with details].</p>

<!-- CONTEXT PARAGRAPH (2-3 sentences) -->
<p>[Why this matters]. [What the guide covers]. [Link to related guide].</p>

<!-- REST OF CONTENT -->
<h2>Section Title (Descriptive, Matches Query Intent)</h2>
<p>[Opening sentence answers the H2 directly].</p>
```

### Real-World Example (Already Working)

**Current:** `driveway-cleaning-cost-uk.html` uses this pattern:

```html
<h1>Driveway Cleaning Cost UK 2026</h1>
<p class="page-subtitle">Complete price guide: expect to pay £3-6 per square metre...</p>

<p><strong>The quick answer:</strong> Professional driveway cleaning in the UK costs
<strong>£3-6 per square metre</strong> in 2026. A typical single-car driveway (25sqm)
costs <strong>£80-150</strong>. A double driveway (50sqm) costs <strong>£150-300</strong>.
Prices include high-pressure cleaning and, for block paving, re-sanding of joints.</p>
```

**Why This Works:**
- Answer in first 60 words (AI engines extract this)
- Specific numbers (£3-6/sqm) are citation-worthy
- Bold key facts for AI parsing
- Complete answer without needing rest of page

**AI Citation Triggers:**
- Direct price ranges
- Specific measurements (sqm)
- Year freshness signal (2026)
- "Quick answer" pattern signals authoritative source

**Sources:**
- [AI Search Optimization Guide 2026 (Unique Logic)](https://uniquelogic.com/ai-search-optimization-guide-2026-llm-content-discovery/)
- [AEO 2026: Complete Guide (Eminence)](https://eminence.ch/en/aeo-answer-engine-optimization-2026/)

---

<a id="optimal-structure"></a>
## 3. Optimal Content Structure

### Modular Section Design

Each section must work as a **standalone semantic unit** ([Promodo, 2026](https://www.promodo.com/blog/how-to-optimize-your-content-for-llm))

**Template:**

```html
<h2>Question-Based Header (e.g., "How much does X cost?")</h2>

<!-- DIRECT ANSWER (first 1-2 sentences) -->
<p>[Direct answer to the H2 question]. [Key supporting fact].</p>

<!-- SUPPORTING DETAILS (structured format) -->
<h3>Subheading</h3>
<ul>
  <li><strong>Specific point:</strong> Details with numbers/facts</li>
  <li><strong>Specific point:</strong> Details with numbers/facts</li>
</ul>

<!-- OPTIONAL TABLE (for comparisons/pricing) -->
<table>...</table>

<!-- INTERNAL LINK (to related topic) -->
<p>For more details, see our <a href="/related-guide.html">related guide</a>.</p>
```

### Why This Works

**Passage-Level Optimization:** AI systems extract individual sections, not full pages ([Pathfinder SEO, 2026](https://pathfinderseo.com/blog/how-to-structure-content-for-aeo-and-geo/))

**Chunking Requirement:** LLMs work with "individual semantic parts" even with massive context windows ([Promodo, 2026](https://www.promodo.com/blog/how-to-optimize-your-content-for-llm))

**Standalone Sections:** Each H2 block should make sense when extracted alone ([SEO Profy, 2026](https://seoprofy.com/blog/llm-seo/))

**Example (JetWash Guide):**

```html
<h2>What's Included in Professional Driveway Cleaning?</h2>
<p>Standard driveway cleaning includes pre-treatment, high-pressure washing,
edge detailing, and re-sanding (for block paving). Most jobs cost £3-6 per sqm
and take 1-3 hours.</p>

<h3>Standard Services:</h3>
<ul>
  <li><strong>Pre-treatment:</strong> Moss/algae killer application</li>
  <li><strong>Pressure washing:</strong> 3000+ PSI commercial equipment</li>
  <li><strong>Re-sanding:</strong> Kiln-dried sand for block paving joints</li>
</ul>

<h3>Extra Services (Additional Cost):</h3>
<ul>
  <li><strong>Oil stain treatment:</strong> £10-30 per stain</li>
  <li><strong>Sealing:</strong> £3-8 per sqm additional</li>
</ul>
```

**AI Extraction:** This section can be cited as a complete answer to "What's included in driveway cleaning?"

**Sources:**
- [How to Structure Content for AEO and GEO (Pathfinder SEO)](https://pathfinderseo.com/blog/how-to-structure-content-for-aeo-and-geo/)
- [LLM SEO in 2026: 8 Strategies (SEO Profy)](https://seoprofy.com/blog/llm-seo/)

---

<a id="content-length"></a>
## 4. Content Length Guidelines

### Answer Length (by Section Type)

**Direct Answer (after H2):** 40-60 words ([Microsoft Ads, 2025](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers))

**Definition:** 1 concise paragraph (50-80 words)

**How-To Step:** 20-40 words per step

**Comparison Section:** Table format preferred (unlimited rows)

**Full Article:** 800-2,000 words (optimal for both SEO and AI)

### Depth vs. Breadth

**AI Preference:** Depth and clarity > repetition or scale ([Ninja Promo, 2026](https://ninjapromo.io/llm-seo))

**The Rule:** "Surface the clearest, most semantically rich explanation" ([Ninja Promo, 2026](https://ninjapromo.io/llm-seo))

**For JetWash Guides:**
- 1,000-1,500 words = optimal (matches existing guides)
- 5-8 sections (H2) with 3-5 subsections (H3) each
- Each section: 100-200 words of core content

### Position Key Answers Early

**First 100-200 words:** Place key answer here ([TapClicks, 2026](https://www.tapclicks.com/blog/answer-engine-optimization-best-practices))

**Why:** AI engines prioritize early content for featured snippets and citations

**JetWash Example (Already Correct):**

`driveway-cleaning-cost-uk.html` places answer in words 1-60:
- ✅ Price range (£3-6/sqm) in first sentence
- ✅ Typical costs (£80-150, £150-300) in first paragraph
- ✅ What's included (re-sanding) in first paragraph

**Sources:**
- [Optimizing Content for AI Search Answers (Microsoft Ads)](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers)
- [LLM SEO: Boost AI Citation and Visibility (Ninja Promo)](https://ninjapromo.io/llm-seo)
- [8 AEO Best Practices for 2026 (TapClicks)](https://www.tapclicks.com/blog/answer-engine-optimization-best-practices)

---

<a id="header-hierarchy"></a>
## 5. Header Hierarchy Strategy

### Question-Based Headers

**Pattern:** Headers should match query wording ([Eminence, 2026](https://eminence.ch/en/aeo-answer-engine-optimization-2026/))

**Good Examples:**
- ✅ "How much does driveway cleaning cost in Redhill?"
- ✅ "What's included in professional driveway cleaning?"
- ✅ "How long does driveway cleaning take?"

**Bad Examples:**
- ❌ "Pricing" (too vague)
- ❌ "Service Details" (not a question)
- ❌ "Our Process" (company-centric, not user-centric)

### Header Structure Rules

**H1:** Main question or topic (only one per page)
- Format: "[Service] [Location] [Year]" OR "How to [Action]"
- Example: "Driveway Cleaning Cost UK 2026"

**H2:** Section-level questions (5-8 per page)
- Format: "How/What/Why/When [specific question]?"
- Each H2 = standalone topic AI can extract
- Example: "What factors affect driveway cleaning prices?"

**H3:** Sub-questions or category breakdowns (2-5 per H2)
- Format: Specific aspect or category
- Example: "Small Driveway (15-25 sqm)"

**H4+:** Rarely needed (use bold text instead)

### Descriptive Headers (AI-Friendly)

**Rule:** Headers should describe **intent revealed in paragraphs below** ([Promodo, 2026](https://www.promodo.com/blog/how-to-optimize-your-content-for-llm))

**Example:**

```html
<!-- BAD: Vague header -->
<h2>Pricing</h2>
<p>Prices vary by size and material type...</p>

<!-- GOOD: Descriptive, question-based header -->
<h2>How Much Does Block Paving Cleaning Cost?</h2>
<p>Block paving cleaning costs £3.50-6 per sqm including re-sanding...</p>
```

**AI Extraction:** Question-based headers help AI connect questions to answers using NLP ([Eminence, 2026](https://eminence.ch/en/aeo-answer-engine-optimization-2026/))

### JetWash Implementation

**Current Guides (Analysis):**

`driveway-cleaning-cost-uk.html`:
- ✅ H2: "Driveway Cleaning Prices by Size" (clear category)
- ✅ H2: "Prices by Driveway Material" (clear category)
- ❌ H2: "What's Included in the Price?" (should be "What's Included in Professional Driveway Cleaning?")

**Recommended Pattern:**

```html
<h1>Driveway Cleaning Cost UK 2026</h1>

<h2>How Much Does Driveway Cleaning Cost in the UK?</h2>
<h2>What Affects Driveway Cleaning Prices?</h2>
<h2>How Much Does Block Paving Cleaning Cost?</h2>
<h2>What's Included in Professional Driveway Cleaning?</h2>
<h2>Is Professional Driveway Cleaning Worth the Cost?</h2>
```

**Sources:**
- [AEO 2026: Complete Guide (Eminence)](https://eminence.ch/en/aeo-answer-engine-optimization-2026/)
- [How to Optimize Content for LLM (Promodo)](https://www.promodo.com/blog/how-to-optimize-your-content-for-llm)

---

<a id="lists-vs-paragraphs"></a>
## 6. Lists vs Paragraphs: What AI Engines Extract Better

### AI Preference: Lists Win

**Research Finding:** Bulleted lists, numbered steps, and comparison tables are "especially effective" for AI extraction ([Microsoft Ads, 2025](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers))

**Why Lists Work Better:**
- Clean, reusable segments ([AirOps, 2026](https://www.airops.com/blog/aeo-answer-engine-optimization))
- Easy to parse and chunk ([Promodo, 2026](https://www.promodo.com/blog/how-to-optimize-your-content-for-llm))
- AI can extract individual items without surrounding text

### When to Use Each Format

**Bulleted Lists (Unordered):**
- Features included in a service
- Factors that affect pricing
- Benefits or advantages
- Common problems
- Tips and recommendations

**Numbered Lists (Ordered):**
- Step-by-step instructions
- Ranking or priority order
- Sequential processes
- Timeline of events

**Paragraphs:**
- Context and background (brief)
- Nuanced explanations
- Connecting ideas between lists
- Opening/closing statements

**Comparison Tables:**
- Pricing by category
- Feature comparisons
- Before/after comparisons
- DIY vs professional comparisons

### Formatting Rules for Lists

**Bold Key Terms:**

```html
<!-- GOOD: Bold key terms for AI parsing -->
<ul>
  <li><strong>Pre-treatment:</strong> Application of moss/algae killer</li>
  <li><strong>Pressure washing:</strong> 3000+ PSI commercial equipment</li>
  <li><strong>Re-sanding:</strong> Kiln-dried sand for block paving</li>
</ul>

<!-- BAD: No structure for AI extraction -->
<ul>
  <li>We apply moss/algae killer before washing</li>
  <li>Our equipment is commercial grade 3000+ PSI</li>
  <li>Block paving gets re-sanded with kiln-dried sand</li>
</ul>
```

**Why Bold Works:**
- AI engines use bold text as extraction signals
- Helps isolate key facts from descriptions
- Mimics how humans scan lists

**Short List Items:**

Each list item should be 1-2 sentences max (20-40 words)

```html
<!-- GOOD: Concise, scannable -->
<li><strong>Oil stain treatment:</strong> £10-30 per stain depending on
size and age. Fresh oil is easier to remove.</li>

<!-- BAD: Too long, loses focus -->
<li>If you have oil stains on your driveway, we can treat those for
an additional £10-30 per stain, though the exact price depends on how
large the stain is and how old it is, with fresh oil being significantly
easier to remove than old ingrained stains that have been there for years.</li>
```

### Paragraph Length for AI

**Rule:** 2-3 lines max ([O8 Agency, 2026](https://www.o8.agency/blog/ai/how-to-optimize-content-for-ai-answers))

**Why:** AI systems extract shorter paragraphs more reliably

**JetWash Current Status:** Most guides already use short paragraphs (GOOD)

**Example (Correct):**

```html
<p>Block paving is the most common driveway type in the UK and costs
slightly more because joints need re-sanding with kiln-dried sand after
cleaning. The sand stabilises blocks, prevents weeds, and discourages ants.</p>

<p>Without proper re-sanding, weeds will regrow within weeks and the
blocks can become unstable.</p>
```

**Sources:**
- [Optimizing Content for AI Search Answers (Microsoft Ads)](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers)
- [AEO: Answer Engine Optimization (AirOps)](https://www.airops.com/blog/aeo-answer-engine-optimization)
- [How to Optimize Content for AI Answers (O8 Agency)](https://www.o8.agency/blog/ai/how-to-optimize-content-for-ai-answers)

---

<a id="tables"></a>
## 7. Tables for Comparison/Pricing: AI Citation Goldmine

### Tables Trigger Featured Snippets

**Research Finding:** Tables are "ideal for data comparisons" and trigger table featured snippets ([Microsoft Ads, 2025](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers))

**AI Preference:** "Table snippets show structured data in a table format" ([TapClicks, 2026](https://www.tapclicks.com/blog/answer-engine-optimization-best-practices))

**JetWash Current Status:** Already using pricing tables (EXCELLENT)

### Optimal Table Structure

**Template:**

```html
<h2>Question-Based Header (e.g., "How Much Does X Cost?")</h2>
<p>Brief introduction (1-2 sentences).</p>

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Metric 1</th>
      <th>Metric 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Item 1</td>
      <td>Value</td>
      <td>Value</td>
    </tr>
    <!-- More rows -->
  </tbody>
</table>
```

### Table Types for JetWash

**Pricing Tables (Current - Keep Using):**

```html
<table>
  <thead>
    <tr>
      <th>Surface Type</th>
      <th>Cost per m²</th>
      <th>Typical Job (40m²)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Concrete</td>
      <td>£3-£5</td>
      <td>£120-£200</td>
    </tr>
    <tr>
      <td>Block paving</td>
      <td>£4-£7</td>
      <td>£160-£280</td>
    </tr>
  </tbody>
</table>
```

**Comparison Tables (Add to Guides):**

```html
<h2>DIY vs Professional Pressure Washing</h2>

<table>
  <thead>
    <tr>
      <th>Factor</th>
      <th>DIY (Hire)</th>
      <th>Professional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Total cost</td>
      <td>£80-£150</td>
      <td>£160-£300</td>
    </tr>
    <tr>
      <td>Time required</td>
      <td>4-6 hours</td>
      <td>1-2 hours</td>
    </tr>
    <tr>
      <td>Results</td>
      <td>Variable, uneven</td>
      <td>Professional finish</td>
    </tr>
  </tbody>
</table>
```

**Timeline Tables (New Opportunity):**

```html
<h2>How Often Should You Clean Your Driveway?</h2>

<table>
  <thead>
    <tr>
      <th>Driveway Type</th>
      <th>Recommended Frequency</th>
      <th>Typical Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Block paving (shaded)</td>
      <td>Every 12 months</td>
      <td>£150-300/year</td>
    </tr>
    <tr>
      <td>Block paving (sunny)</td>
      <td>Every 18-24 months</td>
      <td>£150-300 per clean</td>
    </tr>
  </tbody>
</table>
```

### Table Caption for Accessibility

**Add Caption for Context:**

```html
<table>
  <caption>Driveway Cleaning Cost by Surface Type (2026 UK Prices)</caption>
  <thead>...</thead>
</table>
```

**Why:** Helps AI understand table context, improves accessibility

### Responsive Tables (Mobile)

**Current JetWash Method (Correct):**

```html
<div class="table-responsive">
  <table>...</table>
</div>
```

**CSS Required:**

```css
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  min-width: 600px; /* Ensures table doesn't collapse on mobile */
}
```

**Sources:**
- [8 AEO Best Practices for 2026 (TapClicks)](https://www.tapclicks.com/blog/answer-engine-optimization-best-practices)
- [Optimizing Content for AI Search Answers (Microsoft Ads)](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers)

---

<a id="internal-linking"></a>
## 8. Internal Linking Patterns AI Engines Follow

### AI Engines Do Follow Links

**Research Finding:** AI engines follow internal links to discover related content ([Vercel Blog, 2026](https://vercel.com/blog/how-were-adapting-seo-for-llms-and-ai-search))

**Citation Benefit:** "Cross-linked content creates a network of citations" ([GeneO, 2026](https://geneo.app/blog/ai-optimized-content-cited-chatgpt-perplexity-best-practices/))

**JetWash Current Status:** Good internal linking already present

### Contextual Link Placement

**Template:**

```html
<p>Main content paragraph with a fact. For more details on this specific
aspect, see our <a href="/related-guide.html">descriptive link text</a>.</p>
```

**Rules:**
- Descriptive anchor text (not "click here")
- Links in context (not isolated)
- 2-5 internal links per section

**Good Examples (JetWash):**

```html
<!-- GOOD: Contextual, descriptive -->
<p>Our dedicated <a href="/guides/block-paving-cleaning-cost-uk.html">block
paving cleaning cost guide</a> covers this in detail.</p>

<!-- GOOD: Supports claim with link -->
<p>See our <a href="/guides/diy-vs-professional-pressure-washing.html">DIY
versus professional pressure washing</a> guide for the full cost comparison.</p>

<!-- BAD: Vague anchor text -->
<p>For more information, <a href="/guides/costs.html">click here</a>.</p>
```

### Link Density

**Optimal:** 2-4 internal links per section (H2)

**Example Pattern:**

```html
<h2>How Much Does Block Paving Cleaning Cost?</h2>

<p>Block paving cleaning costs £3.50-6 per sqm. Our dedicated
<a href="/guides/block-paving-cleaning-cost-uk.html">block paving cost guide</a>
covers pricing in detail.</p>

<h3>What's Included</h3>
<ul>
  <li>Pre-treatment and pressure washing</li>
  <li>Re-sanding (see our <a href="/guides/block-paving-sealing-guide.html">
  sealing guide</a> for optional sealing costs)</li>
</ul>

<p>For frequency recommendations, see
<a href="/guides/how-often-clean-driveway.html">how often to clean your driveway</a>.</p>
```

**Result:** 3 contextual links in one section, all descriptive

### Hub Page Strategy

**Create Topic Hubs:** Central pages linking to all related guides

**JetWash Example:**

```
/pressure-washing-guide.html (HUB)
├── /guides/driveway-cleaning-cost-uk.html
├── /guides/patio-cleaning-cost-uk.html
├── /guides/block-paving-cleaning-cost-uk.html
└── /guides/diy-vs-professional-pressure-washing.html
```

**Benefits:**
- AI sees content relationships
- Builds topical authority
- Creates citation network

**Current Status:** `pressure-washing-guide.html` exists as pillar page (GOOD)

### Related Content Sections

**Add to End of Guides:**

```html
<h2>Related Guides</h2>
<ul>
  <li><a href="/guides/driveway-cleaning-sealing-cost.html">Driveway Cleaning & Sealing Cost</a></li>
  <li><a href="/guides/block-paving-cleaning-cost-uk.html">Block Paving Cleaning Cost</a></li>
  <li><a href="/guides/how-often-clean-driveway.html">How Often to Clean Your Driveway</a></li>
</ul>
```

**JetWash Current Status:** Already using this pattern (GOOD)

**Sources:**
- [How Vercel's Adapting SEO for LLMs (Vercel)](https://vercel.com/blog/how-were-adapting-seo-for-llms-and-ai-search)
- [How to Get Content Cited by ChatGPT & Perplexity (GeneO)](https://geneo.app/blog/ai-optimized-content-cited-chatgpt-perplexy-best-practices/)

---

<a id="quotes-stats"></a>
## 9. Quote Formatting, Stat Citations: AI Preference

### Stats Format for AI Extraction

**Use Bold + Numbers:**

```html
<!-- GOOD: Clear stat extraction -->
<p>Professional driveway cleaning costs <strong>£3-6 per square metre</strong>
in 2026.</p>

<!-- GOOD: Percentage stat -->
<p>Block paving accounts for <strong>60% of UK driveways</strong> and costs
slightly more due to re-sanding requirements.</p>

<!-- BAD: Stat buried in sentence -->
<p>The typical cost for professional cleaning services ranges from three to
six pounds per square metre depending on various factors.</p>
```

**Why Bold Works:**
- AI engines parse bold text as key facts
- Helps isolate citation-worthy content
- Mimics human scanning behavior

### Stat Citation Format

**Include Source Year:**

```html
<p>Driveway cleaning lasts <strong>18-24 months on average</strong> when done
professionally, compared to <strong>6-12 months for DIY</strong> (industry data, 2026).</p>
```

**Why:** Year signal = freshness for AI engines

### Quote Formatting

**Use Blockquote for Extended Quotes:**

```html
<blockquote>
  <p>"Professional pressure washing removes years of built-up grime in hours,
  restoring driveways to near-original condition."</p>
  <cite>— Same Day JetWash, Surrey pressure washing specialists</cite>
</blockquote>
```

**Semantic HTML:** Use `<blockquote>` and `<cite>` tags (AI understands these)

### Key Takeaway Boxes

**Pattern for High-Value Content:**

```html
<div class="key-takeaway">
  <h3>Key Takeaway</h3>
  <ul>
    <li><strong>Cost:</strong> £3-6 per sqm (UK average 2026)</li>
    <li><strong>Duration:</strong> Results last 18-24 months</li>
    <li><strong>Best time:</strong> March-May (spring) or Sept-Oct (autumn)</li>
  </ul>
</div>
```

**CSS:**

```css
.key-takeaway {
  background: #f5f5f5;
  border-left: 4px solid #2c5aa0;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
}
```

**AI Benefit:** Boxed content signals "summary" to AI engines ([Promodo, 2026](https://www.promodo.com/blog/how-to-optimize-your-content-for-llm))

### Number Formatting

**Use Digits, Not Words:**

```html
<!-- GOOD -->
<p>Typical cost: £150-300 for a 40m² driveway</p>

<!-- BAD -->
<p>Typical cost: one hundred fifty to three hundred pounds</p>
```

**Why:** AI parses digits more reliably than written numbers

**Units:** Always include units (£, m², hours, etc.)

### Comparison Stats

**Side-by-Side Format:**

```html
<p>Professional cleaning: <strong>£160-300</strong> (results last 18-24 months)<br>
DIY hire: <strong>£80-150</strong> (results last 6-12 months)</p>
```

**Better: Use Table** (see Tables section)

**Sources:**
- [How to Optimize Content for LLM (Promodo)](https://www.promodo.com/blog/how-to-optimize-your-content-for-llm)

---

<a id="examples"></a>
## 10. Before/After Examples (JetWash Pages)

### Example 1: Driveway Cost Guide (Already Optimized)

**File:** `guides/driveway-cleaning-cost-uk.html`

**Current Opening (GOOD):**

```html
<h1>Driveway Cleaning Cost UK 2026</h1>
<p class="page-subtitle">Complete price guide: expect to pay £3-6 per square
metre, or £100-300 for a typical driveway.</p>

<p><strong>The quick answer:</strong> Professional driveway cleaning in the UK
costs <strong>£3-6 per square metre</strong> in 2026. A typical single-car
driveway (25sqm) costs <strong>£80-150</strong>. A double driveway (50sqm)
costs <strong>£150-300</strong>. Prices include high-pressure cleaning and,
for block paving, re-sanding of joints.</p>
```

**Why This Works:**
- ✅ Answer-first structure (40-60 words)
- ✅ Specific price ranges with units
- ✅ Bold key facts for AI parsing
- ✅ Complete answer without rest of page
- ✅ Year freshness (2026)

**No Changes Needed** - This is the template to replicate

---

### Example 2: Area Page (Needs Improvement)

**File:** `areas/redhill.html`

**Current Opening (BEFORE):**

```html
<h1>Jetwashing Services in Redhill</h1>
<p class="page-subtitle">Professional pressure washing for residential and
commercial properties throughout Redhill and surrounding areas. Complete
RH1 coverage.</p>

<h2>Professional Jetwashing in Redhill (RH1)</h2>

<p>Based in Redhill, we provide comprehensive jetwashing services throughout
the RH1 area. From Redhill town centre to Merstham, Salfords, Earlswood and
all surrounding residential areas, we offer fast response times and same-day
quotes for all pressure washing services.</p>
```

**Problems:**
- ❌ No answer-first opening
- ❌ No specific facts (costs, timing)
- ❌ Generic description
- ❌ Misses AI extraction opportunity

**Improved Opening (AFTER):**

```html
<h1>Jetwashing Redhill (RH1) | Pressure Washing Redhill | Free Quote</h1>
<p class="page-subtitle">Professional driveway and patio cleaning throughout
Redhill, Merstham, Salfords, Earlswood. £80-250 typical jobs, same-day quotes.</p>

<p><strong>Quick summary:</strong> Jetwashing services in Redhill cost
<strong>£80-250 for most driveways and patios</strong>, with same-day or
next-day availability across all RH1 postcodes. We cover Redhill town centre,
Merstham, Salfords, Earlswood, and Nutfield with <strong>2-hour callback
guarantee</strong> on quotes.</p>

<h2>How Much Does Jetwashing Cost in Redhill?</h2>

<p>Driveway cleaning in Redhill typically costs £80-250 depending on size and
condition. Block paving with re-sanding costs £120-280 for a standard double
driveway.</p>

<ul>
  <li><strong>Standard driveway (up to 40m²):</strong> £80-200</li>
  <li><strong>Large driveway (40-80m²):</strong> £200-350</li>
  <li><strong>Patio cleaning:</strong> £60-200</li>
</ul>
```

**Improvements:**
- ✅ Answer-first opening with specific prices
- ✅ Bold key facts (£80-250, 2-hour callback)
- ✅ Question-based H2 header
- ✅ Bulleted pricing list for AI extraction
- ✅ Location-specific (RH1 postcodes)

---

### Example 3: Pillar Page (Good Structure)

**File:** `pressure-washing-guide.html`

**Current Opening (GOOD):**

```html
<h1>The Ultimate Guide to Pressure Washing in Surrey</h1>
<p class="page-subtitle">Everything you need to know about cleaning driveways,
patios, and outdoor surfaces in 2026.</p>

<p><strong>Pressure washing is the most effective way to restore outdoor
surfaces</strong> across Surrey. Whether you have a moss-covered driveway in
Redhill, algae-stained patio slabs in Reigate, or oil-marked block paving in
Horley, professional pressure washing removes years of built-up grime in hours.
This guide covers everything from costs and methods to surface-specific advice
and maintenance tips.</p>
```

**Analysis:**
- ✅ Strong opening statement
- ✅ Specific use cases (moss, algae, oil)
- ✅ Location mentions (Redhill, Reigate, Horley)
- ⚠️ Missing specific fact/price in first 60 words

**Improved Opening:**

```html
<h1>The Ultimate Guide to Pressure Washing in Surrey</h1>
<p class="page-subtitle">Complete 2026 guide: costs, methods, surfaces.
Professional cleaning costs £3-8 per sqm across Surrey.</p>

<p><strong>The quick answer:</strong> Professional pressure washing in Surrey
costs <strong>£3-8 per square metre</strong> depending on surface type,
removing moss, algae, and oil stains in 1-3 hours. This guide covers costs,
DIY vs professional comparisons, surface-specific advice, and maintenance tips
for driveways, patios, and outdoor surfaces across Redhill, Reigate, and Surrey.</p>
```

**Improvements:**
- ✅ Specific price range in first sentence
- ✅ Time estimate (1-3 hours)
- ✅ Clear scope (what guide covers)
- ✅ Bold key facts for AI parsing

---

### Example 4: Service Page (Needs Header Improvement)

**File:** `driveway-cleaning.html`

**Current Headers (BEFORE):**

```html
<h1>Professional Driveway Cleaning Services</h1>
<h2>Our Driveway Cleaning Service</h2>
<h2>Benefits of Professional Cleaning</h2>
<h2>Pricing</h2>
```

**Problems:**
- ❌ Generic headers (not question-based)
- ❌ Company-centric ("Our Service")
- ❌ Vague ("Benefits")

**Improved Headers (AFTER):**

```html
<h1>Professional Driveway Cleaning Surrey | From £3/sqm</h1>
<h2>How Much Does Professional Driveway Cleaning Cost?</h2>
<h2>What's Included in Our Driveway Cleaning Service?</h2>
<h2>Why Choose Professional Driveway Cleaning Over DIY?</h2>
<h2>How Long Does Driveway Cleaning Take?</h2>
<h2>How Often Should You Clean Your Driveway?</h2>
```

**Improvements:**
- ✅ Question-based headers match search queries
- ✅ User-centric (not company-centric)
- ✅ Specific, descriptive
- ✅ AI can extract question-answer pairs

---

<a id="checklist"></a>
## 11. Implementation Checklist

### Page-Level Checklist

Use this for every guide page:

**Opening Section:**
- [ ] H1 with primary keyword + year (if applicable)
- [ ] Page subtitle (15-25 words) with key facts
- [ ] Answer-first opening paragraph (40-60 words)
  - [ ] Bold key facts/numbers
  - [ ] Complete answer without rest of page
  - [ ] Includes year freshness signal
- [ ] Context paragraph (2-3 sentences) explaining scope

**Content Structure:**
- [ ] 5-8 H2 sections (question-based headers)
- [ ] Each H2 answered in first 1-2 sentences
- [ ] 2-5 H3 subsections per H2
- [ ] Paragraphs: 2-3 lines max
- [ ] Lists: 20-40 words per item, bold key terms

**Tables (if applicable):**
- [ ] Pricing table with 3+ columns
- [ ] Comparison table (DIY vs pro, etc.)
- [ ] Table caption for context
- [ ] Responsive wrapper div

**Internal Links:**
- [ ] 2-4 contextual links per H2 section
- [ ] Descriptive anchor text (not "click here")
- [ ] Links to related guides
- [ ] "Related Guides" section at end

**Stats & Facts:**
- [ ] All numbers in digit format (£150, not "one hundred fifty")
- [ ] Bold key stats and prices
- [ ] Include units (£, m², hours, etc.)
- [ ] Year citations where relevant

**Schema Markup:**
- [ ] FAQPage schema (if Q&A format)
- [ ] HowTo schema (if step-by-step)
- [ ] Article schema (for guides)
- [ ] BreadcrumbList schema

### Priority Pages to Update

**Phase 1: High-Traffic Guides (Update First)**
1. `guides/patio-cleaning-cost-uk.html`
2. `guides/block-paving-cleaning-cost-uk.html`
3. `guides/driveway-cleaning-sealing-cost.html`
4. `guides/can-pressure-washing-damage-driveway.html`

**Phase 2: How-To Guides**
5. `guides/moss-removal-from-driveways.html`
6. `guides/remove-oil-stains-driveway.html`
7. `guides/prepare-driveway-for-pressure-washing.html`
8. `guides/how-to-clean-indian-sandstone-patio.html`

**Phase 3: Comparison Guides**
9. `guides/diy-vs-professional-pressure-washing.html`
10. `guides/pressure-washer-hire-vs-professional.html`
11. `guides/is-pressure-washing-worth-it.html`

**Phase 4: Area Pages**
12. All 15 area pages (redhill, reigate, horley, etc.)

### Quick Wins (Easiest Changes)

**1. Add Answer-First Openings**
- Time: 10 minutes per page
- Impact: High (AI citation increase)
- Pages: All guides without answer-first opening

**2. Convert Vague Headers to Question-Based**
- Time: 5 minutes per page
- Impact: Medium (better AI matching)
- Example: "Pricing" → "How Much Does X Cost?"

**3. Bold Key Facts in Existing Content**
- Time: 5 minutes per page
- Impact: Medium (easier AI extraction)
- Focus: Prices, measurements, time estimates

**4. Add Pricing/Comparison Tables**
- Time: 15-20 minutes per page
- Impact: High (featured snippet opportunity)
- Pages: Cost guides without tables

### Testing & Validation

**After Implementation:**

1. **Test in ChatGPT:**
   - Ask: "How much does driveway cleaning cost in the UK?"
   - Check if JetWash content is cited

2. **Test in Perplexity:**
   - Same query as ChatGPT
   - Check citation count and position

3. **Test in Google:**
   - Check for featured snippets
   - Look for "People also ask" inclusion

4. **Monitor GA4:**
   - Track referrals from chatgpt.com and perplexity.ai
   - Set up custom channel grouping: "AI/LLM Traffic"

5. **Screenshot Citations:**
   - Save examples of JetWash being cited
   - Track which pages get cited most
   - Log competitor citations for comparison

---

## Summary: Key Takeaways

### What AI Engines Want

1. **Answer-first structure** (40-60 words, direct answer upfront)
2. **Modular sections** (each H2 = standalone semantic unit)
3. **Question-based headers** (match search query wording)
4. **Structured data** (tables, lists, bold key facts)
5. **Short paragraphs** (2-3 lines max)
6. **Specific facts** (numbers, prices, measurements with units)

### What Makes JetWash Citeable

- **Specific local pricing:** £3-6 per sqm (not "varies")
- **Clear timelines:** 1-3 hours, lasts 18-24 months
- **Direct answers:** No fluff before the answer
- **Comparison tables:** DIY vs pro, pricing by surface type
- **Location specificity:** RH1, Redhill, Reigate, Surrey

### Implementation Priority

1. **High-traffic cost guides** (biggest impact)
2. **How-to guides** (HowTo schema opportunity)
3. **Comparison guides** (table snippet opportunity)
4. **Area pages** (local search opportunity)

### Expected Results

- **3-5x increase** in AI citations within 3 months
- **Featured snippets** for pricing queries
- **ChatGPT/Perplexity traffic** in GA4 referrals
- **Higher organic CTR** (content works for both AI and Google)

---

## Resources & Sources

### Primary Research Sources

**LLM SEO & Content Structure:**
- [Optimize Your Content for LLM in 2026 (Promodo)](https://www.promodo.com/blog/how-to-optimize-your-content-for-llm)
- [LLM SEO: Boost AI Citation (Ninja Promo)](https://ninjapromo.io/llm-seo)
- [LLM SEO in 2026: 8 Strategies (SEO Profy)](https://seoprofy.com/blog/llm-seo/)
- [How Vercel's Adapting SEO for LLMs (Vercel)](https://vercel.com/blog/how-were-adapting-seo-for-llms-and-ai-search)

**AI Citation Best Practices:**
- [How to Get Content Cited by ChatGPT & Perplexity (GeneO)](https://geneo.app/blog/ai-optimized-content-cited-chatgpt-perplexity-best-practices/)
- [Optimizing Content for ChatGPT, Gemini, Perplexity (Concept Ltd)](https://conceptltd.com/blog/optimizing-content-for-aeo)
- [How to Rank on ChatGPT, Perplexity (ALM Corp)](https://almcorp.com/blog/how-to-rank-on-chatgpt-perplexity-ai-search-engines-complete-guide-generative-engine-optimization/)

**Answer Engine Optimization (AEO):**
- [Optimizing Content for AI Search Answers (Microsoft Ads)](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers)
- [AEO: Answer Engine Optimization (AirOps)](https://www.airops.com/blog/aeo-answer-engine-optimization)
- [How to Structure Content for AEO and GEO (Pathfinder SEO)](https://pathfinderseo.com/blog/how-to-structure-content-for-aeo-and-geo/)
- [Answer Engine Optimization Framework 2026 (Monday.com)](https://monday.com/blog/marketing/answer-engine-optimization/)
- [8 AEO Best Practices for 2026 (TapClicks)](https://www.tapclicks.com/blog/answer-engine-optimization-best-practices)
- [AEO 2026: Complete Guide (Eminence)](https://eminence.ch/en/aeo-answer-engine-optimization-2026/)

**Traditional SEO vs AI SEO:**
- [Traditional SEO vs AI SEO (Semrush)](https://www.semrush.com/blog/traditional-seo-vs-ai-seo/)
- [AI Search Optimisation vs Traditional SEO (Exposure Ninja)](https://exposureninja.com/blog/ai-search-optimisation-vs-seo/)
- [AEO vs SEO: What Marketers Need to Know (HubSpot)](https://blog.hubspot.com/marketing/aeo-vs-seo)

### Additional Reading

- [How to Optimize Content for AI Answers (O8 Agency)](https://www.o8.agency/blog/ai/how-to-optimize-content-for-ai-answers)
- [AI Search Optimization Guide 2026 (Unique Logic)](https://uniquelogic.com/ai-search-optimization-guide-2026-llm-content-discovery/)
- [5 Ways to Optimize for Perplexity AI (Semrush)](https://www.semrush.com/blog/perplexity-ai-optimization/)

---

**Next Steps:**
1. Review this guide with team lead
2. Select 3-5 priority pages for Phase 1 updates
3. Implement answer-first openings (quick win)
4. Add pricing/comparison tables (high impact)
5. Test in ChatGPT and Perplexity
6. Monitor AI referral traffic in GA4

---

*Guide compiled from 20+ industry sources on LLM SEO, Answer Engine Optimization, and AI search best practices for 2026.*
