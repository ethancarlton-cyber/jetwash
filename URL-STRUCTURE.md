# URL Structure Documentation - JetWash

**Version**: 1.0
**Created**: February 12, 2026
**Status**: ACTIVE STANDARD

---

## Executive Summary

This document defines the **clean URL architecture** for the JetWash website. All URLs MUST be clean (no `.html` extension) for SEO, user experience, and professional appearance.

**Key Rule**: HTML files are named with `.html`, but ALL internal links use clean URLs without `.html`.

---

## Clean URL Architecture

### Overview

JetWash uses **clean URLs** (also called "pretty URLs") for all public-facing pages:

- ✅ `https://samedayjetwash.com/driveway-cleaning`
- ✅ `https://samedayjetwash.com/guides/stain-removal`
- ✅ `https://samedayjetwash.com/areas/redhill`

**NOT**:
- ❌ `https://samedayjetwash.com/driveway-cleaning.html`
- ❌ `https://samedayjetwash.com/guides/stain-removal.html`

### How It Works

1. **HTML files** are created with `.html` extension in the repository
   - Example: `driveway-cleaning.html`, `guides/stain-removal.html`

2. **Vercel hosting** automatically serves these files at clean URLs
   - `/driveway-cleaning.html` → served at `/driveway-cleaning`
   - Configured via `vercel.json` rewrites and redirects

3. **Internal links** ALWAYS use clean URLs
   ```html
   <a href="/driveway-cleaning">Driveway Cleaning</a>
   ```

4. **Redirects** are automatic
   - Request to `/driveway-cleaning.html` → 301 redirect to `/driveway-cleaning`
   - Prevents duplicate content issues

---

## Implementation Guide

### For Developers

#### Creating New Pages

1. **File naming**: Use `.html` extension
   ```
   my-new-page.html
   guides/my-new-guide.html
   areas/my-new-area.html
   ```

2. **Internal links**: ALWAYS use clean URLs (no `.html`)
   ```html
   <!-- ✅ CORRECT -->
   <a href="/my-new-page">My New Page</a>
   <a href="/guides/my-new-guide">My New Guide</a>

   <!-- ❌ WRONG -->
   <a href="/my-new-page.html">My New Page</a>
   ```

3. **Canonical tags**: Use clean URLs
   ```html
   <link rel="canonical" href="https://samedayjetwash.com/my-new-page">
   ```

4. **Sitemap**: Add clean URLs (no `.html`)
   ```xml
   <url>
     <loc>https://samedayjetwash.com/my-new-page</loc>
   </url>
   ```

#### Navigation Links

**Header navigation** (all pages):
```html
<nav>
  <a href="/">Home</a>
  <a href="/services">Services</a>
  <a href="/areas">Areas</a>
  <a href="/guides">Guides</a>
  <a href="/quote">Get Quote</a>
</nav>
```

**Footer links** (all pages):
```html
<footer>
  <a href="/about">About</a>
  <a href="/faq">FAQ</a>
  <a href="/privacy">Privacy Policy</a>
  <a href="/contact">Contact</a>
</footer>
```

#### Cross-Page Links

**Service pages** → area pages:
```html
<a href="/areas/redhill">Jetwashing in Redhill</a>
<a href="/areas/reigate">Pressure Washing in Reigate</a>
```

**Guide pages** → service pages:
```html
<p>Learn more about our <a href="/driveway-cleaning">driveway cleaning services</a>.</p>
```

**Area pages** → service pages:
```html
<a href="/patio-cleaning">Patio Cleaning</a>
<a href="/driveway-cleaning">Driveway Cleaning</a>
```

### For Content Writers

When writing content with internal links, always use clean URLs:

```html
<!-- ✅ CORRECT -->
<p>For more information, see our <a href="/guides/pressure-washing-guide">complete pressure washing guide</a>.</p>

<!-- ❌ WRONG -->
<p>For more information, see our <a href="/guides/pressure-washing-guide.html">complete pressure washing guide</a>.</p>
```

---

## Vercel Configuration

### vercel.json

The `vercel.json` file in the root directory handles clean URLs automatically:

```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/:path*.html"
    }
  ],
  "redirects": [
    {
      "source": "/:path*.html",
      "destination": "/:path*",
      "permanent": true
    }
  ]
}
```

**What this does**:

1. **Rewrites**: When user requests `/driveway-cleaning`, Vercel internally serves `driveway-cleaning.html`
2. **Redirects**: When user requests `/driveway-cleaning.html`, Vercel 301 redirects to `/driveway-cleaning`

### Homepage Exception

The homepage (`index.html`) is served at the root URL `/`:
- File: `index.html`
- URL: `https://samedayjetwash.com/`
- Canonical: `https://samedayjetwash.com/`

---

## URL Patterns

### Service Pages

| HTML File | Clean URL | Example |
|-----------|-----------|---------|
| `driveway-cleaning.html` | `/driveway-cleaning` | https://samedayjetwash.com/driveway-cleaning |
| `patio-cleaning.html` | `/patio-cleaning` | https://samedayjetwash.com/patio-cleaning |
| `render-cleaning.html` | `/render-cleaning` | https://samedayjetwash.com/render-cleaning |
| `decking-cleaning.html` | `/decking-cleaning` | https://samedayjetwash.com/decking-cleaning |
| `block-paving-cleaning.html` | `/block-paving-cleaning` | https://samedayjetwash.com/block-paving-cleaning |
| `commercial-pressure-washing.html` | `/commercial-pressure-washing` | https://samedayjetwash.com/commercial-pressure-washing |

### Guide Pages

| HTML File | Clean URL | Example |
|-----------|-----------|---------|
| `pressure-washing-guide.html` | `/pressure-washing-guide` | https://samedayjetwash.com/pressure-washing-guide |
| `guides.html` | `/guides` | https://samedayjetwash.com/guides |
| `guides/diy-vs-professional-pressure-washing.html` | `/guides/diy-vs-professional-pressure-washing` | https://samedayjetwash.com/guides/diy-vs-professional-pressure-washing |
| `guides/stain-removal-guide-driveways-patios.html` | `/guides/stain-removal-guide-driveways-patios` | https://samedayjetwash.com/guides/stain-removal-guide-driveways-patios |
| `guides/block-paving-sealing-guide.html` | `/guides/block-paving-sealing-guide` | https://samedayjetwash.com/guides/block-paving-sealing-guide |

### Area Pages

| HTML File | Clean URL | Example |
|-----------|-----------|---------|
| `areas.html` | `/areas` | https://samedayjetwash.com/areas |
| `areas/redhill.html` | `/areas/redhill` | https://samedayjetwash.com/areas/redhill |
| `areas/reigate.html` | `/areas/reigate` | https://samedayjetwash.com/areas/reigate |
| `areas/horley.html` | `/areas/horley` | https://samedayjetwash.com/areas/horley |
| `areas/dorking.html` | `/areas/dorking` | https://samedayjetwash.com/areas/dorking |
| `areas/rh2.html` | `/areas/rh2` | https://samedayjetwash.com/areas/rh2 |
| `areas/rh4.html` | `/areas/rh4` | https://samedayjetwash.com/areas/rh4 |

### Info Pages

| HTML File | Clean URL | Example |
|-----------|-----------|---------|
| `about.html` | `/about` | https://samedayjetwash.com/about |
| `faq.html` | `/faq` | https://samedayjetwash.com/faq |
| `quote.html` | `/quote` | https://samedayjetwash.com/quote |
| `tips.html` | `/tips` | https://samedayjetwash.com/tips |
| `privacy.html` | `/privacy` | https://samedayjetwash.com/privacy |
| `contact.html` | `/contact` | https://samedayjetwash.com/contact |

---

## SEO Benefits

### 1. User-Friendly URLs

Clean URLs are easier to read, remember, and share:

- ✅ `samedayjetwash.com/driveway-cleaning` - Clear and professional
- ❌ `samedayjetwash.com/driveway-cleaning.html` - Technical file extension visible

### 2. Better Click-Through Rates (CTR)

Users are more likely to click clean URLs in search results:

```
Google Search Result:

✅ samedayjetwash.com › driveway-cleaning
   Driveway Cleaning Redhill | Same Day Jetwash
   Professional driveway cleaning services in Redhill...

VS

❌ samedayjetwash.com › driveway-cleaning.html
   Driveway Cleaning Redhill | Same Day Jetwash
   Professional driveway cleaning services in Redhill...
```

### 3. Prevents Duplicate Content

Without proper redirects, both URLs could be indexed:
- `/driveway-cleaning`
- `/driveway-cleaning.html`

This creates duplicate content issues that hurt SEO. Our configuration prevents this with 301 redirects.

### 4. Future-Proof

Clean URLs allow technology changes without breaking links:
- Move from static HTML to PHP? URLs stay the same.
- Switch to React/Next.js? URLs stay the same.
- Users' bookmarks never break.

### 5. Industry Standard

Clean URLs are the modern standard used by:
- WordPress sites
- Next.js applications
- Professional business websites
- Major brands and companies

---

## Common Mistakes to Avoid

### ❌ MISTAKE 1: Using .html in href

```html
<!-- WRONG -->
<a href="/driveway-cleaning.html">Driveway Cleaning</a>
```

**Fix**:
```html
<!-- CORRECT -->
<a href="/driveway-cleaning">Driveway Cleaning</a>
```

### ❌ MISTAKE 2: Using .html in Canonical Tags

```html
<!-- WRONG -->
<link rel="canonical" href="https://samedayjetwash.com/driveway-cleaning.html">
```

**Fix**:
```html
<!-- CORRECT -->
<link rel="canonical" href="https://samedayjetwash.com/driveway-cleaning">
```

### ❌ MISTAKE 3: Using .html in Sitemap

```xml
<!-- WRONG -->
<url>
  <loc>https://samedayjetwash.com/driveway-cleaning.html</loc>
</url>
```

**Fix**:
```xml
<!-- CORRECT -->
<url>
  <loc>https://samedayjetwash.com/driveway-cleaning</loc>
</url>
```

### ❌ MISTAKE 4: Inconsistent URL Usage

**Problem**: Mixing clean URLs and .html URLs throughout the site.

```html
<!-- INCONSISTENT (BAD) -->
<a href="/driveway-cleaning">Driveway</a>
<a href="/patio-cleaning.html">Patio</a>
<a href="/render-cleaning">Render</a>
```

**Fix**: Use clean URLs consistently everywhere:
```html
<!-- CONSISTENT (GOOD) -->
<a href="/driveway-cleaning">Driveway</a>
<a href="/patio-cleaning">Patio</a>
<a href="/render-cleaning">Render</a>
```

---

## Testing Clean URLs

### Manual Testing

1. **Test clean URL works**:
   - Visit: `https://samedayjetwash.com/driveway-cleaning`
   - Page loads correctly ✅

2. **Test .html redirect**:
   - Visit: `https://samedayjetwash.com/driveway-cleaning.html`
   - Redirects to `/driveway-cleaning` ✅
   - Browser URL updates to clean URL ✅

3. **Test internal links**:
   - Click any internal link on the site
   - URL in browser is clean (no `.html`) ✅

### Developer Tools Check

**Chrome DevTools**:
1. Open DevTools (F12)
2. Network tab
3. Visit `.html` URL
4. Check response:
   - Status: `301 Moved Permanently` ✅
   - Location header: clean URL ✅

### Google Search Console Check

**Canonical Tags**:
1. GSC → URL Inspection
2. Enter clean URL (e.g., `/driveway-cleaning`)
3. Check "User-declared canonical": Should be clean URL ✅
4. Check "Google-selected canonical": Should match ✅

---

## Troubleshooting

### Problem: Page returns 404

**Symptoms**: Clean URL shows "Page not found"

**Possible causes**:
1. HTML file doesn't exist
2. File in wrong directory
3. Vercel configuration not deployed

**Fix**:
1. Verify HTML file exists: `driveway-cleaning.html`
2. Check directory structure matches URL path
3. Redeploy to Vercel to apply configuration

### Problem: .html URL doesn't redirect

**Symptoms**: `.html` URL loads instead of redirecting

**Possible causes**:
1. Vercel redirects not configured
2. Configuration not deployed

**Fix**:
1. Check `vercel.json` has redirects section
2. Redeploy to Vercel
3. Clear browser cache and test again

### Problem: Mixed clean and .html URLs

**Symptoms**: Some links work, others have `.html`

**Possible causes**:
1. Inconsistent href attributes in HTML
2. Old code not updated

**Fix**:
1. Search codebase for `href="*.html"`
2. Replace all with clean URLs
3. Run validation script (see below)

---

## Validation Script

### Check for .html in href attributes

**PowerShell script** to find any `.html` in links:

```powershell
# Find all .html hrefs
Get-ChildItem -Path . -Filter *.html -Recurse | Select-String 'href="[^"]*\.html"'
```

**Expected output**: No matches (all hrefs use clean URLs)

### Check canonical tags

**PowerShell script** to validate canonical tags:

```powershell
# Find canonical tags with .html
Get-ChildItem -Path . -Filter *.html -Recurse | Select-String 'canonical.*\.html"'
```

**Expected output**: No matches (all canonicals use clean URLs)

---

## Maintenance Checklist

### When Adding New Pages

- [ ] Create HTML file with `.html` extension
- [ ] Use clean URL in all internal links (no `.html`)
- [ ] Set canonical tag to clean URL
- [ ] Add clean URL to sitemap.xml
- [ ] Test clean URL works after deploy
- [ ] Test `.html` URL redirects to clean URL

### Monthly Audit

- [ ] Run validation script for `.html` in hrefs
- [ ] Check Google Search Console for indexed `.html` URLs
- [ ] Verify redirects working (test 3-5 random pages)
- [ ] Review Analytics for any `.html` traffic (should be zero after redirects)

### Before Deploy

- [ ] Search codebase for new `.html` in href attributes
- [ ] Verify `vercel.json` unchanged (rewrites/redirects intact)
- [ ] Test locally (Vercel CLI or similar setup)
- [ ] Deploy and test production URLs

---

## Resources

### Vercel Documentation

- [Rewrites](https://vercel.com/docs/configuration#project/rewrites)
- [Redirects](https://vercel.com/docs/configuration#project/redirects)
- [Clean URLs](https://vercel.com/guides/redirect-from-www)

### SEO Best Practices

- [Google URL Structure Guidelines](https://developers.google.com/search/docs/crawling-indexing/url-structure)
- [Moz: URL Best Practices](https://moz.com/learn/seo/url)
- [Clean URLs vs File Extensions](https://www.searchenginejournal.com/technical-seo/url-structure/)

### Related Documentation

- `Projects/jetwash/CLAUDE.md` - Project overview and standards
- `Projects/jetwash/.claude/rules/code-style.md` - Code style guidelines
- `Projects/jetwash/.claude/rules/seo.md` - SEO guidelines
- `Projects/jetwash/docs/SEO-MONITORING-PLAN.md` - SEO monitoring plan

---

## Quick Reference

### ✅ DO

- Name files with `.html` extension
- Use clean URLs in all `href` attributes
- Use clean URLs in canonical tags
- Use clean URLs in sitemap
- Test both clean URL and `.html` redirect
- Be consistent across entire site

### ❌ DON'T

- Use `.html` in `href` attributes
- Use `.html` in canonical tags
- Use `.html` in sitemap
- Mix clean and `.html` URLs
- Assume it works without testing
- Skip validation before deploy

---

## Document History

**Version 1.0** - February 12, 2026
- Initial documentation created
- Clean URL standard established
- Implementation guide documented
- Validation scripts provided

**Next Review**: March 12, 2026 (1 month)

---

**Status**: ACTIVE STANDARD - All team members MUST follow
**Owner**: Development Team
**Questions**: Reference this document first, then ask team lead
