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

	const drawGrid = __webpack_require__(4);
	const allowDrop = __webpack_require__(1);
	const drag = __webpack_require__(1);
	const drop = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", () => {
	  document.getElementById("game-grid").appendChild(drawGrid(8,8));
	});


/***/ },
/* 1 */
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


/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	const fruitImages = [
	  "./lib/images/apple.png",
	  "./lib/images/blueberry.png",
	  "./lib/images/grapes.png",
	  "./lib/images/kiwi.png",
	  "./lib/images/lemon.png",
	  "./lib/images/orange.png",
	  "./lib/images/watermelon.png",
	];
	
	const fruits = [
	  'apple',
	  'blueberry',
	  'grapes',
	  'kiwi',
	  'lemon',
	  'orange',
	  'watermelon'
	];
	
	const drawGrid = (rows, cols) => {
	  let count = 0;
	  let grid = document.createElement('div');
	  grid.className = 'grid';
	  for (let i = 0; i < cols; i++){
	    let col = grid.appendChild(document.createElement('div'));
	    for (let j = 0; j < rows; j++){
	      let cell = col.appendChild(document.createElement(`div`));
	      let fruit = cell.appendChild(document.createElement(`img`));
	
	      // fruit.innerHTML = {type: ++count};
	      const img = fruitImages[Math.floor(Math.random() * fruitImages.length)];
	      const obj = img.substr(13).replace('.png','');
	      fruit.setAttribute("src", img);
	
	      fruit.setAttribute("id", `fruit${j}${i}`);
	      fruit.setAttribute("draggable", 'true');
	      fruit.setAttribute("ondragstart", "drag(event)");
	      fruit.className = `fruit-item ${obj}`;
	
	      cell.setAttribute("id", `cell${j}${i}`);
	      cell.setAttribute("ondrop", "drop(event)");
	      cell.setAttribute("ondragover", "allowDrop(event)");
	    }
	  }
	
	  checkForMatches(grid);
	
	  return grid;
	};
	
	const checkForMatches = (grid) => {
	  let allMatchedPos = [];
	  fruits.forEach(fruit => {
	    const allOneFruit = grid.getElementsByClassName(fruit);
	    const fruitPos = [];
	
	    for (let i = 0; i < allOneFruit.length; i++) {
	      fruitPos.push(parseInt(allOneFruit[i].id.substr(5)));
	    }
	
	    checkHorizontalMatch(fruitPos).forEach(pos => {
	      allMatchedPos.push(pos);
	    });
	
	    checkVerticalMatch(fruitPos).forEach(pos => {
	      allMatchedPos.push(pos);
	    });
	  });
	  const uniqMatchedPos = [];
	
	  for (let i = 0; i < allMatchedPos.length; i++) {
	    if (uniqMatchedPos.indexOf(allMatchedPos[i]) === -1) {
	      uniqMatchedPos.push(allMatchedPos[i]);
	    }
	  }
	};
	
	const checkHorizontalMatch = (fruitPos) => {
	  fruitPos.sort((a,b) => {return a-b;});
	  const matchedPos = [];
	  let maybeMatchedPos = [];
	  for (let i = 0; i < fruitPos.length - 1; i++) {
	    if (maybeMatchedPos.length === 0) {
	      maybeMatchedPos.push(fruitPos[i]);
	    }
	
	    if (fruitPos[i] + 1 === fruitPos[i + 1]) {
	      maybeMatchedPos.push(fruitPos[i + 1]);
	      if ((i === fruitPos.length - 1) && (maybeMatchedPos.length >= 3)) {
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
	  return matchedPos;
	};
	
	const checkVerticalMatch = (fruitPos) => {
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
	};
	
	module.exports = drawGrid;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map