import { test } from './fixture/main';

test('registration successful', async ({ app: { authPage } }) => {
  await authPage.isLoggedIn();
});

// test('logout successful', async ({ page }) => {
//   await page.getByRole('button', { name: 'Profile' }).click();
//   await page.getByRole('menuitem', { name: 'Logout' }).click();
//   await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
// });
