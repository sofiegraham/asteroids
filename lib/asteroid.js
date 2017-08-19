const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

function Asteroid(options) {
  //var this.posX = options.pos[0];
  //var this.posY = options.pos[1];
  var this.color = Asteroid.COLOR;
  var this.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(9999);
  MovingObject.call(options);
}

Asteroid.COLOR = '#ffd6e8';
Asteroid.RADIUS = 5;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
