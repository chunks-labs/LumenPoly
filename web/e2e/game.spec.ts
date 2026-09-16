import { expect, test } from '@playwright/test';
test('rolls purchases and persists through a reload', async ({ page }) => {
  await page.addInitScript(() => { Math.random = () => 0.34; });
  await page.goto('/'); await page.getByRole('button', { name: 'Let’s play', exact: true }).click();
  await page.getByRole('button', { name: 'Start practice game' }).click();
  await page.getByRole('button', { name: 'Roll the dice' }).click();
  await expect(page.getByRole('heading', { name: 'Lumen Farm' })).toBeVisible();
  await page.getByRole('button', { name: 'Buy property' }).click();
  await expect(page.getByText('Owned by you.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'End turn' }).click();
  await expect(page.getByRole('button', { name: 'Roll the dice' })).toBeEnabled();
  await expect(page.getByText('Round 2 of 30', { exact: false })).toBeVisible();
  await page.reload(); await page.getByRole('button', { name: 'Continue your game' }).click();
  await expect(page.getByText('Round 2 of 30', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'My portfolio', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Lumen Farm' })).toBeVisible();
});
test('corrupted browser save does not crash entry', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lumenpoly.practice.v1', '{bad'));
  await page.goto('/'); await expect(page.getByRole('heading', { name: 'Big ideas. Bigger moves.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Let’s play', exact: true })).toBeEnabled();
});
test('new game warns before replacing an active match', async ({ page }) => {
  await page.goto('/'); await page.getByRole('button', { name: 'Let’s play', exact: true }).click();
  await page.getByRole('button', { name: 'Start practice game' }).click();
  await page.getByRole('button', { name: 'New game', exact: true }).click();
  await expect(page.getByText('Starting a new game replaces your saved practice match.')).toBeVisible();
  await page.keyboard.press('Escape'); await expect(page.getByRole('button', { name: 'Roll the dice' })).toBeEnabled();
});
