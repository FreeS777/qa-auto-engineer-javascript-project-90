import { expect } from '@playwright/test';
import { Inputs } from '../components/Inputs';
import { BasePage } from './BasePage';
import { BUTTONS } from '../data/buttonSelectors';

export class CreateUserPage extends BasePage {
  constructor(page) {
    super(page);
    this.inputs = new Inputs(page);
    this.alert = this.page.getByText(
      'The form is not valid. Please check for errors',
    );
  }
  async checkCreateUserForm() {
    await this.clickButton(BUTTONS.CREATE);
    await expect(this.form).toBeVisible();
    await expect(this.inputs.emailInput).toBeVisible();
    await expect(this.inputs.firstNameInput).toBeVisible();
    await expect(this.inputs.lastNameInput).toBeVisible();
    await this.checkButtonVisible(BUTTONS.SAVE);
    await this.checkButtonDisabled(BUTTONS.SAVE);
  }
  async createUser(userRegData) {
    const { email, firstName, lastName } = userRegData;
    await this.inputs.fillEmail(email);
    await this.inputs.fillFirstName(firstName);
    await this.inputs.fillLastName(lastName);
    await this.clickButton(BUTTONS.SAVE);
  }
  async createUserWithIncorrectEmail(userRegData) {
    const { firstName, lastName } = userRegData;
    await this.inputs.fillEmail('qwerty');
    await this.inputs.fillFirstName(firstName);
    await this.inputs.fillLastName(lastName);
    await this.clickButton(BUTTONS.SAVE);
  }
  async checkInvalidFormAlert() {
    await expect(this.alert).toBeVisible();
  }
}
