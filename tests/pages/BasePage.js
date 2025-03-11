import { expect } from '@playwright/test';
import { PageHolder } from './PageHolder';

export class BasePage extends PageHolder {
  constructor(page) {
    super(page);
    this.nameInput = this.page.getByRole('textbox', { name: 'name' });
    this.nameCell = this.page.locator('tbody .column-name');
    this.form = this.page.locator('form');
    this.rows = this.page.locator('tbody tr');
    this.table = this.page.locator('table');
    this.allCheckboxes = this.page.getByLabel('Select All');
    this.itemsSelected = this.page.getByRole('heading', {
      name: 'items selected',
    });
  }

  get statusesMenuItem() {
    return this.page.getByRole('menuitem', { name: 'Task statuses' });
  }

  get createButton() {
    return this.page.getByRole('link', { name: 'Create' });
  }

  get saveButton() {
    return this.page.getByRole('button', { name: 'Save' });
  }

  get deleteButton() {
    return this.page.getByRole('button', { name: 'Delete' });
  }

  get showButton() {
    return this.page.getByRole('link', { name: 'Show' });
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

  async checkAllItemsDeleted() {
    const rowCount = await this.rows.count();
    expect(rowCount).toBe(0);
  }

  async checkButtonVisible(button) {
    await expect(button).toBeVisible();
  }

  async checkButtonNotVisible(button) {
    await expect(button).not.toBeVisible();
  }

  async checkButtonDisabled(button) {
    await expect(button).toBeDisabled();
  }

  async checkForm(items) {
    await expect(this.form).toBeVisible();
    for (const item of items) {
      await expect(item).toBeVisible();
    }
    await this.checkButtonVisible(this.saveButton);
    await this.checkButtonDisabled(this.saveButton);
  }

  async fillInputsForm(data, inputs) {
    for (const [key, value] of Object.entries(data)) {
      await inputs[key].fill(value);
    }
  }

  async checkDataCellsVisibility(cells) {
    const elements = await cells.all();
    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }
  async checkItemCreatedSuccessfully(data, fields) {
    for (const [key, cell] of Object.entries(fields)) {
      const actualValue = await cell.last().innerText();
      expect(actualValue).toContain(data[key]);
    }
  }

  async checkItemUpdateSuccessfully(id, data, fields) {
    const usersCount = await this.rows.count();
    if (id < 1 || id > usersCount) {
      throw new Error('Invalid Id');
    }
    const index = id - 1;
    for (const [key, cell] of Object.entries(fields)) {
      const actualValue = await cell.nth(index).innerText();
      expect(actualValue).toContain(data[key]);
    }
  }

  async checkItemIsDeleted(data, fields) {
    const userValues = Array.isArray(data) ? data : [data];

    for (const [index, cell] of Object.values(fields).entries()) {
      const deletedValue = await cell.getByText(userValues[index], {
        exact: true,
      });
      await expect(deletedValue).not.toBeVisible();
    }
  }
}
