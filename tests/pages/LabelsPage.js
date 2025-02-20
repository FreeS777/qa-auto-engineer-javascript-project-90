import { BUTTONS } from '../data/buttonSelectors';
import { BaseDataPage } from './BaseDataPage';

export class LabelsPage extends BaseDataPage {
  constructor(page) {
    super(page);
  }

  async checkLabelsData() {
    await this.checkTableIsVisible();
    await this.checkDataCellsVisibility(this.nameCell);
  }

  async checkCreateLabelsForm() {
    await this.checkForm([this.nameInput]);
    await this.checkButtonVisible(BUTTONS.SAVE);
    await this.checkButtonDisabled(BUTTONS.SAVE);
  }

  async createLabel(label) {
    await this.fillForm(label, [this.nameInput]);
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
  async verifyLabelIsDeleted(labelName) {
    await this.verifyItemIsDeleted(labelName, {
      name: this.nameCell,
    });
  }
}
