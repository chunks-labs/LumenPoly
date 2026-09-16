import { expect, test } from '@playwright/test';
test('wallet is optional and absent extensions have a recovery path', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Connect wallet', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Connect on your terms' })).toBeVisible();
  await page.getByRole('button', { name: 'Connect Freighter', exact: true }).click();
  await expect(page.getByRole('link', { name: /Get the extension/ })).toBeVisible({
    timeout: 15000,
  });
  await page.getByRole('button', { name: 'Continue as a guest' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Let’s play', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Start practice game' })).toBeEnabled();
});
test('does not load the wallet API on the guest landing page', async ({ page }) => {
  const requested: string[] = [];
  page.on('request', (request) => requested.push(request.url()));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(requested.filter((url) => /freighter|stellar-sdk/i.test(url))).toEqual([]);
});
