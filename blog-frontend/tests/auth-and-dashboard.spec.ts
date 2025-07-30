import { test, expect } from '@playwright/test';

test('should log in and perform CRUD operations on dashboard', async ({ page }) => {
  // ✅ Go to login
  await page.goto('/login');

  // ✅ Login
  await page.fill('input[placeholder="Username"]', 'admin');
  await page.fill('input[placeholder="Password"]', 'password');
  await page.click('button:has-text("Login")');

  // ✅ Wait for redirect
  await page.waitForURL('**/dashboard');
  await expect(page.locator('h1')).toHaveText('Admin Dashboard');

  // ✅ Create post
  await page.fill('input[placeholder="Title"]', 'Playwright Post');
  await page.fill('textarea[placeholder="Content"]', 'This post was added by Playwright');
  await page.click('button:has-text("Add Post")');
  await expect(page.locator('h3')).toContainText('Playwright Post');

  // ✅ Edit post
  await page.click('button:has-text("Edit")');
  await page.fill('input[placeholder="Title"]', 'Updated Playwright Post');
  await page.click('button:has-text("Update Post")');
  await expect(page.locator('h3')).toContainText('Updated Playwright Post');

  // ✅ Delete post
  await page.click('button:has-text("Delete")');
  await page.waitForSelector('h3:has-text("Updated Playwright Post")', { state: 'detached' });
});