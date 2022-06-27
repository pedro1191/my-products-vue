import { createStore } from 'vuex'
import { mount } from '@vue/test-utils';
import App from '@/App.vue';

const createVuexStore = () => {
  return createStore({
    state() {
      return {
        thingsLoading: 0,
        categories: [],
      };
    },
    getters: {
      isLoading(state) {
        return state.thingsLoading > 0;
      },
    },
    mutations: {
      setCategories(state, categories) {
        state.categories = categories;
      },
    },
    actions: {
      getCategories({ commit }) {
        commit('setCategories', []);
      },
    },
  });
};

describe('App.vue', () => {
  it('renders properly', () => {
    const store = createVuexStore();
    mount(App, {
      global: {
        plugins: [store],
        stubs: ['FontAwesomeIcon', 'RouterLink', 'RouterView'],
      },
    });
  });
});
