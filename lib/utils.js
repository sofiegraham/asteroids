const Util = {
  inherits (childClass, parentClass) {
    childclass.prototype = Object.new(parentClass.prototype);
    childclass.prototype.constructor = childclass;
  },

  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }

}

module.exports = Util;
