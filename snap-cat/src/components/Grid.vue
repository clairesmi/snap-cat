<template>
  <div id="grid">
    <div v-show="!showGrid" class="start-screen">
      <start-screen v-on:game-started="startGame"></start-screen>
    </div>
    <div v-show="showGrid">
      <h1>sNaPcAT</h1>
        <game-timer :timer="timer"></game-timer>
        <points :points="points"></points>
      <div class="grid-wrapper"></div>
      <modal-form v-if="showModalForm" :timer="timer" :seconds="seconds"></modal-form>
    </div>
  </div>
</template>

<script>
import StartScreen from './StartScreen.vue';
import Points from './Points.vue';
import GameTimer from './GameTimer.vue';
import ModalForm from './ModalForm.vue';

export default {
  name: 'Grid',
  components: {
    Points,
    GameTimer,
    ModalForm,
    StartScreen,
  },
  data() {
    return {
      showGrid: false,
      grid: null,
      cards: null,
      gridSize: 2,
      guess: [],
      showModalForm: false,
    };
  },
  computed: {
    points() {
      return this.$store.state.points;
    },
    timer() {
      return this.$store.state.timer;
    },
    seconds() {
      return this.$store.state.seconds;
    },
  },
  methods: {
    startGame() {
      this.showGrid = !this.showGrid;
      this.createGrid();
      this.$store.commit('timerCount');
    },
    createGrid() {
      this.grid = document.querySelector('.grid-wrapper');
      for (let i = 0; i < this.gridSize; i += 1) {
        this.grid.appendChild(document.createElement('div')).classList.add('card', 'back', `${i}`);
      }
      this.cards = document.querySelectorAll('.card');
      this.shuffleCards();
      this.cards.map((card, i) => {
        const cardText = card;
        if (i < this.gridSize / 2) {
          cardText.innerHTML = `<div class="card-text">${i + 1}</div>`;
        }
        if (i >= this.gridSize / 2) {
          cardText.innerHTML = `<div class="card-text">${(i - this.gridSize / 2) + 1}</div>`;
        }
        return cardText;
      });
      this.cards.map((card) => card.addEventListener('click', this.handleClick));
    },
    shuffleCards() {
      const shuffledCards = [];
      let cardArray = [];
      this.cards.forEach((card) => cardArray.push(card));
      while (shuffledCards.length !== this.gridSize) {
        const randomCard = cardArray[(Math.floor(Math.random() * cardArray.length))];
        shuffledCards.push(randomCard);
        cardArray = cardArray.filter((card) => !shuffledCards.includes(card));
      }
      this.cards = shuffledCards;
    },
    handleClick(e) {
      e.target.classList.replace('back', 'front');
      if (this.guess.length !== 2) {
        this.guess.push(e.target);
      }
      this.checkForMatch();
    },
    checkForMatch() {
      if (this.guess.length === 2) {
        if (this.guess[0].innerHTML === this.guess[1].innerHTML) {
          this.match();
        } else {
          this.noMatch();
        }
      }
    },
    match() {
      this.guess.map((card) => {
        const chosenCard = card;
        chosenCard.style.boxShadow = '2px 2px 20px 2px green';
        return chosenCard;
      });
      const vm = this;
      setTimeout(() => {
        vm.guess.map((card) => card.classList.replace('front', 'matched'));
        this.guess.map((card) => {
          const chosenCard = card;
          chosenCard.style.boxShadow = '';
          chosenCard.removeEventListener('click', this.handleClick);
          return chosenCard;
        });
        this.guess = [];
      }, 500);
      this.incrementPoints();
      if (this.$store.state.points === this.gridSize / 2) {
        this.gameCompleted();
      }
    },
    noMatch() {
      this.guess.map((card) => {
        const chosenCard = card;
        chosenCard.style.boxShadow = '2px 2px 20px 2px red';
        return chosenCard;
      });
      const vm = this;
      setTimeout(() => {
        vm.guess.map((card) => card.classList.replace('front', 'back'));
        this.guess.map((card) => {
          const chosenCard = card;
          chosenCard.style.boxShadow = '';
          return chosenCard;
        });
        this.guess = [];
      }, 500);
    },
    incrementPoints() {
      this.$store.commit('increment');
    },
    gameCompleted() {
      this.$store.commit('stopTimer');
      const vm = this;
      setTimeout(() => {
        vm.showModalForm = true;
      }, 500);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#grid {
  display: flex;
  justify-content: center;
  align-items: center;
}
.grid-wrapper {
  display: flex;
  flex-wrap: wrap;
  min-width: 80vw;
  min-height: 80vh;
  padding: 40px;
}
.grid-wrapper >>> .front {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 140px;
  border: solid black 1px;
  margin: 10px;
  background: azure;
  border-radius: 5px;
}
.grid-wrapper >>> .back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 140px;
  border: solid black 1px;
  margin: 10px;
  background: darkcyan;
  border-radius: 5px;
}
.grid-wrapper >>> .back > .card-text {
  display: none;
}
.grid-wrapper >>> .matched {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 140px;
  margin: 10px;
  background: darkcyan;
  /* remove opacity to maintain the card's place in the grid */
  opacity: 0;
  border-radius: 5px;
}
</style>
