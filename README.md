# Same Day JetWash Reigate - Lead Generation Website

**LIVE**: https://jetwash-psi.vercel.app

Professional same-day jetwashing and pressure washing lead generation website targeting Reigate, Redhill (RH1) and Surrey area.

## Project Overview

**Purpose**: Generate qualified leads (name, postcode, phone number) for local jetwashing services
**Business Model**: Sell leads to local tradesmen
**Budget**: £0 until ROI achieved
**SEO Strategy**: Hyper-local targeting, low-competition keywords
**Status**: Deployed and operational

## Tech Stack (Zero Cost)

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: Vercel (FREE)
- **Forms**: Web3Forms (FREE - 250/month)
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
│       ├── redhill.html
│       ├── reigate.html
│       ├── horley.html
│       ├── dorking.html
│       ├── banstead.html
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
    └── CLAUDE.md          # Project documentation

└── Testing:
    └── tests/
        ├── branding.spec.js    # Branding implementation tests
        └── screenshot.spec.js  # Visual regression testing
```

## Branding

Professional branding created using OpenRouter API (Gemini 3 Pro Image):

- **Banner**: 1920x400px text-focused design with "SAME DAY JETWASH"
- **Icon Logo**: 512x512px circular badge with pressure washer nozzle
- **Color Palette**:
  - Navy blue: #003D7A
  - Electric cyan: #00DDFF
  - White highlights

The banner is displayed in the header across all pages, while the hero section maintains the gradient overlay design.

## Testing

Automated testing using Playwright:

```bash
# Install dependencies (first time only)
npm install

# Start local server
npm run serve

# Run branding tests (6 tests)
npm test tests/branding.spec.js

# Take screenshots
npm test tests/screenshot.spec.js

# Run all tests
npm test
```

**Test Coverage**:
- Logo display and consistency across pages
- Hero section styling and background
- Image loading and visibility
- Logo clickability and navigation

## Deployment

### Current Setup: Vercel (FREE)

The site is deployed via GitHub integration:
1. Push changes to GitHub (https://github.com/ethancarlton-cyber/jetwash)
2. Vercel auto-deploys on every push

**Live URL**: https://jetwash-psi.vercel.app

### Deploy Commands

```bash
# Navigate to directory
cd C:\Users\devel\Desktop\jetWash

# Add all files
git add .

# Commit
git commit -m "Update message here"

# Push to GitHub (auto-deploys to Vercel)
git push
```

## Form Setup

The quote form uses **Web3Forms** (FREE - 250 submissions/month):
- No server required
- Email notifications included
- Already configured in `quote.html`

## Post-Deployment Checklist

### Completed:
- [x] Site deployed to Vercel
- [x] Google Search Console configured
- [x] Sitemap submitted
- [x] Homepage indexed on Google
- [x] Professional branding implemented (logo & banner)
- [x] Playwright testing configured (6 branding tests)
- [x] Automated screenshot testing

### Next Steps:
- [ ] Set up Google Analytics
- [ ] Submit to Bing Webmaster Tools
- [ ] Monitor keyword rankings
- [ ] Track form submissions

## SEO Quick Wins

1. **Google Business Profile** (when you have business address):
   - Essential for "near me" searches
   - Free listing

2. **Get Backlinks**:
   - List on free directories (Yell, Thomson Local)

3. **Search Engines**:
   - Google Search Console (DONE)
   - Bing Webmaster Tools

## Lead Management

### When You Get a Lead:

1. **Response Time**: Respond within 2 hours
2. **Qualify Lead**: Check postcode is in service area
3. **Sell to Tradesman**: £10-25 per lead
4. **Track ROI**: Leads per month, revenue

## Performance Targets

### Month 1-3:
- 5-10 keywords ranking
- 1-5 leads generated
- £15-100 revenue

### Month 4-6:
- 20-30 keywords ranking
- 10-20 leads per month
- £150-400 revenue

### Month 7-12:
- 40+ keywords ranking
- 20-40 leads per month
- £300-800 revenue

## Troubleshooting

### Form Not Working:
1. Check browser console for errors
2. Test in incognito mode
3. Verify Web3Forms is active

### Not Getting Traffic:
1. Check Google Search Console - is site indexed?
2. Submit sitemap if not
3. Be patient - SEO takes 2-4 weeks minimum

---

**Built**: December 2025
**Target**: Generate £500+/month in lead sales within 6 months
**Cost**: £0/month

**Remember**: Don't spend money until you've proven the model and generated £200+ in lead sales!
