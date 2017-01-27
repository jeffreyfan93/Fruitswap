/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const Board = __webpack_require__(2);
	const allowDrop = __webpack_require__(3);
	const drag = __webpack_require__(3);
	const drop = __webpack_require__(3);
	
	document.addEventListener("DOMContentLoaded", () => {
	  window.Game = new Game();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	class Board {
	  constructor() {
	    this.fruitImages = [
	      "./lib/images/apple.png",
	      "./lib/images/blueberry.png",
	      "./lib/images/grapes.png",
	      "./lib/images/kiwi.png",
	      "./lib/images/lemon.png",
	      "./lib/images/orange.png",
	      "./lib/images/watermelon.png",
	    ];
	
	    this.fruits = [
	      'apple',
	      'blueberry',
	      'grapes',
	      'kiwi',
	      'lemon',
	      'orange',
	      'watermelon'
	    ];
	  }
	
	  drawGrid(rows, cols) {
	    let count = 0;
	    let grid = document.createElement('div');
	    grid.className = 'grid';
	    for (let i = 0; i < cols; i++){
	      let col = grid.appendChild(document.createElement('div'));
	      for (let j = 0; j < rows; j++){
	        let cell = col.appendChild(document.createElement(`div`));
	        let fruit = cell.appendChild(document.createElement(`img`));
	
	        // fruit.innerHTML = {type: ++count};
	        const img = this.fruitImages[Math.floor(Math.random() * this.fruitImages.length)];
	        const obj = img.substr(13).replace('.png','');
	        fruit.setAttribute("src", img);
	
	        fruit.setAttribute("id", `fruit${j}${i}`);
	        fruit.setAttribute("draggable", 'true');
	        fruit.setAttribute("ondragstart", "drag(event)");
	        fruit.className = `fruit-item ${obj}`;
	
	        cell.setAttribute("id", `cell${j}${i}`);
	        cell.setAttribute("ondrop", "drop(event)");
	        cell.setAttribute("ondragover", "allowDrop(event)");
	        cell.className = `${j}${i}`;
	      }
	    }
	
	    this.oneRound(grid);
	
	    return grid;
	  }
	
	  oneRound(grid) {
	    let uniqMatchedPos = this.checkForMatches(grid);
	    while (uniqMatchedPos.length > 0) {
	      grid = this.removeFruitAtMatchedPos(uniqMatchedPos, grid);
	
	      grid = this.shiftFruitDown(grid);
	      uniqMatchedPos = this.checkForMatches(grid);
	    }
	  }
	
	  checkForMatches(grid) {
	    let allMatchedPos = [];
	    this.fruits.forEach(fruit => {
	      const allOneFruit = grid.getElementsByClassName(fruit);
	      const fruitPos = [];
	
	      for (let i = 0; i < allOneFruit.length; i++) {
	        fruitPos.push(parseInt(allOneFruit[i].parentNode.id.substr(4)));
	      }
	
	      this.checkHorizontalMatch(fruitPos).forEach(pos => {
	        allMatchedPos.push(pos);
	      });
	
	      this.checkVerticalMatch(fruitPos).forEach(pos => {
	        allMatchedPos.push(pos);
	      });
	    });
	
	    let uniqMatchedPos = [];
	
	    for (let i = 0; i < allMatchedPos.length; i++) {
	      if (uniqMatchedPos.indexOf(allMatchedPos[i]) === -1) {
	        uniqMatchedPos.push(allMatchedPos[i]);
	      }
	    }
	    return uniqMatchedPos;
	  }
	
	  checkHorizontalMatch(fruitPos) {
	    fruitPos.sort((a,b) => {return a-b;});
	    const matchedPos = [];
	    let maybeMatchedPos = [];
	    for (let i = 0; i < fruitPos.length; i++) {
	      if (maybeMatchedPos.length === 0) {
	        maybeMatchedPos.push(fruitPos[i]);
	      }
	
	      if (fruitPos[i] + 1 === fruitPos[i + 1]) {
	        maybeMatchedPos.push(fruitPos[i + 1]);
	      } else {
	        if (maybeMatchedPos.length >= 3) {
	          maybeMatchedPos.forEach(pos => {
	            matchedPos.push(pos);
	          });
	        }
	        maybeMatchedPos = [];
	      }
	    }
	    return matchedPos;
	  }
	
	  checkVerticalMatch(fruitPos) {
	    const matchedPos = [];
	    for (let i = 0; i < 10; i++) {
	      let modArray = [];
	
	      for (let j = 0; j < fruitPos.length; j++) {
	        if (fruitPos[j]%10 === i) {
	          modArray.push(fruitPos[j]);
	        }
	      }
	
	      let maybeMatchedPos = [];
	      for (let k = 0; k < modArray.length - 1; k++) {
	        if (maybeMatchedPos.length === 0) {
	          maybeMatchedPos.push(modArray[k]);
	        }
	        if (modArray[k] + 10 === modArray[k + 1]) {
	          maybeMatchedPos.push(modArray[k + 1]);
	          if ((k === modArray.length - 2) && (maybeMatchedPos.length >= 3)) {
	            maybeMatchedPos.forEach(pos => {
	              matchedPos.push(pos);
	            });
	            maybeMatchedPos = [];
	          }
	        } else {
	          if (maybeMatchedPos.length >= 3) {
	            maybeMatchedPos.forEach(pos => {
	              matchedPos.push(pos);
	            });
	          }
	          maybeMatchedPos = [];
	        }
	      }
	    }
	    return matchedPos;
	  }
	
	  removeFruitAtMatchedPos(uniqMatchedPos, grid) {
	    for (let i = 0; i < uniqMatchedPos.length; i++) {
	      let posString = "";
	      if (uniqMatchedPos[i].toString().length === 1) {
	        posString = `0${uniqMatchedPos[i]}`;
	      } else {
	        posString = uniqMatchedPos[i].toString();
	      }
	
	      grid.getElementsByClassName(posString)[0].firstChild.src = "./lib/images/blank_white_square.png";
	      this.fruits.forEach(fruit => {
	        grid.getElementsByClassName(posString)[0].firstChild.classList.remove(fruit);
	      });
	    }
	    return grid;
	  }
	
	  shiftFruitDown(grid) {
	    let allFruit = grid.getElementsByClassName('fruit-item');
	    for (let j = 0; j < 8; j++) {
	      for (let i = 0; i < allFruit.length; i++) {
	        if (allFruit[i].src === "https://jeffreyfan93.github.io/Fruitswap/lib/images/blank_white_square.png") {
	          this.fruits.forEach(fruit => {
	            allFruit[i].classList.remove(fruit);
	          });
	
	          if (i % 8 === 0) {
	            // generate random fruit
	            const img = this.fruitImages[Math.floor(Math.random() * this.fruitImages.length)];
	            const obj = img.substr(13).replace('.png','');
	            allFruit[i].src = img;
	            allFruit[i].classList.add(obj);
	          } else {
	            const prevImg = allFruit[i - 1].src;
	            const prevFruit = prevImg.substr(52).replace('.png','');
	            allFruit[i].src = prevImg;
	            allFruit[i].classList.add(prevFruit);
	            allFruit[i - 1].src = "";
	          }
	
	        }
	      }
	    }
	    return grid;
	  }
	}
	
	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const allowDrop = (ev) => {
	    ev.preventDefault();
	};
	
	const drag = (ev) => {
	    ev.dataTransfer.setData("target", ev.target.id);
	};
	
	const drop = (ev) => {
	    ev.preventDefault();
	    var src = document.getElementById(ev.dataTransfer.getData("target"));
	    var srcParent = src.parentNode;
	    var tgt = ev.currentTarget.firstElementChild;
	
	    ev.currentTarget.replaceChild(src, tgt);
	    srcParent.appendChild(tgt);
	};
	
	window.allowDrop = allowDrop;
	window.drag = drag;
	window.drop = drop;
	
	module.exports = allowDrop;
	module.exports = drag;
	module.exports = drop;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map