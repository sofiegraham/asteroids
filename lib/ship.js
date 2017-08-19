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

Ship.prototype.relocate = function () {
  var randomPos = this.game.randomPosition();
  this.posX = randomPos[0];
  this.posY = randomPos[1];
  this.velX = 0;
  this.velY = 0;
};

module.exports = Ship;
