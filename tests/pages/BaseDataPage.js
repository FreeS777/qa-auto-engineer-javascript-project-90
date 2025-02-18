import { BasePage } from './BasePage';

export class BaseDataPage extends BasePage {
  constructor(page) {
    super(page);
  }
  async clickRow(row = 1) {
    const rowCount = await this.rows.count();
    if (row < 1 || row > rowCount) {
      throw new Error(`Table has only ${rowCount} rows.`);
    }
    await this.rows.nth(row - 1).click();
  }

  async clickSelectAll() {
    await this.allCheckboxes.click();
  }

  async clickSelectUser(user = 1) {
    const rowCount = await this.rows.count();
    if (user < 1 || user > rowCount) {
      throw new Error('Invalid user count');
    }
    await this.rowCheckBox.nth(user - 1).click();
  }
}
