import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class UsersPage extends BasePage {
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

  async checkEmailsVisibility() {
    const emails = await this.emailCell.all();
    for (const email of emails) {
      await expect(email).toBeVisible();
    }
  }

  async checkFirstNamesVisibility() {
    const firstNames = await this.firstNameCell.all();
    for (const name of firstNames) {
      await expect(name).toBeVisible();
    }
  }

  async checkLastNamesVisibility() {
    const lastNames = await this.lastNameCell.all();
    for (const name of lastNames) {
      await expect(name).toBeVisible();
    }
  }

  async checkUsersData() {
    await this.checkEmailsVisibility();
    await this.checkFirstNamesVisibility();
    await this.checkLastNamesVisibility();
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

  async selectUser(count = 1) {
    const countOfRows = await this.rows.count();
    if (count < 1 || count > countOfRows) {
      throw new Error('Invalid user count');
    }
    await this.rowCheckBox.nth(count - 1).click();
  }

  async deleteTwoUsers() {
    await this.selectUser(1);
    await this.selectUser(2);
    await this.clickDeleteUser();
  }

  async checkAllUsersSelected() {
    const checkedCheckboxes = await this.page
      .getByRole('checkbox', { checked: true })
      .count();
    expect(await this.itemsSelected.innerText()).toContain(
      checkedCheckboxes.toString(),
    );
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
