import { AuthPage } from './AuthPage';
import { UsersPage } from './UsersPage';
import { PageHolder } from './PageHolder';
import { BasePage } from './BasePage';
import { StatusesPage } from './StatusesPage';
import { LabelsPage } from './LabelsPage';
import { TaskPage } from './TaskPage';

export class Application extends PageHolder {
  constructor(page) {
    super(page);
    this.basePage = new BasePage(page);
    this.authPage = new AuthPage(page);
    this.usersPage = new UsersPage(page);
    this.statusesPage = new StatusesPage(page);
    this.labelsPage = new LabelsPage(page);
    this.taskPage = new TaskPage(page);
  }
}
