const { test, expect } = require('@playwright/test');

test.describe('Samuel Dorismond Portfolio E2E Tests', () => {
  
  test('should navigate through all pages and verify key sections', async ({ page }) => {
    // 1. Visit the home page
    await page.goto('/');
    
    // Verify branding and welcome header
    await expect(page.locator('header')).toContainText('DORISMOND');
    await expect(page.getByRole('heading', { name: 'I am Samuel Dorismond' })).toBeVisible();
    
    // 2. Click "View my projects" to navigate to /projects
    await page.click('text=View my projects');
    await expect(page).toHaveURL(/\/projects/);
    
    // Verify that the projects list and selected project render
    await expect(page.locator('h3').filter({ hasText: "Leadership and E-Learning Platform" }).first()).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: "Description:" })).toBeHidden(); // Description is h5
    await expect(page.locator('h5').filter({ hasText: "Description:" })).toBeVisible();

    // 3. Navigate to "ABOUT" page
    await page.click('text=ABOUT');
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { name: "My name is Samuel Dorismond." })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: "Skills:" })).toBeVisible();

    // 4. Navigate to "CONTACT" page
    await page.click('text=CONTACT');
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByRole('heading', { name: 'Contact Me' })).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]')).toContainText('samuel.dorismond@yahoo.com');
  });

});
