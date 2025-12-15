# JetWash Deployment - Quick Start Guide

## Total Accounts Needed: 1
- Google Search Console (essential for SEO)

---

## Step 1: Get Your Web3Forms Access Key (2 minutes, NO SIGNUP)

1. Go to [https://web3forms.com](https://web3forms.com)
2. Scroll down to "Get Your Access Key"
3. Enter your email address (where you want to receive leads)
4. Click "Create Access Key"
5. **Copy the access key** (looks like: `abc123def-4567-89gh-ijkl-mnopqrstuvwx`)

6. Open [quote.html](quote.html:45) in a text editor
7. Find line 45: `<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">`
8. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key
9. Save the file

**Done!** No account created, no password to remember. Just paste your email, get key, add to form.

---

## Step 2: Deploy to Vercel (5 minutes)

### First Time Setup:

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Navigate to your project
cd C:\Users\devel\Desktop\jetWash

# 3. Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - JetWash website ready to deploy"

# 4. Deploy to Vercel
vercel

# Follow the prompts:
# - Login with GitHub (opens browser)
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? jetwash (or any name)
# - In which directory is your code located? ./ (just press enter)
# - Want to override settings? N

# 5. Deploy to production
vercel --prod
```

### Your Site is Live! 🎉
After running `vercel --prod`, you'll get a URL like:
- `https://jetwash.vercel.app` or
- `https://jetwash-abc123.vercel.app`

**Copy this URL** - you'll need it for Google Search Console.

---

## Step 3: Test Your Form (2 minutes)

1. Visit your live site: `https://your-site.vercel.app/quote.html`
2. Fill out the form with test data:
   - Name: Test User
   - Postcode: RH16 1AA
   - Phone: 07123456789
   - Service: Driveway Cleaning
3. Click "Get My Free Quote"
4. Check your email inbox (the email you used for Web3Forms)
5. You should receive an email with the form submission!

**If you don't receive email:**
- Check spam folder
- Wait 2-3 minutes (can take a moment)
- Verify you added the correct access key to quote.html
- Try submitting again

---

## Step 4: Set Up Google Search Console (10 minutes)

This is THE most important step for SEO. Without this, Google won't know your site exists.

### Setup Process:

1. **Go to Google Search Console**:
   - Visit: [https://search.google.com/search-console](https://search.google.com/search-console)
   - Sign in with your Google account (create one if needed - this is your only required account)

2. **Add Your Property**:
   - Click "Add Property"
   - Select "URL prefix" (not Domain)
   - Enter your Vercel URL: `https://your-site.vercel.app`
   - Click "Continue"

3. **Verify Ownership** (HTML File Method):
   - Google will show verification methods
   - Choose "HTML file"
   - Download the verification file (looks like `google1234567890abcdef.html`)
   - Place this file in your `jetWash` folder (root directory)
   - Push to GitHub and redeploy:
     ```bash
     git add .
     git commit -m "Add Google Search Console verification"
     git push origin main
     ```
   - Vercel auto-deploys (or run `vercel --prod`)
   - Go back to Search Console and click "Verify"

4. **Submit Your Sitemap**:
   - In Search Console, click "Sitemaps" (left menu)
   - In the "Add a new sitemap" field, enter: `sitemap.xml`
   - Click "Submit"
   - Status should change to "Success" within minutes

5. **Request Indexing for Key Pages**:
   - In Search Console, click "URL Inspection" (top)
   - Enter URLs one at a time:
     - `https://your-site.vercel.app/`
     - `https://your-site.vercel.app/quote.html`
     - `https://your-site.vercel.app/driveway-cleaning.html`
     - `https://your-site.vercel.app/patio-cleaning.html`
     - `https://your-site.vercel.app/areas/haywards-heath.html`
   - For each URL: Click "Request Indexing" button
   - Google will crawl these within 24-48 hours

**Done!** Google now knows your site exists and will start indexing it.

---

## Step 5: Build Free Backlinks (30 minutes - Week 1)

Backlinks = higher rankings. These free directories accept submissions without creating accounts:

### UK Business Directories (Free Listings):

1. **Yell.com**:
   - Go to [yell.com/business](https://www.yell.com/business)
   - Click "Add a free listing"
   - Enter business details:
     - Business Name: JetWash Haywards Heath
     - Category: Cleaning Services / Pressure Washing
     - Website: Your Vercel URL
     - Service Area: Haywards Heath, West Sussex
   - Submit listing

2. **Thomson Local**:
   - Go to [thomsonlocal.com](https://www.thomsonlocal.com)
   - Similar process to Yell.com
   - Free business listing

3. **Bing Places**:
   - Go to [bingplaces.com](https://www.bingplaces.com)
   - Add your business (free)
   - This also helps you rank on Bing search

4. **192.com**:
   - Go to [192.com](https://www.192.com)
   - Add business listing (free tier available)

5. **Touch Local**:
   - Go to [touchlocal.com](https://www.touchlocal.com)
   - Free business directory

**Goal**: Get 5-10 directory listings in Week 1. Each one = a backlink to your site.

---

## Step 6: Monitor & Track (Week 2-4)

### Daily (First Week):
- [ ] Check email for form submissions
- [ ] Check Google Search Console - any pages indexed yet?

### Weekly:
- [ ] Search Console → Coverage → See how many pages are indexed
- [ ] Search Console → Performance → See if you're getting any impressions
- [ ] Manual search: "jetwashing haywards heath" in incognito mode - do you appear?

### Monthly:
- [ ] Review which keywords you rank for
- [ ] Track leads in a spreadsheet
- [ ] Add 2-3 more free directory listings

---

## Optional: Add Google Analytics (10 minutes)

Track visitor behavior and traffic sources:

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create account → Create property
3. Property name: JetWash Haywards Heath
4. Select "Web" platform
5. Enter your Vercel URL
6. Copy the "Global Site Tag" code (gtag.js)
7. Add this code to the `<head>` section of **ALL** HTML pages (before closing `</head>`)
8. Redeploy to Vercel
9. Test: Visit your site, then check Analytics "Real-Time" report

---

## Troubleshooting

### Form Not Working:
- ✅ Verify you added correct Web3Forms access key to quote.html line 45
- ✅ Check spam folder for submission emails
- ✅ Try submitting with different email address
- ✅ Check browser console for JavaScript errors (F12)

### Site Not Deploying:
- ✅ Run `vercel --prod` again
- ✅ Check for errors in terminal output
- ✅ Ensure you're in correct directory: `cd C:\Users\devel\Desktop\jetWash`

### Not Appearing in Google:
- ✅ Be patient - takes 3-14 days for first pages to index
- ✅ Check Search Console → Coverage → Are pages indexed?
- ✅ Resubmit sitemap if needed
- ✅ Request indexing for individual pages

---

## What to Expect (Timeline)

| Week | What Happens |
|------|--------------|
| 1 | Site live, submitted to Google, backlinks started |
| 2-3 | First pages indexed by Google |
| 4-6 | First keywords start ranking (position 20-50) |
| 8-12 | Keywords climb to top 20 |
| 12-16 | First keywords hit top 10, first leads arrive |
| 16-24 | Regular rankings, consistent lead flow |

---

## Cost Breakdown

- **Vercel Hosting**: £0/month (free forever)
- **Web3Forms**: £0/month (unlimited free)
- **Google Search Console**: £0 (free tool)
- **Directory Listings**: £0 (all free tier)
- **Domain Name**: £0 (using Vercel subdomain)

**Total Monthly Cost**: £0.00

**When to Invest Money**:
- ONLY after you've generated £200+ in lead sales
- Then consider: custom domain (£10-15/year)

---

## Next Steps After Deployment

1. ✅ Week 1: Get everything set up (Steps 1-5 above)
2. ✅ Week 2-4: Monitor Search Console, be patient
3. ✅ Month 2: Review which keywords are ranking
4. ✅ Month 3-6: Optimize content on ranking pages
5. ✅ Month 6+: Consider investing in custom domain if making revenue

---

## Support

**Documentation**:
- Full SEO Strategy: [SEO-STRATEGY.md](SEO-STRATEGY.md)
- Deployment Checklist: [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)
- Main README: [README.md](README.md)

**Helpful Links**:
- Web3Forms: [web3forms.com](https://web3forms.com)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Search Console Help: [support.google.com/webmasters](https://support.google.com/webmasters)

---

**You're ready to launch!** 🚀

Run `vercel --prod` and your site goes live. Zero cost, zero business accounts, maximum SEO impact.
