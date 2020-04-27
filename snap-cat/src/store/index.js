import Vue from 'vue';
import Vuex from 'vuex';

import { Timer } from 'easytimer.js';

const timer = new Timer();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    points: 0,
    timer: '00:00:00',
  },
  mutations: {
    increment(state) {
      state.points += 1;
    },
    timerCount(state) {
      timer.start();
      timer.addEventListener('secondsUpdated', () => {
        state.timer = timer.getTimeValues().toString();
      });
    },
    stopTimer(state) {
      state.timer = timer.getTimeValues().toString();
      timer.stop();
    },
  },
});
