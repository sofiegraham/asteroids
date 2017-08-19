const GameView = require('./game_view.js');
const Game = require('./game.js');

document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('game-canvas');
  var context = canvas.getContext('2d');
  var game = new Game();
  new GameView(game, context).start();
});
