/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(1);
const Asteroid = __webpack_require__(4);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const Asteroid = __webpack_require__(4);
const Ship = __webpack_require__(5);
const Bullet = __webpack_require__(2);

function Game() {
  this.asteroids = [];
  this.ship = new Ship({pos: this.randomPosition(), game: this});
  this.bullets = [];
  this.addAsteroids();
  this.objects = this.allObjects();
};

Game.DIM_X = 1000;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
  }
};

Game.prototype.randomPosition = function () {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function (context) {
  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  context.fillStyle = '#554282';
  context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.objects.forEach(function(el) {
    el.draw(context);
  })
};

Game.prototype.moveObjects = function(delta) {
  this.objects.forEach(function(el) {
    el.move(delta);
  });
};

Game.prototype.wrap = function(pos, axis) {
  var dimAxis = axis === 'X' ? Game.DIM_X : Game.DIM_Y;
  var newPos = pos < 0 ? dimAxis + pos : pos > dimAxis ? pos - dimAxis : pos;
  return newPos;
};

Game.prototype.checkCollisions = function () {
  for(var i = 0; i < this.objects.length; i++) {
    for(var j = i + 1; j < this.objects.length; j++) {
      this.objects[i].isCollidedWith(this.objects[j]);
    }
  }
};

Game.prototype.step = function (delta) {
  this.moveObjects(delta);
  this.checkCollisions();
}

Game.prototype.remove = function(object) {
  if(object instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  } else if(object instanceof Asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(object), 1);
  }
  this.objects = this.allObjects();
}

Game.prototype.allObjects = function() {
  return this.asteroids.concat([this.ship]).concat(this.bullets);
}

Game.prototype.add = function (object) {
  if(object instanceof Bullet) {
    this.bullets.push(object);
  } else if(object instanceof Asteroid) {
    this.asteroids.push(object);
  }
  this.objects = this.allObjects();
};

Game.prototype.isOutOfBounds = function(posX, posY) {
  var isX = posX < 0 || posX > Game.DIM_X;
  var isY = posY < 0 || posY > Game.DIM_Y;
  return isX || isY;
};

module.exports = Game;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(1);
const Ship = __webpack_require__(5);
const Bullet = __webpack_require__(2);

function Asteroid(options) {
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(Asteroid.SPEED);
  MovingObject.call(this, options);
};

Asteroid.COLOR = '#ffd6e8';
Asteroid.RADIUS = 50;
Asteroid.SPEED = 1;

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherObj) {
  if(otherObj instanceof Ship) {
    otherObj.relocate();
  } else if(otherObj instanceof Bullet) {
    this.game.remove(this);
    this.game.remove(otherObj);
  }
};

module.exports = Asteroid;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(1);
const Bullet = __webpack_require__(2);

function Ship(options) {
  options.color = Ship.COLOR;
  options.radius = Ship.RADIUS;
  options.vel = [0,0.0000000001];
  this.canFire = true;
  MovingObject.call(this, options);
}
//have a speed and a direction so we can change frames

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
  //Make this stop accelerating
  this.velX = this.velX + impulse[0] >= Ship.SPEED ? 5 : this.velX + impulse[0];
  this.velY = this.velY + impulse[1] >= Ship.SPEED ? 5 : this.velY + impulse[1];
};

// Ship.prototype.draw = function (context) {
//   var angle = Math.atan(this.velY/this.velX);
//   context.fillStyle = this.color;
//   context.beginPath();
//   console.log(angle);
//   //angles
//
//   context.moveTo(this.posX + 5, this.posY + 5);
//   context.lineTo(this.posX + 5, this.posY - 5);
//   context.lineTo(this.posX - 5, this.posY);
//   context.fill();
//
// };

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(7);
const Game = __webpack_require__(3);

document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('game-canvas');
  var context = canvas.getContext('2d');
  var game = new Game();
  new GameView(game, context).start();
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);

function GameView(game, context) {
  this.context = context;
  this.game = game;
  this.lastTime = 0;
};

GameView.prototype.start = function () {
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(timestamp) {
  var delta = timestamp - this.lastTime;
  this.bindKeyHandlers();
  this.game.step(delta);
  this.game.draw(this.context);
  this.lastTime = timestamp;
  requestAnimationFrame(this.animate.bind(this));

};

GameView.prototype.bindKeyHandlers = function () {
  if(key.isPressed('W')) this.game.ship.power([0,-0.1]);
  if(key.isPressed('S')) this.game.ship.power([0,0.1]);
  if(key.isPressed('A')) this.game.ship.power([-0.1,0]);
  if(key.isPressed('D')) this.game.ship.power([0.1,0]);

  if(key.isPressed('space')) this.game.ship.fireBullet();

};

module.exports = GameView;


/***/ })
/******/ ]);