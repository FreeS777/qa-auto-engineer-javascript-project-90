import { faker } from '@faker-js/faker';

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = this.page.getByRole('textbox', { name: 'username' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'password' });
    this.loginButton = this.page.getByRole('button', { name: /Sign in/i });
  }
  async login() {
    const username = faker.internet.username();
    const password = faker.internet.password();

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
