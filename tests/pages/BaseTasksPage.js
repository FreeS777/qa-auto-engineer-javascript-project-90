import { BaseDataPage } from './BaseDataPage';
import { expect } from '@playwright/test';
import { BUTTONS } from '../data/buttonSelectors';

export class BaseTasksPage extends BaseDataPage {
  constructor(page) {
    super(page);
    this.taskTable = this.page.locator('.RaList-content');
    this.filtres = this.page.locator('.filter-filed');
    this.titles = this.page.locator('.RaList-content h6');
    this.taskCells = this.page.locator('.MuiBox-root.css-1xphtog');
    this.elements = this.page.locator('[data-rfd-draggable-id]');

    this.taskAssigneeInput = this.page.getByLabel('Assignee');
  }

  async fillSelectOption(label, value) {
    await this.page.getByLabel(label).click();
    const options = this.page.locator('ul[role="listbox"] li[role="option"]');

    if (Array.isArray(value)) {
      for (const item of value) {
        const option = options.locator(`text=${item}`);
        await option.click();
      }
    } else {
      const option = options.locator(`text=${value}`);
      await option.click();
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
}
