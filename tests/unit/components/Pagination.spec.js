import { DEFAULT_NUMBERED_PAGE_BUTTONS } from '@/constants/pagination';
import { faker } from '@faker-js/faker';
import { generatePagination } from '../../helpers';
import { mount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';

describe('Pagination.vue', () => {
  it('renders properly', () => {
    // ARRANGE
    const pagination = generatePagination(
      faker.datatype.number({ min: 1, max: 15 })
    );
    const maxNumberOfLinksBeforeCurrentPage = faker.datatype.number({
      max: 2,
    });
    const wrapper = mount(Pagination, {
      props: {
        pagination,
        maxNumberOfLinksBeforeCurrentPage,
      },
    });
    const maxVisiblePageButtons =
      maxNumberOfLinksBeforeCurrentPage <= 1
        ? DEFAULT_NUMBERED_PAGE_BUTTONS
        : maxNumberOfLinksBeforeCurrentPage * 2;
    const pagesButtonsLength =
      pagination.total_pages > maxVisiblePageButtons
        ? maxVisiblePageButtons
        : pagination.total_pages;

    // ACT
    const firstButton = wrapper.find('button[aria-label="First"]');
    const previousButton = wrapper.find('button[aria-label="Previous"]');
    const nexButton = wrapper.find('button[aria-label="Next"]');
    const lastButton = wrapper.find('button[aria-label="Last"]');
    const pagesButtons = wrapper
      .findAll('.page-link')
      .filter((pageButton) => Number.isInteger(Number(pageButton.text())));

    // ASSERT
    expect(firstButton.exists()).toBe(true);
    expect(previousButton.exists()).toBe(true);
    expect(nexButton.exists()).toBe(true);
    expect(lastButton.exists()).toBe(true);
    expect(pagesButtons.length).toBe(pagesButtonsLength);
  });

  it('emits the event onLinkClicked', async () => {
    // ARRANGE
    const pagination = generatePagination(
      faker.datatype.number({ min: 1, max: 15 })
    );
    const wrapper = mount(Pagination, {
      props: {
        pagination,
      },
    });
    const firstPage = 1;
    const previousPage =
      pagination.current_page > 1 ? pagination.current_page - 1 : firstPage;
    const lastPage = pagination.total_pages;
    const nextPage =
      pagination.current_page < lastPage
        ? pagination.current_page + 1
        : lastPage;

    // ACT
    const firstButton = wrapper.get('button[aria-label="First"]');
    const previousButton = wrapper.get('button[aria-label="Previous"]');
    const nextButton = wrapper.get('button[aria-label="Next"]');
    const lastButton = wrapper.get('button[aria-label="Last"]');
    const pagesButtons = wrapper
      .findAll('.page-link')
      .filter((pageButton) => Number.isInteger(Number(pageButton.text())));
    await firstButton.trigger('click');
    await previousButton.trigger('click');
    await nextButton.trigger('click');
    await lastButton.trigger('click');

    // ASSERT
    expect(wrapper.emitted().onLinkClicked[0][0]).toBe(firstPage);
    expect(wrapper.emitted().onLinkClicked[1][0]).toBe(previousPage);
    expect(wrapper.emitted().onLinkClicked[2][0]).toBe(nextPage);
    expect(wrapper.emitted().onLinkClicked[3][0]).toBe(lastPage);

    for (let i = 4; i < pagesButtons.length; i++) {
      await pagesButtons[i].trigger('click');
      expect(wrapper.emitted().onLinkClicked[i][0]).toBe(
        pagesButtons[i].text()
      );
    }
  });
});
