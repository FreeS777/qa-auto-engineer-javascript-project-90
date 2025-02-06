export default class BasePage {
  constructor(page) {
    this.page = page;
    this.usernameInput = this.page.getByRole('textbox', { name: 'username' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'password' });
    this.usersBtn = this.page.getByRole('menuitem', { name: 'Users' });

    this.createUserBtn = this.page.getByRole('link', { name: 'Create' });
    this.saveUserBtn = this.page.getByRole('button', { name: 'Save' });
    this.deleteUserBtn = this.page.getByRole('button', { name: 'Delete' });
    this.emailInput = this.page.locator('[name="email"]');
    this.firstNameInput = this.page.locator('[name="firstName"]');
    this.lastNameInput = this.page.locator('[name="lastName"]');

    this.allCheckboxes = this.page.getByLabel('Select All');
    this.rowCheckBox = this.page.getByLabel('Select this row');
    this.rows = this.page.locator('tbody tr');
    this.signinBtn = this.page.getByRole('button', { name: /Sign in/i });
  }
  async openUsersPage() {
    await this.usersBtn.click();
  }
  async clickAllCheckBox() {
    await this.allCheckboxes.click();
  }

  async clickDeleteUser() {
    await this.deleteUserBtn.click();
  }
}
