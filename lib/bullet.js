const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');

function Bullet(options) {
  options.radius = Bullet.RADIUS;
  options.color = Bullet.COLOR;
  MovingObject.call(this, options);
}

Bullet.COLOR = '#ffffff';
Bullet.RADIUS = 5;
Bullet.SPEED = 5;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.wrappable = false;

// Bullet.prototype.collideWith = function(otherObj) {
// 
// };

module.exports = Bullet;
