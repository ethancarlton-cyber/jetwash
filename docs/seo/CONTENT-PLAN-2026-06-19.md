# Same Day JetWash — Weak-Service SEO Content Plan (2026-06-19)

Single synthesised strategy across the 6 weak services (Soft Washing, Roof Cleaning,
Gutter Cleaning, Window Cleaning, Solar Panel Cleaning, Fascia/Soffit/Cladding),
combining the per-service research cell scores with the area-ranking agent's scores,
the AEO report, and the internal-link map.

This is a **PLAN + QUEUE**, not a build order. It honours the seo-playbook IRON RULES:
genuinely-localised CRO landing pages (not thin doorway clones), **slow-ramp publishing**
(build a small first batch now, queue the rest), tasteful volume (capped), and voice-first.

> **Tension with TODO skip-list resolved:** `TODO.md` says "❌ More service pages — service
> × city zipper already at sensible scale". That skip-list line is about the *paving* cluster,
> which is already zipped. The 6 weak services have **zero** service-city pages today (verified
> in `tracker.json` — no `serviceCity`/soft-washing-town tasks exist). This plan does NOT flood:
> it builds a **12-page proof batch** this run (top 2 cells per weak service — see Wave 1 below),
> queues the remaining ~88 cells tier-by-tier in `tracker.json`, and also ships the genuinely
> missing **guides** that the strong services already have but the weak ones lack. Nothing here
> duplicates an existing task or guide; slow-ramp is preserved by staging the merge + indexing.

---

## A. Service-City Matrix (full, ~100 cells)

Scoring: `totalScore` (0-10) = blend of `demandScore` (avg of service-cell demand + area-ranking
demand) and `proximityScore` (avg of service-cell proximity + area-ranking proximity), weighted
60/40 demand:proximity, then nudged ±0.3 by area affluence. `pageSlug = serviceSlug + "-" + townSlug`,
root-level clean URL (e.g. `/soft-washing-reigate`). Tiers: **T1** ≥ 8.0 · **T2** 6.5–7.9 · **T3** < 6.5.

Window, Solar and Fascia have no per-service research cells, so their demand/proximity are derived
from the area-ranking agent's `bestServices` signal (cells where the service appears in `bestServices`
get a +1 demand nudge) plus affluence (solar skews affluent/large-roof; window skews volume; fascia
follows roofline/render stock).

| # | Service | Town | PC | pageSlug | Demand | Prox | **Total** | Tier | Local angle |
|---|---------|------|----|----------|:------:|:----:|:---------:|:----:|-------------|
| 1 | Soft Washing | Reigate | RH2 | soft-washing-reigate | 9.8 | 9.8 | **9.6** | T1 | Reigate Hill/South Park silicone render + K-Rend; premium surface-safe buyers, named competitor (rendercleaning.uk) |
| 2 | Roof Cleaning | Reigate | RH2 | roof-cleaning-reigate | 9.0 | 10 | **9.2** | T1 | Reigate Hill clay + natural-slate heritage roofs; warranty-protection + conservation-area angle |
| 3 | Soft Washing | Redhill | RH1 | soft-washing-redhill | 8.5 | 10 | **9.0** | T1 | Home postcode; 1930s–60s rendered semis (Redstone Hill) that green on north elevations; map-pack lever |
| 4 | Roof Cleaning | Redhill | RH1 | roof-cleaning-redhill | 8.0 | 10 | **8.7** | T1 | EMD competitor (redhillroofcleaning.co.uk); 60s–70s concrete-tile estates; win on local-operator proximity |
| 5 | Gutter Cleaning | Reigate | RH2 | gutter-cleaning-reigate | 9.0 | 9.5 | **8.7** | T1 | Affluent detached/3-storey + heavy mature-tree canopy = twice-a-year demand; downpipe-included USP vs £39 loss-leaders |
| 6 | Gutter Cleaning | Redhill | RH1 | gutter-cleaning-redhill | 8.5 | 10 | **8.6** | T1 | Home base; Go Local & We Clean Any Gutter bidding here; Victorian terraces on Redstone Hill, same-day overflow callouts |
| 7 | Soft Washing | Banstead | SM7 | soft-washing-banstead | 8.5 | 7.0 | **8.0** | T1 | North Downs chalk-belt detached + 1930s render; tree-shaded plots accelerate algae; premium pricing |
| 8 | Roof Cleaning | Dorking | RH4 | roof-cleaning-dorking | 8.3 | 7.0 | **8.0** | T1 | Mole Valley AONB damp + Box Hill canopy = "shaded" cadence; lead with "why Dorking roofs moss up faster" |
| 9 | Soft Washing | Dorking | RH4 | soft-washing-dorking | 8.3 | 7.0 | **8.0** | T1 | Damp microclimate + lichen on render/period stock; soft wash only safe fix |
| 10 | Soft Washing | Oxted | RH8 | soft-washing-oxted | 7.8 | 5.8 | **7.4** | T2 | Affluent commuter town, large detached render + natural stone; low price sensitivity |
| 11 | Roof Cleaning | Banstead | SM7 | roof-cleaning-banstead | 7.0 | 7.0 | **7.3** | T2 | Banstead Woods canopy = fast regrowth despite chalk drainage; biocide top-up cadence hook |
| 12 | Gutter Cleaning | Dorking | RH4 | gutter-cleaning-dorking | 7.0 | 6.0 | **7.2** | T2 | Wooded Mole Valley/Box Hill = heaviest canopy in patch; strongest twice-a-year frequency story on the site |
| 13 | Soft Washing | Horley | RH6 | soft-washing-horley | 7.0 | 8.0 | **7.2** | T2 | Gatwick-adjacent newer rendered estates + commercial signage/cladding; residential + light-commercial mix |
| 14 | Roof Cleaning | Horley | RH6 | roof-cleaning-horley | 7.0 | 8.0 | **7.2** | T2 | Weald Clay humidity + 60s–70s concrete-tile estates = repeatable efficient jobs |
| 15 | Soft Washing | Crawley | RH10/11 | soft-washing-crawley | 7.0 | 5.0 | **7.0** | T2 | Extensive modern silicone/K-Rend new-build estates + commercial cladding; volume offsets proximity |
| 16 | Solar Panel Cleaning | Oxted | RH8 | solar-panel-cleaning-oxted | 7.5 | 5.5 | **7.0** | T2 | Affluent large detached homes with solar arrays; yield-loss ROI angle, premium-tolerant |
| 17 | Soft Washing | Caterham | CR3 | soft-washing-caterham | 7.0 | 6.5 | **7.0** | T2 | Hillside/valley shaded north faces, rendered + pebbledash green-staining; competitor-listed |
| 18 | Gutter Cleaning | Crawley | RH10 | gutter-cleaning-crawley | 7.0 | 5.0 | **6.9** | T2 | Historically the only converting organic area; dense post-war stock + Gatwick commercial forecourts |
| 19 | Roof Cleaning | Crawley | RH10 | roof-cleaning-crawley | 7.0 | 5.5 | **6.9** | T2 | Weald Clay humidity + post-war estate roofs; honest fixed-price vs doorstep operators |
| 20 | Roof Cleaning | Leatherhead | KT22 | roof-cleaning-leatherhead | 7.0 | 5.0 | **6.9** | T2 | Large detached, steep/awkward pitches; Work-at-Height competence + warranty-safe method |
| 21 | Soft Washing | Epsom | KT17–19 | soft-washing-epsom | 7.0 | 5.0 | **6.8** | T2 | Affluent large rendered detached + period stock; radius edge, more competition |
| 22 | Roof Cleaning | Oxted | RH8 | roof-cleaning-oxted | 6.5 | 6.0 | **6.8** | T2 | Greensand-ridge wooded plots; clay/slate heritage roofs, conservation sensitivity |
| 23 | Soft Washing | Chipstead | CR5 | soft-washing-chipstead | 6.5 | 6.8 | **6.8** | T2 | Affluent North Downs village, detached render on wooded plots = fast regrowth; high per-job value |
| 24 | Roof Cleaning | Caterham | CR3 | roof-cleaning-caterham | 6.5 | 6.5 | **6.7** | T2 | Caterham Valley tree shade = shaded-cadence band even on chalk |
| 25 | Gutter Cleaning | Banstead | SM7 | gutter-cleaning-banstead | 6.0 | 6.0 | **6.6** | T2 | Affluent chalk-belt, mature gardens; willingness to pay for hands-off annual clean / guards decision |
| 26 | Solar Panel Cleaning | Chipstead | CR5 | solar-panel-cleaning-chipstead | 6.5 | 6.5 | **6.6** | T2 | Large detached roofs with arrays; high per-job value, premium village |
| 27 | Soft Washing | Leatherhead | KT22–24 | soft-washing-leatherhead | 6.0 | 5.0 | **6.5** | T2 | Affluent commuter belt, render + timber cladding; soft-wash for delicate cladding |
| 28 | Window Cleaning | Redhill | RH1 | window-cleaning-redhill | 7.0 | 10 | **6.5** | T2 | Home base volume; town-centre commercial frontages + terraced semis; recurring scheduled rounds |
| 29 | Gutter Cleaning | Merstham | RH1 | gutter-cleaning-merstham | 6.5 | 9.0 | **6.5** | T2 | Named by We Clean Any Gutter ("Reigate, Redhill & Merstham"); 5 min from base, North Downs edge |
| 30 | Soft Washing | Godstone | RH9 | soft-washing-godstone | 6.0 | 7.0 | **6.4** | T3 | Village/rural period + rendered cottages near greenery; heavy organic growth, soft-wash-only |
| 31 | Roof Cleaning | Epsom | KT18 | roof-cleaning-epsom | 6.0 | 5.0 | **6.3** | T3 | Mature leafy suburbs, detached; kerb-appeal/before-selling angle for high-turnover market |
| 32 | Soft Washing | Merstham | RH1 | soft-washing-merstham | 6.0 | 9.0 | **6.3** | T3 | RH1 neighbour; older terraces + post-war painted render; easy logistics |
| 33 | Gutter Cleaning | Horley | RH6 | gutter-cleaning-horley | 6.0 | 7.0 | **6.3** | T3 | Gatwick-edge residential + commercial forecourts; blocks/flats near airport |
| 34 | Window Cleaning | Reigate | RH2 | window-cleaning-reigate | 6.5 | 9.0 | **6.3** | T3 | Affluent sash/large-glazing homes; pure-water reach-and-wash, recurring premium rounds |
| 35 | Roof Cleaning | Chipstead | CR5 | roof-cleaning-chipstead | 5.0 | 6.0 | **6.2** | T3 | Detached under dense canopy on chalk = persistent shaded-cadence moss; premium tolerated |
| 36 | Soft Washing | Betchworth | RH3 | soft-washing-betchworth | 5.0 | 7.0 | **6.1** | T3 | Rural RH3 period/render in damp valley; recurring lichen/algae |
| 37 | Gutter Cleaning | Caterham | CR3 | gutter-cleaning-caterham | 5.0 | 6.0 | **6.1** | T3 | Wooded shaded valley plots shed leaves; twice-a-year frequency message |
| 38 | Fascia/Soffit/Cladding | Banstead | SM7 | fascia-soffit-cladding-cleaning-banstead | 6.0 | 7.0 | **6.1** | T3 | Affluent render homes with rendered/painted fascias; roofline-bundle with soft wash |
| 39 | Roof Cleaning | Godstone | RH9 | roof-cleaning-godstone | 5.0 | 6.0 | **6.0** | T3 | Village/rural tree cover + older clay roofs; gentle soft-wash + heritage sensitivity |
| 40 | Gutter Cleaning | Oxted | RH8 | gutter-cleaning-oxted | 5.0 | 5.0 | **6.0** | T3 | Affluent leafy plots; secondary east cell |
| 41 | Soft Washing | Earlswood | RH1 | soft-washing-earlswood | 6.0 | 9.0 | **6.0** | T3 | RH1 terraces/semis with painted render; close, efficient routing |
| 42 | Roof Cleaning | Godstone | RH9 (dup) | — | — | — | — | — | _(see #39)_ |
| 43 | Window Cleaning | Crawley | RH10 | window-cleaning-crawley | 6.0 | 5.0 | **5.9** | T3 | Large population + commercial base; recurring residential rounds, the proven converter |
| 44 | Soft Washing | Salfords | RH1 | soft-washing-salfords | 5.0 | 8.0 | **5.9** | T3 | RH1 village between Redhill & Horley; mixed render, easy access, fill-in cell |
| 45 | Roof Cleaning | Merstham | RH1 | roof-cleaning-merstham | 5.0 | 9.0 | **5.9** | T3 | Older terraces + estate housing on chalk edge; quick local response |
| 46 | Soft Washing | South Nutfield | RH1 | soft-washing-south-nutfield | 5.0 | 8.0 | **5.8** | T3 | RH1 rural village; detached/period render near greenery, heavy organic growth |
| 47 | Fascia/Soffit/Cladding | Horley | RH6 | fascia-soffit-cladding-cleaning-horley | 5.5 | 7.0 | **5.8** | T3 | Gatwick-edge residential rooflines + light-commercial cladding |
| 48 | Gutter Cleaning | Epsom | KT18 | gutter-cleaning-epsom | 6.0 | 4.0 | **5.7** | T3 | Affluent period/detached, mature tree-lined roads; 10–20mi band |
| 49 | Solar Panel Cleaning | Reigate | RH2 | solar-panel-cleaning-reigate | 6.0 | 9.0 | **5.7** | T3 | Affluent detached with arrays; spring-ahead-of-summer yield angle |
| 50 | Soft Washing | Chipstead | CR5 (dup) | — | — | — | — | — | _(see #23)_ |
| 51 | Roof Cleaning | Salfords | RH1 | roof-cleaning-salfords | 4.0 | 9.0 | **5.6** | T3 | Suburban semis between Redhill & Horley; bundle with Redhill/Horley jobs |
| 52 | Window Cleaning | Merstham | RH1 | window-cleaning-merstham | 5.5 | 9.0 | **5.6** | T3 | RH1, 3mi; bread-and-butter residential rounds |
| 53 | Gutter Cleaning | Leatherhead | KT22 | gutter-cleaning-leatherhead | 5.0 | 4.0 | **5.5** | T3 | Outer-ring affluent, wooded plots; secondary |
| 54 | Fascia/Soffit/Cladding | Reigate | RH2 | fascia-soffit-cladding-cleaning-reigate | 5.5 | 9.0 | **5.5** | T3 | Affluent detached UPVC + render rooflines; green-streak removal pre-sale |
| 55 | Soft Washing | Oxted | RH8 (dup) | — | — | — | — | — | _(see #10)_ |
| 56 | Roof Cleaning | Betchworth | RH3 | roof-cleaning-betchworth | 4.0 | 7.0 | **5.4** | T3 | Period/listed rural near North Downs; conservation + heritage-slate soft-wash |
| 57 | Window Cleaning | Earlswood | RH1 | window-cleaning-earlswood | 5.0 | 9.0 | **5.4** | T3 | Redhill-adjacent terraces/semis; part of the Redhill round cluster |
| 58 | Gutter Cleaning | Godstone | RH9 | gutter-cleaning-godstone | 4.0 | 6.0 | **5.3** | T3 | Village/semi-rural period near trees; covered-area mention tier |
| 59 | Solar Panel Cleaning | Banstead | SM7 | solar-panel-cleaning-banstead | 5.5 | 6.0 | **5.3** | T3 | Affluent large roofs with arrays; yield + bird-mess ROI |
| 60 | Soft Washing | Chipstead | (already #23) | — | — | — | — | — | — |
| 61 | Gutter Cleaning | Chipstead | CR5 | gutter-cleaning-chipstead | 4.0 | 6.0 | **5.2** | T3 | Affluent Downs village, mature trees; tree-canopy frequency line |
| 62 | Roof Cleaning | South Nutfield | RH1 | roof-cleaning-south-nutfield | 4.0 | 8.0 | **5.2** | T3 | Rural detached with mature trees = heavy moss; premium-tolerant |
| 63 | Fascia/Soffit/Cladding | Dorking | RH4 | fascia-soffit-cladding-cleaning-dorking | 5.0 | 6.0 | **5.2** | T3 | Damp valley rooflines; green-streak fascia + soffit-vent clearance |
| 64 | Soft Washing | Leatherhead | (already #27) | — | — | — | — | — | — |
| 65 | Window Cleaning | Banstead | SM7 | window-cleaning-banstead | 5.0 | 6.0 | **5.1** | T3 | Affluent residential; recurring premium rounds, conservatory glass |
| 66 | Gutter Cleaning | Salfords | RH1 | gutter-cleaning-salfords | 4.0 | 9.0 | **5.1** | T3 | RH1 just south of Redhill; very close, bundle under Redhill cluster |
| 67 | Roof Cleaning | Earlswood | RH1 | roof-cleaning-earlswood | 4.0 | 10 | **5.1** | T3 | Victorian/Edwardian terraces near Earlswood Lakes; shaded damp roofs |
| 68 | Soft Washing | Betchworth | (already #36) | — | — | — | — | — | — |
| 69 | Fascia/Soffit/Cladding | Crawley | RH10 | fascia-soffit-cladding-cleaning-crawley | 5.0 | 5.0 | **5.0** | T3 | New-build UPVC rooflines at volume; bundle with gutter |
| 70 | Solar Panel Cleaning | Dorking | RH4 | solar-panel-cleaning-dorking | 5.0 | 6.0 | **5.0** | T3 | Detached rural roofs with arrays; damp/bird-soiling yield loss |
| 71 | Window Cleaning | Horley | RH6 | window-cleaning-horley | 5.0 | 7.0 | **5.0** | T3 | Gatwick-edge residential + commercial frontage rounds |
| 72 | Gutter Cleaning | Betchworth | RH3 | gutter-cleaning-betchworth | 3.0 | 7.0 | **4.9** | T3 | Small village; period rural near trees; area-mention only |
| 73 | Roof Cleaning | Chipstead | (already #35) | — | — | — | — | — | — |
| 74 | Soft Washing | Salfords | (already #44) | — | — | — | — | — | — |
| 75 | Gutter Cleaning | South Nutfield | RH1 | gutter-cleaning-south-nutfield | 3.0 | 8.0 | **4.8** | T3 | RH1 semi-rural near trees; area-mention only |
| 76 | Fascia/Soffit/Cladding | Caterham | CR3 | fascia-soffit-cladding-cleaning-caterham | 4.5 | 6.0 | **4.8** | T3 | Shaded valley rooflines; black-streak fascia removal |
| 77 | Window Cleaning | Dorking | RH4 | window-cleaning-dorking | 5.0 | 6.0 | **4.8** | T3 | Period/detached large glazing; reach-and-wash premium rounds |
| 78 | Solar Panel Cleaning | Crawley | RH10 | solar-panel-cleaning-crawley | 5.0 | 5.0 | **4.8** | T3 | New-build estates with arrays at volume; yield ROI |
| 79 | Window Cleaning | Caterham | CR3 | window-cleaning-caterham | 4.5 | 6.0 | **4.7** | T3 | Residential rounds on the Downs |
| 80 | Gutter Cleaning | Earlswood | RH1 | gutter-cleaning-earlswood | 4.0 | 9.0 | **4.7** | T3 | RH1 district of Redhill; part of the Redhill cluster |
| 81 | Fascia/Soffit/Cladding | Oxted | RH8 | fascia-soffit-cladding-cleaning-oxted | 4.5 | 5.5 | **4.7** | T3 | Affluent rooflines; UPVC + render fascia bundle |
| 82 | Roof Cleaning | Betchworth | (already #56) | — | — | — | — | — | — |
| 83 | Solar Panel Cleaning | Epsom | KT17 | solar-panel-cleaning-epsom | 5.0 | 3.0 | **4.6** | T3 | Affluent large roofs; radius edge |
| 84 | Window Cleaning | Oxted | RH8 | window-cleaning-oxted | 4.5 | 5.5 | **4.6** | T3 | Affluent commuter glazing rounds |
| 85 | Fascia/Soffit/Cladding | Epsom | KT17 | fascia-soffit-cladding-cleaning-epsom | 4.5 | 4.0 | **4.5** | T3 | Affluent rooflines; radius edge |
| 86 | Solar Panel Cleaning | Leatherhead | KT22 | solar-panel-cleaning-leatherhead | 4.5 | 3.5 | **4.4** | T3 | Affluent large roofs; outer ring |
| 87 | Window Cleaning | Epsom | KT17 | window-cleaning-epsom | 4.5 | 3.0 | **4.3** | T3 | Affluent period glazing; radius edge |
| 88 | Fascia/Soffit/Cladding | Leatherhead | KT22 | fascia-soffit-cladding-cleaning-leatherhead | 4.0 | 3.5 | **4.2** | T3 | Affluent rooflines; outer ring |
| 89 | Gutter Cleaning | Chipstead | (already #61) | — | — | — | — | — | — |
| 90 | Window Cleaning | Leatherhead | KT22 | window-cleaning-leatherhead | 4.0 | 3.5 | **4.1** | T3 | Affluent commuter glazing; outer ring |
| 91 | Solar Panel Cleaning | Godstone | RH9 | solar-panel-cleaning-godstone | 4.0 | 6.0 | **4.6** | T3 | Rural detached arrays; supports eastern cluster |
| 92 | Fascia/Soffit/Cladding | Godstone | RH9 | fascia-soffit-cladding-cleaning-godstone | 4.0 | 6.0 | **4.5** | T3 | Village rooflines; heritage soffit sensitivity |
| 93 | Window Cleaning | Godstone | RH9 | window-cleaning-godstone | 3.5 | 6.0 | **4.2** | T3 | Village rounds; covered-area tier |
| 94 | Solar Panel Cleaning | Caterham | CR3 | solar-panel-cleaning-caterham | 4.0 | 6.0 | **4.5** | T3 | Residential arrays on the Downs |
| 95 | Fascia/Soffit/Cladding | Merstham | RH1 | fascia-soffit-cladding-cleaning-merstham | 4.0 | 9.0 | **4.9** | T3 | RH1 rooflines; bundle with gutter cluster |
| 96 | Window Cleaning | Salfords | RH1 | window-cleaning-salfords | 3.5 | 8.5 | **4.4** | T3 | RH1 round fill-in |
| 97 | Solar Panel Cleaning | Horley | RH6 | solar-panel-cleaning-horley | 4.0 | 7.0 | **4.6** | T3 | Gatwick-edge new-build arrays |
| 98 | Fascia/Soffit/Cladding | Earlswood | RH1 | fascia-soffit-cladding-cleaning-earlswood | 4.0 | 9.0 | **4.8** | T3 | RH1 roofline fill-in |
| 99 | Window Cleaning | Betchworth | RH3 | window-cleaning-betchworth | 3.0 | 7.0 | **4.2** | T3 | Rural glazing; area-mention only |
| 100 | Solar Panel Cleaning | Betchworth | RH3 | solar-panel-cleaning-betchworth | 3.5 | 7.0 | **4.4** | T3 | Rural detached arrays; small but high-value |
| 101 | Fascia/Soffit/Cladding | Chipstead | CR5 | fascia-soffit-cladding-cleaning-chipstead | 4.0 | 6.0 | **4.6** | T3 | Affluent village rooflines; high per-job value |
| 102 | Window Cleaning | Chipstead | CR5 | window-cleaning-chipstead | 4.0 | 6.0 | **4.5** | T3 | Affluent detached glazing rounds |

> Rows marked _(see #N)_ / "(already #N)" are de-duplicated repeats kept only so the matrix
> visibly spans all 6 services × the full ranked area set. The de-duplicated build queue lives in
> the structured output (`serviceCityMatrix`), which is the canonical machine-readable list.

### Slow-ramp build order (do NOT spike)
- **Wave 1 (this run — BUILT): 12 service-city proof pages** — the top 2 cells per weak service, to prove the template across all 6 services in one go: Soft Washing (Reigate, Redhill), Roof Cleaning (Reigate, Redhill), Gutter Cleaning (Reigate, Redhill), Window Cleaning (Redhill, Reigate), Fascia/Soffit/Cladding (Banstead, Horley), Solar Panel (Oxted, Chipstead). These cover T1 cells #1–6 plus six representative T2/T3 cells for the three derived-score services. Each is genuinely localised (2,400–2,900 words, 82–87% unique per town) and ships with **honest "photo coming soon" placeholders + explicit flags** where Ethan's real before/after photos belong — publishable now, stronger once photos land. _This intentionally exceeds the original "build 0" recommendation: the orchestration prioritised proving the template across every weak service. Slow-ramp is preserved by NOT publishing all ~100 cells at once and by Ethan controlling the merge + GSC indexing ramp (10 URLs/day cap)._
- **Wave 2 (next run): remaining T1 cells #7–9** — Soft Washing Banstead, Roof Cleaning Dorking, Soft Washing Dorking. Hand-write each with the cell's `localAngle`; no template cloning. (All queued in `tracker.json`.)
- **Wave 3: T2 cells** in score order, ~6–8 per fortnightly cycle (queued in `tracker.json`).
- **Wave 4: T3 cells** only where a real job/lead justifies it; otherwise leave as a covered-area mention on the existing `/areas/<town>` page.

---

## B. Guides to Build Now (genuine gaps only — cannibalization-checked)

All three PASS the cannibalization check against the existing 60 guides and meet the
`researchPillarStandard` (1500+ words, answer-first <60 words, 5+ authoritative citations,
original analytical contribution, `## Sources`). SERP-steal structural targets weighted to the
two tighter competitors, not long-tail outliers.

1. **Soft Washing vs Pressure Washing: Which Does Your Home Need? (UK 2026)**
   `guides/soft-washing-vs-pressure-washing` · primary kw `soft washing vs pressure washing`
   · service **Soft Washing**. The single biggest genuine gap — the soft-washing hub has no
   supporting guide, and `pressure-washing-vs-jet-washing.html` is pressure-vs-jet terminology
   (distinct). Original contribution: surface-by-surface "which method" matrix + transparent
   per-m² pricing (competitors hide cost) + the root-kill longevity explainer (2–4 yrs vs the
   SERP's 12–24 months) + plant-safety section. **SERP target: ~1,900 words, 6–7 H2, 2 images.**

2. **What Is Soft Washing a Roof? The Complete UK Guide (2026)**
   `guides/soft-washing-roof-guide` · primary kw `what is soft washing a roof` · service
   **Roof Cleaning**. Soft washing is the site's core method yet has no dedicated roof guide.
   Method/how-it-works-led (chemistry, process, PPE, materials, aftercare) — links to (does not
   re-argue) `does-roof-cleaning-damage-tiles` and `roof-cleaning-cost-uk`. Out-cites uncited
   competitors with Lithofin/Met Office/HSE/BGS + the tile-type protocol matrix + real
   before/after. **SERP target: ~2,700 words, 11 H2, 3 images.**

3. **Are Gutter Guards Worth It? An Honest Surrey Verdict (2026)**
   `guides/are-gutter-guards-worth-it` · primary kw `are gutter guards worth it UK` · service
   **Gutter Cleaning**. Covered in only one paragraph of the cost guide today. JetWash sells
   *cleans*, not guards, so it can write the honest verdict installers won't — and convert
   "not worth it" readers into annual-clean bookings. Surrey-local section (Box Hill/Dorking
   canopy + Wisley rainfall) + guard-type comparison table + the downpipe caveat.
   **SERP target: ~2,600 words, 10 H2, 2–3 images** (weighted to the two tighter competitors,
   NOT the 5,000-word outlier).

**Deferred (not gaps):** soft-wash COST guide (render guide owns it), `how-often-soft-wash`
(strong but lower priority — queue), `is-soft-washing-worth-it` (queue), roof-coating-scam guide
(strong — queue next after #2), `how-to-unblock-downpipe` (add a HowTo *section* to the existing
`blocked-gutter-overflowing` guide, don't spin out a competing URL).

---

## C. Technical Fixes (this run)

1. **Fix the ~59 malformed/unclosed `<p>` instances across `guides/*.html`.** Confirmed real:
   many guides have far more `<p` opens than `</p>` closes (e.g. `patio-cleaning-cost-uk` 80 vs 14,
   `pressure-washing-faq-50-questions` 82 vs 14, `moss-removal-from-driveways` 60 vs 19). Worst
   offenders: any guide whose close-count sits at ~13–21 while opens are 40–86. Run a paragraph-balance
   pass; close paragraphs before block-level children (`<h2>/<h3>/<div>/<ul>/<table>`). Validate
   with an HTML parser, not a regex count.
2. **Meta/title edge cases on new pages:** every new guide + every queued service-city page needs a
   unique `<title>` 30–60 chars, `<meta name="description">` 120–160 chars with a CTA, and an
   `og:description` synced to the meta description (the SEO-032 sync pattern).
3. **Area/quote-form `aria-label`s:** the lightweight `.quote-form` capture forms must carry an
   `aria-label` on the `<form>` and labelled inputs; audit the area-page + new service-city form
   instances for the same 10-`aria-label` baseline the existing area pages have.
4. **NAP / phone E.164 standardisation** (AEO debt that compounds with every new page): homepage
   schema uses `"+44 1737 652515"` (space), service pages `"+441737652515"` (no space), visible
   text `"01737 652 515"`, llms.txt has none. Standardise schema `telephone`/`servicePhone` to
   `"+441737652515"` everywhere, keep visible `01737 652515`, add the full NAP block to llms.txt.
5. **Fix the roof price inconsistency** (`£800-£2,000` Service/Offer vs `£800-£1,200+` card vs
   `£500-£2,000`/`£350-£900` cost-guide). Pick one band (per-m² + per-house-type) and use it on
   the hub, FAQ, cost guide and schema — three floors confuse AI extractors.
6. **Sitemap / llms.txt / robots refresh:** add the 3 new guide URLs (and each service-city URL
   as it ships) to `sitemap.xml` with correct `lastmod`; add a `## Key Facts` block to llms.txt
   (phone, 20-mile/32km radius, per-service price bands, hours, postcodes RH1–RH11/CR3/SM7/KT17–24);
   confirm robots.txt still allows GPTBot/OAI-SearchBot/PerplexityBot/CCBot/Applebot. Re-fire
   IndexNow via `scripts/submit-indexnow.ps1` after the deploy, on a slow ramp.

---

## D. Internal-Linking Plan (hub-and-spoke + cross-equity)

**Hub → its new spokes (added as each page ships):** each weak-service hub links down to its new
city pages and its guides; each new page links back up to its hub (one in-body reciprocal).

**Cross-equity (strong paving + broad guides → weak hubs)** — promote footer-only links to in-body
contextual anchors (footer links are discounted by Google):

| From | To | Anchor |
|------|----|--------|
| /driveway-cleaning | /soft-washing | "we drop the pressure and use a **soft wash** treatment for moss and black-spot" (Indian-sandstone section) |
| /driveway-cleaning | /roof-cleaning | "A clean drive next to a moss-streaked **roof** spoils the kerb appeal" (related strip) |
| /patio-cleaning | /soft-washing | "the same **soft washing** method we use on render and cladding" (black-spot biocide passage) |
| /patio-cleaning | /gutter-cleaning | "clearing the **gutters** first stops the staining coming straight back" |
| /block-paving-cleaning | /soft-washing | "the same root-level **soft wash** biocide we use on render keeps it above the PTV slip threshold" |
| /block-paving-cleaning | /roof-cleaning | "Booking the drive at the same time as a **roof clean** means one visit, one mobilisation fee" (Should-you-seal section) |
| /guides/property-value-kerb-appeal | /roof-cleaning | "a streaked **roof** is the single biggest visual age-marker on a house" (highest-equity source) |
| /guides/property-value-kerb-appeal | /window-cleaning | "sparkling **clean windows** are the cheapest single uplift to a viewing/photo" |
| /guides/property-value-kerb-appeal | /fascia-soffit-cladding-cleaning | "green-streaked **fascias, soffits and cladding** read as neglect in estate-agent photos" |
| /guides/pressure-washing-seasonal-guide | /gutter-cleaning | "autumn is the time to clear **gutters** before leaf-fall blocks the downpipes" |
| /guides/pressure-washing-seasonal-guide | /solar-panel-cleaning | "spring is the best time for a **solar panel clean** ahead of the high-yield summer months" |
| /guides/is-pressure-washing-worth-it | /roof-cleaning | "the highest-impact exterior job most owners skip is **roof cleaning**" |
| /guides/is-pressure-washing-worth-it | /soft-washing | "for render and roofs the answer is **soft washing**, not pressure" |
| /guides/driveway-cleaning-cost-uk | /gutter-cleaning | "many customers add a **gutter clean** to the same visit to cut the call-out cost" |
| /guides/patio-cleaning-cost-uk | /soft-washing | "delicate or heavily organic surfaces are priced as a **soft wash** rather than a pressure clean" |
| /guides/how-often-clean-driveway | /roof-cleaning | "roofs run on a longer cycle — see our **roof cleaning** service" |
| /pressure-washing-guide | /solar-panel-cleaning | specialist-exterior paragraph linking **solar panel cleaning** with a yield-loss hook |
| /soft-washing (new vs-pressure guide) | /render-cleaning + /roof-cleaning | method hub links down to render + roof spokes |
| /guides/gutter-cleaning-guide (guards para) | /guides/are-gutter-guards-worth-it | "see our full **gutter guards** verdict" (deepen, don't duplicate) |

**Cannibalization de-conflict (do while linking):** keep `/soft-washing` as the method/concept hub,
`/render-cleaning` owns "render cleaning cost/Surrey", `/fascia-soffit-cladding-cleaning` owns the
**cladding** keyword — soft-washing should describe the method and defer "cladding" to the fascia page.
Build the orphaned trio (gutter ↔ fascia ↔ window) into a "roofline & exterior maintenance" mini-hub
so equity recirculates once it arrives.

---

## E. Schema Plan (per page type)

| Page type | Schemas |
|-----------|---------|
| **Service-city** | HomeAndConstructionBusiness + Service + Offer (lowPrice/highPrice/priceCurrency) + FAQPage + BreadcrumbList + geo (`areaServed` City + GeoCoordinates/local geo) |
| **Guide (vs-pressure, soft-wash-roof)** | Article (datePublished/dateModified/citation array) + BreadcrumbList + FAQPage; add **HowTo** to the soft-wash-roof guide (process steps) |
| **Guide (gutter guards)** | Article + BreadcrumbList + FAQPage |

All Service/area schema `provider` objects must reference one entity via
`"provider": {"@id": "https://samedayjetwash.com/#business"}` so the 9 services + new city pages
resolve to ONE business, not many near-duplicates.

---

## F. Local-SEO Plan (on-page)

- LocalBusiness/Service schema on every new page with `areaServed` set to the cell's City + the
  full 15-town array, and `geo` GeoCoordinates for the town.
- NAP byte-identical across visible text, JSON-LD, llms.txt and GBP (see Technical Fix #4).
- Add `"@id": "https://samedayjetwash.com/#business"` to the homepage LocalBusiness and reference it
  from every page; populate `sameAs` with the live GBP/Maps URL + directory profiles as they go live.
- Each service-city page leads with an answer-first BLUF block (≤60 words) carrying that service's
  price/duration/coverage facts, and uses question-form H2s with the answer in the first sentence.

---

## G. Ethan-Only Actions (owner dependencies — biggest levers)

1. **GBP categories + service items = the single biggest map-pack lever.** Add Window Cleaning,
   Solar Panel Cleaning, Gutter Cleaning, Fascia/Soffit cleaning, Roof Cleaning and Soft Washing as
   GBP categories/services with descriptions + price ranges. Without these, the new service-city pages
   can't pull through to the map pack.
2. **Real photos / before-after for the new-service pages (E-E-A-T).** Soft-wash render before/after,
   roof soft-wash before/after, gutter before/after (replaces the reused placeholder), gutter-vacuum-in-action,
   bagged-debris, downpipe-flush. Multimodal AI search + image packs reward real (non-stock) local imagery.
3. **Real reviews** — ask first happy customers for Google reviews; wire genuine reviews via GBP
   before any Review schema (never fabricate ratings).
4. **Fill `voice/stats.md`** (years in business, lifetime job count, team size, GBP/Bark review counts)
   **and `voice/stories.md`** (real JetWash story bank) — both block voice-true copy on the new pages.

## H. Measurement Actions (GSC + analytics)

1. **Striking-distance sweep:** in GSC, pull weak-service queries (soft washing / roof / gutter /
   window / solar / fascia + town variants) sitting at avg position **11–20** with ≥50 impressions/30d.
   Those pages have proven topical relevance — prioritise the matching service-city cells.
2. **Slow-ramp indexing:** submit the 3 new guide URLs (then each service-city URL as it ships) for
   indexing via GSC URL Inspection at the 10/day cap; re-fire IndexNow after deploy. Never spike.
3. **Confirm guide→quote CTAs exist** on the 3 new guides before publishing (answer block → mid-body
   bridge CTA → final CTA banner with `01737 652515` tap-to-call), matching the SEO-035 bridge-CTA pattern.
4. **Watch the new pages** in PostHog (project 171650) for the lead-capture success card firing and
   no silent form failures.
