<template>
  <div id="grid">
    <div class="grid-wrapper">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  data() {
    return {
      grid: null,
      cards: null,
      gridSize: 30,
    };
  },
  mounted() {
    this.createGrid();
  },
  methods: {
    createGrid() {
      this.grid = document.querySelector('.grid-wrapper');
      for (let i = 0; i < this.gridSize; i += 1) {
        this.grid.appendChild(document.createElement('div')).classList.add('card', `${i}`);
      }
      this.cards = document.querySelectorAll('.card');
      this.shuffleCards();
      this.cards.forEach((card, i) => {
        const cardText = card;
        if (i < this.gridSize / 2) {
          cardText.innerHTML = i + 1;
        }
        if (i >= this.gridSize / 2) {
          cardText.innerHTML = (i - this.gridSize / 2) + 1;
        }
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
  /* border: solid black 1px; */
  padding: 40px;
}
.grid-wrapper >>> .card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 140px;
  border: solid black 1px;
  margin: 10px;
  background: azure;
  border-radius: 5px;
  /* padding-top: 100px; */
}

</style>
