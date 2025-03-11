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
  }

  get basePage() {
    return new BasePage(this.page);
  }

  get authPage() {
    return new AuthPage(this.page);
  }

  get usersPage() {
    return new UsersPage(this.page);
  }

  get statusesPage() {
    return new StatusesPage(this.page);
  }

  get labelsPage() {
    return new LabelsPage(this.page);
  }

  get taskPage() {
    return new TaskPage(this.page);
  }
}
