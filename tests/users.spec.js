import { test } from './fixture/main';
import { generateUserData } from './data/generateUserData';

test.describe('Test users page', async () => {
  test.beforeEach(async ({ app: { usersPage } }) => {
    await usersPage.usersMenuButton.click();
  });

  test('Users data is displayed correctly', async ({ app: { usersPage } }) => {
    await usersPage.checkUsersData();
  });

  test.describe('Create user page', async () => {
    test('Check create new user page', async ({ app: { usersPage } }) => {
      await usersPage.checkCreateUserForm();
    });
    test('Check create new user', async ({ app: { usersPage } }) => {
      const userData = generateUserData();
      await usersPage.checkCreateUser(userData);
    });
    test('Check create new user with incorrect mail', async ({
      app: { usersPage },
    }) => {
      const userData = generateUserData();
      await usersPage.checkCreateUserWithIncorrectEmail(userData);
    });
  });

  test.describe('Check edit user page', async () => {
    test('Check edit user page is correct', async ({ app: { usersPage } }) => {
      await usersPage.checkEditUserPage();
    });
    test('Check update user data is correct', async ({
      app: { usersPage },
    }) => {
      const rowId = 2;
      const userData = generateUserData();
      await usersPage.checkUpdateUserData(rowId, userData);
    });
  });

  test.describe('Check delete users', async () => {
    test('Delete user is correct', async ({ app: { usersPage } }) => {
      const userData = ['john@google.com', 'John', 'Doe'];
      await usersPage.checkDeleteUser(userData);
    });
    test('Check delete all users is correct', async ({
      app: { usersPage },
    }) => {
      await usersPage.checkDeleteAllUser();
    });
  });
});
