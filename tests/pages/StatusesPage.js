import { BUTTONS } from '../data/buttonSelectors';
import { BaseDataPage } from './BaseDataPage';

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
    await this.checkForm([this.nameInput, this.slugInput]);
    await this.checkButtonVisible(BUTTONS.SAVE);
    await this.checkButtonDisabled(BUTTONS.SAVE);
  }

  async createStatus(statusData) {
    await this.fillForm(statusData, [this.nameInput, this.slugInput]);
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
