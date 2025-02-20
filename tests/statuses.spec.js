import { test } from './fixture/main';
import { generateStatusData } from './data/generateStatusData';
import { BUTTONS } from './data/buttonSelectors';

test.describe('Test statuses page', async () => {
  test.beforeEach(async ({ app: { basePage } }) => {
    await basePage.clickButton(BUTTONS.STATUSES);
  });

  test('Statuses list is visible', async ({ app: { statusesPage } }) => {
    await statusesPage.checkStatusesData();
  });

  test.describe('Create new status page', async () => {
    test('Check create status page display', async ({
      app: { statusesPage, basePage },
    }) => {
      await basePage.clickButton(BUTTONS.CREATE);
      await statusesPage.checkCreateStatusForm();
    });
    test('Create new status correctly', async ({
      app: { statusesPage, basePage },
    }) => {
      const statusData = generateStatusData();
      await basePage.clickButton(BUTTONS.CREATE);
      await statusesPage.createStatus(statusData);
      await basePage.clickButton(BUTTONS.STATUSES);
      await statusesPage.checkStatusCreatedSuccessfully(statusData);
    });
  });
  test.describe('Edit status', async () => {
    test('Edit status page is visible and correct', async ({
      app: { statusesPage, baseDataPage, basePage },
    }) => {
      await baseDataPage.clickRow();
      await statusesPage.checkEditStatusForm();
      await basePage.checkButtonVisible(BUTTONS.SAVE);
      await basePage.checkButtonDisabled(BUTTONS.SAVE);
      await basePage.checkButtonVisible(BUTTONS.DELETE);
      await basePage.checkButtonVisible(BUTTONS.SHOW);
    });
    test('Update status data and check success', async ({
      app: { baseDataPage, basePage, statusesPage },
    }) => {
      const statusData = generateStatusData();
      await baseDataPage.clickRow(4);
      await statusesPage.createStatus(statusData);
      await basePage.clickButton(BUTTONS.STATUSES);
      await statusesPage.checkStatusUpdateSuccessfully(4, statusData);
    });
  });

  test.describe('Delete statuses', async () => {
    test('delete status and check success', async ({
      app: { baseDataPage, basePage, statusesPage },
    }) => {
      await baseDataPage.clickRow();
      await basePage.clickButton(BUTTONS.DELETE);
      await basePage.clickButton(BUTTONS.STATUSES);
      await statusesPage.verifyStatusIsDeleted(['Draft', 'draft']);
    });
    test('delete all statuses and check success', async ({
      app: { baseDataPage, basePage },
    }) => {
      await baseDataPage.clickSelectAll();
      await baseDataPage.allItemsSelectedCorrectly();
      await basePage.clickButton(BUTTONS.DELETE);
      await baseDataPage.checkAllItemsDeleted();
    });
  });
});
