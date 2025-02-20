import { test } from './fixture/main';
import { generateLabelData } from './data/generateLabelData';
import { BUTTONS } from './data/buttonSelectors';

test.describe('Test labels page', async () => {
  test.beforeEach(async ({ app: { basePage } }) => {
    await basePage.clickButton(BUTTONS.LABELS);
  });

  test('Labels list is visible', async ({ app: { labelsPage } }) => {
    await labelsPage.checkLabelsData();
  });

  test.describe('Create new label page', async () => {
    test('Check create label page display', async ({
      app: { labelsPage, basePage },
    }) => {
      await basePage.clickButton(BUTTONS.CREATE);
      await labelsPage.checkCreateLabelsForm();
    });
    test('Create new label correctly', async ({
      app: { labelsPage, basePage },
    }) => {
      const labelData = generateLabelData();
      await basePage.clickButton(BUTTONS.CREATE);
      await labelsPage.createLabel(labelData);
      await basePage.clickButton(BUTTONS.LABELS);
      await labelsPage.checkLabelCreatedSuccessfully(labelData);
    });
  });
  test.describe('Edit label', async () => {
    test('Edit label page is visible and correct', async ({
      app: { labelsPage, baseDataPage, basePage },
    }) => {
      await baseDataPage.clickRow();
      await labelsPage.checkEditLabelForm();
      await basePage.checkButtonVisible(BUTTONS.SAVE);
      await basePage.checkButtonDisabled(BUTTONS.SAVE);
      await basePage.checkButtonVisible(BUTTONS.DELETE);
      await basePage.checkButtonVisible(BUTTONS.SHOW);
    });
    test('Update label data and check success', async ({
      app: { baseDataPage, basePage, labelsPage },
    }) => {
      const labelData = generateLabelData();
      await baseDataPage.clickRow(4);
      await labelsPage.createLabel(labelData);
      await basePage.clickButton(BUTTONS.LABELS);
      await labelsPage.checkLabelUpdateSuccessfully(4, labelData);
    });
  });

  test.describe('Delete labels', async () => {
    test('delete label and check success', async ({
      app: { baseDataPage, basePage, labelsPage },
    }) => {
      await baseDataPage.clickRow();
      await basePage.clickButton(BUTTONS.DELETE);
      await basePage.clickButton(BUTTONS.STATUSES);
      await labelsPage.verifyLabelIsDeleted(['bug']);
    });
    test('delete all labels and check success', async ({
      app: { baseDataPage, basePage },
    }) => {
      await baseDataPage.clickSelectAll();
      await baseDataPage.allItemsSelectedCorrectly();
      await basePage.clickButton(BUTTONS.DELETE);
      await baseDataPage.checkAllItemsDeleted();
    });
  });
});
