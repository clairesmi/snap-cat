<template>
  <div id="modal-form" class="modal-overlay">
    <div class="modal-text">
      <p>Excellent! Your time was:</p><p>{{ timer }}</p>
      <p>Please enter your name to submit your time:</p>
      <form>
      <input
      type="text"
      placeholder="your name"
      v-model="name"
      />
      <button @click="submitTime">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'modal-form',
  props: {
    timer: String,
  },
  data() {
    return {
      name: '',
    };
  },
  methods: {
    async submitTime() {
      const data = { name: this.name, time: this.timer };
      try {
        await axios.post('/api/scores', data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-text {
  background-color: beige;
  box-shadow: 1px 1px 10px 1px gray;
  font-family: "Pacifico", cursive;
  font-size: 30px;
  width: 50vw;
  height: 70vh;
  opacity: 1;
}
</style>
