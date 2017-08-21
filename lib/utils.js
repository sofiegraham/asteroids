const Util = {
  inherits: function (childClass, parentClass) {
    var Surrogate = function() {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },

  randomVec: function (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale: function (vector, magnitude) {
    return [vector[0] * magnitude, vector[1] * magnitude];
  },

  norm: function(vecX, vecY) {
    return Util.dist([0,0], [vecX,vecY]);
  },

  dir: function (vecX, vecY) {
    var norm = Util.norm(vecX, vecY);
    return Util.scale([vecX,vecY], 1 / norm);
  },

  dist: function(pos1, pos2) {
    var distX = Math.abs(pos1[0] - pos2[0]);
    var distY = Math.abs(pos1[1] - pos2[1]);
    return Math.sqrt((distX * distX) + (distY * distY));
  },

  angle: function(velX, velY) {
    return Math.atan(velY/velX);
  }

}

module.exports = Util;
