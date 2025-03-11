import { test } from './fixture/main';
import { generateTaskInputs } from './data/generateTaskData';

test.describe('Test tasks page', async () => {
  test.beforeEach(async ({ app: { taskPage } }) => {
    await taskPage.tasksMenuItem.click();
  });

  test('Check tasks page is visible', async ({ app: { taskPage } }) => {
    await taskPage.checkTasksPage();
  });

  test('Check create new task', async ({ app: { taskPage } }) => {
    const taskInputsData = generateTaskInputs();
    const assigneeOptions = {
      label: 'Assignee',
      value: 'alice@hotmail.com',
    };
    const statusOptions = {
      label: 'Status',
      value: 'To Publish',
    };
    const labelOptions = {
      label: 'Label',
      value: ['critical', 'task'],
    };
    await taskPage.checkCreateTask(
      taskInputsData,
      assigneeOptions,
      statusOptions,
      labelOptions,
    );
  });

  test('Check edit task', async ({ app: { taskPage } }) => {
    const assignee = 'sarah@example.com';
    const status = 'To Be Fixed';
    const label = ['bug', 'task'];
    const taskInputs = generateTaskInputs();
    await taskPage.checkEditTask(
      'Task 11',
      taskInputs,
      assignee,
      status,
      label,
    );
  });

  test('Check delete task', async ({ app: { taskPage } }) => {
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

  test('Check drag and drop', async ({ app: { taskPage } }) => {
    await taskPage.dragAndDropCard();
  });
});
