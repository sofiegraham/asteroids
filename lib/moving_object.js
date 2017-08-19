function MovingObject(options) {
  this.posX = options.pos[0];
  this.posY = options.pos[1];
  this.velX = options.vel[0];
  this.velY = options.vel[1];
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  debugger;
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
MovingObject.prototype.move = function() {
  this.posX += this.velX;
  this.posY += this.velY;
  this.posX = this.game.wrap(this.posX, 'X');
  this.posY = this.game.wrap(this.posY, 'Y');
};

module.exports = MovingObject;
