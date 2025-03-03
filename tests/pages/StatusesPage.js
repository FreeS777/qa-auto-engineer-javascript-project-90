import { BUTTONS } from '../data/buttonSelectors';
import { BasePage } from './BasePage';

export class StatusesPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async checkStatusesData() {
    await this.checkTableIsVisible();
    await this.checkDataCellsVisibility(this.nameCell);
    await this.checkDataCellsVisibility(this.slugCell);
  }

  async checkCreateStatusForm() {
    await this.clickButton(BUTTONS.CREATE);
    await Promise.all([
      this.checkForm([this.nameInput, this.slugInput]),
      this.checkButtonVisible(BUTTONS.SAVE),
      this.checkButtonDisabled(BUTTONS.SAVE),
    ]);
  }
  async checkCreateNewStatus(statusData) {
    await this.clickButton(BUTTONS.CREATE);
    await this.createStatus(statusData);
    await this.clickButton(BUTTONS.STATUSES);
    await this.checkStatusCreatedSuccessfully(statusData);
  }
  async checkEditStatusPage() {
    await this.clickRow();
    await Promise.all([
      this.checkEditStatusForm(),
      this.checkButtonVisible(BUTTONS.SAVE),
      this.checkButtonDisabled(BUTTONS.SAVE),
      this.checkButtonVisible(BUTTONS.DELETE),
      this.checkButtonVisible(BUTTONS.SHOW),
    ]);
  }

  async checkUpdateStatus(rowId, statusData) {
    await this.clickRow(rowId);
    await this.createStatus(statusData);
    await this.clickButton(BUTTONS.STATUSES);
    await this.checkStatusUpdateSuccessfully(rowId, statusData);
  }
  async checkDeleteStatus(statusData) {
    await this.clickRow();
    await this.clickButton(BUTTONS.DELETE);
    await this.clickButton(BUTTONS.STATUSES);
    await this.checkStatusIsDeleted(statusData);
  }
  async checkDeleteAllStatuses() {
    await this.clickSelectAll();
    await this.allItemsSelectedCorrectly();
    await this.clickButton(BUTTONS.DELETE);
    await this.checkAllItemsDeleted();
  }

  async createStatus(statusData) {
    await this.fillInputsForm(statusData, {
      name: this.nameInput,
      slug: this.slugInput,
    });
    await this.clickButton(BUTTONS.SAVE);
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
