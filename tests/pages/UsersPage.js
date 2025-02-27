import { expect } from '@playwright/test';
import { BUTTONS } from '../data/buttonSelectors';
import { BaseDataPage } from './BaseDataPage';
import { generateUserData } from '../data/generateUserData';

export class UsersPage extends BaseDataPage {
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

  async checkCreateUser() {
    const userRegData = generateUserData();
    await this.clickButton(BUTTONS.CREATE);
    await this.createUser(userRegData);
    await this.clickButton(BUTTONS.USERS);
    await this.checkUserCreatedSuccessfully(userRegData);
  }

  async checkCreateUserWithIncorrectEmail() {
    const userRegData = generateUserData();
    await this.clickButton(BUTTONS.CREATE);
    await this.createUserWithIncorrectEmail(userRegData);
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

  async checkUpdateUserData() {
    const userRegData = generateUserData();
    await this.clickButton(BUTTONS.USERS);
    await this.clickRow(2);
    await this.createUser(userRegData);
    await this.clickButton(BUTTONS.USERS);
    await this.checkUserUpdateSuccessfully(2, userRegData);
  }

  async checkDeleteUser() {
    await this.clickRow();
    await this.clickButton(BUTTONS.DELETE);
    await this.clickButton(BUTTONS.USERS);
    await this.verifyUserIsDeleted(['john@google.com', 'John', 'Doe']);
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
  async createUser(userRegData) {
    await this.fillForm(userRegData, [
      this.emailInput,
      this.firstNameInput,
      this.lastNameInput,
    ]);
    await this.clickButton(BUTTONS.SAVE);
  }
  async createUserWithIncorrectEmail(userRegData) {
    const incorrectData = { ...userRegData, email: 'qwerty' };
    await this.fillForm(incorrectData, [
      this.emailInput,
      this.firstNameInput,
      this.lastNameInput,
    ]);
    await this.clickButton(BUTTONS.SAVE);
    await expect(this.alert).toBeVisible();
  }

  async checkUserCreatedSuccessfully(userRegData) {
    await this.checkItemCreatedSuccessfully(userRegData, {
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

  async checkUserUpdateSuccessfully(id, userRegData) {
    await this.checkItemUpdateSuccessfully(id, userRegData, {
      email: this.emailCell,
      firstName: this.firstNameCell,
      lastName: this.lastNameCell,
    });
  }

  async verifyUserIsDeleted(userData) {
    await this.verifyItemIsDeleted(userData, {
      email: this.emailCell,
      firstName: this.firstNameCell,
      lastName: this.lastNameCell,
    });
  }
}
