<template>
  <div id="start-screen">
    <h1>sNaPcAT</h1>
    <h2>are you ready?</h2>
    <!-- leaderboard component here -->
    <button @click="$emit('game-started')">Play</button>
  </div>
</template>
<script>
export default {
  name: 'start-screen',
};
</script>
<style scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
}
</style>
