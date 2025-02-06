import { test } from '@playwright/test';
import { userRegData } from './data/userRegData';

import UsersPage from './pages/UsersPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';

test.describe('Test users page', () => {
  let usersPage;
  let createUserPage;
  let editUserPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    usersPage = new UsersPage(page);
    createUserPage = new CreateUserPage(page);
    editUserPage = new EditUserPage(page);
    await usersPage.login();
    await usersPage.openUsersPage();
  });

  test('users list is visible and correct', async () => {
    await usersPage.checkUsersListIsVisible();
    await usersPage.checkAllEmailsAreVisible();
    await usersPage.checkAllFirstNamesAreVisible();
    await usersPage.checkAllLastNamesAreVisible();
  });

  test('Create user page is visible and correct', async () => {
    await createUserPage.clickCreateUserBtn();
    await createUserPage.checkCreateUserPageIsCorrect();
  });

  test('create user and check success', async () => {
    await createUserPage.clickCreateUserBtn();
    await createUserPage.createUser(userRegData);
    await createUserPage.clickSaveUserBtn();
    await usersPage.openUsersPage();
    await usersPage.checkUserCreatedSuccessfully(userRegData);
  });

  test('Edit user page is visible and correct', async () => {
    await editUserPage.clickEditUserBtn();
    await editUserPage.checkEditUserPageIsCorrect();
    await editUserPage.checkEditUserForm('john@google.com', 'John', 'Doe');
  });

  test('edit user and check success', async () => {
    await editUserPage.clickEditUserBtn();
    await editUserPage.editUser(userRegData);
    await usersPage.openUsersPage();
    await usersPage.checkUserUpdateSuccessfully(userRegData);
  });

  test('delete two user and check success', async () => {
    await usersPage.deleteTwoUsers();
    await usersPage.openUsersPage();
    await usersPage.verifyUserIsDeleted('john@google.com');
    await usersPage.verifyUserIsDeleted('emily@example.com');
  });

  test('delete all users and check success', async () => {
    await usersPage.deleteAllUsers();
    await usersPage.checkAllUsersDeleted();
  });

  test('delete one user and check success', async () => {
    await editUserPage.clickEditUserBtn();
    await usersPage.clickDeleteUser();
    await usersPage.openUsersPage();
    await usersPage.verifyUserIsDeleted('john@google.com');
  });
});
