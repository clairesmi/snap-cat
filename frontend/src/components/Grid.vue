<template>
  <div id="grid">
    <div class="grid-wrapper">

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
      grid: null,
      cards: null,
      gridSize: 30,
      guess: [],
    };
  },
  mounted() {
    this.createGrid();
  },
  methods: {
    createGrid() {
      this.grid = document.querySelector('.grid-wrapper');
      for (let i = 0; i < this.gridSize; i += 1) {
        this.grid.appendChild(document.createElement('div')).classList.add('card', 'back', `${i}`);
      }
      this.cards = document.querySelectorAll('.card');
      this.shuffleCards();
      this.cards.forEach((card, i) => {
        const cardText = card;
        if (i < this.gridSize / 2) {
          cardText.innerHTML = `<div class="card-text">${i + 1}</div>`;
        }
        if (i >= this.gridSize / 2) {
          cardText.innerHTML = `<div class="card-text">${(i - this.gridSize / 2) + 1}</div>`;
        }
      });
      this.cards.forEach((card) => {
        const cardClick = card;
        cardClick.addEventListener('click', this.handleClick);
      });
    },
    shuffleCards() {
      const shuffledCards = [];
      let cardArray = [];
      this.cards.forEach((card) => cardArray.push(card));
      while (shuffledCards.length !== this.gridSize) {
        const randomCard = cardArray[(Math.floor(Math.random() * cardArray.length))];
        if (!shuffledCards.includes(randomCard)) {
          shuffledCards.push(randomCard);
          cardArray = cardArray.filter((card) => !shuffledCards.includes(card));
        }
      }
      this.cards = shuffledCards;
    },
    handleClick(e) {
      e.target.classList.replace('back', 'front');
      if (this.guess.length !== 2) {
        this.guess.push(e.target);
      }
      this.checkForMatch(e);
    },
    checkForMatch(e) {
      if (this.guess.length === 2) {
        if (this.guess[0].innerHTML === this.guess[1].innerHTML) {
          this.match(e);
        } else {
          this.noMatch();
        }
      }
    },
    noMatch() {
      // console.log('no match');
      // e.target.classList.replace('front', 'back');
      this.guess.map((guess) => {
        const guessStyle = guess;
        guessStyle.style.boxShadow = '2px 2px 20px 2px red';
        return guessStyle;
      });
      const vm = this;
      setTimeout(() => {
        vm.guess.forEach((card) => card.classList.replace('front', 'back'));
        this.guess.map((guess) => {
          const guessStyle = guess;
          guessStyle.style.boxShadow = '';
          return guessStyle;
        });
        this.guess = [];
      }, 1000);
      // console.log(this.guess);
    },
    match(e) {
      // add and remove green box shadow
      // remove cards from the grid (display none)
      // increase points counter
      e.target.style.boxShadow = '2px 2px 20px 2px green';
      console.log('match');
      this.guess = [];
      console.log(this.guess);
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

</style>
