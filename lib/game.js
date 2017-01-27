const Board = require('./board');


class Game {
  constructor() {
    this.board = new Board();
    this.score = 0;
    this.pause = false;
    this.sound = false;
    this.music = new Audio("./lib/background.mp3");

    let grid = document.getElementById("game-grid");
    while (grid.firstChild) {
      document.getElementById("game-grid").removeChild(grid.firstChild);
    }
    document.getElementById("game-grid").appendChild(this.board.drawGrid(8,8));

    let score = document.getElementById('score');
    score.innerHTML = `Score: ${this.score}`;

  }

  startGame() {
    this.music.pause();
    this.sound = false;
    new Game();
    let grid = document.getElementById("game-grid");

    this.music = new Audio("./lib/background.mp3");
    this.music.play();
    this.sound = true;

    clearInterval(this.timer);

    this.time = 60;
    this.score = 0;
    let score = document.getElementById('score');
    score.innerHTML = `Score: ${this.score}`;

    this.startTimer();

    this.interval = setInterval(() => {this.oneRound(grid.firstChild);}, 100);
  }

  resetGame() {
    // this.music.pause();
    // this.sound = false;
    this.startGame();
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
          score.innerHTML = `Score: ${this.score}`;
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
      this.music.pause();
      this.sound = false;
    } else {
      this.startTimer();
      this.music.play();
      this.sound = true;
    }
  }

  toggleMusic() {
    if (this.sound) {
      this.music.pause();
      this.sound = false;
    } else {
      this.music.play();
      this.sound = true;
    }
  }

  endGame() {
    this.music.pause();
    this.sound = false;
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

  rules() {
    this.music.pause();
    this.sound = false;
    clearInterval(this.interval);

    const grid = document.getElementById('game-grid');
    while (grid.firstChild) {
      document.getElementById("game-grid").removeChild(grid.firstChild);
    }
    const rules = document.createElement('div');
    rules.className = 'rules';
    const title = rules.appendChild(document.createElement('div'));
    title.innerHTML = 'Welcome to Fruitswap!';
    title.className = 'rules-title';
    const instruction1 = rules.appendChild(document.createElement('div'));
    instruction1.innerHTML = 'Click and drag a fruit to swap it with another fruit';
    const instruction2 = rules.appendChild(document.createElement('div'));
    instruction2.innerHTML = 'Match 3 or more or the same fruit in a row to score points';
    const instruction3 = rules.appendChild(document.createElement('div'));
    instruction3.innerHTML = 'Get the highest score you can!';
    const instruction4 = rules.appendChild(document.createElement('div'));
    instruction4.innerHTML = 'Click Start to begin playing!';
    instruction4.className = 'rules-start';



    document.getElementById("game-grid").appendChild(rules);

  }

}

module.exports = Game;
