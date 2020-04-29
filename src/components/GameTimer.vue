<template>
  <div id='game-timer'>
    <div>
      {{ timer }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'game-timer',
  props: {
    timer: String,
  },
};
</script>
<style scoped>

</style>
