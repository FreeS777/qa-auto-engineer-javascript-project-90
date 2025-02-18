import { BasePage } from './BasePage';
import { expect } from '@playwright/test';
export class AuthPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginForm = this.page.locator('.RaLogin-card');
    this.LoginFormUserName = this.page.getByRole('textbox', {
      name: 'userName',
    });
    this.LoginFormPassword = this.page.getByRole('textbox', {
      name: 'password',
    });
    this.signInBtn = this.page.getByRole('button', { name: 'Sign in' });
    this.welcome = this.page.getByRole('heading', {
      name: 'Welcome to the administration',
    });
    this.url = 'http://localhost:5173';
  }
  async checkLoginFormVisible() {
    await expect(this.loginForm).toBeVisible();
  }
  async checkLoginUserNameVisible() {
    await expect(this.LoginFormUserName).toBeVisible();
  }
  async checkLoginPasswordVisible() {
    await expect(this.LoginFormPassword).toBeVisible();
  }
  async checkSignInBtnVisible() {
    await expect(this.signInBtn).toBeVisible();
  }
  async logIn() {
    await this.LoginFormUserName.fill('TestUser');
    await this.LoginFormPassword.fill('12345');
    await this.signInBtn.click();
  }
  async open() {
    await this.page.goto(this.url);
  }
  async checkUrl() {
    await expect(this.page).toHaveURL('/#/');
  }
  async checkWelcomeText() {
    await expect(this.welcome).toBeVisible();
  }
  async checkAdminName() {
    await expect(this.page.getByText('Jane Doe')).toBeVisible();
  }
  async isLoggedIn() {
    await this.checkUrl();
    await this.checkWelcomeText();
    await this.checkAdminName();
  }
}
