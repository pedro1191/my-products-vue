import { createStore } from 'vuex';
import axios from '../axios-default';

export default createStore({
  state() {
    return {
      thingsLoading: 0,
      categories: [],
      screenWidth:
        window.innerWidth || window.document.documentElement.clientWidth,
    };
  },
  getters: {
    isALargeDevice(state) {
      return state.screenWidth >= 992;
    },
    isAMediumDevice(state) {
      return state.screenWidth >= 768 && state.screenWidth < 992;
    },
    isASmallDevice(state) {
      return state.screenWidth >= 576 && state.screenWidth < 768;
    },
    isAnExtraSmallDevice(state) {
      return state.screenWidth < 576;
    },
    isLoading(state) {
      return state.thingsLoading > 0;
    },
    categories(state) {
      return state.categories;
    },
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
    },
  },
  actions: {
    getCategories({ commit, dispatch }) {
      dispatch('setLoading', true);

      axios
        .get('/categories')
        .then((response) => {
          dispatch('setLoading', false);
          commit('setCategories', response.data.data);
        })
        .catch(() => {
          dispatch('setLoading', false);
        });
    },
    setLoading({ commit }, isLoading) {
      commit('setLoading', isLoading);
    },
    setCurrentScreenWidth({ commit }, screenWidth) {
      commit('setCurrentScreenWidth', screenWidth);
    },
  },
  modules: {},
});
