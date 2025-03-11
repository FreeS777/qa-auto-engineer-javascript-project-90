import { expect } from '@playwright/test';
import { TaskCard } from '../components/TaskCard';
import { BasePage } from './BasePage';

export class TaskPage extends BasePage {
  constructor(page) {
    super(page);
    this.taskTitleInput = this.page.getByRole('textbox', { name: 'Title' });
    this.taskContentInput = this.page.getByRole('textbox', { name: 'Content' });
    this.taskTable = this.page.locator('.RaList-content');
    this.taskCard = this.page.locator('.MuiCard-root');
    this.filters = this.page.locator('.filter-filed');
    this.titles = this.page.locator('.RaList-content h6');
    this.taskCells = this.page.locator('.MuiBox-root.css-1xphtog');
    this.elements = this.page.locator('[data-rfd-draggable-id]');
    this.clearValue = this.page.locator('[aria-label="Clear value"]');
    this.options = this.page.locator('ul[role="listbox"] li[role="option"]');
  }

  get exportButton() {
    return this.page.getByRole('button', { name: 'Export' });
  }

  get tasksMenuItem() {
    return this.page.getByRole('menuitem', { name: 'Tasks' });
  }

  async getVisibleTasks() {
    const cards = await this.taskCard.all();
    const tasks = await Promise.all(
      cards.map(async (card) => {
        const taskCard = new TaskCard(card);
        const desc = await taskCard.getDescription();
        const title = await taskCard.getTitle();
        return { title, desc };
      }),
    );
    return tasks;
  }

  async fillSelectOption({ label, value }) {
    await this.page.getByLabel(label).click();

    if (!value) {
      await this.clearValue.click();
    } else {
      const options = this.options;
      const values = Array.isArray(value) ? value : [value];

      for (const item of values) {
        const option = options.locator(`text=${item}`);
        await option.click();
      }
    }

    await this.page.keyboard.press('Escape');
  }

  async addFilters(data) {
    await this.fillSelectOption({ label: 'Assignee', value: data.assignee });
    await this.fillSelectOption({ label: 'Status', value: data.status });
    await this.fillSelectOption({ label: 'Label', value: data.label });
  }

  async createTask(
    taskInputsData,
    assigneeOptions,
    statusOptions,
    labelOptions,
  ) {
    await this.fillSelectOption(assigneeOptions);
    await this.fillInputsForm(taskInputsData, {
      title: this.taskTitleInput,
      content: this.taskContentInput,
    });
    await this.fillSelectOption(statusOptions);
    await this.fillSelectOption(labelOptions);
    await this.saveButton.click();
  }

  async checkCreateTask(
    taskInputsData,
    assigneeOptions,
    statusOptions,
    labelOptions,
  ) {
    await this.createButton.click();
    await this.createTask(
      taskInputsData,
      assigneeOptions,
      statusOptions,
      labelOptions,
    );
    await this.tasksMenuItem.click();
    await this.checkTaskCreatedSuccess(
      taskInputsData.title,
      taskInputsData.content,
    );
    await this.checkTaskInColumn(taskInputsData.title, taskInputsData.content);
  }

  async checkTaskCreatedSuccess(title, content) {
    const taskTitle = this.page.getByText(title, { exact: true });
    const taskContent = this.page.getByText(content, { exact: true });
    await expect(taskTitle).toBeVisible();
    await expect(taskContent).toBeVisible();
  }

  async checkTasksPage() {
    await Promise.all([
      this.checkTasksData(),
      this.checkTasksTitles(),
      this.checkTasksFilters(),
      this.checkButtonVisible(this.createButton),
      this.checkButtonVisible(this.exportButton),
    ]);
  }
  async checkTasksFilters() {
    const filters = await this.filters.all();
    for (const filter of filters) {
      await expect(filter).toBeVisible();
    }
  }

  async getColumnData(locator) {
    return await locator.allTextContents();
  }

  async checkTasksTitles() {
    await this.statusesMenuItem.click();
    const titles = await this.getColumnData(this.nameCell);
    await this.tasksMenuItem.click();
    const taskTitles = await this.titles.all();
    for (const task of taskTitles) {
      await expect(task).toBeVisible();
    }
    expect(await this.titles.allTextContents()).toEqual(titles);
  }

  async checkTasksData() {
    await expect(this.taskTable).toBeVisible();
    const tasks = await this.elements.all();
    for (const task of tasks) {
      await expect(task).toBeVisible();
    }
  }

  async checkEditTask(taskName, taskInputs, assignee, status, label) {
    await this.clickEditTask(taskName);
    await this.fillSelectOption({ label: 'Assignee', value: assignee });
    await this.fillInputsForm(taskInputs, {
      title: this.taskTitleInput,
      content: this.taskContentInput,
    });
    await this.fillSelectOption({ label: 'Status', value: status });
    await this.fillSelectOption({ label: 'Label', value: label });
    await this.saveButton.click();
    await this.tasksMenuItem.click();
    await this.checkTaskInColumn(taskInputs.title, taskInputs.status);
  }

  async checkTaskInColumn(taskName, status) {
    const column = this.taskCells.filter({ hasText: status });
    const taskCell = column.filter({ hasText: taskName });
    await expect(taskCell).toBeVisible();
  }

  async checkDeleteTask(taskTitle) {
    const task = this.taskTable.filter({ hasText: taskTitle });
    await expect(task).toBeVisible();
    await this.clickEditTask(taskTitle);
    await this.deleteButton.click();
    await expect(task).not.toBeVisible();
  }

  async checkTasksFiltered(filtersData, resultData) {
    await this.addFilters(filtersData);
    const tasks = await this.getVisibleTasks();
    expect(tasks.length).toBe(resultData.length);
    expect(tasks).toEqual(resultData);
  }

  async dragAndDropCard(taskId = 1, columnId = 1) {
    const draggable = this.page.locator(`[data-rfd-draggable-id="${taskId}"]`);
    const droppable = this.page.locator(
      `[data-rfd-droppable-id="${columnId}"]`,
    );
    const task = await draggable.boundingBox();
    const target = await droppable.boundingBox();

    await this.page.mouse.move(
      task.x + task.width / 2,
      task.y + task.height / 2,
    );
    await this.page.mouse.down();

    await this.page.mouse.move(
      target.x + target.width / 2,
      target.y + target.height / 2,
      { steps: 15 },
    );
    await this.page.mouse.up();

    await expect(
      droppable.locator(`[data-rfd-draggable-id="${taskId}"]`),
    ).toBeVisible();
  }

  async clickEditTask(taskTitle) {
    const task = this.taskCard.filter({ hasText: `${taskTitle}` });
    const editButton = task.getByRole('link', { name: 'Edit' });
    await editButton.click();
  }

  async clickShowTask(taskTitle) {
    const task = this.taskCard.filter({ hasText: `${taskTitle}` });
    const showButton = task.getByRole('link', { name: 'Show' });
    await showButton.click();
  }
}
