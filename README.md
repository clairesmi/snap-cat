# snapCat

snapCat is a web version of the card game of Pairs, made with pairs of famous cats.

![Game screenshot](/readme-assets/snapcat-grid.png) 

## Deployment
The project is deployed with Heroku and can be found here: https://snap-cat.herokuapp.com/

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Technologies Used:

- Vue CLI
- Vuex
- JavaScript
- Easytimer.js
- Axios
- Node.js
- Nodemon (for hot reloading)
- Express
- Mongoose & MongoDB
- HTML5
- CSS3
- Animate.css
- Yarn

## User Experience

The user lands on the start screen where they can view the top ten quickest times on the leaderboard. 

![Start screen screenshot](/readme-assets/snapcat-start.png) 

I used the library Easytimer.js to handle the timer and their getTotalSeconds functionality was what I used to rank the players by total seconds taken to play the game. 
I store their total seconds in state in my Vuex instance when the game is completed.

```
stopTimer(state) {
      state.timer = timer.getTimeValues().toString();
      // get seconds in order to be able to rank players in the leaderboard
      state.seconds = timer.getTotalTimeValues().seconds;
      timer.stop();
    },
```
On completion of the game, the players score is submitted to my Node.js / Express database using this Score model: 
```
const scoreSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 15 },
  time: { type: String, required: true },
  seconds: { type: Number, required: true },
}, {
  timestamps: true,
});
```
The top ten scores are fetched from the database on page load and after the user has submitted their score so they can instantly see if they have placed in the top ten.

Once the player clicks to start the game, they are taken to the grid as shown in the first image where the aim of the game is to find the matching pairs as quickly as possible. 

If the player finds a matching pair, this pair is removed from the board, if they do not find a mathing pair then the cards are flipped back over to show the reverse of the card again. 

The idea is to remember which positions the cards are in so that they can be matched quickly. 

```
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
        vm.guess.map((card) => {
          const chosenCard = card;
          chosenCard.style.boxShadow = '';
          chosenCard.removeEventListener('click', this.handleClick);
          return chosenCard;
        });
        vm.guess = [];
      }, 300);
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
        vm.guess.map((card) => {
          const chosenCard = card;
          chosenCard.style.boxShadow = '';
          return chosenCard;
        });
        vm.guess = [];
      }, 300);
    },
```
Once the user clicks on a card, it is pushed into a 'guess' array which has a max length of 2. When the length of this array reaches two, the innerHTML of the cards is checked. 
If it matches, the above functions are carried out.
Once the points total is equal to the size of the grid / 2 (written this way so that in future the size of the grid could be selected and dynamically changed by the player), the gameCompleted function is called:
```
    gameCompleted() {
      this.$store.commit('stopTimer');
      const vm = this;
      setTimeout(() => {
        vm.showModalForm = true;
      }, 500);
    },
    scoreSubmitted() {
      this.showModalForm = false;
      this.showGrid = false;
      this.$store.commit('getScores');
    },
```
The stopTimer function is then committed in the Vuex store so that all components have access to the player's time (used in the ModalForm component as well as the StartScreen). 

Once the player submits their score into the ModalForm, the page is reset and the getScores function is committed in the store. This is to allow the StartScreen to fetch the newly updated leaderboard with the information submitted to the ModalForm which is a sibling component.

## Refelection and Future Improvements

This was a really fun project and probably the project I have felt most comfortable with. I also experienced a lot of clarity mentally as I was planning and writing each element of my code. I really enjoyed implementing Vuex for the first time and can see the benefit of having state managed and accessed centrally especially for sibling components. 

In future I would like to get work on some more complicated projects where I can use Vuex in more depth and detail. 