import { createStore } from 'vuex';
import { mount } from '@vue/test-utils';
import Banner from '@/components/Banner.vue';

const createVuexStore = (screenWidth = 768) => {
  return createStore({
    state() {
      return {
        screenWidth,
      };
    },
    getters: {
      isASmallDevice(state) {
        return state.screenWidth < 768;
      },
    },
  });
};

describe('Banner.vue', () => {
  it('renders properly', () => {
    const store = createVuexStore();
    mount(Banner, {
      global: {
        plugins: [store],
        stubs: ['RouterLink'],
      },
    });
  });
});
