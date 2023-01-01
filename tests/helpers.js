import { faker } from '@faker-js/faker';

export const generatePagination = (numberOfItems) => {
  const perPage = faker.datatype.number({ min: 1, max: numberOfItems });
  const isSameNumberOfItemsPerPage = numberOfItems % perPage === 0;
  const totalPages = isSameNumberOfItemsPerPage
    ? numberOfItems / perPage
    : parseInt(numberOfItems / perPage) + 1;
  const currentPage = faker.datatype.number({ min: 1, max: totalPages });

  return {
    current_page: currentPage,
    links: { next: faker.internet.url() },
    per_page: perPage,
    total: numberOfItems,
    last_page: totalPages,
  };
};
