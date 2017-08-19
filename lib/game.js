const Util = require('./utils.js');
const Asteroid = require('./asteroid.js');

function Game() {
  this.asteroids = [];
  this.addAsteroids();
};

Game.DIM_X = 1000;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
  }
};

Game.prototype.randomPosition = function () {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function (context) {
  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  context.fillStyle = '#e6e6e6';
  context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.asteroids.forEach(function(el) {
    el.draw(context);
  })
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(function(el) {
    el.move();
  });
};

Game.prototype.wrap = function(pos, axis) {
  var dimAxis = axis === 'X' ? Game.DIM_X : Game.DIM_Y;
  var newPos = pos < 0 ? dimAxis + pos : pos > dimAxis ? pos - dimAxis : pos;
  return newPos;
};

module.exports = Game;
