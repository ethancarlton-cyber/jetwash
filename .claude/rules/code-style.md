# Code Style Guidelines

## Stack

- Pure HTML5, CSS3, vanilla JavaScript
- NO build tools, NO npm dependencies
- NO frameworks (React, Vue, etc.)
- Everything must work with static hosting

## HTML

- Semantic markup for SEO
- Mobile-first responsive design
- Include meta descriptions for all pages
- Structured data (JSON-LD) where applicable

## URL Structure (CRITICAL)

**ALWAYS use clean URLs (no .html extension) in all href attributes**

### Rules:
1. **HTML files** are named with `.html` extension (e.g., `driveway-cleaning.html`)
2. **href attributes** MUST use clean URLs without `.html`
   ```html
   <!-- ✅ CORRECT -->
   <a href="/driveway-cleaning">Driveway Cleaning</a>
   <a href="/guides/stain-removal">Stain Removal Guide</a>
   <a href="/areas/redhill">Redhill Area</a>

   <!-- ❌ WRONG - NEVER DO THIS -->
   <a href="/driveway-cleaning.html">Driveway Cleaning</a>
   <a href="/guides/stain-removal.html">Stain Removal Guide</a>
   ```

3. **Vercel configuration** handles rewrites automatically
   - HTML files are served without `.html` extension
   - Requests to `.html` URLs redirect to clean URLs (301 permanent)
   - Configured in `vercel.json`

4. **Canonical tags** use clean URLs (no `.html`)
   ```html
   <link rel="canonical" href="https://samedayjetwash.com/driveway-cleaning">
   ```

5. **Sitemap** uses clean URLs (no `.html`)

### Why Clean URLs?
- Better SEO (user-friendly URLs rank better)
- Professional appearance
- Industry standard for modern websites
- Prevents duplicate content issues

**See**: `Projects/jetwash/URL-STRUCTURE.md` for full documentation

## CSS

- Mobile-first media queries
- CSS variables for theming
- No CSS frameworks (keep it lightweight)

## JavaScript

- Vanilla JS only
- Form validation client-side
- No external libraries unless absolutely necessary
- Keep scripts minimal for fast loading
