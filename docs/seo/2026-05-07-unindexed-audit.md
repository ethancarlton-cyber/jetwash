# Unindexed Pages Audit — 2026-05-07

GSC status: "Crawled — currently not indexed" for 14 URLs. Redirects/canonicals already cleared. Investigating content/quality signals only.

Method: per-page metrics extracted from local HTML (script: `audit-unindexed.mjs`).
- Word count = visible body text inside `<main>`, with `<header>/<nav>/<footer>/<script>/<style>` stripped.
- Inbound links = full-repo grep of `href="/<dir>/<slug>"` across every `.html` file (self-references excluded).
- Body overlap = Jaccard token similarity on the first 5,000 chars of body text vs every other target.

## Baselines (presumed indexed equivalents)

| URL | Words | H2 | H3 | Inbound | Notes |
|---|---:|---:|---:|---:|---|
| /guides/driveway-cleaning-cost-uk | 2,516 | 11 | 28 | **91** | Anchor cost-guide. Linked from nearly every page. |
| /guides/jet-washing-prices-uk | 1,986 | 7 | 20 | 12 | Smaller inbound but well-linked from money pages. |
| /areas/redhill | 1,166 | 11 | 5 | **109** | Hub area page. Linked from every guide + every area. |
| /areas/reigate | 1,237 | 11 | 5 | **108** | Same shape as Redhill. |

**Baseline takeaways:**
- Indexed area pages: ~1,150-1,250 words, 11×H2, 5×H3, **>100 inbound links**.
- Indexed guide pages: ~2,000-2,500 words, 7-11×H2, 20-28×H3, 12-91 inbound.

The recurring signal: **indexed pages are linked from ~every other page in the site (areas-list nav block on each area, "popular guides" block on each guide).** Unindexed pages are missing from one or both of those nav blocks.

## Per-URL Audit

| URL | Words | H2 | H3 | Inbound | Verdict | Top reason |
|---|---:|---:|---:|---:|---|---|
| /guides/prepare-driveway-for-pressure-washing | 1,523 | 10 | 16 | 20 | **WEAK** | Length OK; but utility-procedure guide with no UK-specific data, no photos, no measured times — pure generic how-to that AI Overviews answer better. |
| /guides/tarmac-driveway-cleaning | 2,195 | 10 | 18 | 7 | **ORPHAN** | Length fine, but only 7 inbound links (vs 91 for cost-guide). Not in the area-page link block. |
| /guides/block-paving-cleaning-cost-uk | 2,463 | 12 | 29 | 44 | **LOOKS_FINE** | Strong on every metric. Likely a recency / authority hold — no content-side defect. |
| /guides/best-time-patio-cleaning | 1,921 | 11 | 17 | 24 | **DUPLICATE** | 0.42 Jaccard body overlap with /guides/pressure-washing-seasonal-guide. Same month-by-month seasonal advice, just patio-framed. Google sees them as near-duplicates and picks one. |
| /guides/is-pressure-washing-worth-it | 1,131 | 8 | 13 | 32 | **THIN** | Shortest of the 14 (1,131 words). Topic = subjective opinion query that AI Overviews answers in a paragraph. Page is a generic "yes/no/depends" essay, no calculator embed, no real before/after costs from us. |
| /guides/patio-cleaning-cost-uk | 2,807 | 12 | 33 | 35 | **LOOKS_FINE** | Substantial, well-linked. Probable cause: head-keyword cannibalisation with /guides/driveway-cleaning-cost-uk and /guides/jet-washing-prices-uk (all share the "£X per m²" body shape). |
| /guides/weed-removal-block-paving | 2,036 | 8 | 16 | 10 | **ORPHAN** | Length fine; only 10 inbound — not in any area page's link block. Also low H3-to-H2 ratio. |
| /guides/moss-removal-from-driveways | 1,758 | 10 | 28 | **59** | **LOOKS_FINE** | Best-linked unindexed guide. No content-side defect. Likely waiting on authority. |
| /guides/pressure-washing-vs-jet-washing | 2,873 | 13 | 32 | 15 | **WEAK** | Long but the entire premise ("pressure washing IS jet washing, same thing") is a 30-word answer. 2,873 words to say "they're the same" reads as keyword-stuffing. Classic AI-Overview-killed query. |
| /guides/pressure-washing-seasonal-guide | 2,792 | 12 | 23 | 9 | **DUPLICATE** | Pair-duplicate with best-time-patio-cleaning (0.42 Jaccard). Plus only 9 inbound — orphan-tier. |
| /guides/pressure-washing-before-after-expectations | 3,129 | 13 | 35 | 9 | **ORPHAN** | Largest page in the set (3,129 words) but only 9 inbound. Topic also implies photos — page has none of our own before/after images, just descriptive text, which weakens the substance signal. |
| /guides/pressure-washing-service-tiers | 1,775 | 9 | **3** | 9 | **WEAK** | Structural issue: only 3×H3 vs 9×H2. Sub-points use `<p><strong>` instead of headings — Google's outline of the page is thin. Plus 9 inbound = orphan. |
| /areas/godstone | 1,378 | 11 | 5 | **10** | **ORPHAN** | Word count actually beats Redhill baseline (1,166). Inbound count is 10x lower than Redhill (10 vs 109). Missing from the cross-area link block on most other pages. |
| /areas/chipstead | 1,630 | 11 | 5 | **11** | **ORPHAN** | Same shape as Godstone. 11 inbound vs 108-109 for Redhill/Reigate. |
| /areas/caterham | 1,111 | 11 | 5 | **11** | **ORPHAN** | Same shape; word count just under Redhill baseline. Same inbound deficit. |

## Recommended action (one line each)

| URL | Action |
|---|---|
| prepare-driveway | Add 3-5 unique items: our own checklist photo, a Surrey-specific timing table, a sample first-clean callout box. |
| tarmac-driveway-cleaning | Add to the "common driveway problems" link block on all area pages and to driveway-cleaning service page. |
| block-paving-cleaning-cost-uk | No content fix; resubmit in GSC and wait — this one has no defect. |
| best-time-patio-cleaning | Differentiate from seasonal-guide: cut the month-by-month section, refocus 100% on patio-material decisions (sandstone vs porcelain vs concrete). |
| is-pressure-washing-worth-it | Either expand 2x with original Surrey cost data + property-value section + calculator embed, or 301-redirect into property-value-kerb-appeal. |
| patio-cleaning-cost-uk | No content fix; canonical is correct, resubmit and wait. |
| weed-removal-block-paving | Add to area-page link block + cross-link from moss-removal page. |
| moss-removal-from-driveways | No content fix; well-linked, request indexing in GSC. |
| pressure-washing-vs-jet-washing | Compress to ~800 words OR repurpose into a glossary entry; the topic doesn't justify 2.8K words. |
| pressure-washing-seasonal-guide | Differentiate from best-time-patio (cover render/decking/roof seasonal timing instead of patio); add 5+ inbound links. |
| pressure-washing-before-after-expectations | Add real before/after photos; link from every service page CTA strip. |
| pressure-washing-service-tiers | Promote the `<p><strong>` sub-points to `<h3>` for proper outline; add 5+ inbound links. |
| areas/godstone | Add to "Areas We Cover" block on every guide + every other area page. Same fix unlocks 90+ inbound links. |
| areas/chipstead | Same as godstone. |
| areas/caterham | Same as godstone. Optional: add 250 words on Caterham-on-the-Hill steep-driveway specifics. |

## Pattern summary

**Three failure modes account for 13 of 14 pages:**

1. **ORPHAN — internal-linking gap (7 of 14: tarmac, weed-removal, before-after, service-tiers, godstone, chipstead, caterham; partial: seasonal-guide).** The site has two strong link blocks: areas-list (every page links to redhill/reigate/horley/dorking/banstead) and a guide-cross-link block (every page links to driveway-cleaning-cost-uk + jet-washing-prices-uk + moss-removal). Pages excluded from those blocks score 7-15 inbound vs 90-109 for included pages. Google reads low PageRank-flow as "not important enough to index." This is the single biggest pattern.

2. **WEAK — substantive uniqueness (3 of 14: prepare-driveway, is-worth-it, vs-jet-washing).** Length is fine but content is generic answer-the-query material that AI Overviews now serves directly. No proprietary data, no Surrey-specific examples, no photos, no calculator embeds, no original cost rows. These are the queries Google decides "we don't need another generic page on this."

3. **DUPLICATE — internal cannibalisation (2 of 14: best-time-patio + seasonal-guide; arguably also patio-cleaning-cost vs driveway-cleaning-cost).** 0.42 Jaccard overlap measured. Google picks one URL to represent the cluster and drops the other.

**THIN is rare here** — only is-pressure-washing-worth-it actually undershoots the word count baseline. Most "thin" feeling unindexed pages are long but generic (which scans as WEAK, not THIN).

**LOOKS_FINE residual (3 of 14: block-paving-cost, patio-cost, moss-removal):** No detectable content defect. These three are best treated as pure recency/authority lag — they should be re-requested in GSC and monitored, not rewritten.

**Highest-leverage fix:** the area-page link block. Adding godstone/chipstead/caterham to the cross-area-link list on every existing area + every guide is a one-pass edit that fixes 3 of 14 URLs and likely also helps tarmac, weed-removal, before-after, service-tiers, and seasonal-guide cross the indexing threshold.
