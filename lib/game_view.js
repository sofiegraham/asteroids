const Game = require('./game.js');

function GameView(game, context) {
  debugger;
  this.context = context;
  this.game = game;
};

GameView.prototype.start = function () {
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(time) {
  this.game.moveObjects();
  this.game.draw(this.context);

  requestAnimationFrame(this.animate.bind(this));
};


module.exports = GameView;
