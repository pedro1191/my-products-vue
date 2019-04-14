import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios-default';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    thingsLoading: 0,
    categories: [],
    screenWidth: (window.innerWidth || window.document.documentElement.clientWidth)
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setLoading(state, isLoading) {
      isLoading ? state.thingsLoading++ : state.thingsLoading--;
    },
    setCurrentScreenWidth(state, screenWidth) {
      state.screenWidth = screenWidth;
    }
  },
  actions: {
    getCategories({ commit, dispatch }) {
      dispatch('setLoading', true);

      axios.get('/categories')
        .then(response => {
          dispatch('setLoading', false);
          commit('setCategories', response.data.data);
        })
        .catch(error => {
          dispatch('setLoading', false);
          console.log(error.response);
        })
    },
    setLoading({ commit }, isLoading) {
      commit('setLoading', isLoading);
    },
    setCurrentScreenWidth({ commit }, screenWidth) {
      commit('setCurrentScreenWidth', screenWidth);
    }
  },
  getters: {
    isASmallDevice(state) {
      return state.screenWidth < 992;
    },
    isLoading(state) {
      return state.thingsLoading > 0;
    },
    categories(state) {
      return state.categories;
    }
  }
});
