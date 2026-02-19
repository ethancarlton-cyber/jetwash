# JetWash Week 1 Critical Fixes - Implementation Prompt

Copy everything below this line into a new Claude Code chat:

---

## TASK: Implement JetWash Week 1 Critical Fixes + Phase 1 Technical Foundation

You are implementing the Week 1 critical fixes and Phase 1 technical foundation for the JetWash pressure washing lead-gen website. The full plan is at `Projects/jetWash/MASTER-PLAN.md` -- read it first.

**Site**: Static HTML/CSS/JS hosted on Vercel free tier. No frameworks, no build tools, no npm.
**Repo**: `Projects/jetWash/` within the current working directory.
**Live URL**: https://samedayjetwash.com
**Budget**: ZERO. Everything must be free.
**Constraint**: Anonymous lead-gen -- no Google Business Profile, no verifiable address.

---

### EXECUTION STRATEGY: Agent Team with 3 Waves

Create an Agent Team called `jetwash-implementation` to coordinate this work. You are the team lead. Spawn teammates for each wave and assign tasks via the team task list.

**PREREQUISITE**: Ensure `.claude/settings.local.json` has `"defaultMode": "bypassPermissions"` set. This is required for Agent Team teammates to function properly. If not set, set it and restart the session before proceeding.

**IMPORTANT**: Before starting, read `Projects/jetWash/MASTER-PLAN.md` sections "Critical Fixes -- Week 1" and "Phase 1: Technical Foundation" to understand every change needed.

---

### TEAM SETUP

1. Create the team: `jetwash-implementation`
2. Create all tasks in the team task list upfront (see task list below)
3. Spawn teammates in waves -- each teammate gets a name, a clear task assignment, and file ownership boundaries

---

### WAVE 1: Exploration (3 parallel teammates)

Spawn these 3 teammates simultaneously. They explore only -- no edits.

**Teammate: `file-mapper`** (subagent_type: Explore)
```
Explore the Projects/jetWash/ directory thoroughly. Create a complete inventory:
1. List ALL HTML files with their full paths
2. For each HTML file, extract the current <link rel="canonical"> URL
3. For each HTML file, check if it contains AggregateRating or Review schema in JSON-LD
4. List all <script> tags and which pages include form.js
5. List all CSS files and how they're loaded (blocking vs async)
6. Check if vercel.json exists and its contents
7. Check sitemap.xml contents and robots.txt contents
8. Report the navigation structure -- what links appear in the nav on each page type (homepage, service, guide, location)
9. List which pages have forms and which don't
10. Count total pages by type (service, guide, location, other)

Output a structured summary the team lead can use to coordinate implementation teammates.
```

**Teammate: `image-auditor`** (subagent_type: Explore)
```
Audit ALL images in Projects/jetWash/. For each image:
1. List the file path, format (PNG/JPG/WebP/SVG), and file size
2. Identify the logo file specifically and note its size
3. Identify the hero image file and note its size
4. For each HTML page, list what images it references and whether they have:
   - width/height attributes
   - loading="lazy" or loading="eager"
   - alt text
   - Whether they use <picture> tags or plain <img>
5. Check if any WebP versions already exist
6. Note which images are used as CSS background-image vs HTML <img> tags

Focus on Projects/jetWash/images/ and any other image directories.
```

**Teammate: `schema-auditor`** (subagent_type: Explore)
```
Audit ALL structured data and meta tags across Projects/jetWash/. For each HTML file:
1. Extract ALL JSON-LD schema blocks (full content)
2. Flag any AggregateRating or Review schema (these must be REMOVED)
3. Extract og:url meta tag value
4. Extract the canonical link href value
5. Check for FAQPage schema (keep these -- they're legitimate)
6. Check for LocalBusiness, Service, BreadcrumbList schema (keep these)
7. Note the copyright year in the footer
8. Check if a privacy policy link exists in the footer
9. Check the phone number validation regex in any form JavaScript

Report everything so the team lead knows exactly what to change and where.
```

**Wait for all 3 to report back before starting Wave 2.**

---

### WAVE 2: Core Implementation (4 parallel teammates)

After Wave 1 completes, share the exploration findings with each Wave 2 teammate via their task description. Each teammate owns specific files/concerns to avoid edit conflicts.

**Teammate: `canonical-fixer`** (subagent_type: general-purpose)
```
Using the exploration findings provided, fix canonical URLs and remove fake schema across ALL HTML files in Projects/jetWash/.

TASK 1 - Fix Canonical URLs:
- Find every <link rel="canonical" href="https://samedayjetwash.com/...">
- Replace with <link rel="canonical" href="https://samedayjetwash.com/...">
- The path portion stays the same, only the domain changes
- Do this on EVERY HTML file

TASK 2 - Fix og:url Meta Tags:
- Find every <meta property="og:url" content="https://samedayjetwash.com/...">
- Replace domain with samedayjetwash.com
- Do this on EVERY HTML file

TASK 3 - Fix Schema JSON-LD URLs:
- In every <script type="application/ld+json"> block, replace any "url": "https://samedayjetwash.com/..." with "url": "https://samedayjetwash.com/..."
- Do this on EVERY HTML file

TASK 4 - Remove Fake AggregateRating Schema:
- Remove ALL "aggregateRating" objects from JSON-LD blocks
- Remove ALL standalone Review schema objects that reference fabricated reviews
- KEEP: LocalBusiness, Service, FAQPage, BreadcrumbList, Article schema
- Make sure the remaining JSON-LD is still valid after removal (no trailing commas, proper structure)

TASK 5 - Update Copyright Year:
- Change "2025" to "2026" in footer copyright text ONLY (not in content dates)

TASK 6 - Fix sitemap.xml:
- Replace all samedayjetwash.com URLs with samedayjetwash.com URLs

TASK 7 - Fix robots.txt:
- Update sitemap reference URL if it points to samedayjetwash.com

After making all changes, verify by reading 3 random files to confirm the fixes are correct.
Message the team lead when done with a summary of changes made.
```

**Teammate: `nav-builder`** (subagent_type: general-purpose)
```
Create new pages and update navigation across ALL HTML files in Projects/jetWash/.

TASK 1 - Create /guides.html hub page:
Read Projects/jetWash/MASTER-PLAN.md section "CRITICAL FIX 3" for the template. Create a guides hub page that:
- Lists ALL existing guide pages organized by topic (Driveway Care, Patio Care, General Knowledge)
- First, find all guide HTML files (they likely have "guide" in the filename)
- Uses consistent styling matching the existing site design
- Has proper canonical URL pointing to samedayjetwash.com/guides.html
- Has proper meta description
- Has the same header/nav/footer as other pages
- Includes Article or CollectionPage schema

TASK 2 - Create /privacy.html page:
Create a GDPR-compliant privacy policy page. The form collects: name, phone/email, postcode, message. Data is sent via Web3Forms. Include:
- What data is collected
- How it's used (lead follow-up)
- Web3Forms as data processor
- User rights (access, deletion, correction)
- Contact method for data requests
- Cookie disclosure (Google Analytics)
- Matches site design/header/footer

TASK 3 - Add "Guides" link to main navigation:
On EVERY HTML file, add a "Guides" link pointing to /guides.html in the main nav.
Look at the existing nav structure and add it in a logical position (after Areas or before FAQ).

TASK 4 - Add Privacy Policy link to footer:
On EVERY HTML file, add a link to /privacy.html in the footer area.

TASK 5 - Add contextual cross-links:
- On each service page (driveway-cleaning.html, patio-cleaning.html, etc.), add links to related guide pages in a "Related Guides" section before the footer
- On each guide page, add links to the related service page and 2-3 sibling guides in a "Related Guides" section

Match the existing site's HTML structure and CSS classes. Read a few existing pages first to understand the patterns.
Message the team lead when done with a summary of changes made.
```

**Teammate: `perf-optimizer`** (subagent_type: general-purpose)
```
Optimize CSS loading, image attributes, and create configuration files for Projects/jetWash/.

TASK 1 - Create/update vercel.json:
Create Projects/jetWash/vercel.json with caching headers as specified in MASTER-PLAN.md section 1.2.5:
- Images: 1 year immutable cache
- CSS: 1 year immutable cache
- JS: 1 year immutable cache
- HTML: 1 hour with stale-while-revalidate

TASK 2 - Add preconnect hints:
On EVERY HTML page, add preconnect hints in the <head> before any external resource loads:
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
Add any other external domains found during exploration.

TASK 3 - Remove form.js from non-form pages:
Using the Wave 1 findings, remove <script src="...form.js..."> from pages that do NOT have forms.
Only keep form.js on pages that actually contain a <form> element.

TASK 4 - Fix phone validation regex:
Find the phone validation in form JavaScript. Update it to accept UK landlines (01xxx, 02xxx, 03xxx) in addition to mobile (07xxx).
Change from: /^07\d{9}$/ (or similar mobile-only pattern)
Change to: /^0[1-37]\d{8,9}$/ (accepts mobile and landline)

TASK 5 - Ensure ALL images have width and height attributes:
Go through every <img> tag on every page. If width/height are missing, add reasonable values based on the image's purpose (logo ~150x50, hero ~1200x600, service images ~800x500, thumbnails ~400x250).

TASK 6 - Add loading="lazy" to non-critical images:
Add loading="lazy" to ALL images EXCEPT:
- The logo (add loading="eager")
- The hero image (add loading="eager" and fetchpriority="high")

Read the MASTER-PLAN.md sections 1.1.4, 1.1.5, 1.2.5, 1.2.6, 1.2.7 for full details.
Message the team lead when done with a summary of changes made.
```

**Teammate: `cro-implementer`** (subagent_type: general-purpose)
```
Implement conversion rate improvements across Projects/jetWash/.

TASK 1 - Sticky Mobile CTA Bar:
Add a sticky CTA bar to the bottom of EVERY page that appears only on mobile (max-width: 768px).
- "Get Free Quote" button linking to /contact.html
- Style: fixed bottom, blue background (#1a73e8), white text, bold
- Add body padding-bottom: 70px on mobile to prevent content being hidden
- See MASTER-PLAN.md section 3.1 for exact CSS

Add the CSS to the site's main stylesheet. Add the HTML before </body> on every page.

TASK 2 - Hamburger Menu:
Replace the current navigation with a hamburger menu on mobile.
- Desktop: normal horizontal nav (unchanged)
- Mobile: hamburger icon that toggles a dropdown menu
- Include minimal JavaScript for the toggle
- See MASTER-PLAN.md section 3.2 for HTML/CSS/JS

TASK 3 - Inline CTAs in Service Pages:
Add 2 inline CTA boxes in each service page's body content:
- One after approximately the 2nd paragraph
- One after approximately the 5th paragraph
- Style: light blue background (#e8f0fe), blue border, centered text
- CTA text: "Ready to get your [surface] looking like new? Get Your Free Quote Today"
- Link to /contact.html
- See MASTER-PLAN.md section 3.4 for CSS

TASK 4 - Phone Number in All Headers:
Ensure the phone number (01737 652515) appears in the header of EVERY page, not just the homepage.
Add as a clickable tel: link.

TASK 5 - Improve Form Success Message:
Update the form submission success message to include next steps:
- "We'll get back to you within 2 hours during business hours"
- Numbered steps: review details, send quote, book date
- See MASTER-PLAN.md section 3.8

Read existing pages first to understand the current HTML/CSS patterns before making changes.
Message the team lead when done with a summary of changes made.
```

**Wait for all 4 to report back before starting Wave 3.**

---

### WAVE 3: Verification (2 parallel teammates)

After Wave 2 completes, spawn 2 verification teammates:

**Teammate: `tech-verifier`** (subagent_type: Explore)
```
Verify all changes made to Projects/jetWash/ are correct:

1. Read 5 random HTML files and confirm:
   - Canonical URL points to samedayjetwash.com (NOT samedayjetwash.com)
   - og:url points to samedayjetwash.com
   - No AggregateRating or fake Review schema exists
   - FAQPage, LocalBusiness, Service, BreadcrumbList schema still intact
   - "Guides" link in navigation
   - Privacy policy link in footer
   - Copyright says 2026
   - Images have width/height attributes
   - Non-hero images have loading="lazy"

2. Verify new files exist and are valid:
   - guides.html exists with links to all guide pages
   - privacy.html exists with GDPR-compliant content
   - vercel.json exists with correct caching headers

3. Verify sitemap.xml has correct URLs
4. Verify robots.txt has correct sitemap URL
5. Check that JSON-LD blocks are valid JSON (no trailing commas, proper structure)
6. Verify mobile sticky CTA HTML exists on all pages
7. Verify hamburger menu HTML/CSS/JS is present

Report any issues found so they can be fixed by the team lead.
```

**Teammate: `link-verifier`** (subagent_type: Explore)
```
Verify the internal linking structure of Projects/jetWash/:

1. Check that guides.html links to ALL guide pages that exist
2. Check that every guide page links back to guides.html
3. Check that service pages have "Related Guides" sections linking to relevant guides
4. Check that guide pages link to their parent service page
5. Verify the navigation is consistent across all pages (same links, same order)
6. Check that no broken internal links exist (href points to files that exist)
7. Verify the footer is consistent across all pages
8. Count total pages and compare with expected count

Report any missing links, broken links, or inconsistencies to the team lead.
```

---

### AFTER ALL WAVES COMPLETE

Once all teammates have finished and issues are fixed:

1. Shut down all teammates gracefully
2. Delete the team
3. Do a final git status to see all changes
4. Present a summary of everything that was changed
5. List any items from MASTER-PLAN.md Week 1 that were NOT completed and why
6. Remind me to: deploy to Vercel, then submit updated sitemap to Google Search Console and request re-indexing of the homepage and top 10 pages

DO NOT commit or push unless I explicitly ask you to.

---

### TASK LIST (Create all upfront in the team task list)

```
1. [Wave 1] Map all HTML files, structure, and navigation
2. [Wave 1] Audit all images (format, size, attributes)
3. [Wave 1] Audit all schema markup and meta tags
4. [Wave 2] Fix canonical URLs + remove fake schema + update sitemap/robots
5. [Wave 2] Create guides.html + privacy.html + update nav/footer on all pages + add cross-links
6. [Wave 2] Performance: vercel.json, preconnect, remove unused JS, fix phone regex, image attributes
7. [Wave 2] CRO: sticky CTA, hamburger menu, inline CTAs, phone in headers, form success message
8. [Wave 3] Technical verification of all changes
9. [Wave 3] Internal link and structure verification
10. Fix any issues found during verification
11. Final summary and cleanup
```

---

### IMPORTANT RULES

- Use Agent Teams (TeamCreate) -- NOT standalone Task subagents
- Spawn teammates using the Task tool with `team_name="jetwash-implementation"` and appropriate `name` parameter
- Use `subagent_type="general-purpose"` for all implementation teammates (Wave 2)
- Use `subagent_type="Explore"` for exploration and verification teammates (Waves 1 & 3)
- Set `mode="bypassPermissions"` on all teammates
- Launch all teammates within each wave in a SINGLE message (parallel execution)
- Wait for each wave to fully complete before starting the next
- If a teammate reports errors, fix them before moving to the next wave
- Read MASTER-PLAN.md BEFORE spawning any teammates
- Share Wave 1 exploration findings with Wave 2 teammates via their task descriptions
- Every implementation teammate should read existing files BEFORE making changes to understand patterns
- Assign tasks from the team task list to each teammate as they're spawned
- Keep the team task list updated as work progresses
