# JetWash Haywards Heath - Deployment Checklist

## Pre-Deployment

- [x] All HTML pages created
- [x] CSS styling complete and responsive
- [x] JavaScript form validation implemented
- [x] SEO meta tags on all pages
- [x] Schema.org markup implemented
- [x] Sitemap.xml created
- [x] Robots.txt created
- [x] Internal links verified
- [x] README.md with deployment instructions
- [ ] Test all pages locally (open in browser)
- [ ] Test form submission locally
- [ ] Verify mobile responsiveness

## GitHub Setup

- [ ] Git repository initialized
- [ ] All files committed
- [ ] Pushed to GitHub: https://github.com/ethancarlton-cyber/jetwash

```bash
cd C:\Users\devel\Desktop\jetWash
git add .
git commit -m "Complete JetWash website - ready for deployment"
git push origin main
```

## Deploy to Netlify (Recommended)

### Method 1: Connect GitHub Repository

1. [ ] Go to [netlify.com](https://netlify.com) and sign in
2. [ ] Click "Add new site" > "Import an existing project"
3. [ ] Connect to GitHub
4. [ ] Select repository: `ethancarlton-cyber/jetwash`
5. [ ] Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
6. [ ] Click "Deploy site"
7. [ ] Wait for deployment (1-2 minutes)
8. [ ] Get site URL (e.g., `random-name-123.netlify.app`)

### Method 2: Drag & Drop

1. [ ] Go to [netlify.com](https://netlify.com) and sign in
2. [ ] Drag the entire `jetWash` folder to the deploy zone
3. [ ] Wait for deployment
4. [ ] Get site URL

## Form Configuration

### Option A: Use Netlify Forms (Easiest)

The quote form already has `netlify` attribute - it will work automatically!

1. [ ] After deployment, test form submission
2. [ ] Check Netlify dashboard > Forms section for submissions
3. [ ] Configure email notifications:
   - Netlify dashboard > Forms > Form notifications
   - Add your email address

### Option B: Use Formspree (If not using Netlify)

1. [ ] Create account at [formspree.io](https://formspree.io)
2. [ ] Create new form, get form ID
3. [ ] Update `quote.html` line 51:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. [ ] Commit and redeploy
5. [ ] Test form submission

## Post-Deployment Testing

- [ ] Visit live site URL
- [ ] Test all navigation links
- [ ] Test every service page
- [ ] Test every location page
- [ ] Test quote form submission (use real data)
- [ ] Verify you receive form notification
- [ ] Test on mobile device
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Check page load speed: [PageSpeed Insights](https://pagespeed.web.dev/)

## SEO Setup (CRITICAL)

### Google Search Console (Week 1)

1. [ ] Go to [search.google.com/search-console](https://search.google.com/search-console)
2. [ ] Add property (your Netlify URL)
3. [ ] Verify ownership (HTML file upload or meta tag)
4. [ ] Submit sitemap: `https://your-site.netlify.app/sitemap.xml`
5. [ ] Request indexing for key pages:
   - Homepage
   - driveway-cleaning.html
   - patio-cleaning.html
   - areas/haywards-heath.html
   - quote.html

### Google Analytics (Week 1)

1. [ ] Create account at [analytics.google.com](https://analytics.google.com)
2. [ ] Create property for your website
3. [ ] Get tracking code (gtag.js)
4. [ ] Add to all pages in `<head>` section:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```
5. [ ] Commit and redeploy
6. [ ] Verify tracking works (check Real-Time report)

### Bing Webmaster Tools (Week 2)

1. [ ] Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. [ ] Add site
3. [ ] Verify ownership
4. [ ] Submit sitemap

## Optional Enhancements (After Initial Launch)

### Custom Domain (After First £200 Revenue)

1. [ ] Purchase domain (e.g., `jetwashhaywardsheath.co.uk`)
   - Namecheap.com (£10-15/year)
   - Google Domains (£10-15/year)
2. [ ] Add domain in Netlify:
   - Site settings > Domain management
   - Add custom domain
   - Follow DNS instructions
3. [ ] Update all URLs in sitemap.xml
4. [ ] Update URLs in README.md

### Form Enhancements

- [ ] Add auto-responder email to customers
- [ ] Set up Zapier integration (FREE tier) to send leads to spreadsheet
- [ ] Add reCAPTCHA for spam protection (if needed)

### Content Additions

- [ ] Add placeholder images (use free stock from Unsplash)
- [ ] Write blog posts for long-tail keywords
- [ ] Add FAQ questions based on real inquiries
- [ ] Add customer testimonials (when available)

## Monitoring Schedule

### Daily (First Week)

- [ ] Check for form submissions
- [ ] Monitor Google Search Console for indexing

### Weekly (First Month)

- [ ] Check Google Analytics traffic
- [ ] Review Search Console performance
- [ ] Test form still works
- [ ] Note any keyword rankings

### Monthly (Ongoing)

- [ ] Analyze traffic sources
- [ ] Review top-performing pages
- [ ] Track leads generated
- [ ] Calculate ROI (leads sold vs. costs)

## Success Metrics

### Month 1 Targets
- [ ] Site fully indexed in Google (check Search Console)
- [ ] 5-10 keywords ranking (any position)
- [ ] 50+ page views
- [ ] 1-5 leads generated

### Month 3 Targets
- [ ] 20-30 keywords ranking
- [ ] 5-10 keywords in top 20
- [ ] 200+ page views/month
- [ ] 5-15 leads/month
- [ ] £75-300 revenue from leads

### Month 6 Targets
- [ ] 40-50 keywords ranking
- [ ] 15+ keywords in top 10
- [ ] 500+ page views/month
- [ ] 15-30 leads/month
- [ ] £225-600 revenue from leads

## Emergency Contacts & Resources

- **Netlify Support**: [docs.netlify.com](https://docs.netlify.com)
- **Formspree Help**: [help.formspree.io](https://help.formspree.io)
- **Google Search Console Help**: [support.google.com/webmasters](https://support.google.com/webmasters)
- **SEO Strategy**: See `SEO-STRATEGY.md`
- **Deployment Help**: See `README.md`

## Troubleshooting

### Form Not Receiving Submissions

1. Check Netlify dashboard > Forms (if using Netlify Forms)
2. Test form in incognito mode
3. Check browser console for JavaScript errors
4. Verify form action URL is correct
5. Try submitting with different browser

### Site Not Indexed

1. Check robots.txt allows crawling
2. Submit sitemap in Search Console
3. Request indexing for individual pages
4. Wait 1-2 weeks (indexing takes time)
5. Create backlinks (directory listings help)

### No Traffic

1. Be patient - SEO takes 2-4 weeks minimum for any results
2. Check Search Console - are pages indexed?
3. Are you ranking for any keywords? (check Search Console > Performance)
4. Consider creating backlinks (free directory listings)

## Next Steps After Launch

1. **Week 1**: Monitor indexing and test everything
2. **Week 2-4**: Be patient, let Google crawl and index
3. **Month 2**: Analyze initial data, optimize based on results
4. **Month 3**: Start seeing traffic and leads
5. **Month 4-6**: Scale based on what's working

---

**Remember**: This costs £0 to run. Don't spend money on ads or tools until you've proven the model and generated £200+ in lead sales!

**Launch Target**: Deploy within 24 hours, start generating leads within 60 days.

Good luck! 🚀