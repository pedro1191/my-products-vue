import { createStore } from 'vuex';
import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import Product from '@/views/Product/Product.vue';

const createVuexStore = (screenWidth = 768, categories = []) => {
  return createStore({
    state() {
      return {
        categories,
        screenWidth,
      };
    },
    getters: {
      isASmallDevice(state) {
        return state.screenWidth < 768;
      },
      categories(state) {
        return state.categories;
      },
    },
  });
};

describe('Product.vue', () => {
  it('shows categories when it is not a small device', () => {
    // ARRANGE
    const store = createVuexStore();
    const wrapper = mount(Product, {
      global: {
        plugins: [store],
        stubs: ['FontAwesomeIcon', 'RouterLink', 'RouterView'],
      },
    });

    // ASSERT
    expect(wrapper.find('.categories').exists()).toBe(true);
  });

  it('does not show categories menu when it is a small device', () => {
    // ARRANGE
    const store = createVuexStore(faker.datatype.number({ max: 767 }));
    const wrapper = mount(Product, {
      global: {
        plugins: [store],
        stubs: ['FontAwesomeIcon', 'RouterLink', 'RouterView'],
      },
    });

    // ASSERT
    expect(wrapper.find('.categories').exists()).toBe(false);
  });
});
