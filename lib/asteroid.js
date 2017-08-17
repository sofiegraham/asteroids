const Util = require('./utils.js');

function Asteroid() {
  MovingObject.call()
}

Asteroid.COLOR = '#ffd6e8';
Asteroid.RADIUS = 5;

module.exports = Asteroid;
