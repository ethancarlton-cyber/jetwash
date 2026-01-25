const { test, expect } = require('@playwright/test');

test.describe('Branding Implementation', () => {
  test('Logo displays correctly in header', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    // Check logo exists
    const logo = page.locator('header .logo img');
    await expect(logo).toBeVisible();

    // Check logo src
    const logoSrc = await logo.getAttribute('src');
    expect(logoSrc).toBe('images/hero-banner.png');

    // Check logo alt text
    const logoAlt = await logo.getAttribute('alt');
    expect(logoAlt).toContain('Same Day JetWash');

    console.log('✓ Logo displays correctly');
  });

  test('Hero banner displays as background', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    // Check hero section exists
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();

    // Check background image is set
    const backgroundStyle = await hero.evaluate((el) => {
      return window.getComputedStyle(el).backgroundImage;
    });

    expect(backgroundStyle).toContain('hero-driveway.png');

    console.log('✓ Hero banner displays as background');
  });

  test('Hero section has correct styling', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    const hero = page.locator('.hero');
    const heroH1 = hero.locator('h1');

    // Check hero is visible
    await expect(hero).toBeVisible();
    await expect(heroH1).toBeVisible();

    // Check h1 text content
    const h1Text = await heroH1.textContent();
    expect(h1Text).toContain('Same Day Jetwashing');

    console.log('✓ Hero section styled correctly');
  });

  test('Branding is consistent across pages', async ({ page }) => {
    const pages = ['/', '/quote.html', '/pricing.html', '/faq.html'];

    for (const pagePath of pages) {
      await page.goto(`http://localhost:8080${pagePath}`);

      // Check logo on each page
      const logo = page.locator('header .logo img');
      await expect(logo).toBeVisible();

      const logoSrc = await logo.getAttribute('src');
      expect(logoSrc).toBe('images/hero-banner.png');

      console.log(`✓ Logo consistent on ${pagePath}`);
    }
  });

  test('Logo is clickable and links to homepage', async ({ page }) => {
    await page.goto('http://localhost:8080/quote.html');

    const logoLink = page.locator('header .logo a');
    await expect(logoLink).toBeVisible();

    const href = await logoLink.getAttribute('href');
    expect(href).toBe('index.html');

    // Click logo and verify navigation
    await logoLink.click();
    await page.waitForURL('**/index.html');

    console.log('✓ Logo links to homepage correctly');
  });

  test('Images load successfully', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    // Check logo image loads
    const logoImg = page.locator('header .logo img');
    const logoLoaded = await logoImg.evaluate((img) => img.complete && img.naturalHeight > 0);
    expect(logoLoaded).toBe(true);

    console.log('✓ Logo image loaded successfully');
  });
});
