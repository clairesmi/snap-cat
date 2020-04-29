import Vue from 'vue';
import Vuex from 'vuex';

import { Timer } from 'easytimer.js';
import axios from 'axios';

const timer = new Timer();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    points: 0,
    timer: '00:00:00',
    seconds: 0,
    scores: null,
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
      // get seconds in order to be able to rank players in the leaderboard
      state.seconds = timer.getTotalTimeValues().seconds;
      timer.stop();
    },
    async getScores(state) {
      try {
        const res = await axios.get('/api/scores');
        state.scores = res.data.sort((a, b) => a.seconds - b.seconds).splice(0, 10);
      } catch (err) {
        console.log(err);
      }
      // state.scores = this.scores
    },
  },
});
