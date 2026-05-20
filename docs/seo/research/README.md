# Research Recordkeeping

The `/goal` research-pillar loop persists progress, planning, and findings here so cycles don't restart cold. Read these files at the start of every cycle before opening WebSearch.

## Files

| File | Purpose | Append or overwrite |
|---|---|---|
| `progress-log.md` | Cycle-by-cycle log: what was attempted, what shipped, what failed. | Append only |
| `sources-library.md` | Accumulated authoritative sources by topic. Reusable across articles. | Append + amend |
| `findings.md` | Cross-cutting insights worth re-citing in multiple articles. | Append + amend |
| `pillar-plans/Q-NN-slug.md` | Per-query plan: stance, sources to use, original contribution, status. | One file per priority query |

## Workflow per cycle

1. Read `progress-log.md` tail — what was done last cycle? what's next?
2. Read `findings.md` and `sources-library.md` — what do we already know?
3. Pick the next query from `tracker.json#northStar.priorityQueries`
4. Write or update `pillar-plans/Q-NN-slug.md` with stance + sources + original contribution
5. Do the work (research + write + commit)
6. Append a cycle entry to `progress-log.md`
7. Append any new sources to `sources-library.md` (mark which articles use each)
8. Append any cross-cutting findings to `findings.md`

## Why this matters

Without persistence:
- Every cycle re-surveys sources we already know about (token waste)
- Cross-cutting insights (Surrey rainfall, Marshalls cleaning guidelines) get re-derived per-article instead of being a citable house dataset
- No audit trail for Ethan to read what the loop has been doing
- The site never accumulates a research library — it just gets re-written

With persistence: each cycle compounds. By Q-15 the loop has a 100+ entry sources library that no competitor could replicate without weeks of work.
