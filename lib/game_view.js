const Game = require('./game.js');

function GameView(game, context) {
  this.context = context;
  this.game = game;
};

GameView.prototype.start = function () {

  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function() {
  this.game.step();
  this.game.draw(this.context);

  requestAnimationFrame(this.animate.bind(this));
};


module.exports = GameView;
