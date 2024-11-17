/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ex05/constants.js":
/*!***************************!*\
  !*** ./ex05/constants.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   COLS: () => (/* binding */ COLS),\n/* harmony export */   RESOLUTION: () => (/* binding */ RESOLUTION),\n/* harmony export */   ROWS: () => (/* binding */ ROWS)\n/* harmony export */ });\n// constants.js\nvar ROWS = 50;\nvar COLS = 50;\nvar RESOLUTION = 10;\n\n//# sourceURL=webpack://ch17/./ex05/constants.js?");

/***/ }),

/***/ "./ex05/gridUtils.js":
/*!***************************!*\
  !*** ./ex05/gridUtils.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid),\n/* harmony export */   updateGrid: () => (/* binding */ updateGrid)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./ex05/constants.js\");\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\n// gridUtils.js\n\n\n/**\r\n * grid を canvas に描画\r\n * @param {CanvasRenderingContext2D} ctx - 描画用のコンテキスト\r\n * @param {Array} grid - セルの状態を表す2次元配列\r\n */\nfunction renderGrid(ctx, grid) {\n  for (var row = 0; row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {\n    for (var col = 0; col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {\n      var cell = grid[row][col];\n      ctx.beginPath();\n      ctx.rect(col * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, row * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);\n      ctx.fillStyle = cell ? \"black\" : \"white\";\n      ctx.fill();\n      ctx.stroke();\n    }\n  }\n}\n\n/**\r\n * Life Game のルールに従ってセルを更新\r\n * @param {Array} grid - 現在のセルの状態を表す2次元配列\r\n * @returns {Array} - 更新されたセルの状態を表す2次元配列\r\n */\nfunction updateGrid(grid) {\n  var nextGrid = grid.map(function (arr) {\n    return _toConsumableArray(arr);\n  });\n  for (var row = 0; row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {\n    for (var col = 0; col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {\n      var cell = grid[row][col];\n      var numNeighbors = 0;\n      for (var i = -1; i < 2; i++) {\n        for (var j = -1; j < 2; j++) {\n          if (i === 0 && j === 0) continue;\n          var x = row + i;\n          var y = col + j;\n          if (x >= 0 && x < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS && y >= 0 && y < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS) {\n            numNeighbors += grid[x][y] ? 1 : 0;\n          }\n        }\n      }\n      if (cell && (numNeighbors < 2 || numNeighbors > 3)) {\n        nextGrid[row][col] = false;\n      } else if (!cell && numNeighbors === 3) {\n        nextGrid[row][col] = true;\n      }\n    }\n  }\n  return nextGrid;\n}\n\n//# sourceURL=webpack://ch17/./ex05/gridUtils.js?");

/***/ }),

/***/ "./ex05/index.js":
/*!***********************!*\
  !*** ./ex05/index.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./ex05/constants.js\");\n/* harmony import */ var _gridUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gridUtils.js */ \"./ex05/gridUtils.js\");\n// index.js\n\n\nvar canvas = document.querySelector(\"#screen\");\nvar ctx = canvas.getContext(\"2d\");\nvar startButton = document.querySelector(\"#start\");\nvar pauseButton = document.querySelector(\"#pause\");\ncanvas.width = _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;\ncanvas.height = _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;\nvar animationId = null;\nvar sound = new Audio(\"./decision1.mp3\");\nvar grid = new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS).fill(null).map(function () {\n  return new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS).fill(null).map(function () {\n    return !!Math.floor(Math.random() * 2);\n  });\n});\ncanvas.addEventListener(\"click\", function (evt) {\n  var rect = canvas.getBoundingClientRect();\n  var pos = {\n    x: evt.clientX - rect.left,\n    y: evt.clientY - rect.top\n  };\n  var row = Math.floor(pos.y / _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);\n  var col = Math.floor(pos.x / _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);\n  grid[row][col] = !grid[row][col];\n  sound.cloneNode().play();\n  (0,_gridUtils_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(ctx, grid);\n});\nfunction update() {\n  grid = (0,_gridUtils_js__WEBPACK_IMPORTED_MODULE_1__.updateGrid)(grid);\n  (0,_gridUtils_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(ctx, grid);\n  animationId = requestAnimationFrame(update);\n}\nstartButton.addEventListener(\"click\", function () {\n  if (animationId) return;\n  update();\n});\npauseButton.addEventListener(\"click\", function () {\n  if (!animationId) return;\n  cancelAnimationFrame(animationId);\n  animationId = null;\n});\n(0,_gridUtils_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(ctx, grid);\n\n//# sourceURL=webpack://ch17/./ex05/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ex05/index.js");
/******/ 	
/******/ })()
;