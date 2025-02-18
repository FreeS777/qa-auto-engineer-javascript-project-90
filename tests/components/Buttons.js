import { expect } from '@playwright/test';

export class Buttons {
  constructor(page) {
    this.page = page;

    this.deleteBtn = this.page.getByRole('button', { name: 'Delete' });
    this.saveBtn = this.page.getByRole('button', { name: 'Save' });
  }

  async checkDeleteBtn() {
    await expect(this.deleteBtn).toBeVisible();
    await expect(this.deleteBtn).toBeEnabled();
  }
  async clickDeleteBtn() {
    await this.deleteBtn.click();
  }

  async checkSaveBtn() {
    expect(await this.saveBtn).toBeVisible();
  }
  async checkSaveBtnDisabled() {
    expect(await this.saveBtn).toBeDisabled();
  }
  async checkSaveBtnEnabled() {
    await expect(this.saveBtn).toBeEnabled();
  }
  async clickSaveBtn() {
    await this.saveBtn.click();
  }
}
