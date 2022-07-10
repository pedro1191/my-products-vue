import { createStore } from 'vuex';
import { mount } from '@vue/test-utils';
import Product from '@/views/Product/Product.vue';

const createVuexStore = (categories = []) => {
  return createStore({
    state() {
      return {
        categories,
      };
    },
    getters: {
      categories(state) {
        return state.categories;
      },
    },
  });
};

describe('Product.vue', () => {
  it('renders properly', () => {
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
});
