import { AuthPage } from './AuthPage';
import { UsersPage } from './UsersPage';
import { CreateUserPage } from './CreateUserPage';
import { EditUserPage } from './EditUserPage';
import { PageHolder } from './PageHolder';
import { BasePage } from './BasePage';
import { DataFormPage } from './DataFormPage';
import { BaseDataPage } from './BaseDataPage';

export class Application extends PageHolder {
  constructor(page) {
    super(page);
    this.basePage = new BasePage(page);
    this.authPage = new AuthPage(page);
    this.usersPage = new UsersPage(page);
    this.createUserPage = new CreateUserPage(page);
    this.editUserPage = new EditUserPage(page);
    this.dataFormPage = new DataFormPage(page);
    this.baseDataPage = new BaseDataPage(page);
  }
}
