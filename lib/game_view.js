const Game = require('./game.js');

function GameView(context) {
  this.context = context;
  this.game = new Game;
}

GameView.prototype.start = function() {
  setInterval(function() {
    game.moveObjects();
    game.draw();
  }, 20);

}

module.exports = Game;
