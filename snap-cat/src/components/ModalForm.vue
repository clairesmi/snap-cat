<template>
  <div id="modal-form" class="modal-overlay">
    <div class="modal-text animated zoomIn">
      <p class="msg">Excellent! Your time was:</p><p class="timer">{{ timer }}</p>
      <p class="msg">Please enter your name to submit your time:</p>
      <form class="form">
      <input class="input"
      type="text"
      placeholder="your name"
      v-model="name"
      />
      <button class="button" @click.prevent="submitTime">Submit</button>
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
    seconds: Number,
  },
  data() {
    return {
      name: '',
    };
  },
  methods: {
    async submitTime() {
      const data = { name: this.name, time: this.timer, seconds: this.seconds };
      try {
        await axios.post('/api/scores', data);
        this.$emit('score-submitted');
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: beige;
  box-shadow: 1px 1px 10px 1px #FA7E61;
  font-family: 'Chicle', cursive;
  color: #DB6C79;
  font-size: 30px;
  width: 50vw;
  height: 70vh;
  opacity: 1;
}
.timer {
  color: #F65BE3;
}
.msg {
  margin-top: 0px;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  height: 20%;
}
.input {
  height: 30%;
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  width: 100%;
}
</style>
