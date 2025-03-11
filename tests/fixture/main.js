import { test as base } from '@playwright/test';
import { Application } from '../pages/Application';

const test = base.extend({
  app: async ({ page }, use) => {
    const app = new Application(page);

    await app.authPage.open();
    await app.authPage.checkRegistrationForm();
    await app.authPage.logIn();

    await use(app);
  },
});

export { test };
