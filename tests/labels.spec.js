import { test } from './fixture/main';
import { BUTTONS } from './data/buttonSelectors';
import { generateLabelData } from './data/generateLabelData';

test.describe('Test labels page', async () => {
  test.beforeEach(async ({ app: { basePage } }) => {
    await basePage.clickButton(BUTTONS.LABELS);
  });

  test('Labels page is visible', async ({ app: { labelsPage } }) => {
    await labelsPage.checkLabelsData();
  });

  test.describe('Check create new labels page', async () => {
    test('Check create label page display', async ({ app: { labelsPage } }) => {
      await labelsPage.checkCreateLabelsForm();
    });
    test('Create new label correctly', async ({ app: { labelsPage } }) => {
      const labelData = generateLabelData();
      await labelsPage.checkCreateNewLabel(labelData);
    });
  });

  test.describe('Check edit labels page', async () => {
    test('Edit label page is visible and correct', async ({
      app: { labelsPage },
    }) => {
      await labelsPage.checkEditLabelPage();
    });
    test('Update label data and check success', async ({
      app: { labelsPage },
    }) => {
      const rowId = 4;
      const labelData = generateLabelData();
      await labelsPage.checkUpdateLabel(rowId, labelData);
    });
  });

  test.describe('Check delete labels page', async () => {
    test('delete label and check success', async ({ app: { labelsPage } }) => {
      const label = ['bug'];
      await labelsPage.checkDeleteLabel(label);
    });
    test('delete all labels and check success', async ({
      app: { labelsPage },
    }) => {
      await labelsPage.checkDeleteAllLabels();
    });
  });
});
