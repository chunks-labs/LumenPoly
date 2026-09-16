import { expect, test } from '@playwright/test';
test('opens without a wallet and starts a guest match', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Big ideas. Bigger moves.' })).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Let’s play', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Make your first move' })).toBeVisible();
  await page.getByRole('radio', { name: /Explorer/ }).check();
  await page.getByRole('radio', { name: /Strategic/ }).check();
  await page.getByRole('button', { name: 'Start practice game' }).click();
  await expect(page.getByRole('heading', { name: 'Make it your move.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Roll the dice' })).toBeEnabled();
  expect(errors).toEqual([]);
});
test('learn and portfolio navigation work before playing', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'How to play', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Good moves start here.' })).toBeVisible();
  await page.getByRole('button', { name: 'My portfolio', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Every portfolio starts with a first move.' }),
  ).toBeVisible();
});
test('setup can be dismissed and restores focus', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Let’s play', exact: true });
  await trigger.click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
