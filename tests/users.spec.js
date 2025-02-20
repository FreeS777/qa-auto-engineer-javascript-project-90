import { test } from './fixture/main';
import { generateUserData } from './data/generateUserData';
import { BUTTONS } from './data/buttonSelectors';

test.describe('Test users page', async () => {
  test.beforeEach(async ({ app: { basePage } }) => {
    await basePage.clickButton(BUTTONS.USERS);
  });

  test('Users data is displayed correctly', async ({ app: { usersPage } }) => {
    await usersPage.checkUsersData();
  });

  test.describe('Create user page', async () => {
    test('Check create user page display', async ({
      app: { usersPage, basePage },
    }) => {
      await basePage.clickButton(BUTTONS.CREATE);
      await usersPage.checkCreateUserForm();
    });
    test('Create new user correctly', async ({
      app: { usersPage, basePage },
    }) => {
      const userRegData = generateUserData();
      await basePage.clickButton(BUTTONS.CREATE);
      await usersPage.createUser(userRegData);
      await basePage.clickButton(BUTTONS.USERS);
      await usersPage.checkUserCreatedSuccessfully(userRegData);
    });
    test('Create user with incorrect email and check alert', async ({
      app: { usersPage, basePage },
    }) => {
      const userRegData = generateUserData();
      await basePage.clickButton(BUTTONS.CREATE);
      await usersPage.createUserWithIncorrectEmail(userRegData);
    });
  });

  test.describe('Edit user', async () => {
    test('Edit user page is visible and correct', async ({
      app: { usersPage, baseDataPage, basePage },
    }) => {
      await baseDataPage.clickRow();
      await usersPage.checkEditUserForm();
      await basePage.checkButtonVisible(BUTTONS.SAVE);
      await basePage.checkButtonDisabled(BUTTONS.SAVE);
      await basePage.checkButtonVisible(BUTTONS.DELETE);
      await basePage.checkButtonVisible(BUTTONS.SHOW);
    });

    test('Update user data and check success', async ({
      app: { baseDataPage, basePage, usersPage },
    }) => {
      const userRegData = generateUserData();
      await baseDataPage.clickRow(2);
      await usersPage.createUser(userRegData);
      await basePage.clickButton(BUTTONS.USERS);
      await usersPage.checkUserUpdateSuccessfully(2, userRegData);
    });
  });
  test.describe('Delete user', async () => {
    test('delete user and check success', async ({
      app: { baseDataPage, basePage, usersPage },
    }) => {
      await baseDataPage.clickRow();
      await basePage.clickButton(BUTTONS.DELETE);
      await basePage.clickButton(BUTTONS.USERS);
      await usersPage.verifyUserIsDeleted(['john@google.com', 'John', 'Doe']);
    });

    test('delete all users and check success', async ({
      app: { baseDataPage, basePage },
    }) => {
      await baseDataPage.clickSelectAll();
      await baseDataPage.allItemsSelectedCorrectly();
      await basePage.clickButton(BUTTONS.DELETE);
      await baseDataPage.checkAllItemsDeleted();
    });
  });
});
