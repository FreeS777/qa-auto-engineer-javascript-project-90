import { faker } from '@faker-js/faker';

export const generateUserData = () => ({
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
});
