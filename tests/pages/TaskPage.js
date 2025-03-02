import { BaseTasksPage } from './BaseTasksPage';
import { BUTTONS } from '../data/buttonSelectors';
import { generateTaskData } from '../data/generateTaskData';
import { expect } from '@playwright/test';
import { TaskCard } from '../components/TaskCard';

export class TaskPage extends BaseTasksPage {
  constructor(page) {
    super(page);
    this.taskAssigneeSelect = this.page.getByLabel('Assignee');
    this.taskTitleInput = this.page.getByRole('textbox', { name: 'Title' });
    this.taskContentInput = this.page.getByRole('textbox', { name: 'Content' });
    this.taskStatusSelect = this.page.getByRole('textbox', { name: 'Status' });
    this.taskLabelSelect = this.page.getByRole('textbox', { name: 'Label' });
  }

  async getVisibleTasks() {
    const cards = await this.page.locator('.MuiCard-root').all();
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

  async addFilters(data) {
    await this.fillSelectOption('Assignee', data.assignee);
    await this.fillSelectOption('Status', data.status);
    await this.fillSelectOption('Label', data.label);
  }

  async createTask(taskData) {
    await this.fillSelectOption('Assignee', 'alice@hotmail.com');
    await this.fillForm(taskData, [this.taskTitleInput, this.taskContentInput]);
    await this.fillSelectOption('Status', 'To Publish');
    await this.fillSelectOption('Label', ['critical', 'task']);

    await this.clickButton(BUTTONS.SAVE);
  }

  async checkCreateTask() {
    await this.clickButton(BUTTONS.CREATE);
    const taskData = generateTaskData();
    await this.createTask(taskData);
    await this.clickButton(BUTTONS.TASKS);
    const { title, content } = taskData;
    await this.checkTaskCreatedSuccess(title, content);
    await this.checkTaskInColumn(taskData.title, taskData.content);
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
      this.checkButtonVisible(BUTTONS.CREATE),
      this.checkButtonVisible(BUTTONS.EXPORT),
    ]);
  }
  async checkTasksFilters() {
    const filters = await this.filtres.all();
    for (const filter of filters) {
      await expect(filter).toBeVisible();
    }
  }

  async checkTasksTitles() {
    await this.clickButton(BUTTONS.STATUSES);
    const titles = await this.getNames();
    await this.clickButton(BUTTONS.TASKS);
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

  async checkEditTask(taskName, assignee, status, label) {
    await this.clickEditTask(taskName);
    await this.fillSelectOption('Assignee', assignee);
    const taskData = generateTaskData();
    await this.fillForm(taskData, [this.taskTitleInput, this.taskContentInput]);
    await this.fillSelectOption('Status', status);
    await this.fillSelectOption('Label', label);

    await this.clickButton(BUTTONS.SAVE);
    await this.clickButton(BUTTONS.TASKS);
    await this.checkTaskInColumn(taskData.title, taskData.status);
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
    await this.clickButton(BUTTONS.DELETE);
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
}
