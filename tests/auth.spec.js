import { test } from './fixture/main';

test('registration successful', async ({ app: { authPage } }) => {
  await authPage.isLoggedIn();
});

test('logout successful', async ({ app: { authPage } }) => {
  await authPage.logOut();
});
