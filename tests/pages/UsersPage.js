import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class UsersPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
    this.firstNameInput = this.page.getByRole('textbox', {
      name: 'First name',
    });
    this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name' });
    this.emailCell = this.page.locator('tbody .column-email');
    this.firstNameCell = this.page.locator('tbody .column-firstName');
    this.lastNameCell = this.page.locator('tbody .column-lastName');
    this.alert = this.page.getByText(
      'The form is not valid. Please check for errors',
    );
  }

  get usersMenuButton() {
    return this.page.getByRole('menuitem', { name: 'Users' });
  }

  async checkUsersData() {
    await Promise.all([
      this.checkTableIsVisible(),
      this.checkDataCellsVisibility(this.emailCell),
      this.checkDataCellsVisibility(this.firstNameCell),
      this.checkDataCellsVisibility(this.lastNameCell),
    ]);
  }

  async checkCreateUser(userData) {
    await this.createButton.click();
    await this.createUser(userData);
    await this.usersMenuButton.click();
    await this.checkUserCreatedSuccessfully(userData);
  }

  async checkCreateUserWithIncorrectEmail(userData) {
    await this.createButton.click();
    await this.createUserWithIncorrectEmail(userData);
    await this.usersMenuButton.click();
  }

  async checkEditUserPage() {
    await this.clickRow();
    await Promise.all([
      this.checkEditUserForm(),
      this.checkButtonVisible(this.saveButton),
      this.checkButtonDisabled(this.saveButton),
      this.checkButtonVisible(this.deleteButton),
      this.checkButtonVisible(this.showButton),
    ]);
  }

  async checkUpdateUserData(rowId, userData) {
    await this.usersMenuButton.click();
    await this.clickRow(rowId);
    await this.createUser(userData);
    await this.usersMenuButton.click();
    await this.checkUserUpdateSuccessfully(rowId, userData);
  }

  async checkDeleteUser(userData) {
    await this.clickRow();
    await this.deleteButton.click();
    await this.usersMenuButton.click();
    await this.checkUserIsDeleted(userData);
  }

  async checkDeleteAllUser() {
    await this.clickSelectAll();
    await this.allItemsSelectedCorrectly();
    await this.deleteButton.click();
    await this.checkAllItemsDeleted();
  }

  async checkCreateUserForm() {
    await this.createButton.click();
    await Promise.all([
      this.checkForm([
        this.emailInput,
        this.firstNameInput,
        this.lastNameInput,
      ]),
      this.checkButtonVisible(this.saveButton),
      this.checkButtonDisabled(this.saveButton),
    ]);
  }
  async createUser(userData) {
    await this.fillInputsForm(userData, {
      email: this.emailInput,
      firstName: this.firstNameInput,
      lastName: this.lastNameInput,
    });
    await this.saveButton.click();
  }
  async createUserWithIncorrectEmail(userData) {
    const incorrectData = { ...userData, email: 'qwerty' };
    await this.fillInputsForm(incorrectData, {
      email: this.emailInput,
      firstName: this.firstNameInput,
      lastName: this.lastNameInput,
    });
    await this.saveButton.click();
    await expect(this.alert).toBeVisible();
  }

  async checkUserCreatedSuccessfully(userData) {
    await this.checkItemCreatedSuccessfully(userData, {
      email: this.emailCell,
      firstName: this.firstNameCell,
      lastName: this.lastNameCell,
    });
  }
  async checkEditUserForm() {
    await this.checkForm([
      this.emailInput,
      this.firstNameInput,
      this.lastNameInput,
    ]);
  }

  async checkUserUpdateSuccessfully(id, userData) {
    await this.checkItemUpdateSuccessfully(id, userData, {
      email: this.emailCell,
      firstName: this.firstNameCell,
      lastName: this.lastNameCell,
    });
  }

  async checkUserIsDeleted(userData) {
    await this.checkItemIsDeleted(userData, {
      email: this.emailCell,
      firstName: this.firstNameCell,
      lastName: this.lastNameCell,
    });
  }
}
