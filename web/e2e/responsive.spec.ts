import { expect, test } from '@playwright/test';
for (const width of [320, 390, 768, 1440, 1920]) {
  test(`keeps the dashboard within a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Let’s play', exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.screenshot({ path: `test-results/overview-${width}.png`, fullPage: true });
  });
}
test('mobile gameplay contains board scrolling inside the panel', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Let’s play', exact: true }).click();
  await page.getByRole('button', { name: 'Start practice game' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.getByRole('region', { name: /Game board/ })).toBeVisible();
  await page.getByRole('button', { name: 'Roll the dice' }).click();
  await expect(page.getByRole('button', { name: 'End turn' })).toBeVisible();
  await page.screenshot({ path: 'test-results/game-mobile.png', fullPage: true });
});

for (const viewport of [
  { width: 1920, height: 900 },
  { width: 1440, height: 900 },
  { width: 1366, height: 768 },
  { width: 1280, height: 600 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
]) {
  test(`fits the full game board in ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.getByRole('button', { name: 'Let’s play', exact: true }).click();
    await page.getByRole('button', { name: 'Start practice game' }).click();
    const board = page.locator('.game-board');
    await expect(board).toBeVisible();
    const bounds = await board.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
    expect(Math.abs(bounds!.width - bounds!.height)).toBeLessThan(1);
    const roll = page.getByRole('button', { name: 'Roll the dice' });
    await expect(roll).toBeInViewport({ ratio: 1 });
    await expect(page.getByRole('button', { name: /^Launch,/ })).toBeInViewport({ ratio: 1 });
    await roll.click();
    await expect(page.getByRole('button', { name: 'End turn' })).toBeInViewport({ ratio: 1 });
    await page.screenshot({
      path: `test-results/board-fit-${viewport.width}-${viewport.height}.png`,
    });
  });
}
