const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');

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
  //this.game.remove(otherObj);
  //this.game.remove(this);
  if(otherObj instanceof Ship) {
    otherObj.relocate();
  }
};

module.exports = Asteroid;
