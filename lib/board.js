
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
            allFruit[i - 1].src = "https://jeffreyfan93.github.io/Fruitswap/lib/images/blank_white_square.png";
          }

        }
      }
    }
    return grid;
  }
}

module.exports = Board;
