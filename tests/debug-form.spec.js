const { test } = require('@playwright/test');

test('debug form submission', async ({ page }) => {
  // Capture all console messages
  page.on('console', msg => {
    console.log(`[${msg.type().toUpperCase()}]`, msg.text());
  });

  // Capture page errors
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });

  // Go to quote page
  await page.goto('http://localhost:8080/quote.html');
  await page.waitForLoadState('networkidle');

  console.log('\n=== Filling form ===');
  await page.fill('#name', 'Test User');
  await page.fill('#postcode', 'RH1 2AB');
  await page.fill('#phone', '07123456789');
  await page.selectOption('#service', 'driveway');
  await page.check('input[name="consent"]');

  console.log('\n=== Checking form state ===');
  const formState = await page.evaluate(() => {
    const form = document.getElementById('quoteForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    return {
      formExists: !!form,
      formAction: form?.action,
      buttonExists: !!submitBtn,
      buttonDisabled: submitBtn?.disabled,
      buttonText: submitBtn?.textContent
    };
  });
  console.log('Form state:', formState);

  console.log('\n=== Clicking submit button ===');
  await page.click('button[type="submit"]');

  // Wait a bit to see what happens
  await page.waitForTimeout(3000);

  console.log('\n=== Checking form state after click ===');
  const afterState = await page.evaluate(() => {
    const form = document.getElementById('quoteForm');
    const submitBtn = form?.querySelector('button[type="submit"]');
    const successDiv = document.getElementById('formSuccess');
    return {
      buttonDisabled: submitBtn?.disabled,
      buttonText: submitBtn?.textContent,
      formVisible: form?.style.display !== 'none',
      successVisible: successDiv?.style.display === 'block'
    };
  });
  console.log('After state:', afterState);

  // Take screenshot
  await page.screenshot({ path: 'form-debug.png', fullPage: true });
  console.log('\nScreenshot saved to form-debug.png');
});
