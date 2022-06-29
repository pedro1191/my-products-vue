import { createStore } from 'vuex';
import { faker } from '@faker-js/faker';
import { flushPromises, mount } from '@vue/test-utils';
import axios from '@/axios-default';
import Start from '@/components/Product/Start.vue';

const createVuexStore = () => {
  return createStore({
    state() {
      return {
        thingsLoading: 0,
      };
    },
    mutations: {
      setLoading(state, isLoading) {
        isLoading ? state.thingsLoading++ : state.thingsLoading--;
      },
    },
    actions: {
      setLoading({ commit }) {
        commit('setLoading');
      },
    },
  });
};

describe('Start.vue', () => {
  let mockProductList;

  beforeEach(() => {
    jest.clearAllMocks();
    const generatePagination = (numberOfItems) => {
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
    const numberOfItems = faker.datatype.number({ min: 1, max: 15 });
    const products = [];
    for (let i = 0; i < numberOfItems; i++) {
      products.push({
        id: faker.datatype.number(),
        name: faker.lorem.words(),
        description: faker.lorem.sentence(),
        image: faker.image.dataUri(),
        category: {
          data: { name: faker.name.findName() },
        },
      });
    }
    mockProductList = {
      data: {
        data: products,
        meta: { pagination: generatePagination(numberOfItems) },
      },
    };
  });

  it('renders properly', async () => {
    // ARRANGE
    const store = createVuexStore();
    jest.spyOn(axios, 'get').mockResolvedValue(mockProductList);
    const categoryId = faker.datatype.number();
    const wrapper = mount(Start, {
      global: {
        mocks: {
          $route: {
            query: {
              category: categoryId,
            },
          },
        },
        plugins: [store],
        stubs: ['RouterLink'],
      },
    });
    const shouldShowPagination =
      mockProductList.data.meta.pagination.total_pages > 1;

    // ACT
    await flushPromises();

    // ASSERT
    if (shouldShowPagination) {
      expect(wrapper.get('nav[aria-label="Page navigation"]').exists()).toBe(
        true
      );
    }
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/products', {
      params: {
        category_id: categoryId,
        include: 'category',
        page: 1,
      },
    });
  });
});
