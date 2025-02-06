import { test, expect } from '@playwright/test';
import AuthPage from './pages/AuthPage';

test.beforeEach('Login form', ({ page }) => {
  page.goto('/');
  const authPage = new AuthPage(page);
  authPage.login();
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
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});
