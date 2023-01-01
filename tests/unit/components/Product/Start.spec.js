import { createStore } from 'vuex';
import { faker } from '@faker-js/faker';
import { flushPromises, mount } from '@vue/test-utils';
import { generatePagination } from '../../../helpers';
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
    const numberOfItems = faker.datatype.number({ min: 1, max: 15 });
    const products = [];
    for (let i = 0; i < numberOfItems; i++) {
      products.push({
        id: faker.datatype.number(),
        name: faker.lorem.words(),
        description: faker.lorem.sentence(),
        image: faker.image.dataUri(),
        category: {
          name: faker.name.findName(),
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
    const shouldShowPagination = mockProductList.data.meta.last_page > 1;

    // ACT
    await flushPromises();

    // ASSERT
    if (shouldShowPagination) {
      expect(wrapper.find('nav[aria-label="Page navigation"]').exists()).toBe(
        true
      );
    }
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/products', {
      params: {
        category_id: categoryId,
        page: 1,
      },
    });
  });
});
