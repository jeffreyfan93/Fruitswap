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
