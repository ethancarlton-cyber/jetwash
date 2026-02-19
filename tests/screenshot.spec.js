const { test } = require('@playwright/test');

test('Take homepage screenshot', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.screenshot({ path: 'test-results/homepage-with-branding.png', fullPage: false });
  console.log('Screenshot saved: test-results/homepage-with-branding.png');
});
