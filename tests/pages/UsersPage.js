import { expect } from '@playwright/test';

import AuthPage from './AuthPage';

export default class UsersPage extends AuthPage {
  constructor(page) {
    super(page);
    this.usersList = this.page.locator('table');
    this.emailCell = this.page.locator('tbody .column-email');
    this.firstNameCell = this.page.locator('tbody .column-firstName');
    this.lastNameCell = this.page.locator('tbody .column-lastName');
  }

  async checkUsersListIsVisible() {
    await expect(this.usersList).toBeVisible();
  }

  async checkUserEditFormIsVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.saveUserBtn).toBeVisible();
    await expect(this.deleteUserBtn).toBeVisible();
  }

  async checkAllEmailsAreVisible() {
    const emails = await this.emailCell.all();
    for (const email of emails) {
      await expect(email).toBeVisible();
    }
  }

  async checkAllFirstNamesAreVisible() {
    const firstNames = await this.firstNameCell.all();
    for (const name of firstNames) {
      await expect(name).toBeVisible();
    }
  }

  async checkAllLastNamesAreVisible() {
    const lastNames = await this.lastNameCell.all();
    for (const name of lastNames) {
      await expect(name).toBeVisible();
    }
  }

  async checkUserCreatedSuccessfully(userRegData) {
    const { email, firstName, lastName } = userRegData;
    const newUserEmail = await this.emailCell.last().innerText();
    const newUserFirstName = await this.firstNameCell.last().innerText();
    const newUserLastName = await this.lastNameCell.last().innerText();
    expect(newUserEmail).toContain(email);
    expect(newUserFirstName).toContain(firstName);
    expect(newUserLastName).toContain(lastName);
  }

  async checkUserUpdateSuccessfully(userRegData) {
    const { email, firstName, lastName } = userRegData;
    const newUserEmail = await this.emailCell.first().innerText();
    const newUserFirstName = await this.firstNameCell.first().innerText();
    const newUserLastName = await this.lastNameCell.first().innerText();
    expect(newUserEmail).toContain(email);
    expect(newUserFirstName).toContain(firstName);
    expect(newUserLastName).toContain(lastName);
  }

  async verifyUserIsDeleted(userEmail) {
    const deletedUserEmail = await this.emailCell.getByText(userEmail);
    await expect(deletedUserEmail).not.toBeVisible();
  }

  async deleteTwoUsers() {
    await this.rowCheckBox.first().click();
    await this.rowCheckBox.last().click();
    await this.clickDeleteUser();
  }

  async checkAllUsersChecked() {
    const checkedCheckboxes = await this.rowCheckBox
      .filter({ checked: true })
      .count();
    expect(checkedCheckboxes).toBe(2);
  }

  async deleteAllUsers() {
    await this.clickAllCheckBox();
    await this.clickDeleteUser();
  }
  async checkAllUsersDeleted() {
    const rowCount = await this.rows.count();
    expect(rowCount).toBe(0);
  }
}
