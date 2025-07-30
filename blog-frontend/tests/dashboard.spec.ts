import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test('should display the dashboard and allow CRUD operations', async ({ page }) => {
    // Go to dashboard
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toHaveText('Admin Dashboard');

    // Create a new post
    await page.fill('input[placeholder="Title"]', 'Playwright Post');
    await page.fill('textarea[placeholder="Content"]', 'This post was added by Playwright');
    await page.click('button:has-text("Add Post")');

    // Check post appears in the list
    await expect(page.locator('h3')).toContainText('Playwright Post');

    // Edit the post
    await page.click('button:has-text("Edit")');
    await page.fill('input[placeholder="Title"]', 'Updated Playwright Post');
    await page.click('button:has-text("Update Post")');
    await expect(page.locator('h3')).toContainText('Updated Playwright Post');

    // Delete the post
    await page.click('button:has-text("Delete")');
    await page.waitForTimeout(1000); // give React a second to refresh
    await page.waitForSelector('h3:has-text("Updated Playwright Post")', { state: 'detached' });
  });
});