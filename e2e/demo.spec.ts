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

  await test.step("J'ouvre le rapport pré-rédigé", async () => {
    await page.getByText("Rédiger le rapport d'intervention").click();
    await expect(page.getByText("Rédigé par l'assistant")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Texte du rapport d'intervention" })).toBeVisible();
  });

  await test.step("Je reviens à l'écran de situation", async () => {
    await page.getByText("Reprendre plus tard").click();
    await expect(page.getByText("Que faire maintenant ?")).toBeVisible();
  });
});
