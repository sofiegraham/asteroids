const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

function Asteroid(options) {
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(Asteroid.SPEED);
  MovingObject.call(this, options);
};

Asteroid.COLOR = '#ffd6e8';
Asteroid.RADIUS = 50;
Asteroid.SPEED = 1;

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherObj) {
  if(otherObj instanceof Ship) {
    otherObj.relocate();
  } else if(otherObj instanceof Bullet) {
    this.game.remove(this);
    this.game.remove(otherObj);
  }
};

module.exports = Asteroid;
