const { test, expect } = require('@playwright/test');

test.describe('Quote Form Submission', () => {
  test('should submit form successfully to Web3Forms', async ({ page }) => {
    // Listen for console messages
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

    // Go to quote page
    await page.goto('http://localhost:8080/quote.html');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Fill out form
    await page.fill('#name', 'Test User Playwright');
    await page.fill('#postcode', 'RH1 2AB');
    await page.fill('#phone', '07123456789');
    await page.selectOption('#service', 'driveway');
    await page.fill('#message', 'This is an automated test submission');
    await page.check('input[name="consent"]');

    // Log form values before submit
    const formData = await page.evaluate(() => {
      const form = document.getElementById('quoteForm');
      return {
        action: form.action,
        name: document.getElementById('name').value,
        postcode: document.getElementById('postcode').value,
        phone: document.getElementById('phone').value,
        accessKey: document.querySelector('input[name="access_key"]').value
      };
    });
    console.log('Form data:', formData);

    // Click submit and wait for network
    const responsePromise = page.waitForResponse(response =>
      response.url().includes('web3forms.com') && response.status() === 200
    );

    await page.click('button[type="submit"]');

    // Wait for response
    const response = await responsePromise;
    const responseData = await response.json();

    console.log('Web3Forms Response:', responseData);

    // Check if success message appears
    await expect(page.locator('#formSuccess')).toBeVisible({ timeout: 5000 });

    console.log('✅ Form submitted successfully!');
  });
});
