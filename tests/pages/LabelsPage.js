import { BasePage } from './BasePage';

export class LabelsPage extends BasePage {
  constructor(page) {
    super(page);
  }

  get labelsMenuItem() {
    return this.page.getByRole('menuitem', { name: 'Labels' });
  }

  async checkLabelsData() {
    await this.checkTableIsVisible();
    await this.checkDataCellsVisibility(this.nameCell);
  }

  async checkCreateLabelsForm() {
    await this.createButton.click();
    await Promise.all([
      this.checkForm([this.nameInput]),
      this.checkButtonVisible(this.saveButton),
      this.checkButtonDisabled(this.saveButton),
    ]);
  }

  async checkCreateNewLabel(labelData) {
    await this.createButton.click();
    await this.createLabel(labelData);
    await this.labelsMenuItem.click();
    await this.checkLabelCreatedSuccessfully(labelData);
  }

  async checkEditLabelPage() {
    await this.clickRow();
    await Promise.all([
      await this.checkEditLabelForm(),
      await this.checkButtonVisible(this.saveButton),
      await this.checkButtonDisabled(this.saveButton),
      await this.checkButtonVisible(this.deleteButton),
      await this.checkButtonVisible(this.showButton),
    ]);
  }

  async checkUpdateLabel(rowId, labelData) {
    await this.clickRow(rowId);
    await this.createLabel(labelData);
    await this.labelsMenuItem.click();
    await this.checkLabelUpdateSuccessfully(rowId, labelData);
  }

  async checkDeleteLabel(label) {
    await this.clickRow();
    await this.deleteButton.click();
    await this.statusesMenuItem.click();
    await this.checkLabelIsDeleted(label);
  }

  async checkDeleteAllLabels() {
    await this.clickSelectAll();
    await this.allItemsSelectedCorrectly();
    await this.deleteButton.click();
    await this.checkAllItemsDeleted();
  }

  async createLabel(label) {
    await this.fillInputsForm(label, { name: this.nameInput });
    await this.saveButton.click();
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
