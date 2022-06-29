import { faker } from '@faker-js/faker';

export const generatePagination = (numberOfItems) => {
  const perPage = faker.datatype.number({ min: 1, max: numberOfItems });
  const isSameNumberOfItemsPerPage = numberOfItems % perPage === 0;
  const totalPages = isSameNumberOfItemsPerPage
    ? numberOfItems / perPage
    : parseInt(numberOfItems / perPage) + 1;
  const currentPage = faker.datatype.number({ min: 1, max: totalPages });
  const isLastPage = currentPage === totalPages;
  const lastPageCount = isSameNumberOfItemsPerPage
    ? perPage
    : parseInt(numberOfItems % perPage);
  const count = isLastPage ? lastPageCount : perPage;

  return {
    count: count,
    current_page: currentPage,
    links: { next: faker.internet.url() },
    per_page: perPage,
    total: numberOfItems,
    total_pages: totalPages,
  };
};
