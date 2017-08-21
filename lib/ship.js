const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');

function Ship(options) {
  options.color = Ship.COLOR;
  options.radius = Ship.RADIUS;
  options.vel = [0,0];
  this.canFire = true;
  MovingObject.call(this, options);
}

Ship.COLOR = '#bcffeb';
Ship.RADIUS = 10;
Ship.SPEED = 6;

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  var randomPos = this.game.randomPosition();
  this.posX = randomPos[0];
  this.posY = randomPos[1];
  this.velX = 0;
  this.velY = 0;
};

Ship.prototype.power = function (impulse) {
  this.velX = this.velX + impulse[0] >= Ship.SPEED ? 5 : this.velX + impulse[0];
  this.velY = this.velY + impulse[1] >= Ship.SPEED ? 5 : this.velY + impulse[1];
};

Ship.prototype.fireBullet = function () {
  if(!this.canFire) return;

  this.canFire = false;
  var that = this;
  setTimeout(function() {
    that.canFire = true;
  },100);

  var norm = Util.norm(this.velX, this.velY);
  if(norm === 0) return;

  var relVel = Util.scale(Util.dir(this.velX, this.velY), Bullet.SPEED);
  var bulletVel = [relVel[0] + this.velX, relVel[1] + this.velY];

  var bullet = new Bullet({
    pos: [this.posX,this.posY],
    vel: bulletVel,
    game: this.game
  });

  this.game.add(bullet);
};

module.exports = Ship;
