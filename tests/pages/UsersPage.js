import { expect } from '@playwright/test';
import { BUTTONS } from '../data/buttonSelectors';
import { BaseDataPage } from './BaseDataPage';

export class UsersPage extends BaseDataPage {
  constructor(page) {
    super(page);
  }

  async checkCreateUserForm() {
    await this.checkForm([
      this.emailInput,
      this.firstNameInput,
      this.lastNameInput,
    ]);
    await this.checkButtonVisible(BUTTONS.SAVE);
    await this.checkButtonDisabled(BUTTONS.SAVE);
  }
  async createUser(userRegData) {
    await this.fillForm(userRegData, [
      this.emailInput,
      this.firstNameInput,
      this.lastNameInput,
    ]);
  }
  async createUserWithIncorrectEmail(userRegData) {
    const incorrectData = { ...userRegData, email: 'qwerty' };
    await this.fillForm(incorrectData, [
      this.emailInput,
      this.firstNameInput,
      this.lastNameInput,
    ]);
    await expect(this.alert).toBeVisible();
  }

  async checkUsersData() {
    await this.checkTableIsVisible();
    await this.checkDataCellsVisibility(this.emailCell);
    await this.checkDataCellsVisibility(this.firstNameCell);
    await this.checkDataCellsVisibility(this.lastNameCell);
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
