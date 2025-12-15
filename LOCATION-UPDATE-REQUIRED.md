# ⚠️ LOCATION UPDATE REQUIRED

## IMPORTANT: Website Built for Wrong Location

**Current Content**: Haywards Heath (RH16), West Sussex
**Correct Location**: Redhill & Reigate (RH1), Surrey

All HTML pages need location references updated before deployment.

---

## What Needs to Change

### 1. Primary Location References

**Find & Replace Across ALL Files:**

| Current (WRONG) | Correct (RIGHT) |
|-----------------|-----------------|
| Haywards Heath | Redhill & Reigate |
| RH16 | RH1 |
| West Sussex | Surrey |
| Mid Sussex | East Surrey |

### 2. Location Pages to Update/Rebuild

**Current location pages (DELETE or REPURPOSE):**
- ❌ areas/haywards-heath.html → ✅ areas/redhill.html
- ❌ areas/lindfield.html → ✅ areas/reigate.html
- ❌ areas/cuckfield.html → ✅ areas/horley.html
- ❌ areas/burgess-hill.html → ✅ areas/dorking.html
- ❌ areas/hassocks.html → ✅ areas/banstead.html
- ❌ areas/crawley.html → ✅ areas/crawley.html (KEEP - still in area!)

**New location pages needed:**
- ✅ areas/redhill.html (RH1)
- ✅ areas/reigate.html (RH2)
- ✅ areas/horley.html (RH6)
- ✅ areas/dorking.html (RH4/RH5)
- ✅ areas/banstead.html (SM7)
- ✅ areas/caterham.html (CR3)
- ✅ areas/crawley.html (Keep existing)

### 3. Postcode References

**Update all postcode mentions:**

**Primary Postcodes (RH1 area):**
- RH1 - Redhill, Reigate, Merstham, Salfords
- RH2 - Reigate
- RH3 - Betchworth
- RH4 - Dorking
- RH5 - Dorking North
- RH6 - Horley, Gatwick
- RH8 - Oxted
- RH9 - Godstone

**Secondary Postcodes:**
- CR3 - Caterham
- SM7 - Banstead
- KT17-KT24 - Epsom/Leatherhead area

### 4. Business Name

**Current**: JetWash Haywards Heath
**Update to**: JetWash Redhill & Reigate

Or simply: **JetWash Surrey**

### 5. Schema Markup Updates

In all pages with LocalBusiness schema, update:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "JetWash Redhill & Reigate",  // CHANGED
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Redhill",        // CHANGED
    "addressRegion": "Surrey",           // CHANGED
    "postalCode": "RH1",                 // CHANGED
    "addressCountry": "GB"
  },
  "areaServed": [
    "Redhill",                           // CHANGED
    "Reigate",                           // CHANGED
    "Horley",                            // CHANGED
    "Dorking",                           // CHANGED
    "Banstead"                           // CHANGED
  ]
}
```

### 6. Meta Descriptions

Update all meta descriptions to include Redhill/Reigate/Surrey:

**Example current:**
```html
<meta name="description" content="Professional jetwashing in Haywards Heath, West Sussex...">
```

**Update to:**
```html
<meta name="description" content="Professional jetwashing in Redhill, Reigate & Surrey...">
```

### 7. Title Tags

**Example current:**
```html
<title>Jetwashing Haywards Heath | Pressure Washing | Free Quote</title>
```

**Update to:**
```html
<title>Jetwashing Redhill & Reigate | Pressure Washing Surrey | Free Quote</title>
```

### 8. URLs in Sitemap

Update sitemap.xml to reflect:
- New base URL (when deployed)
- New location page URLs
- Updated lastmod dates

---

## Files That Need Updates

### Critical Updates (BEFORE DEPLOY):

1. **index.html**
   - [ ] H1: Change to "Professional Jetwashing Services in Redhill, Reigate & Surrey"
   - [ ] Hero text: Update locations
   - [ ] Schema markup: Update addressLocality, addressRegion, areaServed
   - [ ] Footer: Update all location references

2. **quote.html**
   - [ ] H1: Update to Redhill/Reigate
   - [ ] Form helper text: Update postcode examples (RH1 instead of RH16)

3. **areas.html**
   - [ ] Complete rewrite of location cards
   - [ ] Update postcode lists
   - [ ] New location links

4. **pricing.html**
   - [ ] Update location references in text

5. **faq.html**
   - [ ] Update location references in answers
   - [ ] Update "we cover..." sections

6. **All Service Pages** (6 files):
   - driveway-cleaning.html
   - patio-cleaning.html
   - block-paving-cleaning.html
   - render-cleaning.html
   - decking-cleaning.html
   - commercial-jetwashing.html

   For each:
   - [ ] Update H1 to include "Surrey" instead of "West Sussex"
   - [ ] Update "Service Areas" sections
   - [ ] Update location links in content
   - [ ] Update schema markup

7. **Location Pages** (areas/*.html):
   - [ ] DELETE old location pages or repurpose
   - [ ] CREATE new location pages for RH1 area towns
   - [ ] Update internal links

8. **sitemap.xml**
   - [ ] Update all URLs
   - [ ] Remove old location pages
   - [ ] Add new location pages
   - [ ] Update lastmod dates

---

## Quick Find/Replace Guide

### Global Text Replacements (Safe):

1. **"Haywards Heath"** → **"Redhill & Reigate"**
2. **"West Sussex"** → **"Surrey"**
3. **"Mid Sussex"** → **"East Surrey"**
4. **"RH16"** → **"RH1"**
5. **"RH16 1AB"** (example postcode) → **"RH1 1AA"**

### Context-Sensitive Replacements:

These need manual checking as they appear in different contexts:

- "Lindfield" → "Reigate" or "Horley" (depending on context)
- "Cuckfield" → "Dorking" or "Banstead"
- "Burgess Hill" → "Horley" or "Redhill"

---

## New Keyword Focus

### Primary Keywords (Update Content):

**Old (Wrong):**
- jetwashing haywards heath
- pressure washing RH16
- jet washing lindfield

**New (Correct):**
- jetwashing redhill
- pressure washing reigate
- jet washing RH1
- driveway cleaning redhill
- patio cleaning reigate
- jetwashing horley
- pressure washing dorking
- jetwashing surrey

---

## Priority Actions

### BEFORE Deployment:

1. **Homepage (index.html)** - Update all location references
2. **Quote Form (quote.html)** - Update location text & form examples
3. **Areas Page (areas.html)** - Complete rewrite for RH1 area
4. **Schema Markup** - Update in all files

### CAN DO AFTER Deployment:

1. Create new location pages (areas/*.html)
2. Update service page location sections
3. Rewrite FAQ location answers
4. Update pricing page examples

---

## Testing After Updates

Run these checks before final deployment:

- [ ] Search for "Haywards Heath" - should find ZERO results
- [ ] Search for "RH16" - should find ZERO results (except in docs)
- [ ] Search for "West Sussex" - should find ZERO results
- [ ] Search for "Redhill" - should find MANY results
- [ ] Search for "Surrey" - should find MANY results
- [ ] All location links work
- [ ] Schema markup validated
- [ ] Sitemap includes correct URLs

---

## Automated Update Script (Optional)

If you want to automate basic replacements:

```bash
# WARNING: TEST FIRST! Make backup before running

# Navigate to jetWash directory
cd C:\Users\devel\Desktop\jetWash

# Find and replace in all HTML files (PowerShell)
Get-ChildItem -Recurse -Include *.html | ForEach-Object {
    (Get-Content $_.FullName) -replace 'Haywards Heath', 'Redhill & Reigate' | Set-Content $_.FullName
    (Get-Content $_.FullName) -replace 'West Sussex', 'Surrey' | Set-Content $_.FullName
    (Get-Content $_.FullName) -replace 'RH16', 'RH1' | Set-Content $_.FullName
}
```

**⚠️ DO NOT run automated replacement without review!** Some replacements need context-sensitive changes.

---

## Recommendation

**Option 1: Manual Update (BETTER)**
- Go through each file systematically
- Update location references thoughtfully
- Ensure context makes sense
- Rebuild location pages from scratch
- Time: 2-3 hours

**Option 2: Quick Deploy & Iterate (FASTER)**
- Update ONLY critical pages (homepage, quote form, areas page)
- Deploy with partial updates
- Fix other pages post-launch
- Time: 30 minutes for critical updates

**Option 3: Request Help**
- I can help update all files systematically
- Takes 30-60 minutes with my assistance
- Ensures everything is consistent

---

## Current Status

✅ **Website structure**: Complete
✅ **Design & functionality**: Working
✅ **SEO framework**: In place
❌ **Location targeting**: WRONG - needs update
❌ **Content references**: For Haywards Heath, not Redhill

**BEFORE deploying, decide:**
1. Manual update all files now (2-3 hours)
2. Quick update critical files only (30 mins)
3. Request my help to update systematically (30-60 mins)

---

**DO NOT deploy without updating at least:**
- Homepage location references
- Quote form location text
- Business name in schema markup
- Main meta descriptions

Otherwise, you'll rank for the wrong location (Haywards Heath instead of Redhill)!

---

**Need Help?** Ask me to:
1. Update specific files for you
2. Create new location pages
3. Run systematic find/replace
4. Generate RH1-focused content