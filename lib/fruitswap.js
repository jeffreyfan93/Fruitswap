const Game = require('./game');
const Board = require('./board');
const allowDrop = require('./swap_logic');
const drag = require('./swap_logic');
const drop = require('./swap_logic');

document.addEventListener("DOMContentLoaded", () => {
  window.Game = new Game();
});
