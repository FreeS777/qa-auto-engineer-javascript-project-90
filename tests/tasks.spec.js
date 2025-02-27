import { test } from './fixture/main';
import { BUTTONS } from './data/buttonSelectors';

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
  test('drag and drop', async ({ app: { taskPage } }) => {
    await taskPage.dragAndDropCard();
  });
});
