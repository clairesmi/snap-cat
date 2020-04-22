<template>
  <div id="grid">
    <div v-show="!showGrid" class="start-screen">
    <h1>sNaPcAT</h1>
    <h2>are you ready?</h2>
    <!-- leaderboard component here -->
    <button @click="startGame">Play</button>
    </div>
    <div v-show="showGrid" class="grid-wrapper">
      <h1>sNaPcAT</h1>
      <!-- TIMER HERE -->
      <div>{{ timer }}</div>
      <!-- point counter component here -->
    </div>
  </div>
</template>

<script>
// to dos:
// create timer (separate component)
// create points counter (separate component)
// set up backend for scoreboard
// Refactor components to incorporate Vuex
export default {
  name: 'Grid',
  data() {
    return {
      // startScreen: true,
      showGrid: false,
      grid: null,
      cards: null,
      gridSize: 30,
      guess: [],
      timer: null,
    };
  },
  methods: {
    startGame() {
      this.showGrid = !this.showGrid;
      this.createGrid();
      this.startTimer();
    },
    startTimer() {
      console.log('timerStart');
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
      // increase points counter
      this.guess.map((guess) => {
        const guessStyle = guess;
        guessStyle.style.boxShadow = '2px 2px 20px 2px green';
        return guessStyle;
      });
      const vm = this;
      setTimeout(() => {
        vm.guess.map((card) => card.classList.replace('front', 'matched'));
        this.guess.map((guess) => {
          const guessStyle = guess;
          guessStyle.style.boxShadow = '';
          guessStyle.removeEventListener('click', this.handleClick);
          return guessStyle;
        });
        this.guess = [];
      }, 500);
    },
    noMatch() {
      this.guess.map((guess) => {
        const guessStyle = guess;
        guessStyle.style.boxShadow = '2px 2px 20px 2px red';
        return guessStyle;
      });
      const vm = this;
      setTimeout(() => {
        vm.guess.map((card) => card.classList.replace('front', 'back'));
        this.guess.map((guess) => {
          const guessStyle = guess;
          guessStyle.style.boxShadow = '';
          return guessStyle;
        });
        this.guess = [];
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
  /* visibility: hidden; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 140px;
  /* border: solid black 1px; */
  margin: 10px;
  background: darkcyan;
  opacity: 0;
  border-radius: 5px;
}
.start-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
}

</style>
