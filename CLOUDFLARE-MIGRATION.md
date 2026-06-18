# JetWash → Cloudflare Pages migration

Static site (HTML/CSS/JS, no build step). Goal: move samedayjetwash.com off Vercel onto
Cloudflare Pages (free), preserving 100% of SEO (redirects, clean URLs, headers) and your
manual-release control. Do this AFTER Waves A–D are merged + verified on Vercel, so hosting
and content don't change in the same window.

## Files in this PR (drop into repo root)
- `_redirects` — the content 301s (ported from vercel.json). CF Pages auto-handles `.html`→clean (308).
- `_headers` — immutable cache for /css /js /images, 1h HTML cache, CSP + security headers (identical to vercel.json).

## Claude can do (in repo)
- [x] Author `_redirects` + `_headers` from vercel.json (faithful port — verified line-by-line).
- [ ] On cutover: keep `vercel.json` in the repo (harmless on CF) OR remove it — your call. Recommend KEEP until CF is confirmed, then delete in a follow-up.

## Ethan only (account + DNS — owner steps)
1. **Create the Pages project**: Cloudflare dashboard → Workers & Pages → Create → Pages → connect the GitHub repo `ethancarlton-cyber/jetwash`. Build command: NONE (static). Output dir: `/` (root). Production branch: `main`.
2. **Release model**: to keep your manual-release control (Vercel had auto-deploy off), set the Pages project's production branch builds to "paused"/manual, OR accept CF's push-to-main auto-deploy. Decide which. (Default CF = auto-deploy on push to main.)
3. **Verify on the free preview FIRST**: the project gets a `*.pages.dev` URL. Before any DNS change, test on it:
   - every clean URL loads (no .html)
   - each content 301 in `_redirects` works (/tips→/guides, /areas/bletchingley→/areas/betchworth, etc.)
   - `.html`→clean redirects fire
   - response headers show the immutable cache on /css /js /images and the CSP
   - the quote form submits (Web3Forms) and PostHog still loads on consent
   (Claude can drive this check in Playwright against the *.pages.dev URL.)
4. **www → apex redirect**: add a Cloudflare **Redirect Rule** (Rules → Redirect Rules): if hostname `www.samedayjetwash.com` → `https://samedayjetwash.com/${path}` 301. (Cleaner than _redirects, which is path-scoped.)
5. **DNS cutover** (the only step with downtime risk):
   - If the domain's DNS is already on Cloudflare: add the Pages custom domain `samedayjetwash.com` (+ `www`) — CF wires the CNAME/records automatically.
   - If not: move the domain's nameservers to Cloudflare at the registrar first, then add the custom domain.
   - Keep Vercel live until CF is serving + verified, then remove the domain from Vercel.
6. **Post-cutover**: in Google Search Console + Bing, confirm the domain still verified; resubmit `sitemap.xml`; spot-check Coverage for redirect/404 errors over the next few days. Re-run IndexNow if desired (`scripts/submit-indexnow.ps1`).

## Rollback
DNS points back to Vercel (which stays configured until you delete the domain there). Near-instant.

## Notes
- `CLAUDE.local.md` deploy hook is Vercel-specific; after cutover, the "make it live" mechanism becomes either a CF deploy (push to main) or a CF deploy hook — update CLAUDE.local.md then.
- The immutable CSS/JS caching means future CSS/JS changes still need a `?v=N` link bump (same as today) — unchanged by the host move.
