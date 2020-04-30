<template>
  <div id="start-screen">
    <div class="cat-gif-1">
      <img class="gif-image" src="https://media.giphy.com/media/XGIwsw6hnM8XRNSTSK/giphy.gif" alt="cat-gif">
    </div>
    <div class="body">
      <div class="title-wrapper">
      <h1 class="snapcat-title animated jello delay-1s">
        <div class="snap animated slideInLeft">snap</div>
        <div class="cat animated slideInRight">Cat</div>
      </h1>
      <h2 class="are-you-ready-text animated bounceInDown delay-2s">are you ready..?</h2>
      <button class="button animated heartBeat delay-3s"
      @click="$emit('game-started')">
        Play</button>
        </div>
        <div class="scoreboard-body">
          <div class="scoreboard-wrapper" v-if="scores">
            <h2 class="scoreboard-title">leaderboard</h2>
            <div class="scoreboard" v-for="score in scores" :key="score._id">
              <p class="name">{{ score.name }}</p><p class="time">{{ score.time }}</p>
            </div>
          </div>
        </div>
    </div>
    <div class="cat-gif-2">
      <img class="gif-image" src="https://media.giphy.com/media/XGIwsw6hnM8XRNSTSK/giphy.gif" alt="cat-gif">
    </div>
  </div>
</template>
<script>

export default {
  name: 'start-screen',
  mounted() {
    this.$store.commit('getScores');
  },
  computed: {
    scores() {
      return this.$store.state.scores;
    },

  },
};
</script>
<style>
#start-screen {
  display: flex;
  justify-content: space-around;
  width: 100vw;
}
.snapcat-title {
  display: flex;
  justify-content: center;
  font-family: 'Chicle', cursive;
  font-size: 100px;
  letter-spacing: 2px;
  margin: 10px 0px 0px 0px;
}
.title-wrapper {
  margin-bottom: 35px;
}
.snap {
  color: #FF99C8;
}
.cat {
  color: #F65BE3;
}
.are-you-ready-text {
  display: flex;
  justify-content: center;
  font-family: 'Chicle', cursive;
  font-size: 40px;
  color: #FA7E61;
  letter-spacing: 1px;
}
.scoreboard-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 60vh;
  padding-top: 20px;
}
.scoreboard-title {
  border: solid #FA7E61 1px;
  margin: 0px 2px;
  padding: 5px 7px;
  font-family: 'Raleway', sans-serif;
  width: 100%;
  color: #DB6C79;
}
.scoreboard-body {
  display: flex;
  flex-wrap: wrap;
}
.scoreboard {
  display: flex;
  border: solid #FA7E61 0.5px;
  width: 100%;
  height: 10%;
  padding: 5px 7px;
  font-family: 'Raleway', sans-serif;
  text-align: left;
  margin: 3px;
}
.name {
  width: 100%;
  margin: 0px;
  padding: 2px;
  align-self: center;
  text-align: left;
}
.time {
  width: 100%;
  margin: 0px;
  padding: 2px;
  align-self: center;
  text-align: right;
}
.cat-gif-1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  width: 30vw;
}
.body {
  width: 35vw;
  z-index: 1;
}
.cat-gif-2 {
  display: flex;
  height: 100vh;
  align-items: flex-end;
  width: 30vw;
}
.gif-image {
  width: 90%;
}
.button {
  width: 50%;
  height: 40px;
  border-radius: 10px;
  font-family: 'Chicle', cursive;
  font-size: 20px;
  letter-spacing: 1px;
  box-shadow: 2px 2px 10px 2px #DB6C79;
  background-color: #fdffae;
  cursor: pointer;
  color: #DB6C79;
  font-weight: bold;
}
.button:hover {
  transform: scale(1.1);
}
</style>
