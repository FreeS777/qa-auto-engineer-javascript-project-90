import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Inputs } from '../components/Inputs';

export class EditUserPage extends BasePage {
  constructor(page) {
    super(page);
    this.inputs = new Inputs(page);
  }
  // async checkUserEditFormIsVisible() {
  //   await expect(this.emailInput).toBeVisible();
  //   await expect(this.firstNameInput).toBeVisible();
  //   await expect(this.lastNameInput).toBeVisible();
  //   await expect(this.saveUserBtn).toBeVisible();
  //   await expect(this.deleteUserBtn).toBeVisible();
  // }
  async editUser(userRegData) {
    const { email, firstName, lastName } = userRegData;
    await this.inputs.emailInput.fill(email);
    await this.inputs.firstNameInput.fill(firstName);
    await this.inputs.lastNameInput.fill(lastName);
  }
  async checkEditUserForm(email, firstName, lastName) {
    expect(await this.inputs.emailInput.getAttribute('value')).toContain(email);
    expect(await this.inputs.firstNameInput.getAttribute('value')).toContain(
      firstName,
    );
    expect(await this.inputs.lastNameInput.getAttribute('value')).toContain(
      lastName,
    );
  }
}
