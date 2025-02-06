import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class EditUserPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = this.page.locator('input[name="email"]');
    this.firstNameInput = this.page.locator('input[name="firstName"]');
    this.lastNameInput = this.page.locator('input[name="lastName"]');
    this.row = this.page.locator('tbody tr');
  }

  async clickEditUserBtn() {
    await this.row.first().click();
  }
  async editUser(userRegData) {
    const { email, firstName, lastName } = userRegData;
    await this.emailInput.fill(email);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveUserBtn.click();
  }

  async checkEditUserPageIsCorrect() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.saveUserBtn).toBeVisible();
    await expect(this.saveUserBtn).toBeDisabled();
    await expect(this.deleteUserBtn).toBeVisible();
    await expect(this.deleteUserBtn).toBeEnabled();
  }

  async checkEditUserForm(email, firstName, lastName) {
    expect(await this.emailInput.getAttribute('value')).toContain(email);
    expect(await this.firstNameInput.getAttribute('value')).toContain(
      firstName,
    );
    expect(await this.lastNameInput.getAttribute('value')).toContain(lastName);
  }
}
