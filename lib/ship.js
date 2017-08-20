const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');

function Ship(options) {
  options.color = Ship.COLOR;
  options.radius = Ship.RADIUS;
  options.vel = Ship.SPEED;
  MovingObject.call(this, options);
}

Ship.COLOR = '#bcffeb';
Ship.RADIUS = 10;
Ship.SPEED = [0,0];

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  var randomPos = this.game.randomPosition();
  this.posX = randomPos[0];
  this.posY = randomPos[1];
  this.velX = 0;
  this.velY = 0;
};

Ship.prototype.power = function (impulse) {
  this.velX += impulse[0];
  this.velY += impulse[1];
};

Ship.prototype.fireBullet = function () {
  var norm = Util.norm(this.velX, this.velY);


  var relVel = Util.scale(Util.dir(this.velX, this.velY), Bullet.SPEED);


  var bullet = new Bullet({pos: [this.posX,this.posY], game: this.game, vel: Util.scale([this.velX, this.velY], Bullet.SPEED)});
  this.game.add(bullet);
};

module.exports = Ship;
