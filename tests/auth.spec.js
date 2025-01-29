import { test, expect } from '@playwright/test';
import LoginPage from './pages/authPage';

test.beforeEach('Login form', ({ page }) => {
  page.goto('/');
  const loginPage = new LoginPage(page);
  loginPage.login();
});

test('registration successful', async ({ page }) => {
  await expect(page).toHaveURL('/#/');
  await expect(page.getByText('Jane Doe')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Welcome to the administration' }),
  ).toBeVisible();
});

test('logout successful', async ({ page }) => {
  await page.getByRole('button', { name: 'Profile' }).click();
  await page.locator('.MuiButtonBase-root.logout').click();
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});
