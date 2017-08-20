const Game = require('./game.js');

function GameView(game, context) {
  this.context = context;
  this.game = game;
};

GameView.prototype.start = function () {
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function() {
  this.bindKeyHandlers();
  this.game.step();
  this.game.draw(this.context);
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function () {
  if(key.isPressed('W')) this.game.ship.power([0,-0.1]);
  if(key.isPressed('S')) this.game.ship.power([0,0.1]);
  if(key.isPressed('A')) this.game.ship.power([-0.1,0]);
  if(key.isPressed('D')) this.game.ship.power([0.1,0]);

  if(key.isPressed('M')) this.game.ship.fireBullet();

};

module.exports = GameView;
