const Game = require('./game.js');

function GameView(game, context) {
  this.context = context;
  this.game = game;
  this.lastTime = 0;
};

GameView.prototype.start = function () {
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(timestamp) {
  var delta = timestamp - this.lastTime;
  this.bindKeyHandlers();
  this.game.step(delta);
  this.game.draw(this.context);
  this.lastTime = timestamp;
  requestAnimationFrame(this.animate.bind(this));

};

GameView.prototype.bindKeyHandlers = function () {
  if(key.isPressed('W')) this.game.ship.power([0,-0.1]);
  if(key.isPressed('S')) this.game.ship.power([0,0.1]);
  if(key.isPressed('A')) this.game.ship.power([-0.1,0]);
  if(key.isPressed('D')) this.game.ship.power([0.1,0]);

  if(key.isPressed('space')) this.game.ship.fireBullet();

};

module.exports = GameView;
