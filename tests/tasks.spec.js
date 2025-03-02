import { test } from './fixture/main';
import { BUTTONS } from './data/buttonSelectors';
import { expect } from '@playwright/test';

test.describe('Test tasks page', async () => {
  test.beforeEach(async ({ app: { basePage } }) => {
    await basePage.clickButton(BUTTONS.TASKS);
  });

  test('Tasks page is visible', async ({ app: { taskPage } }) => {
    await taskPage.checkTasksPage();
  });

  test('Create new task', async ({ app: { taskPage } }) => {
    await taskPage.checkCreateTask();
  });

  test('Edit task', async ({ app: { taskPage } }) => {
    const assignee = 'sarah@example.com';
    const status = 'To Be Fixed';
    const label = ['bug', 'task'];
    await taskPage.checkEditTask('Task 11', assignee, status, label);
  });

  test('Delete task', async ({ app: { taskPage } }) => {
    await taskPage.checkDeleteTask('Task 4');
  });

  test('check filters', async ({ app: { taskPage } }) => {
    const filtersData = {
      assignee: 'alice@hotmail.com',
      status: '',
      label: '',
    };
    const resultData = [
      {
        title: 'Task 8',
        desc: 'Description of task 8',
      },
      {
        title: 'Task 9',
        desc: 'Description of task 9',
      },
    ];
    await taskPage.checkTasksFiltered(filtersData, resultData);
  });

  test('drag and drop', async ({ app: { taskPage } }) => {
    await taskPage.dragAndDropCard();
  });
});
