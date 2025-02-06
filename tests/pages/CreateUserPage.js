import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class CreateUserPage extends BasePage {
  constructor(page) {
    super(page);
  }
  async createUser(userRegData) {
    const { email, firstName, lastName } = userRegData;
    await this.emailInput.type(email);
    await this.firstNameInput.type(firstName);
    await this.lastNameInput.type(lastName);
  }
  async clickCreateUserBtn() {
    await this.createUserBtn.click();
  }
  async clickSaveUserBtn() {
    await this.saveUserBtn.click();
  }
  async checkCreateUserPageIsCorrect() {
    await expect(this.page).toHaveURL(/users\/create/);
    await expect(this.emailInput).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.saveUserBtn).toBeVisible();
    await expect(this.saveUserBtn).toBeDisabled();
  }
}
