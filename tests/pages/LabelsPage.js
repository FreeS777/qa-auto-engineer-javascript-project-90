import { BUTTONS } from '../data/buttonSelectors';
import { BasePage } from './BasePage';

export class LabelsPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async checkLabelsData() {
    await this.checkTableIsVisible();
    await this.checkDataCellsVisibility(this.nameCell);
  }

  async checkCreateLabelsForm() {
    await this.clickButton(BUTTONS.CREATE);
    await Promise.all([
      this.checkForm([this.nameInput]),
      this.checkButtonVisible(BUTTONS.SAVE),
      this.checkButtonDisabled(BUTTONS.SAVE),
    ]);
  }

  async checkCreateNewLabel(labelData) {
    await this.clickButton(BUTTONS.CREATE);
    await this.createLabel(labelData);
    await this.clickButton(BUTTONS.LABELS);
    await this.checkLabelCreatedSuccessfully(labelData);
  }

  async checkEditLabelPage() {
    await this.clickRow();
    await Promise.all([
      await this.checkEditLabelForm(),
      await this.checkButtonVisible(BUTTONS.SAVE),
      await this.checkButtonDisabled(BUTTONS.SAVE),
      await this.checkButtonVisible(BUTTONS.DELETE),
      await this.checkButtonVisible(BUTTONS.SHOW),
    ]);
  }

  async checkUpdateLabel(rowId, labelData) {
    await this.clickRow(rowId);
    await this.createLabel(labelData);
    await this.clickButton(BUTTONS.LABELS);
    await this.checkLabelUpdateSuccessfully(rowId, labelData);
  }

  async checkDeleteLabel(label) {
    await this.clickRow();
    await this.clickButton(BUTTONS.DELETE);
    await this.clickButton(BUTTONS.STATUSES);
    await this.checkLabelIsDeleted(label);
  }

  async checkDeleteAllLabels() {
    await this.clickSelectAll();
    await this.allItemsSelectedCorrectly();
    await this.clickButton(BUTTONS.DELETE);
    await this.checkAllItemsDeleted();
  }

  async createLabel(label) {
    await this.fillInputsForm(label, { name: this.nameInput });
    await this.clickButton(BUTTONS.SAVE);
  }
  async checkLabelCreatedSuccessfully(label) {
    await this.checkItemCreatedSuccessfully(label, {
      name: this.nameCell,
    });
  }

  async checkEditLabelForm() {
    await this.checkForm([this.nameInput]);
  }
  async checkLabelUpdateSuccessfully(id, labelData) {
    await this.checkItemUpdateSuccessfully(id, labelData, {
      name: this.nameCell,
    });
  }
  async checkLabelIsDeleted(labelName) {
    await this.checkItemIsDeleted(labelName, {
      name: this.nameCell,
    });
  }
}
