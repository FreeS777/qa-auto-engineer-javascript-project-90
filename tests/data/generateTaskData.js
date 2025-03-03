import { faker } from '@faker-js/faker';

export const generateTaskInputs = () => ({
  title: faker.word.words(1),
  content: faker.lorem.words(3),
});
