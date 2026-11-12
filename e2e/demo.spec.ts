import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois la situation de la famille Martin", async () => {
    await expect(page.getByText("Famille Martin")).toBeVisible();
    await expect(page.getByText("Capturer ce que j'entends")).toBeVisible();
    await expect(page.getByText("Rédiger le rapport d'intervention")).toBeVisible();
    await expect(page.getByText("Envoyer au magistrat")).toBeVisible();
  });
});
