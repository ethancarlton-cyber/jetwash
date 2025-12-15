// JetWash Haywards Heath - Comprehensive Website Tests
// Testing all pages, links, SEO elements, and form functionality

const { test, expect } = require('@playwright/test');

// Homepage Tests
test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Jetwashing Haywards Heath/);
    await expect(page.locator('h1')).toContainText('Professional Jetwashing');
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Check all nav links exist and are clickable
    await expect(page.locator('a:has-text("Home")')).toBeVisible();
    await expect(page.locator('a:has-text("Areas")')).toBeVisible();
    await expect(page.locator('a:has-text("Pricing")')).toBeVisible();
    await expect(page.locator('a:has-text("FAQ")')).toBeVisible();
    await expect(page.locator('a:has-text("Free Quote")')).toBeVisible();
  });

  test('should have SEO meta tags', async ({ page }) => {
    await page.goto('/');

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('jetwashing');

    // Check schema markup
    const schemaScript = await page.locator('script[type="application/ld+json"]').first();
    await expect(schemaScript).toBeAttached();
  });

  test('should have phone number clickable', async ({ page }) => {
    await page.goto('/');
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
    const href = await phoneLink.getAttribute('href');
    expect(href).toContain('tel:');
  });

  test('should have CTA buttons', async ({ page }) => {
    await page.goto('/');

    // Check main CTA buttons exist
    await expect(page.locator('a:has-text("Get Your Free Quote")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Call Now")').first()).toBeVisible();
  });
});

// Service Pages Tests
test.describe('Service Pages', () => {
  const servicePages = [
    { url: '/driveway-cleaning.html', title: 'Driveway Cleaning' },
    { url: '/patio-cleaning.html', title: 'Patio Cleaning' },
    { url: '/block-paving-cleaning.html', title: 'Block Paving' },
    { url: '/render-cleaning.html', title: 'Render Cleaning' },
    { url: '/decking-cleaning.html', title: 'Decking Cleaning' },
    { url: '/commercial-jetwashing.html', title: 'Commercial' },
  ];

  for (const service of servicePages) {
    test(`${service.title} page should load`, async ({ page }) => {
      await page.goto(service.url);
      await expect(page.locator('h1')).toBeVisible();

      // Check page has content
      const bodyText = await page.textContent('body');
      expect(bodyText.length).toBeGreaterThan(500);
    });

    test(`${service.title} has sidebar with quote button`, async ({ page }) => {
      await page.goto(service.url);

      // Check sidebar exists (on desktop)
      const quoteButton = page.locator('a:has-text("Request Quote")').first();
      await expect(quoteButton).toBeVisible();
    });

    test(`${service.title} has internal links`, async ({ page }) => {
      await page.goto(service.url);

      // Check footer links exist
      await expect(page.locator('footer a').first()).toBeVisible();
    });
  }
});

// Location Pages Tests
test.describe('Location Pages', () => {
  const locationPages = [
    { url: '/areas/haywards-heath.html', title: 'Haywards Heath' },
    { url: '/areas/lindfield.html', title: 'Lindfield' },
    { url: '/areas/cuckfield.html', title: 'Cuckfield' },
    { url: '/areas/burgess-hill.html', title: 'Burgess Hill' },
    { url: '/areas/hassocks.html', title: 'Hassocks' },
    { url: '/areas/crawley.html', title: 'Crawley' },
  ];

  for (const location of locationPages) {
    test(`${location.title} page should load`, async ({ page }) => {
      await page.goto(location.url);
      await expect(page.locator('h1')).toContainText(location.title);
    });

    test(`${location.title} has service links`, async ({ page }) => {
      await page.goto(location.url);

      // Check links to service pages
      const serviceLinks = page.locator('a[href*="cleaning.html"]');
      await expect(serviceLinks.first()).toBeVisible();
    });
  }
});

// Quote Form Tests
test.describe('Quote Form', () => {
  test('should load quote page', async ({ page }) => {
    await page.goto('/quote.html');
    await expect(page.locator('h1')).toContainText('Free');
  });

  test('should have all required form fields', async ({ page }) => {
    await page.goto('/quote.html');

    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#postcode')).toBeVisible();
    await expect(page.locator('#phone')).toBeVisible();
    await expect(page.locator('#service')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate empty form submission', async ({ page }) => {
    await page.goto('/quote.html');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Check HTML5 validation triggers
    const nameField = page.locator('#name');
    const isInvalid = await nameField.evaluate((el) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
  });

  test('should validate postcode format', async ({ page }) => {
    await page.goto('/quote.html');

    await page.fill('#name', 'John Smith');
    await page.fill('#postcode', 'INVALID');
    await page.fill('#phone', '07XXX XXXXXX');

    // Trigger blur to run validation
    await page.locator('#postcode').blur();

    // Check error message appears
    const errorMessage = page.locator('#postcodeError');
    const errorText = await errorMessage.textContent();
    expect(errorText.length).toBeGreaterThan(0);
  });

  test('should accept valid form data', async ({ page }) => {
    await page.goto('/quote.html');

    await page.fill('#name', 'John Smith');
    await page.fill('#postcode', 'RH16 1AB');
    await page.fill('#phone', '07123 456789');
    await page.selectOption('#service', 'driveway');
    await page.fill('#message', 'Please quote for driveway cleaning');
    await page.check('input[name="consent"]');

    // All fields should be valid
    const nameField = page.locator('#name');
    const isValid = await nameField.evaluate((el) => el.validity.valid);
    expect(isValid).toBeTruthy();
  });
});

// FAQ Page Tests
test.describe('FAQ Page', () => {
  test('should load FAQ page', async ({ page }) => {
    await page.goto('/faq.html');
    await expect(page.locator('h1')).toContainText('FAQ');
  });

  test('should have FAQ schema markup', async ({ page }) => {
    await page.goto('/faq.html');

    const faqSchema = page.locator('script[type="application/ld+json"]');
    await expect(faqSchema).toBeAttached();

    const schemaContent = await faqSchema.textContent();
    expect(schemaContent).toContain('FAQPage');
  });

  test('should have multiple FAQ items', async ({ page }) => {
    await page.goto('/faq.html');

    const faqItems = page.locator('.faq-item');
    const count = await faqItems.count();
    expect(count).toBeGreaterThan(10); // Should have many FAQs
  });
});

// Pricing Page Tests
test.describe('Pricing Page', () => {
  test('should load pricing page', async ({ page }) => {
    await page.goto('/pricing.html');
    await expect(page.locator('h1')).toContainText('Pricing');
  });

  test('should display pricing cards', async ({ page }) => {
    await page.goto('/pricing.html');

    const pricingCards = page.locator('.pricing-card');
    const count = await pricingCards.count();
    expect(count).toBeGreaterThan(5); // Should have pricing for all services
  });

  test('should have prices visible', async ({ page }) => {
    await page.goto('/pricing.html');

    const prices = page.locator('.price');
    await expect(prices.first()).toBeVisible();

    const priceText = await prices.first().textContent();
    expect(priceText).toContain('£');
  });
});

// Areas Overview Page Tests
test.describe('Areas Page', () => {
  test('should load areas page', async ({ page }) => {
    await page.goto('/areas.html');
    await expect(page.locator('h1')).toContainText('Service Areas');
  });

  test('should have links to location pages', async ({ page }) => {
    await page.goto('/areas.html');

    await expect(page.locator('a[href*="haywards-heath"]')).toBeVisible();
    await expect(page.locator('a[href*="lindfield"]')).toBeVisible();
    await expect(page.locator('a[href*="cuckfield"]')).toBeVisible();
  });

  test('should display postcode coverage', async ({ page }) => {
    await page.goto('/areas.html');

    const bodyText = await page.textContent('body');
    expect(bodyText).toContain('RH16');
    expect(bodyText).toContain('RH17');
    expect(bodyText).toContain('BN6');
  });
});

// SEO & Technical Tests
test.describe('SEO & Technical', () => {
  test('robots.txt exists', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);

    const content = await page.textContent('body');
    expect(content).toContain('Sitemap');
  });

  test('sitemap.xml exists', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);

    const content = await page.textContent('body');
    expect(content).toContain('<urlset');
    expect(content).toContain('driveway-cleaning.html');
  });

  test('CSS file loads', async ({ page }) => {
    const response = await page.goto('/css/style.css');
    expect(response?.status()).toBe(200);
  });

  test('JavaScript file loads', async ({ page }) => {
    const response = await page.goto('/js/form.js');
    expect(response?.status()).toBe(200);
  });
});

// Mobile Responsiveness Tests
test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('homepage is mobile-friendly', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.phone-btn')).toBeVisible();
  });

  test('quote form works on mobile', async ({ page }) => {
    await page.goto('/quote.html');

    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('navigation works on mobile', async ({ page }) => {
    await page.goto('/');

    const navLinks = page.locator('.nav-link');
    await expect(navLinks.first()).toBeVisible();
  });
});

// Internal Linking Tests
test.describe('Internal Links', () => {
  test('all main nav links work from homepage', async ({ page }) => {
    await page.goto('/');

    // Test each nav link
    await page.click('a:has-text("Pricing")');
    await expect(page).toHaveURL(/pricing/);

    await page.goto('/');
    await page.click('a:has-text("FAQ")');
    await expect(page).toHaveURL(/faq/);

    await page.goto('/');
    await page.click('a:has-text("Areas")');
    await expect(page).toHaveURL(/areas/);
  });

  test('service links from homepage work', async ({ page }) => {
    await page.goto('/');

    const drivewayCom = page.locator('a[href="driveway-cleaning.html"]').first();
    await drivewayCom.click();
    await expect(page).toHaveURL(/driveway-cleaning/);
  });

  test('location links from areas page work', async ({ page }) => {
    await page.goto('/areas.html');

    const haywardsHeathLink = page.locator('a[href*="haywards-heath"]').first();
    await haywardsHeathLink.click();
    await expect(page).toHaveURL(/haywards-heath/);
  });
});

// Performance Tests
test.describe('Performance', () => {
  test('homepage loads quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Should load in under 2 seconds locally
    expect(loadTime).toBeLessThan(2000);
  });

  test('no JavaScript errors on homepage', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error));

    await page.goto('/');
    expect(errors.length).toBe(0);
  });

  test('no console errors on quote page', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg);
    });

    await page.goto('/quote.html');
    expect(errors.length).toBe(0);
  });
});