import { BUTTONS } from '../data/buttonSelectors';
import { BaseDataPage } from './BaseDataPage';
import { generateStatusData } from '../data/generateStatusData';

export class StatusesPage extends BaseDataPage {
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
  async checkCreateNewStatus() {
    const statusData = generateStatusData();
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

  async checkUpdateStatus() {
    const statusData = generateStatusData();
    await this.clickRow(4);
    await this.createStatus(statusData);
    await this.clickButton(BUTTONS.STATUSES);
    await this.checkStatusUpdateSuccessfully(4, statusData);
  }
  async checkDeleteStatus() {
    await this.clickRow();
    await this.clickButton(BUTTONS.DELETE);
    await this.clickButton(BUTTONS.STATUSES);
    await this.verifyStatusIsDeleted(['Draft', 'draft']);
  }
  async checkDeleteAllStatuses() {
    await this.clickSelectAll();
    await this.allItemsSelectedCorrectly();
    await this.clickButton(BUTTONS.DELETE);
    await this.checkAllItemsDeleted();
  }

  async createStatus(statusData) {
    await this.fillForm(statusData, [this.nameInput, this.slugInput]);
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
  async verifyStatusIsDeleted(statusName) {
    await this.verifyItemIsDeleted(statusName, {
      name: this.nameCell,
      slug: this.slugCell,
    });
  }
}
