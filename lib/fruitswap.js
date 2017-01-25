const drawGrid = require('./board');
const allowDrop = require('./swap_logic');
const drag = require('./swap_logic');
const drop = require('./swap_logic');

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("game-grid").appendChild(drawGrid(8,8));
});
