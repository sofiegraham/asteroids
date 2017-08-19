const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

function Asteroid(options) {
  //this.posX = options.pos[0];
  //this.posY = options.pos[1];
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(1);
  MovingObject.call(this, options);
};

Asteroid.COLOR = '#ffd6e8';
Asteroid.RADIUS = 50;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
