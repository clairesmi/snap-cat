<template>
  <div id="app">
    <Grid />
  </div>
</template>

<script>
import Grid from './components/Grid.vue';

export default {
  name: 'App',
  components: {
    Grid,
  },
};
</script>

<style>
html {
  background-color: #fdffae;
  height: 100vh;
  width: 100vw;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  background-color: #fdffae;
  height: 100vh;
  width: 100vw;
}
</style>
