import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('overview has no WCAG AA violations', async ({ page }) => {
  await page.goto('/'); const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze(); expect(result.violations).toEqual([]);
});
test('setup controls have accessible names and modal semantics', async ({ page }) => {
  await page.goto('/'); await page.getByRole('button', { name: 'Let’s play', exact: true }).click();
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze(); expect(result.violations).toEqual([]);
});
test('gameplay has no WCAG AA violations', async ({ page }) => {
  await page.goto('/'); await page.getByRole('button', { name: 'Let’s play', exact: true }).click(); await page.getByRole('button', { name: 'Start practice game' }).click();
  await expect(page.getByRole('button', { name: 'Roll the dice' })).toBeVisible();
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze(); expect(result.violations).toEqual([]);
});
