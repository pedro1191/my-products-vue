import { createStore } from 'vuex';
import { faker } from '@faker-js/faker';
import { flushPromises, mount } from '@vue/test-utils';
import axios from '@/axios-default';
import Single from '@/components/Product/Single.vue';

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

describe('Single.vue', () => {
  let mockedProduct;

  beforeEach(() => {
    jest.clearAllMocks();
    const product = {
      id: faker.datatype.number(),
      name: faker.lorem.words(),
      description: faker.lorem.sentence(),
      image: faker.image.dataUri(),
      category: {
        name: faker.name.findName(),
      },
    };
    mockedProduct = {
      data: { data: product },
    };
  });

  it('renders properly', async () => {
    // ARRANGE
    const store = createVuexStore();
    jest.spyOn(axios, 'get').mockResolvedValue(mockedProduct);
    const product = mockedProduct.data.data;
    const wrapper = mount(Single, {
      global: {
        mocks: {
          $route: {
            params: {
              id: product.id,
            },
          },
        },
        plugins: [store],
        stubs: ['FontAwesomeIcon'],
      },
    });

    // ACT
    const goBackButton = wrapper.get('button');
    await flushPromises();

    // ASSERT
    expect(goBackButton.text()).toBe('Go Back');
    expect(wrapper.text()).toContain(product.name);
    expect(wrapper.text()).toContain(product.category.name);
    expect(wrapper.text()).toContain(product.description);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`/products/${product.id}`);
  });

  it('shows the feedback message when the loading fails', async () => {
    // ARRANGE
    const store = createVuexStore();
    const mockedError = {
      response: { status: 404 },
    };
    jest.spyOn(axios, 'get').mockRejectedValue(mockedError);
    const productId = faker.datatype.number();
    const wrapper = mount(Single, {
      global: {
        mocks: {
          $route: {
            params: {
              id: productId,
            },
          },
        },
        plugins: [store],
        stubs: ['FontAwesomeIcon'],
      },
    });

    // ACT
    const goBackButton = wrapper.get('button');
    await flushPromises();

    // ASSERT
    expect(goBackButton.text()).toBe('Go Back');
    expect(wrapper.text()).toContain(
      'The specified resource has not been found =/'
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`/products/${productId}`);
  });
});
