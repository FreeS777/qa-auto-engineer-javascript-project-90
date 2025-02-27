import { faker } from '@faker-js/faker';

export const generateTaskData = () => ({
  title: faker.word.words(1),
  content: faker.lorem.words(3),
});
