import { test, expect } from '@playwright/test';

test('Form submission works', async ({ page }) => {
  await page.goto('http://localhost:5500/frontend/index.html');
  await page.fill('[data-test-id="input-name"]', 'John Doe');
  await page.fill('[data-test-id="input-email"]', 'john@example.com');
  await page.fill('[data-test-id="input-password"]', 'password123');
  await page.click('[data-test-id="radio-male"]');
  await page.click('[data-test-id="checkbox-newsletter"]');
  await page.selectOption('[data-test-id="dropdown-course"]', 'selenium');
  await page.click('[data-test-id="btn-submit"]');
});
