import { test } from './fixture/main';
import { generateUserData } from './data/userRegData';
import { BUTTONS } from './data/buttonSelectors';

test.describe('Test users page', async () => {
  test.beforeEach(async ({ app: { basePage } }) => {
    await basePage.clickButton(BUTTONS.USERS);
  });

  test.describe('Displaying user data correctly', async () => {
    test('users list is visible', async ({ app: { usersPage } }) => {
      await usersPage.checkUsersListIsVisible();
    });

    test('Users data is displayed correctly', async ({
      app: { usersPage },
    }) => {
      await usersPage.checkUsersData();
    });
  });

  test.describe('Create user page', async () => {
    test('Check create user page display', async ({
      app: { createUserPage },
    }) => {
      await createUserPage.checkCreateUserForm();
    });
    test('Create new user correctly', async ({
      app: { createUserPage, usersPage, basePage },
    }) => {
      const userRegData = generateUserData();
      await basePage.clickButton(BUTTONS.CREATE);
      await createUserPage.createUser(userRegData);
      await basePage.clickButton(BUTTONS.USERS);
      await usersPage.checkUserCreatedSuccessfully(userRegData);
    });
    test('Create user with incorrect email and check alert', async ({
      app: { createUserPage, basePage },
    }) => {
      const userRegData = generateUserData();
      await basePage.clickButton(BUTTONS.CREATE);
      await createUserPage.createUserWithIncorrectEmail(userRegData);
      await createUserPage.checkInvalidFormAlert();
    });
  });

  test.describe('Edit user', async () => {
    test('Edit user page is visible and correct', async ({
      app: { editUserPage, baseDataPage, basePage },
    }) => {
      await baseDataPage.clickRow();
      await editUserPage.checkEditUserForm('john@google.com', 'John', 'Doe');
      await basePage.checkButtonVisible(BUTTONS.SAVE);
      await basePage.checkButtonDisabled(BUTTONS.SAVE);
      await basePage.checkButtonVisible(BUTTONS.DELETE);
      await basePage.checkButtonVisible(BUTTONS.SHOW);
    });

    test('edit user and check success', async ({
      app: { editUserPage, baseDataPage, basePage, usersPage },
    }) => {
      const userRegData = generateUserData();
      await baseDataPage.clickRow();
      await editUserPage.editUser(userRegData);
      await basePage.clickButton(BUTTONS.SAVE);
      await basePage.clickButton(BUTTONS.USERS);
      await usersPage.checkUserUpdateSuccessfully(userRegData);
    });
  });
  test.describe('Delete user', async () => {
    test('delete user and check success', async ({
      app: { baseDataPage, basePage, usersPage },
    }) => {
      await baseDataPage.clickRow();
      await basePage.clickButton(BUTTONS.DELETE);
      await basePage.clickButton(BUTTONS.USERS);
      await usersPage.verifyUserIsDeleted('john@google.com');
    });
    test('delete two user and check success', async ({
      app: { baseDataPage, basePage, usersPage },
    }) => {
      await baseDataPage.clickSelectUser(1);
      await baseDataPage.clickSelectUser(2);
      await basePage.clickButton(BUTTONS.DELETE);
      await usersPage.verifyUserIsDeleted('john@google.com');
      await usersPage.verifyUserIsDeleted('jack@yahoo.com');
    });
    test('delete all users and check success', async ({
      app: { baseDataPage, basePage, usersPage },
    }) => {
      await baseDataPage.clickSelectAll();
      await basePage.clickButton(BUTTONS.DELETE);
      await usersPage.checkAllUsersDeleted();
    });
  });
});
