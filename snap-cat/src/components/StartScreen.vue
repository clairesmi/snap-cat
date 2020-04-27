<template>
  <div id="start-screen">
    <h1>sNaPcAT</h1>
    <h2>are you ready?</h2>
    <button @click="$emit('game-started')">Play</button>
    <div>
      <h2>leaderboard</h2>
      <div class="scoreboard" v-for="score in scores" :key="score._id">
        <p class="name">{{ score.name }}</p><p class="time">{{ score.time }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'start-screen',
  data() {
    return {
      scores: [],
    };
  },
  mounted() {
    this.getScores();
  },
  methods: {
    // try catch
    async getScores() {
      try {
        const res = await axios.get('/api/scores');
        this.scores = res.data.sort((a, b) => b.seconds - a.seconds).splice(0, 10);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
}
.scoreboard {
  display: flex;
}
.name {
  padding-right: 10px;
}
.time {
  padding-left: 10px;
}
</style>
