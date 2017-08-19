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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(1);
const Asteroid = __webpack_require__(4);

function Game() {
  this.asteroids = [];
  this.addAsteroids();
};

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({pos: this.randomPosition()}));
  }
};

Game.prototype.randomPosition = function () {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function (context) {
  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  context.fillStyle = "#e6e6e6";
  context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.asteroids.forEach(function(el) {
    el.draw(context);
  })
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(function(el) {
    el.move();
  });
};

module.exports = Game;


/***/ }),
/* 1 */
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

  scale: function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }

}

module.exports = Util;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(3);
const Game = __webpack_require__(0);

document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('game-canvas');
  var context = canvas.getContext('2d');
  var game = new Game();
  new GameView(game, context).start();
  });


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

function GameView(game, context) {
  debugger;
  this.context = context;
  this.game = game;
};

GameView.prototype.start = function () {
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(time) {
  this.game.moveObjects();
  this.game.draw(this.context);

  requestAnimationFrame(this.animate.bind(this));
};


module.exports = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(1);
const MovingObject = __webpack_require__(5);

function Asteroid(options) {
  //this.posX = options.pos[0];
  //this.posY = options.pos[1];
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(1);
  MovingObject.call(this, options);
};

Asteroid.COLOR = '#ffd6e8';
Asteroid.RADIUS = 50;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

function MovingObject(options) {
  this.posX = options.pos[0];
  this.posY = options.pos[1];
  this.velX = options.vel[0];
  this.velY = options.vel[1];
  this.radius = options.radius;
  this.color = options.color;
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
};

module.exports = MovingObject;


/***/ })
/******/ ]);