const Util = {
  inherits (childClass, parentClass) {
    childclass.prototype = Object.new(parentClass.prototype);
    childclass.prototype.constructor = childclass;
  }
}

module.exports = Util;
