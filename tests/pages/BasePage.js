import { expect } from '@playwright/test';
import { PageHolder } from './PageHolder';
import { BUTTONS } from '../data/buttonSelectors';

export class BasePage extends PageHolder {
  constructor(page) {
    super(page);
    this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
    this.firstNameInput = this.page.getByRole('textbox', {
      name: 'First name',
    });
    this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name' });
    this.nameInput = this.page.getByRole('textbox', { name: 'name' });
    this.slugInput = this.page.getByRole('textbox', { name: 'slug' });
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
    this.taskTable = this.page.locator('.RaList-content');
    this.taskCard = this.page.locator('.MuiCard-root');
    this.filtres = this.page.locator('.filter-filed');
    this.titles = this.page.locator('.RaList-content h6');
    this.taskCells = this.page.locator('.MuiBox-root.css-1xphtog');
    this.elements = this.page.locator('[data-rfd-draggable-id]');
    this.clearValue = this.page.locator('[aria-label="Clear value"]');
    this.options = this.page.locator('ul[role="listbox"] li[role="option"]');
    this.taskAssigneeInput = this.page.getByLabel('Assignee');
  }
  async getColumnData(locator) {
    return await locator.allTextContents();
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

  async getButton(item) {
    return this.page.getByRole(item.role, { name: item.name });
  }
  async clickButton(item) {
    const button = await this.getButton(item);
    await button.click();
  }
  async checkButtonVisible(item) {
    const button = await this.getButton(item);
    await expect(button).toBeVisible();
  }

  async checkButtonNotVisible(item) {
    const button = await this.getButton(item);
    await expect(button).not.toBeVisible();
  }

  async checkButtonDisabled(item) {
    const button = await this.getButton(item);
    await expect(button).toBeDisabled();
  }

  async checkForm(items) {
    await expect(this.form).toBeVisible();
    for (const item of items) {
      await expect(item).toBeVisible();
    }
    await this.checkButtonVisible(BUTTONS.SAVE);
    await this.checkButtonDisabled(BUTTONS.SAVE);
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

  async fillSelectOption({ label, value }) {
    await this.page.getByLabel(label).click();

    if (!value) {
      await this.clearValue.click();
    } else {
      const options = this.options;
      const values = Array.isArray(value) ? value : [value];

      for (const item of values) {
        const option = options.locator(`text=${item}`);
        await option.click();
      }
    }

    await this.page.keyboard.press('Escape');
  }

  async clickEditTask(taskTitle) {
    const task = this.taskCard.filter({ hasText: `${taskTitle}` });
    const editButton = task.getByRole('link', { name: 'Edit' });
    await editButton.click();
  }

  async clickShowTask(taskTitle) {
    const task = this.taskCard.filter({ hasText: `${taskTitle}` });
    const showButton = task.getByRole('link', { name: 'Show' });
    await showButton.click();
  }
}
