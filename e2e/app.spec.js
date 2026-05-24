const { test, expect } = require('@playwright/test');

test.describe('Samuel Dorismond Portfolio E2E Tests', () => {
  
  test('should navigate through all pages and verify key sections', async ({ page }) => {
    // 1. Visit the home page
    await page.goto('/');
    
    // Verify branding and welcome header
    await expect(page.locator('header')).toContainText('DORISMOND');
    await expect(page.getByRole('heading', { name: 'Je suis Samuel Dorismond' })).toBeVisible();
    
    // 2. Click "Voir mes projets" to navigate to /projets
    await page.click('text=Voir mes projets');
    await expect(page).toHaveURL(/\/projets/);
    
    // Verify that the projects list and selected project render
    await expect(page.locator('h3').filter({ hasText: "Plateforme de Leadership et d'E-Learning" }).first()).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: "Description :" })).toBeHidden(); // Description is h5
    await expect(page.locator('h5').filter({ hasText: "Description :" })).toBeVisible();

    // 3. Navigate to "A PROPOS" page
    await page.click('text=A PROPOS');
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { name: "Je m'appelle Samuel Dorismond." })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: "Compétences :" })).toBeVisible();

    // 4. Navigate to "CONTACT" page
    await page.click('text=CONTACT');
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByRole('heading', { name: 'Contactez-moi' })).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]')).toContainText('samuel.dorismond@yahoo.com');
  });

});
