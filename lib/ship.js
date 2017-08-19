const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

function Ship(options) {
  options.color = Ship.COLOR;
  options.radius = Ship.RADIUS;
  options.vel = [0,0];
  MovingObject.call(this, options);
}

Ship.COLOR = '#bcffeb';
Ship.RADIUS = 10;

Util.inherits(Ship, MovingObject);

module.exports = Ship;
