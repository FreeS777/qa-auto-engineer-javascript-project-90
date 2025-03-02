import { BaseDataPage } from './BaseDataPage';
export class BaseTasksPage extends BaseDataPage {
  constructor(page) {
    super(page);
    this.taskTable = this.page.locator('.RaList-content');
    this.taskCards = this.page.locator('MuiBox-root.css-k008qs');
    this.filtres = this.page.locator('.filter-filed');
    this.titles = this.page.locator('.RaList-content h6');
    this.taskCells = this.page.locator('.MuiBox-root.css-1xphtog');
    this.elements = this.page.locator('[data-rfd-draggable-id]');

    this.taskAssigneeInput = this.page.getByLabel('Assignee');
  }

  async fillSelectOption(label, value) {
    await this.page.getByLabel(label).click();

    if (value === '') {
      await this.page.locator('[aria-label="Clear value"]').click();
    } else {
      const options = this.page.locator('ul[role="listbox"] li[role="option"]');
      const values = Array.isArray(value) ? value : [value];

      for (const item of values) {
        const option = options.locator(`text=${item}`);
        await option.click();
      }
    }

    await this.page.keyboard.press('Escape');
  }

  async clickEditTask(taskTitle) {
    const task = this.page
      .locator('.MuiCard-root')
      .filter({ hasText: `${taskTitle}` });
    const editButton = task.getByRole('link', { name: 'Edit' });
    await editButton.click();
  }

  async clickShowTask(taskTitle) {
    const task = this.page
      .locator('.MuiCard-root')
      .filter({ hasText: `${taskTitle}` });
    const showButton = task.getByRole('link', { name: 'Show' });
    await showButton.click();
  }
}
