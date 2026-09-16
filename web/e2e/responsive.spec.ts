import { expect, test } from '@playwright/test';
for (const width of [320, 390, 768, 1440, 1920]) {
  test(`keeps the dashboard within a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 }); await page.goto('/');
    await expect(page.getByRole('button', { name: 'Let’s play', exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/overview-${width}.png`, fullPage: true });
  });
}
test('mobile gameplay contains board scrolling inside the panel', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/');
  await page.getByRole('button', { name: 'Let’s play', exact: true }).click(); await page.getByRole('button', { name: 'Start practice game' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.getByRole('region', { name: /Game board/ })).toBeVisible();
  await page.getByRole('button', { name: 'Roll the dice' }).click(); await expect(page.getByRole('button', { name: 'End turn' })).toBeVisible();
  await page.screenshot({ path: 'test-results/game-mobile.png', fullPage: true });
});
