# Same Day JetWash Reigate - Lead Generation Website

Professional same-day jetwashing and pressure washing lead generation website targeting Reigate, Redhill (RH1) and Surrey area.

## Project Overview

**Purpose**: Generate qualified leads (name, postcode, phone number) for local jetwashing services
**Business Model**: Sell leads to local tradesmen
**Budget**: £0 until ROI achieved
**SEO Strategy**: Hyper-local targeting, low-competition keywords

## Tech Stack (Zero Cost)

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: Vercel (FREE)
- **Forms**: Web3Forms (FREE - unlimited)
- **SSL**: Automatic HTTPS
- **No Build Tools**: Pure static HTML for simplicity

## Website Structure

```
jetWash/
├── index.html              # Homepage
├── quote.html             # Lead capture form (PRIMARY CONVERSION PAGE)
├── pricing.html           # Pricing transparency page
├── faq.html               # FAQ for long-tail SEO
├── areas.html             # Service areas overview
│
├── Service Pages:
│   ├── driveway-cleaning.html
│   ├── patio-cleaning.html
│   ├── block-paving-cleaning.html
│   ├── render-cleaning.html
│   ├── decking-cleaning.html
│   └── commercial-jetwashing.html
│
├── Location Pages (Local SEO):
│   └── areas/
│       ├── haywards-heath.html
│       ├── lindfield.html
│       ├── cuckfield.html
│       ├── burgess-hill.html
│       ├── hassocks.html
│       └── crawley.html
│
├── Assets:
│   ├── css/style.css      # Responsive styling
│   ├── js/form.js         # Form validation
│   └── images/            # Placeholder for images
│
└── SEO Files:
    ├── sitemap.xml
    ├── robots.txt
    ├── CLAUDE.md          # Project documentation
    └── SEO-STRATEGY.md    # Complete SEO strategy
```

## Deployment Instructions

### Option 1: Netlify (Recommended)

1. **Create Netlify Account**: Sign up at [netlify.com](https://netlify.com) (free)

2. **Deploy from GitHub**:
   ```bash
   # Push to GitHub first (see GitHub instructions below)
   # Then connect repository in Netlify dashboard
   ```

3. **Or Drag & Drop**:
   - Zip the entire `jetWash` folder
   - Drag to Netlify's deploy zone
   - Instant deployment!

4. **Configure Form**:
   - In `quote.html`, the form already has `netlify` attribute for Netlify Forms
   - Or use Formspree: Create account at formspree.io, get form ID, update form action

5. **Custom Domain** (Optional, after ROI):
   - Purchase domain (£10-15/year)
   - Add to Netlify settings
   - DNS auto-configured

### Option 2: GitHub Pages

1. **Push to GitHub**:
   ```bash
   cd jetWash
   git init
   git add .
   git commit -m "Initial commit - JetWash Haywards Heath website"
   git branch -M main
   git remote add origin https://github.com/ethancarlton-cyber/jetwash.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Pages section
   - Source: Deploy from main branch
   - Save

3. **Form Backend**:
   - GitHub Pages doesn't include forms
   - Use Formspree: Update `quote.html` form action to Formspree endpoint

### Option 3: Vercel

1. **Create Vercel Account**: [vercel.com](https://vercel.com) (free)

2. **Deploy**:
   ```bash
   npm install -g vercel
   cd jetWash
   vercel
   ```

3. **Form Backend**:
   - Use Vercel Forms or Formspree (similar to above)

## Form Setup (IMPORTANT)

The quote form is the PRIMARY conversion mechanism. Set it up properly:

### Using Netlify Forms (Easiest):

The form in `quote.html` already has:
```html
<form netlify name="quote" method="POST">
```

Just deploy to Netlify and forms work automatically. Check submissions in Netlify dashboard.

### Using Formspree:

1. Create account at [formspree.io](https://formspree.io)
2. Create new form, get form ID
3. Update `quote.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Formspree FREE tier: 50 submissions/month

### Using EmailJS:

1. Create account at [emailjs.com](https://emailjs.com)
2. Set up email service
3. Update JavaScript to use EmailJS SDK
4. EmailJS FREE tier: 200 emails/month

## Post-Deployment Checklist

### Immediate (Day 1):

- [ ] Test quote form submission
- [ ] Verify all pages load correctly
- [ ] Test on mobile devices
- [ ] Check all internal links work
- [ ] Submit sitemap to Google Search Console

### Week 1:

- [ ] Set up Google Search Console
  - Add property: your-site-url
  - Submit sitemap.xml
  - Request indexing for key pages

- [ ] Set up Google Analytics (free)
  - Create property
  - Add tracking code to all pages (in `<head>`)

- [ ] Test page speed
  - Use PageSpeed Insights
  - Aim for 90+ score
  - Optimize if needed

### Month 1:

- [ ] Monitor keyword rankings
  - Use free tools: Google Search Console, Ubersuggest (limited free)
  - Track: "jetwashing haywards heath", "pressure washing RH16", etc.

- [ ] Track form submissions
  - Count leads generated
  - Note postcode areas

- [ ] Analyze traffic
  - Which pages get views?
  - Where does traffic come from?
  - Adjust content based on data

## SEO Quick Wins

### Immediate Actions:

1. **Google Business Profile** (when you have business address):
   - Essential for "near me" searches
   - Free listing
   - Huge local SEO impact

2. **Get First Backlink**:
   - List on free directories (Yell, Thomson Local)
   - Each listing = backlink

3. **Submit to Search Engines**:
   - Google Search Console (submit sitemap)
   - Bing Webmaster Tools (submit sitemap)

### Content to Add (As Time Allows):

- Blog posts targeting long-tail keywords
- Before/after photos (when available)
- Customer testimonials (when you get them)
- Video content (future)

## Lead Management

### When You Get a Lead:

1. **Response Time**: Respond within 2 hours (same-day)
2. **Qualify Lead**:
   - Within service area? (check postcode)
   - Genuine inquiry?
   - Note service type

3. **Sell to Tradesman**:
   - Price: £10-25 depending on quality
   - Provide: Name, Postcode, Phone, Service Required

4. **Track ROI**:
   - Leads per month
   - Revenue from leads
   - Conversion rate

## Scaling (After Proving Concept)

### When to Invest:

Only invest AFTER generating £200+ in lead sales:

1. **Custom Domain** (£10-15/year):
   - More professional
   - Better for branding
   - jelwashhaywardsheath.co.uk

2. **Professional Photos** (£100-200):
   - Before/after shots
   - Significantly improve conversion

3. **Paid Ads** (£100-300/month):
   - Google Ads for high-intent keywords
   - Target competitors' brand names
   - Only after organic proves concept

## Maintenance

### Monthly Tasks:

- Check form still works
- Monitor Analytics
- Track keyword rankings
- Update content if needed
- Add new location pages (expand coverage)

### Quarterly Tasks:

- Review pricing
- Update FAQ based on questions received
- Analyze best-performing pages
- Consider content additions

## Support & Documentation

- **Full SEO Strategy**: See `SEO-STRATEGY.md`
- **Project Notes**: See `CLAUDE.md`
- **Form Issues**: Check browser console, test submission
- **SEO Questions**: Google Search Console has guides

## Performance Targets

### Month 1-3:
- 5-10 keywords ranking (any position)
- 1-5 leads generated
- £15-100 revenue

### Month 4-6:
- 20-30 keywords ranking
- 10-15 keywords in top 20
- 10-20 leads per month
- £150-400 revenue

### Month 7-12:
- 40+ keywords ranking
- 15+ keywords in top 10
- 20-40 leads per month
- £300-800 revenue
- Approach tradesman with proven model

## Troubleshooting

### Form Not Working:
1. Check form action URL
2. Test in incognito mode
3. Check browser console for errors
4. Verify form service (Netlify/Formspree) is active

### Not Getting Traffic:
1. Check Google Search Console - is site indexed?
2. Submit sitemap if not
3. Request indexing for key pages
4. Be patient - SEO takes 2-4 weeks minimum

### Pages Not Ranking:
1. Check Search Console for indexing issues
2. Ensure unique, quality content on each page
3. Build a few backlinks (directory listings)
4. Give it time - local SEO takes 2-3 months

## License & Attribution

This is a lead generation website built for zero cost. All content is original and SEO-optimized for the Haywards Heath area.

**Built**: December 2025
**Target Launch**: Immediate
**Goal**: Generate £500+/month in lead sales within 6 months

---

**Remember**: This website costs £0 to run. Don't spend money until you've proven the model works and generated your first £200 in lead sales!

## Quick Deploy Commands

```bash
# Navigate to directory
cd C:\Users\devel\Desktop\jetWash

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Deploy JetWash Haywards Heath website"

# Add remote (already exists: https://github.com/ethancarlton-cyber/jetwash)
git remote add origin https://github.com/ethancarlton-cyber/jetwash.git

# Push to GitHub
git push -u origin main

# Then connect to Netlify from dashboard or use Netlify CLI:
netlify init
netlify deploy --prod
```

Ready to dominate local SEO and generate leads! 🚀