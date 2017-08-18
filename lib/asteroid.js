const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

function Asteroid(options) {
  MovingObject.call()
}

Asteroid.COLOR = '#ffd6e8';
Asteroid.RADIUS = 5;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
