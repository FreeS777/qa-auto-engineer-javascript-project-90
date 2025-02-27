import { test } from './fixture/main';
import { BUTTONS } from './data/buttonSelectors';

test.describe('Test users page', async () => {
  test.beforeEach(async ({ app: { basePage } }) => {
    await basePage.clickButton(BUTTONS.USERS);
  });

  test('Users data is displayed correctly', async ({ app: { usersPage } }) => {
    await usersPage.checkUsersData();
  });

  test.describe('Create user page', async () => {
    test('Check create new user page', async ({ app: { usersPage } }) => {
      await usersPage.checkCreateUserForm();
    });
    test('Check create new user', async ({ app: { usersPage } }) => {
      await usersPage.checkCreateUser();
    });
    test('Check create new user with incorrect mail', async ({
      app: { usersPage },
    }) => {
      await usersPage.checkCreateUserWithIncorrectEmail();
    });
  });

  test.describe('Check edit user page', async () => {
    test('Check edit user page is correct', async ({ app: { usersPage } }) => {
      await usersPage.checkEditUserPage();
    });
    test('Check update user data is correct', async ({
      app: { usersPage },
    }) => {
      await usersPage.checkUpdateUserData();
    });
  });

  test.describe('Check delete users', async () => {
    test('Delete user is correct', async ({ app: { usersPage } }) => {
      await usersPage.checkDeleteUser();
    });
    test('Check delete all users is correct', async ({
      app: { usersPage },
    }) => {
      await usersPage.checkDeleteAllUser();
    });
  });
});
