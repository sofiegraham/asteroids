const Util = require('./utils.js');

function MovingObject(options) {
  this.posX = options.pos[0];
  this.posY = options.pos[1];
  this.velX = options.vel[0];
  this.velY = options.vel[1];
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

/*
const mo = new MovingObject(
  { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
);

*/

//draw and fill with color in the correct position
MovingObject.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.beginPath();

  context.arc(
    this.posX,
    this.posY,
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  context.fill();

};

//Increment pos by vel
MovingObject.prototype.move = function(timeDelta) {
  var delta = timeDelta || 1;
  this.posX += this.velX * (delta / 20);
  this.posY += this.velY * (delta / 20);
  if(this.game.isOutOfBounds(this.posX, this.posY)) {
    if(this.wrappable) {
      this.posX = this.game.wrap(this.posX, 'X');
      this.posY = this.game.wrap(this.posY, 'Y');
    } else {
      this.game.remove(this);
    }
  }
};

MovingObject.prototype.isCollidedWith = function(otherObj) {
  var distance = Util.dist([this.posX, this.posY], [otherObj.posX,otherObj.posY]);
  var collision = distance < this.radius + otherObj.radius;
  if(collision) this.collideWith(otherObj);
}

MovingObject.prototype.collideWith = function (otherObj) {
  //this.game.remove(otherObj);
  //this.game.remove(this);
};

MovingObject.prototype.wrappable = true;

module.exports = MovingObject;
