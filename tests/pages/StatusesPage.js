import { BasePage } from './BasePage';

export class StatusesPage extends BasePage {
  constructor(page) {
    super(page);
    this.slugCell = this.page.locator('tbody .column-slug');
    this.slugInput = this.page.getByRole('textbox', { name: 'slug' });
  }

  async checkStatusesData() {
    await this.checkTableIsVisible();
    await this.checkDataCellsVisibility(this.nameCell);
    await this.checkDataCellsVisibility(this.slugCell);
  }

  async checkCreateStatusForm() {
    await this.createButton.click();
    await Promise.all([
      this.checkForm([this.nameInput, this.slugInput]),
      this.checkButtonVisible(this.saveButton),
      this.checkButtonDisabled(this.saveButton),
    ]);
  }
  async checkCreateNewStatus(statusData) {
    await this.createButton.click();
    await this.createStatus(statusData);
    await this.statusesMenuItem.click();
    await this.checkStatusCreatedSuccessfully(statusData);
  }
  async checkEditStatusPage() {
    await this.clickRow();
    await Promise.all([
      this.checkEditStatusForm(),
      this.checkButtonVisible(this.saveButton),
      this.checkButtonDisabled(this.saveButton),
      this.checkButtonVisible(this.deleteButton),
      this.checkButtonVisible(this.showButton),
    ]);
  }

  async checkUpdateStatus(rowId, statusData) {
    await this.clickRow(rowId);
    await this.createStatus(statusData);
    await this.statusesMenuItem.click();
    await this.checkStatusUpdateSuccessfully(rowId, statusData);
  }
  async checkDeleteStatus(statusData) {
    await this.clickRow();
    await this.deleteButton.click();
    await this.statusesMenuItem.click();
    await this.checkStatusIsDeleted(statusData);
  }
  async checkDeleteAllStatuses() {
    await this.clickSelectAll();
    await this.allItemsSelectedCorrectly();
    await this.deleteButton.click();
    await this.checkAllItemsDeleted();
  }

  async createStatus(statusData) {
    await this.fillInputsForm(statusData, {
      name: this.nameInput,
      slug: this.slugInput,
    });
    await this.saveButton.click();
  }
  async checkStatusCreatedSuccessfully(statusData) {
    await this.checkItemCreatedSuccessfully(statusData, {
      name: this.nameCell,
      slug: this.slugCell,
    });
  }

  async checkEditStatusForm() {
    await this.checkForm([this.nameInput, this.slugInput]);
  }
  async checkStatusUpdateSuccessfully(id, statusData) {
    await this.checkItemUpdateSuccessfully(id, statusData, {
      name: this.nameCell,
      slug: this.slugCell,
    });
  }
  async checkStatusIsDeleted(statusName) {
    await this.checkItemIsDeleted(statusName, {
      name: this.nameCell,
      slug: this.slugCell,
    });
  }
}
