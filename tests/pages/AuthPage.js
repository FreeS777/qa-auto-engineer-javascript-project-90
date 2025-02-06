import BasePage from './BasePage';

export default class AuthPage extends BasePage {
  constructor(page) {
    super(page);
  }
  async login() {
    await this.usernameInput.fill('TestUser');
    await this.passwordInput.fill('12345');
    await this.signinBtn.click();
  }
}
