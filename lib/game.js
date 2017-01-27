const Board = require('./board');


class Game {
  constructor() {
    this.board = new Board();
    this.score = 0;
    this.pause = false;

    let grid = document.getElementById("game-grid");
    while (grid.firstChild) {
      document.getElementById("game-grid").removeChild(grid.firstChild);
    }
    document.getElementById("game-grid").appendChild(this.board.drawGrid(8,8));

    let score = document.getElementById('score');
    score.innerHTML = this.score;

  }

  startGame() {
    new Game();
    let grid = document.getElementById("game-grid");

    clearInterval(this.timer);

    this.time = 30;
    this.score = 0;
    let score = document.getElementById('score');
    score.innerHTML = this.score;

    this.startTimer();

    this.interval = setInterval(() => {this.oneRound(grid.firstChild);}, 100);
  }

  countdown() {
    let grid = document.getElementById("game-grid");
    while (grid.firstChild) {
      document.getElementById("game-grid").removeChild(grid.firstChild);
    }

  }

  oneRound(grid) {
    let uniqMatchedPos = this.board.checkForMatches(grid);
      this.board.removeFruitAtMatchedPos(uniqMatchedPos, grid);
      if (uniqMatchedPos.length > 0) {
        setTimeout(() => {
          let score = document.getElementById('score');
          this.score += uniqMatchedPos.length * 100;
          score.innerHTML = this.score;
          this.board.shiftFruitDown(grid);
        }, 500);
      }
  }

  decreaseSeconds() {
    this.time -= 1;
    document.getElementById('timer').innerHTML = this.time;
    if (this.time <= 0) {
      clearInterval(this.timer);
      this.endGame();
    }
  }

  startTimer() {
    document.getElementById('timer').innerHTML = this.time;
    this.timer = setInterval(this.decreaseSeconds.bind(this), 1000);
  }

  pauseGame() {
    this.pause = !this.pause;
    if (this.pause) {
      clearInterval(this.timer);
    } else {
      this.startTimer();
    }
  }

  endGame() {
    clearInterval(this.interval);
    const grid = document.getElementById('game-grid');
    while (grid.firstChild) {
      document.getElementById("game-grid").removeChild(grid.firstChild);
    }

    const timeUp = document.createElement('div');
    timeUp.setAttribute("id", 'time-up');
    const top = timeUp.appendChild(document.createElement('div'));
    top.setAttribute("id", 'time-up-top');
    const bottom = timeUp.appendChild(document.createElement('div'));
    bottom.setAttribute("id", 'time-up-bottom');


    document.getElementById("game-grid").appendChild(timeUp);
    document.getElementById('time-up-top').innerHTML = "Time's up!";
    setTimeout(() => {

      document.getElementById('time-up-bottom').innerHTML += `You scored ${this.score} points!`;
    }, 1000);

  }

}

module.exports = Game;
