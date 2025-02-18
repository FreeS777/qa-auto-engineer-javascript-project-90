import { test as base } from '@playwright/test';
import { Application } from '../pages/Application';

const test = base.extend({
  app: async ({ page }, use) => {
    // const newPage = await context.newPage();
    const app = new Application(page);

    await app.authPage.open();
    await app.authPage.checkLoginFormVisible();
    await app.authPage.checkLoginUserNameVisible();
    await app.authPage.checkLoginPasswordVisible();
    await app.authPage.checkSignInBtnVisible();
    await app.authPage.logIn();

    await use(app);
  },
});

export { test };
