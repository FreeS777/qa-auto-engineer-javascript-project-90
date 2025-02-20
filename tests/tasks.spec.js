import { test } from './fixture/main';
import { expect } from '@playwright/test';

// import { generateUserData } from './data/generateUserData';
import { BUTTONS } from './data/buttonSelectors';

test.describe('Test users page', async () => {
  test.beforeEach(async ({ app: { basePage } }) => {
    await basePage.clickButton(BUTTONS.TASKS);
  });

  test('drag and drop', async ({ app: { basePage } }) => {
    await basePage.testDragAndDrop();
  });
});
