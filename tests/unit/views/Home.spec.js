import { createStore } from 'vuex';
import { faker } from '@faker-js/faker';
import { flushPromises, mount } from '@vue/test-utils';
import axios from '@/axios-default';
import Home from '@/views/Home.vue';

const createVuexStore = () => {
  return createStore({
    state() {
      return {
        thingsLoading: 0,
        categories: [],
      };
    },
    getters: {
      categories(state) {
        return state.categories;
      },
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

describe('Home.vue', () => {
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
          data: { name: faker.name.findName() },
        },
      });
    }
    mockProductList = {
      data: { data: products },
    };
  });

  it('renders properly', async () => {
    // ARRANGE
    const store = createVuexStore();
    jest.spyOn(axios, 'get').mockResolvedValue(mockProductList);
    const wrapper = mount(Home, {
      global: {
        plugins: [store],
        stubs: ['FontAwesomeIcon', 'RouterLink'],
      },
    });

    // ACT
    const header = wrapper.get('header');
    const section = wrapper.get('section');
    await flushPromises();

    // ASSERT
    expect(header.html()).toContain(
      "FIND HERE WHAT'S THE BEST IN THE CUISINE!"
    );
    expect(section.html()).toContain('RENOWNED CHEFS');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/products', {
      params: { include: 'category' },
    });
  });
});
