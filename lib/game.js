const Util = require('./utils.js');
const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

function Game() {
  this.asteroids = [];
  this.ship = new Ship({pos: this.randomPosition(), game: this});
  this.bullets = [];
  this.addAsteroids();
  this.objects = this.allObjects();
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
  context.fillStyle = '#554282';
  context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.objects.forEach(function(el) {
    el.draw(context);
  })
};

Game.prototype.moveObjects = function() {
  this.objects.forEach(function(el) {
    el.move();
  });
};

Game.prototype.wrap = function(pos, axis) {
  var dimAxis = axis === 'X' ? Game.DIM_X : Game.DIM_Y;
  var newPos = pos < 0 ? dimAxis + pos : pos > dimAxis ? pos - dimAxis : pos;
  return newPos;
};

Game.prototype.checkCollisions = function () {
  for(var i = 0; i < this.objects.length; i++) {
    for(var j = i + 1; j < this.objects.length; j++) {
      this.objects[i].isCollidedWith(this.objects[j]);
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
}

Game.prototype.remove = function(object) {
  if(object instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  } else if(object instanceof Asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(object), 1);
  }
  this.objects = this.allObjects();
}

Game.prototype.allObjects = function() {
  return this.asteroids.concat([this.ship]).concat(this.bullets);
}

Game.prototype.add = function (object) {
  if(object instanceof Bullet) {
    this.bullets.push(object);
  } else if(object instanceof Asteroid) {
    this.asteroids.push(object);
  }
  this.objects = this.allObjects();
};

module.exports = Game;
