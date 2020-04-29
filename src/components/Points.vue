<template>
  <div id="points">
    <div>
      <div>Pairs: {{ points }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'points',
  props: {
    points: Number,
  },
};
</script>
<style scoped>
</style>
