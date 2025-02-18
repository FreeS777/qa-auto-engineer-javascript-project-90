export class Inputs {
  constructor(page) {
    this.page = page;
    this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
    this.firstNameInput = this.page.getByRole('textbox', {
      name: 'First name',
    });
    this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name' });
  }
  async fillEmail(email) {
    await this.emailInput.fill(email);
  }
  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }
  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }
}
