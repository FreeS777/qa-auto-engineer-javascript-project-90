import { expect } from '@playwright/test';
import { BUTTONS } from '../data/buttonSelectors';
import { BasePage } from './BasePage';

export class UsersPage extends BasePage {
  constructor(page) {
    super(page);
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
    await this.clickButton(BUTTONS.CREATE);
    await this.createUser(userData);
    await this.clickButton(BUTTONS.USERS);
    await this.checkUserCreatedSuccessfully(userData);
  }

  async checkCreateUserWithIncorrectEmail(userData) {
    await this.clickButton(BUTTONS.CREATE);
    await this.createUserWithIncorrectEmail(userData);
    await this.clickButton(BUTTONS.USERS);
  }

  async checkEditUserPage() {
    await this.clickRow();
    await Promise.all([
      this.checkEditUserForm(),
      this.checkButtonVisible(BUTTONS.SAVE),
      this.checkButtonDisabled(BUTTONS.SAVE),
      this.checkButtonVisible(BUTTONS.DELETE),
      this.checkButtonVisible(BUTTONS.SHOW),
    ]);
  }

  async checkUpdateUserData(rowId, userData) {
    await this.clickButton(BUTTONS.USERS);
    await this.clickRow(rowId);
    await this.createUser(userData);
    await this.clickButton(BUTTONS.USERS);
    await this.checkUserUpdateSuccessfully(rowId, userData);
  }

  async checkDeleteUser(userData) {
    await this.clickRow();
    await this.clickButton(BUTTONS.DELETE);
    await this.clickButton(BUTTONS.USERS);
    await this.checkUserIsDeleted(userData);
  }

  async checkDeleteAllUser() {
    await this.clickSelectAll();
    await this.allItemsSelectedCorrectly();
    await this.clickButton(BUTTONS.DELETE);
    await this.checkAllItemsDeleted();
  }

  async checkCreateUserForm() {
    await this.clickButton(BUTTONS.CREATE),
      await Promise.all([
        this.checkForm([
          this.emailInput,
          this.firstNameInput,
          this.lastNameInput,
        ]),
        this.checkButtonVisible(BUTTONS.SAVE),
        this.checkButtonDisabled(BUTTONS.SAVE),
      ]);
  }
  async createUser(userData) {
    await this.fillInputsForm(userData, {
      email: this.emailInput,
      firstName: this.firstNameInput,
      lastName: this.lastNameInput,
    });
    await this.clickButton(BUTTONS.SAVE);
  }
  async createUserWithIncorrectEmail(userData) {
    const incorrectData = { ...userData, email: 'qwerty' };
    await this.fillInputsForm(incorrectData, {
      email: this.emailInput,
      firstName: this.firstNameInput,
      lastName: this.lastNameInput,
    });
    await this.clickButton(BUTTONS.SAVE);
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
