import { expect } from '@playwright/test';
import { PageHolder } from './PageHolder';

export class BasePage extends PageHolder {
  constructor(page) {
    super(page);
    this.form = this.page.locator('form');
    this.rows = this.page.locator('tbody tr');
    this.idColumns = this.page.locator('.column-id');
    this.nameColumns = this.page.locator('.column-name');
    this.allCheckboxes = this.page.getByLabel('Select All');
    this.rowCheckBox = this.page.getByLabel('Select this row');
    this.itemsSelected = this.page.getByRole('heading', {
      name: 'items selected',
    });
  }

  async clickButton(item) {
    await this.page.getByRole(item.role, { name: item.name }).click();
  }
  async checkButtonVisible(item) {
    await expect(
      this.page.getByRole(item.role, { name: item.name }),
    ).toBeVisible();
  }
  async checkButtonNotVisible(item) {
    await expect(
      this.page.getByRole(item.role, { name: item.name }),
    ).not.toBeVisible();
  }
  async checkButtonDisabled(item) {
    await expect(
      this.page.getByRole(item.role, { name: item.name }),
    ).toBeDisabled();
  }
}

// async clickAllCheckBox() {
//   await this.allCheckboxes.click();
// }

// async clickDeleteUser() {
//   await this.deleteUserBtn.click();
// }
