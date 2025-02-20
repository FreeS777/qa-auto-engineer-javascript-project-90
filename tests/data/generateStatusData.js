import { faker } from '@faker-js/faker';

export const generateStatusData = () => ({
  name: faker.word.words(),
  slug: faker.lorem.slug(2),
});
