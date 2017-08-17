function MovingObject(options) {
  var this.posX = options.pos[0];
  var this.posY = options.pos[1];
  var this.velX = options.vel[0];
  var this.velY = options.vel[1];
  var this.radius = options.radius;
  var this.color = options.color;
}

/*
const mo = new MovingObject(
  { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
);

*/

//draw and fill with color in the correct position
MovingObject.prototype.draw = function (context) {
  context.fillStyle = this.color;
  ctcontextx.beginPath();

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

};

//Increment pos by vel
MovingObject.prototype.move = function() {
  this.posX += this.velX;
  this.posY += this.velY;
};
