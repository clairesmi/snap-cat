import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    points: 0,
  },
  mutations: {
    increment(state) {
      state.points += 1;
    },
  },
  actions: {
  },
  modules: {
  },
});
