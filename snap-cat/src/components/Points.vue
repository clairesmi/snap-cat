<template>
  <div id="points">
    <div>
      <p>Pairs: {{ points }}</p>
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
