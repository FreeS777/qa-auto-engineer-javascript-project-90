import { test } from './fixture/main';
// import { expect } from '@playwright/test';

import { BUTTONS } from './data/buttonSelectors';

test.describe('Drug and drop', async () => {
  test.beforeEach(async ({ app: { basePage } }) => {
    await basePage.clickButton(BUTTONS.TASKS);
  });

  test('drag and drop', async ({ app: { baseTasksPage } }) => {
    await baseTasksPage.dragAndDropCard();
  });
});
