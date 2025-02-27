import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BaseDataPage extends BasePage {
  constructor(page) {
    super(page);
    this.nameCell = this.page.locator('tbody .column-name');
    this.slugCell = this.page.locator('tbody .column-slug');
    this.emailCell = this.page.locator('tbody .column-email');
    this.firstNameCell = this.page.locator('tbody .column-firstName');
    this.lastNameCell = this.page.locator('tbody .column-lastName');
    this.alert = this.page.getByText(
      'The form is not valid. Please check for errors',
    );
    this.form = this.page.locator('form');
    this.rows = this.page.locator('tbody tr');
    this.table = this.page.locator('table');
    this.allCheckboxes = this.page.getByLabel('Select All');
    this.rowCheckBox = this.page.getByLabel('Select this row');
    this.itemsSelected = this.page.getByRole('heading', {
      name: 'items selected',
    });
  }
  async getNames() {
    const labels = await this.nameCell.allTextContents();
    return labels;
  }

  async getEmails() {
    const emails = await this.emailCell.allTextContents();
    return emails;
  }

  async checkTableIsVisible() {
    await expect(this.table).toBeVisible();
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
  async allItemsSelectedCorrectly() {
    const checkboxes = await this.page
      .getByRole('checkbox', { checked: true })
      .all();
    const filteredCheckboxes = checkboxes.slice(1);
    const count = filteredCheckboxes.length;
    expect(await this.itemsSelected.innerText()).toContain(count.toString());
  }

  async clickSelectItem(item = 1) {
    const rowCount = await this.rows.count();
    if (item < 1 || item > rowCount) {
      throw new Error('Invalid item count');
    }
    await this.rowCheckBox.nth(item - 1).click();
  }
  async checkAllItemsDeleted() {
    const rowCount = await this.rows.count();
    expect(rowCount).toBe(0);
  }
}
