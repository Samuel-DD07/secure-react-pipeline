const { test, expect } = require("@playwright/test");

test.describe("dorismond.fr portfolio (Next.js, bilingual)", () => {
  test("home redirects to a localized route and shows the hero", async ({
    page,
  }) => {
    await page.goto("/");
    // next-intl detects the browser language, so / -> /fr or /en
    await expect(page).toHaveURL(/\/(fr|en)$/);
    await expect(page.locator("header")).toContainText("DORISMOND");
    await expect(
      page.getByRole("heading", { level: 1, name: "Samuel Dorismond" })
    ).toBeVisible();
  });

  test("navigates to projects, about and contact", async ({ page }) => {
    await page.goto("/fr");

    // Hero CTA -> projects
    await page.getByRole("link", { name: /Voir mes projets/i }).click();
    await expect(page).toHaveURL(/\/fr\/projets$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Projets" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Tous" })).toBeVisible();

    // About
    await page.getByRole("link", { name: "À propos" }).click();
    await expect(page).toHaveURL(/\/fr\/about$/);
    await expect(
      page.getByRole("heading", { name: "Compétences" })
    ).toBeVisible();

    // Contact
    await page.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page).toHaveURL(/\/fr\/contact$/);
    await expect(
      page.getByRole("heading", { name: "Contactez-moi" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "samuel.dorismond@yahoo.com" })
    ).toBeVisible();
  });

  test("switches the language to English", async ({ page }) => {
    await page.goto("/fr/projets");
    await page.getByRole("button", { name: "Changer de langue" }).click();
    await expect(page).toHaveURL(/\/en\/projets$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Projects" })
    ).toBeVisible();
  });
});
