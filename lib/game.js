const Util = require('./utils.js');

function Game() {

  this.addAsteroids();

};

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  this.asteroids = [];
  for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({pos: this.randomPosition()}));
  }
};

Game.prototype.randomPosition = function () {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function (context) {
  clearRect(context);
  this.asteroids.forEach(function(el) {
    el.draw();
  })
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(function(el) {
    el.move();
  });
};

module.exports = Game;
