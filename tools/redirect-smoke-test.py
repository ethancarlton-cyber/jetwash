"""Bulletproof redirect smoke test for samedayjetwash.com.

Usage:
  python scripts/redirect-smoke-test.py <base-url>

Examples:
  python scripts/redirect-smoke-test.py https://samedayjetwash.com
  python scripts/redirect-smoke-test.py https://jetwash-git-seo-redirect-bulletproofing-same-day-jetwashs-projects.vercel.app

Path-based tests (.html -> clean, legacy redirects, clean URLs) run against any base.
Host-based tests (www -> apex, http -> https) only run when base is prod (samedayjetwash.com).
"""
import sys
import urllib.request
import urllib.error
from urllib.parse import urlparse, urljoin

if len(sys.argv) < 2:
    print("Usage: redirect-smoke-test.py <base-url>")
    sys.exit(2)

BASE = sys.argv[1].rstrip("/")
IS_PROD = "samedayjetwash.com" in BASE
MAX_HOPS = 5

# All paths from GSC bucket 1 ("Page with redirect"), apex HTTPS only.
# .html paths -> expected clean equivalent. (None means index.)
BUCKET1_HTML = [
    "/index.html",
    "/guides.html",
    "/guides/patio-cleaning-cost-uk.html",
    "/commercial-jetwashing.html",
    "/guides/pressure-washer-hire-vs-professional.html",
    "/faq.html",
    "/guides/how-often-clean-driveway.html",
    "/areas/epsom.html",
    "/areas/horley.html",
    "/guides/prepare-driveway-for-pressure-washing.html",
    "/guides/is-pressure-washing-worth-it.html",
    "/guides/how-to-clean-indian-sandstone-patio.html",
    "/guides/block-paving-sealing-guide.html",
    "/privacy.html",
    "/areas/banstead.html",
    "/guides/remove-oil-stains-driveway.html",
    "/areas/redhill.html",
    "/guides/diy-vs-professional-pressure-washing.html",
    "/areas/crawley.html",
    "/areas/earlswood.html",
    "/guides/block-paving-cleaning-cost-uk.html",
    "/guides/driveway-cleaning-cost-uk.html",
    "/areas/nutfield.html",
    "/areas/caterham.html",
    "/guides/can-pressure-washing-damage-driveway.html",
    "/guides/driveway-cleaning-sealing-cost.html",
    "/guides/moss-removal-from-driveways.html",
    "/guides/pressure-washing-vs-jet-washing.html",
]

# All paths from GSC bucket 2 ("Redirect error").
BUCKET2_HTML = [
    "/areas/salfords.html",
    "/pricing.html",
    "/render-cleaning.html",
    "/decking-cleaning.html",
    "/patio-cleaning.html",
    "/quote.html",
    "/driveway-cleaning.html",
    "/guides/best-time-patio-cleaning.html",
    "/areas/dorking.html",
    "/areas.html",
    "/areas/merstham.html",
]

# Random sample for confidence.
SAMPLE_HTML = [
    "/areas/reigate.html", "/areas/oxted.html", "/areas/leatherhead.html",
    "/areas/godstone.html", "/areas/chipstead.html", "/areas/betchworth.html",
    "/areas/sutton.html", "/areas/tadworth.html", "/areas/headley.html", "/areas/coulsdon.html",
    "/driveway-cleaning.html", "/patio-cleaning.html", "/render-cleaning.html",
    "/decking-cleaning.html", "/block-paving-cleaning.html", "/commercial-jetwashing.html",
    "/roof-cleaning.html", "/gutter-cleaning.html", "/soft-washing.html", "/calculator.html",
    "/guides/driveway-cleaning-cost-uk.html", "/guides/patio-cleaning-cost-uk.html",
    "/guides/block-paving-cleaning-cost-uk.html", "/guides/pressure-washing-vs-jet-washing.html",
    "/guides/moss-removal-from-driveways.html", "/guides/remove-oil-stains-driveway.html",
    "/guides/how-often-clean-driveway.html", "/guides/is-pressure-washing-worth-it.html",
    "/guides/best-time-patio-cleaning.html", "/guides/pressure-washing-seasonal-guide.html",
]

# Clean URLs that must NOT redirect (200 OK).
CLEAN_OK = ["/", "/quote", "/areas/redhill", "/guides/driveway-cleaning-cost-uk", "/calculator"]

# Legacy redirects from vercel.json that must continue to work.
LEGACY = [
    ("/tips",                      "/guides"),
    ("/tips.html",                 "/guides"),
    ("/driveway-cleaning-redhill", "/areas/redhill"),
    ("/areas/bletchingley",        "/areas/betchworth"),
]

# Host-based tests (prod only).
HOST_REDIRECTS = [
    ("https://www.samedayjetwash.com/",                 "https://samedayjetwash.com/",         1),
    ("https://www.samedayjetwash.com/quote",            "https://samedayjetwash.com/quote",    1),
    ("https://www.samedayjetwash.com/quote.html",       "https://samedayjetwash.com/quote",    1),
    ("https://www.samedayjetwash.com/areas/redhill",    "https://samedayjetwash.com/areas/redhill", 1),
    ("https://www.samedayjetwash.com/index.html",       "https://samedayjetwash.com/",         1),
    ("http://samedayjetwash.com/",                      "https://samedayjetwash.com/",         2),
    ("http://www.samedayjetwash.com/",                  "https://samedayjetwash.com/",         3),  # platform may keep www on http upgrade
    ("http://samedayjetwash.com/quote.html",            "https://samedayjetwash.com/quote",    2),
]


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


opener = urllib.request.build_opener(NoRedirect)


def trace(url, max_hops=MAX_HOPS):
    """Walk redirect chain manually. Returns list of (status, location) and final URL."""
    chain = []
    current = url
    for _ in range(max_hops + 1):
        req = urllib.request.Request(current, method="HEAD", headers={"User-Agent": "redirect-smoke/1.0"})
        try:
            resp = opener.open(req, timeout=15)
            chain.append((resp.status, None, current))
            return chain, current
        except urllib.error.HTTPError as e:
            if 300 <= e.code < 400:
                loc = e.headers.get("Location")
                if loc and not loc.startswith("http"):
                    loc = urljoin(current, loc)
                chain.append((e.code, loc, current))
                if loc is None:
                    return chain, current
                current = loc
            else:
                chain.append((e.code, None, current))
                return chain, current
        except Exception as e:
            chain.append((0, f"error: {e}", current))
            return chain, current
    return chain, current


passed = 0
failed = 0
fails = []


def check(name, url, expect_status=None, expect_final=None, expect_hops=None, all_301=True):
    global passed, failed
    chain, final = trace(url)
    actual_hops = sum(1 for s, _, _ in chain if 300 <= s < 400)
    statuses = [s for s, _, _ in chain]

    ok = True
    why = []
    if expect_status is not None and chain[0][0] != expect_status:
        ok = False
        why.append(f"first status={chain[0][0]} expected={expect_status}")
    if expect_final is not None:
        # Compare final URL ignoring trailing slash on root paths
        if final.rstrip("/") != expect_final.rstrip("/"):
            ok = False
            why.append(f"final={final} expected={expect_final}")
    if expect_hops is not None and actual_hops != expect_hops:
        ok = False
        why.append(f"hops={actual_hops} expected={expect_hops}")
    if all_301:
        non_301 = [s for s in statuses if 300 <= s < 400 and s != 301]
        if non_301:
            ok = False
            why.append(f"non-301 redirect statuses found: {non_301}")

    if ok:
        passed += 1
        print(f"  PASS  {name}  ({url} -> {final}, {actual_hops} hop(s))")
    else:
        failed += 1
        msg = "; ".join(why)
        fails.append((name, url, msg, chain))
        print(f"  FAIL  {name}  {msg}")
        for s, loc, src in chain:
            print(f"          {s}  {src}  -> {loc}")


# ===== Run tests =====

print(f"\n=== Path tests against {BASE} ===\n")

print("[1] Bucket-1 (.html -> clean, expect 1 hop 301):")
for path in BUCKET1_HTML:
    expected = path[:-5] if path != "/index.html" else "/"
    check(f"B1 {path}", BASE + path,
          expect_status=301,
          expect_final=BASE + expected,
          expect_hops=1)

print("\n[2] Bucket-2 (.html -> clean, expect 1 hop 301):")
for path in BUCKET2_HTML:
    expected = path[:-5] if path != "/index.html" else "/"
    check(f"B2 {path}", BASE + path,
          expect_status=301,
          expect_final=BASE + expected,
          expect_hops=1)

print("\n[3] Random sample (.html -> clean, expect 1 hop 301):")
for path in SAMPLE_HTML:
    expected = path[:-5] if path != "/index.html" else "/"
    check(f"S {path}", BASE + path,
          expect_status=301,
          expect_final=BASE + expected,
          expect_hops=1)

print("\n[4] Clean URLs (expect 200, no redirect):")
for path in CLEAN_OK:
    check(f"OK {path}", BASE + path, expect_status=200, expect_hops=0)

print("\n[5] Legacy redirects (preserved):")
for src, dest in LEGACY:
    check(f"LEG {src}", BASE + src,
          expect_status=301,
          expect_final=BASE + dest,
          expect_hops=1)

if IS_PROD:
    print("\n[6] Host-based redirects (prod only):")
    for url, expected, max_hops in HOST_REDIRECTS:
        chain, final = trace(url)
        actual_hops = sum(1 for s, _, _ in chain if 300 <= s < 400)
        ok = final.rstrip("/") == expected.rstrip("/") and actual_hops <= max_hops
        if ok:
            passed += 1
            print(f"  PASS  HOST {url} -> {final} ({actual_hops} hop(s))")
        else:
            failed += 1
            msg = f"final={final} expected={expected} hops={actual_hops}<={max_hops}"
            fails.append(("HOST", url, msg, chain))
            print(f"  FAIL  HOST {url}  {msg}")
            for s, loc, src in chain:
                print(f"          {s}  {src}  -> {loc}")
else:
    print("\n[6] Host-based tests SKIPPED (preview, can't test domain routing)")

# ===== Summary =====
print(f"\n{'='*60}\nResult: {passed} pass / {failed} fail\n{'='*60}")
if failed:
    print("\nFailed checks:")
    for name, url, msg, _ in fails:
        print(f"  - {name}  {url}  {msg}")
    sys.exit(1)
sys.exit(0)
