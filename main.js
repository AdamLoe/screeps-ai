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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Actions/creepActions-harvester.js":
/*!***********************************************!*\
  !*** ./src/Actions/creepActions-harvester.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = (creep) => {\r\n\r\n\r\n\r\n    if (creep.memory.index === undefined) {\r\n        //Assign Harvester\r\n    }\r\n\r\n    //Function sent from previous file\r\n    let work = () => {\r\n\r\n    };\r\n\r\n    //Defined in this file\r\n    let harvest = () => {\r\n\r\n    };\r\n\r\n    //Factor in Distance, Energy Left, Current Workers, Workers En Route\r\n    let acquireTarget = () => {\r\n\r\n    };\r\n\r\n\r\n    /*\r\n     if (isHarvesting) {\r\n     if (isCreepFull) {\r\n     work();\r\n     } else {\r\n     if (targetIsAcquired && targetNotEmpty) {\r\n     harvest();\r\n     } else {\r\n     acquireTarget();\r\n     }\r\n     }\r\n     }\r\n     if (working) {\r\n     if (energy empty)\r\n     harvest\r\n     else\r\n     if work done\r\n     new work\r\n     else\r\n     work\r\n     }\r\n     */\r\n\r\n\r\n    if (creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {\r\n\r\n    }\r\n    else if (creep.memory.building && creep.carry.energy === 0) {\r\n\r\n    }\r\n\r\n    if (creep.memory.harvesting) {\r\n\r\n    } else {\r\n\r\n    }\r\n};\r\n\r\n/*\r\n let sources = creep.room.find( FIND_SOURCES );\r\n let structTypes = [\r\n STRUCTURE_EXTENSION,\r\n STRUCTURE_SPAWN,\r\n STRUCTURE_STORAGE,\r\n STRUCTURE_TOWER\r\n ];\r\n let targets = creep.room.find( FIND_STRUCTURES, {\r\n filter: struct => (\r\n (struct.structureType in structTypes) &&\r\n (struct.energy < struct.energyCapacity)\r\n )\r\n });\r\n */\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQWN0aW9ucy9jcmVlcEFjdGlvbnMtaGFydmVzdGVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0FjdGlvbnMvY3JlZXBBY3Rpb25zLWhhcnZlc3Rlci5qcz8yZjkzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gKGNyZWVwKSA9PiB7XHJcblxyXG5cclxuXHJcbiAgICBpZiAoY3JlZXAubWVtb3J5LmluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvL0Fzc2lnbiBIYXJ2ZXN0ZXJcclxuICAgIH1cclxuXHJcbiAgICAvL0Z1bmN0aW9uIHNlbnQgZnJvbSBwcmV2aW91cyBmaWxlXHJcbiAgICBsZXQgd29yayA9ICgpID0+IHtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vRGVmaW5lZCBpbiB0aGlzIGZpbGVcclxuICAgIGxldCBoYXJ2ZXN0ID0gKCkgPT4ge1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy9GYWN0b3IgaW4gRGlzdGFuY2UsIEVuZXJneSBMZWZ0LCBDdXJyZW50IFdvcmtlcnMsIFdvcmtlcnMgRW4gUm91dGVcclxuICAgIGxldCBhY3F1aXJlVGFyZ2V0ID0gKCkgPT4ge1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgaWYgKGlzSGFydmVzdGluZykge1xyXG4gICAgIGlmIChpc0NyZWVwRnVsbCkge1xyXG4gICAgIHdvcmsoKTtcclxuICAgICB9IGVsc2Uge1xyXG4gICAgIGlmICh0YXJnZXRJc0FjcXVpcmVkICYmIHRhcmdldE5vdEVtcHR5KSB7XHJcbiAgICAgaGFydmVzdCgpO1xyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgYWNxdWlyZVRhcmdldCgpO1xyXG4gICAgIH1cclxuICAgICB9XHJcbiAgICAgfVxyXG4gICAgIGlmICh3b3JraW5nKSB7XHJcbiAgICAgaWYgKGVuZXJneSBlbXB0eSlcclxuICAgICBoYXJ2ZXN0XHJcbiAgICAgZWxzZVxyXG4gICAgIGlmIHdvcmsgZG9uZVxyXG4gICAgIG5ldyB3b3JrXHJcbiAgICAgZWxzZVxyXG4gICAgIHdvcmtcclxuICAgICB9XHJcbiAgICAgKi9cclxuXHJcblxyXG4gICAgaWYgKGNyZWVwLm1lbW9yeS5oYXJ2ZXN0aW5nICYmIGNyZWVwLmNhcnJ5LmVuZXJneSA9PT0gY3JlZXAuY2FycnlDYXBhY2l0eSkge1xyXG5cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGNyZWVwLm1lbW9yeS5idWlsZGluZyAmJiBjcmVlcC5jYXJyeS5lbmVyZ3kgPT09IDApIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNyZWVwLm1lbW9yeS5oYXJ2ZXN0aW5nKSB7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG4vKlxyXG4gbGV0IHNvdXJjZXMgPSBjcmVlcC5yb29tLmZpbmQoIEZJTkRfU09VUkNFUyApO1xyXG4gbGV0IHN0cnVjdFR5cGVzID0gW1xyXG4gU1RSVUNUVVJFX0VYVEVOU0lPTixcclxuIFNUUlVDVFVSRV9TUEFXTixcclxuIFNUUlVDVFVSRV9TVE9SQUdFLFxyXG4gU1RSVUNUVVJFX1RPV0VSXHJcbiBdO1xyXG4gbGV0IHRhcmdldHMgPSBjcmVlcC5yb29tLmZpbmQoIEZJTkRfU1RSVUNUVVJFUywge1xyXG4gZmlsdGVyOiBzdHJ1Y3QgPT4gKFxyXG4gKHN0cnVjdC5zdHJ1Y3R1cmVUeXBlIGluIHN0cnVjdFR5cGVzKSAmJlxyXG4gKHN0cnVjdC5lbmVyZ3kgPCBzdHJ1Y3QuZW5lcmd5Q2FwYWNpdHkpXHJcbiApXHJcbiB9KTtcclxuICovXHJcblxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Actions/creepActions-harvester.js\n");

/***/ }),

/***/ "./src/Actions/creepActions.js":
/*!*************************************!*\
  !*** ./src/Actions/creepActions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let harvesterAction = __webpack_require__(/*! ./creepActions-harvester */ \"./src/Actions/creepActions-harvester.js\");\r\n\r\nmodule.exports = () => {\r\n    for (let name in Game.creeps) {\r\n        let creep = Game.creeps[name];\r\n\r\n        let role = creep.memory.currentRole;\r\n\r\n        if (role === 'harvester') harvesterAction(creep);\r\n    }\r\n};\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQWN0aW9ucy9jcmVlcEFjdGlvbnMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQWN0aW9ucy9jcmVlcEFjdGlvbnMuanM/NjZhNiJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgaGFydmVzdGVyQWN0aW9uID0gcmVxdWlyZSgnLi9jcmVlcEFjdGlvbnMtaGFydmVzdGVyJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcclxuICAgIGZvciAobGV0IG5hbWUgaW4gR2FtZS5jcmVlcHMpIHtcclxuICAgICAgICBsZXQgY3JlZXAgPSBHYW1lLmNyZWVwc1tuYW1lXTtcclxuXHJcbiAgICAgICAgbGV0IHJvbGUgPSBjcmVlcC5tZW1vcnkuY3VycmVudFJvbGU7XHJcblxyXG4gICAgICAgIGlmIChyb2xlID09PSAnaGFydmVzdGVyJykgaGFydmVzdGVyQWN0aW9uKGNyZWVwKTtcclxuICAgIH1cclxufTtcclxuXHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Actions/creepActions.js\n");

/***/ }),

/***/ "./src/Actions/towerActions.js":
/*!*************************************!*\
  !*** ./src/Actions/towerActions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = () => {\r\n\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQWN0aW9ucy90b3dlckFjdGlvbnMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQWN0aW9ucy90b3dlckFjdGlvbnMuanM/ZTRkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcclxuXHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Actions/towerActions.js\n");

/***/ }),

/***/ "./src/Helpers/cleanup.js":
/*!********************************!*\
  !*** ./src/Helpers/cleanup.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = () => {\r\n\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvSGVscGVycy9jbGVhbnVwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0hlbHBlcnMvY2xlYW51cC5qcz8zY2Q1Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xyXG5cclxufTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Helpers/cleanup.js\n");

/***/ }),

/***/ "./src/Helpers/logger.js":
/*!*******************************!*\
  !*** ./src/Helpers/logger.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = () => {\r\n    console.log('------------------------------------');\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvSGVscGVycy9sb2dnZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvSGVscGVycy9sb2dnZXIuanM/ZWVlNCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcclxufTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Helpers/logger.js\n");

/***/ }),

/***/ "./src/Helpers/timer.js":
/*!******************************!*\
  !*** ./src/Helpers/timer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = () => {\r\n\r\n};\r\n\r\n/*\r\n    Builders should delete roads below a certain threshold\r\n\r\n    Road 8.3x Efficiency Building\r\n    Container 25x Efficiency Building\r\n        Build  - 60 Energy  - 300\r\n        Repair - 500 Energy - 2500\r\n        8.3x Efficient\r\n\r\n\r\n\r\n    Build Container Inside\r\n         1000 / (25kt * 10e/t) 99.6% Efficiency\r\n    Build Container Outside\r\n         1000 / (5kt * 10e/t)  98% Efficiency\r\n\r\n    Repair Container Inside\r\n        1/t, 1 / 10 = 90% Efficiency\r\n    Repair Container, Outside\r\n        5/t, 5 / 10 = 50% Efficiency\r\n\r\n     Drop Farming 3000 Pickup\r\n        16 Work, 32 Carry, 96 Dropped, 97% Efficiency\r\n     Drop Farming 1000 Pickup\r\n        16 Work, 32 Carry, 48 Drop, 98.5% Efficiency\r\n\r\n    Internal Carrying\r\n    16 Move, 32 Work  =  1mv/t\r\n    10 Move, 40 Work  =  2mv/t\r\n    10 Move, 20 Work, 20 Carry\r\n\r\n    //Every 100 Ticks, Assign a Builder, Builder will transform into previous role after it fixes everything\r\n    Actors\r\n    ------------\r\n    Creep\r\n        Harvest\r\n            //\r\n        Store\r\n        Upgrade\r\n        Repair\r\n             //20 Work = 400 Repair / 40 Energy / Tick = 1000 Storage = 25 Ticks = 10k Healing\r\n             //30 Work = 600 Repair / 60 Energy / Tick = 500 Storage  = 8.25 Ticks = 5k Healing\r\n        Build\r\n            //20 Work = 100 Build / 20 Energy / Tick = 1000 Storage = 50 Ticks = 5000 Points\r\n         ReserveController\r\n             -16 Move, 32 Claim, 1/ptRoad     161 = 4991\r\n             -10 Move, 40 Claim, 2/pt Road    128 = 4992\r\n             - 7 Move, 42 Claim, 3/pt Road    122 = 5000\r\n             -161 Steps to Get Room to 4991\r\n             -Lets give 40 ticks to get to next room\r\n             -1500 Ticks * 7.5 Rooms * 1.5 Avg Srcs * 10 energy / tick\r\n             -8000 Energy Cost, 562,500 Potential Energy\r\n\r\n        Road      | 300 Cost, .1 Maintenance\r\n        Container | 5000 Cost, 1 IR Maintenance, 5 OR Maintenance\r\n        Extension | 3000 Cost\r\n        Spawn     | 15,000 Cost\r\n        Tower     | 5,000 Cost\r\n\r\n     Structure Types\r\n     --------------\r\n     Extension - Should be built near sources\r\n        3000 Cost\r\n     Container - Store Resources\r\n        5000 Cost\r\n        250,000 Hits, 5000 hit\r\n     Link\r\n        5000 Cost\r\n     Road\r\n        300 Cost, 25,000 HP\r\n        1000 / 100t, CreepStep is 1/body Part\r\n        Repair is 20 hp / 2 energy / tick\r\n     Storage\r\n        30,000 Cost\r\n     Spawn\r\n        15,000 Cost\r\n     Tower\r\n        5,000 Cost\r\n        10 Energy / Action\r\n        800 Hits at 5, 200 hits at 20\r\n     ConstructedWall\r\n     Source\r\n     Rampart\r\n\r\n */\r\n/*\r\n     -1    ERR_NOT_OWNER\r\n     -4    ERR_BUSY  being spawned\r\n     -6    ERR_NOT_ENOUGH_RESOURCES\r\n     -7    ERR_INVALID_TARGET  wont work with block\r\n     -8    ERR_FULL\r\n     -9    ERR_NOT_IN_RANGE\r\n     -10   ERR_INVALID_ARGS\r\n     -12   ERR_NO_BODY\r\n     -14   ERR_RCL_NOT_ENOUGH\r\n           ERR_TIRED\r\n           ERR_NO_PATH\r\n */\r\n\r\n/*\r\n    Spawn\r\n    ------------------\r\n    300 Base, 50+ per extension\r\n    BodyParts * 3 ticks\r\n    MaxCreep = 50\r\n    5000 cost, 1000 seconds\r\n\r\n    Extension\r\n    -----------------\r\n    3000 Cost, 600 seconds w/ One Body Part\r\n\r\n    Time\r\n    ---------------\r\n    Game.time % 25 != 0,  check every 25 ticks\r\n */\r\n\r\n/*\r\n\r\n\r\n\r\n *///# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvSGVscGVycy90aW1lci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9IZWxwZXJzL3RpbWVyLmpzPzcyNDMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XHJcblxyXG59O1xyXG5cclxuLypcclxuICAgIEJ1aWxkZXJzIHNob3VsZCBkZWxldGUgcm9hZHMgYmVsb3cgYSBjZXJ0YWluIHRocmVzaG9sZFxyXG5cclxuICAgIFJvYWQgOC4zeCBFZmZpY2llbmN5IEJ1aWxkaW5nXHJcbiAgICBDb250YWluZXIgMjV4IEVmZmljaWVuY3kgQnVpbGRpbmdcclxuICAgICAgICBCdWlsZCAgLSA2MCBFbmVyZ3kgIC0gMzAwXHJcbiAgICAgICAgUmVwYWlyIC0gNTAwIEVuZXJneSAtIDI1MDBcclxuICAgICAgICA4LjN4IEVmZmljaWVudFxyXG5cclxuXHJcblxyXG4gICAgQnVpbGQgQ29udGFpbmVyIEluc2lkZVxyXG4gICAgICAgICAxMDAwIC8gKDI1a3QgKiAxMGUvdCkgOTkuNiUgRWZmaWNpZW5jeVxyXG4gICAgQnVpbGQgQ29udGFpbmVyIE91dHNpZGVcclxuICAgICAgICAgMTAwMCAvICg1a3QgKiAxMGUvdCkgIDk4JSBFZmZpY2llbmN5XHJcblxyXG4gICAgUmVwYWlyIENvbnRhaW5lciBJbnNpZGVcclxuICAgICAgICAxL3QsIDEgLyAxMCA9IDkwJSBFZmZpY2llbmN5XHJcbiAgICBSZXBhaXIgQ29udGFpbmVyLCBPdXRzaWRlXHJcbiAgICAgICAgNS90LCA1IC8gMTAgPSA1MCUgRWZmaWNpZW5jeVxyXG5cclxuICAgICBEcm9wIEZhcm1pbmcgMzAwMCBQaWNrdXBcclxuICAgICAgICAxNiBXb3JrLCAzMiBDYXJyeSwgOTYgRHJvcHBlZCwgOTclIEVmZmljaWVuY3lcclxuICAgICBEcm9wIEZhcm1pbmcgMTAwMCBQaWNrdXBcclxuICAgICAgICAxNiBXb3JrLCAzMiBDYXJyeSwgNDggRHJvcCwgOTguNSUgRWZmaWNpZW5jeVxyXG5cclxuICAgIEludGVybmFsIENhcnJ5aW5nXHJcbiAgICAxNiBNb3ZlLCAzMiBXb3JrICA9ICAxbXYvdFxyXG4gICAgMTAgTW92ZSwgNDAgV29yayAgPSAgMm12L3RcclxuICAgIDEwIE1vdmUsIDIwIFdvcmssIDIwIENhcnJ5XHJcblxyXG4gICAgLy9FdmVyeSAxMDAgVGlja3MsIEFzc2lnbiBhIEJ1aWxkZXIsIEJ1aWxkZXIgd2lsbCB0cmFuc2Zvcm0gaW50byBwcmV2aW91cyByb2xlIGFmdGVyIGl0IGZpeGVzIGV2ZXJ5dGhpbmdcclxuICAgIEFjdG9yc1xyXG4gICAgLS0tLS0tLS0tLS0tXHJcbiAgICBDcmVlcFxyXG4gICAgICAgIEhhcnZlc3RcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICBTdG9yZVxyXG4gICAgICAgIFVwZ3JhZGVcclxuICAgICAgICBSZXBhaXJcclxuICAgICAgICAgICAgIC8vMjAgV29yayA9IDQwMCBSZXBhaXIgLyA0MCBFbmVyZ3kgLyBUaWNrID0gMTAwMCBTdG9yYWdlID0gMjUgVGlja3MgPSAxMGsgSGVhbGluZ1xyXG4gICAgICAgICAgICAgLy8zMCBXb3JrID0gNjAwIFJlcGFpciAvIDYwIEVuZXJneSAvIFRpY2sgPSA1MDAgU3RvcmFnZSAgPSA4LjI1IFRpY2tzID0gNWsgSGVhbGluZ1xyXG4gICAgICAgIEJ1aWxkXHJcbiAgICAgICAgICAgIC8vMjAgV29yayA9IDEwMCBCdWlsZCAvIDIwIEVuZXJneSAvIFRpY2sgPSAxMDAwIFN0b3JhZ2UgPSA1MCBUaWNrcyA9IDUwMDAgUG9pbnRzXHJcbiAgICAgICAgIFJlc2VydmVDb250cm9sbGVyXHJcbiAgICAgICAgICAgICAtMTYgTW92ZSwgMzIgQ2xhaW0sIDEvcHRSb2FkICAgICAxNjEgPSA0OTkxXHJcbiAgICAgICAgICAgICAtMTAgTW92ZSwgNDAgQ2xhaW0sIDIvcHQgUm9hZCAgICAxMjggPSA0OTkyXHJcbiAgICAgICAgICAgICAtIDcgTW92ZSwgNDIgQ2xhaW0sIDMvcHQgUm9hZCAgICAxMjIgPSA1MDAwXHJcbiAgICAgICAgICAgICAtMTYxIFN0ZXBzIHRvIEdldCBSb29tIHRvIDQ5OTFcclxuICAgICAgICAgICAgIC1MZXRzIGdpdmUgNDAgdGlja3MgdG8gZ2V0IHRvIG5leHQgcm9vbVxyXG4gICAgICAgICAgICAgLTE1MDAgVGlja3MgKiA3LjUgUm9vbXMgKiAxLjUgQXZnIFNyY3MgKiAxMCBlbmVyZ3kgLyB0aWNrXHJcbiAgICAgICAgICAgICAtODAwMCBFbmVyZ3kgQ29zdCwgNTYyLDUwMCBQb3RlbnRpYWwgRW5lcmd5XHJcblxyXG4gICAgICAgIFJvYWQgICAgICB8IDMwMCBDb3N0LCAuMSBNYWludGVuYW5jZVxyXG4gICAgICAgIENvbnRhaW5lciB8IDUwMDAgQ29zdCwgMSBJUiBNYWludGVuYW5jZSwgNSBPUiBNYWludGVuYW5jZVxyXG4gICAgICAgIEV4dGVuc2lvbiB8IDMwMDAgQ29zdFxyXG4gICAgICAgIFNwYXduICAgICB8IDE1LDAwMCBDb3N0XHJcbiAgICAgICAgVG93ZXIgICAgIHwgNSwwMDAgQ29zdFxyXG5cclxuICAgICBTdHJ1Y3R1cmUgVHlwZXNcclxuICAgICAtLS0tLS0tLS0tLS0tLVxyXG4gICAgIEV4dGVuc2lvbiAtIFNob3VsZCBiZSBidWlsdCBuZWFyIHNvdXJjZXNcclxuICAgICAgICAzMDAwIENvc3RcclxuICAgICBDb250YWluZXIgLSBTdG9yZSBSZXNvdXJjZXNcclxuICAgICAgICA1MDAwIENvc3RcclxuICAgICAgICAyNTAsMDAwIEhpdHMsIDUwMDAgaGl0XHJcbiAgICAgTGlua1xyXG4gICAgICAgIDUwMDAgQ29zdFxyXG4gICAgIFJvYWRcclxuICAgICAgICAzMDAgQ29zdCwgMjUsMDAwIEhQXHJcbiAgICAgICAgMTAwMCAvIDEwMHQsIENyZWVwU3RlcCBpcyAxL2JvZHkgUGFydFxyXG4gICAgICAgIFJlcGFpciBpcyAyMCBocCAvIDIgZW5lcmd5IC8gdGlja1xyXG4gICAgIFN0b3JhZ2VcclxuICAgICAgICAzMCwwMDAgQ29zdFxyXG4gICAgIFNwYXduXHJcbiAgICAgICAgMTUsMDAwIENvc3RcclxuICAgICBUb3dlclxyXG4gICAgICAgIDUsMDAwIENvc3RcclxuICAgICAgICAxMCBFbmVyZ3kgLyBBY3Rpb25cclxuICAgICAgICA4MDAgSGl0cyBhdCA1LCAyMDAgaGl0cyBhdCAyMFxyXG4gICAgIENvbnN0cnVjdGVkV2FsbFxyXG4gICAgIFNvdXJjZVxyXG4gICAgIFJhbXBhcnRcclxuXHJcbiAqL1xyXG4vKlxyXG4gICAgIC0xICAgIEVSUl9OT1RfT1dORVJcclxuICAgICAtNCAgICBFUlJfQlVTWSAgYmVpbmcgc3Bhd25lZFxyXG4gICAgIC02ICAgIEVSUl9OT1RfRU5PVUdIX1JFU09VUkNFU1xyXG4gICAgIC03ICAgIEVSUl9JTlZBTElEX1RBUkdFVCAgd29udCB3b3JrIHdpdGggYmxvY2tcclxuICAgICAtOCAgICBFUlJfRlVMTFxyXG4gICAgIC05ICAgIEVSUl9OT1RfSU5fUkFOR0VcclxuICAgICAtMTAgICBFUlJfSU5WQUxJRF9BUkdTXHJcbiAgICAgLTEyICAgRVJSX05PX0JPRFlcclxuICAgICAtMTQgICBFUlJfUkNMX05PVF9FTk9VR0hcclxuICAgICAgICAgICBFUlJfVElSRURcclxuICAgICAgICAgICBFUlJfTk9fUEFUSFxyXG4gKi9cclxuXHJcbi8qXHJcbiAgICBTcGF3blxyXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAzMDAgQmFzZSwgNTArIHBlciBleHRlbnNpb25cclxuICAgIEJvZHlQYXJ0cyAqIDMgdGlja3NcclxuICAgIE1heENyZWVwID0gNTBcclxuICAgIDUwMDAgY29zdCwgMTAwMCBzZWNvbmRzXHJcblxyXG4gICAgRXh0ZW5zaW9uXHJcbiAgICAtLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgMzAwMCBDb3N0LCA2MDAgc2Vjb25kcyB3LyBPbmUgQm9keSBQYXJ0XHJcblxyXG4gICAgVGltZVxyXG4gICAgLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBHYW1lLnRpbWUgJSAyNSAhPSAwLCAgY2hlY2sgZXZlcnkgMjUgdGlja3NcclxuICovXHJcblxyXG4vKlxyXG5cclxuXHJcblxyXG4gKi8iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Helpers/timer.js\n");

/***/ }),

/***/ "./src/Spawning/creepSpawner.js":
/*!**************************************!*\
  !*** ./src/Spawning/creepSpawner.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let genBody = (energy, bodyArr) => {\r\n  let body = [];\r\n\r\n   bodyArr.map( (part) => {\r\n\r\n       let num = Math.ceil( Math.floor( energy / part.floor ) / part.ceil );\r\n\r\n       while (num > 0) {\r\n           body.push(part.name);\r\n           num -= 1;\r\n       }\r\n   });\r\n\r\n  return body;\r\n};\r\n\r\n\r\nlet createCreep = (spawn, energy, roleName) => {\r\n\r\n    let body = genBody(energy, [\r\n        { name:  WORK, floor: 200, ceil: 1},\r\n        { name: CARRY, floor: 100, ceil: 2},\r\n        { name:  MOVE, floor:  50, ceil: 4}\r\n    ]);\r\n\r\n    let name = roleName + Math.floor(Math.random()*256+1);\r\n    let memory = {\r\n        originalRole: roleName,\r\n        currentRole: roleName\r\n    };\r\n\r\n    console.log('Spawn: ', spawn, ' created creep:', body, 'with name', name);\r\n    let res = Game.spawns[spawn].spawnCreep(body, name, { memory });\r\n    console.log('res:', res);\r\n};\r\n\r\n\r\nlet creepSpawner = () => {\r\n    let harvesters = _.filter(Game.creeps, (creep) => {\r\n        return creep.memory.currentRole === 'harvester'\r\n    });\r\n\r\n\r\n    for (let spawn in Game.spawns) {\r\n        let room = Game.spawns[spawn].room;\r\n\r\n        var sources = room.find( FIND_SOURCES);\r\n        sources.map(source => {\r\n            console.log(\"source\", source, typeof source, source.id);\r\n            console.log(\"source\", source.ticksToRegeneration);\r\n        });\r\n\r\n        let maxEnergy = room.energyCapacityAvailable;\r\n        let currEnergy = room.energyAvailable;\r\n        console.log('max:', maxEnergy, '  :  ', 'curr:', currEnergy);\r\n        if (maxEnergy === currEnergy) {\r\n            createCreep(spawn, maxEnergy, 'harvester');\r\n        }\r\n\r\n    }\r\n};\r\n\r\nmodule.exports = creepSpawner;\r\n\r\n\r\n\r\n\r\n\r\nlet calcCost = (body) => {\r\n    let cost = 0;\r\n    for (let part in body) {\r\n        cost += BODYPART_COST[part];\r\n    }\r\n    return cost\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU3Bhd25pbmcvY3JlZXBTcGF3bmVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1NwYXduaW5nL2NyZWVwU3Bhd25lci5qcz9lYTg3Il0sInNvdXJjZXNDb250ZW50IjpbImxldCBnZW5Cb2R5ID0gKGVuZXJneSwgYm9keUFycikgPT4ge1xyXG4gIGxldCBib2R5ID0gW107XHJcblxyXG4gICBib2R5QXJyLm1hcCggKHBhcnQpID0+IHtcclxuXHJcbiAgICAgICBsZXQgbnVtID0gTWF0aC5jZWlsKCBNYXRoLmZsb29yKCBlbmVyZ3kgLyBwYXJ0LmZsb29yICkgLyBwYXJ0LmNlaWwgKTtcclxuXHJcbiAgICAgICB3aGlsZSAobnVtID4gMCkge1xyXG4gICAgICAgICAgIGJvZHkucHVzaChwYXJ0Lm5hbWUpO1xyXG4gICAgICAgICAgIG51bSAtPSAxO1xyXG4gICAgICAgfVxyXG4gICB9KTtcclxuXHJcbiAgcmV0dXJuIGJvZHk7XHJcbn07XHJcblxyXG5cclxubGV0IGNyZWF0ZUNyZWVwID0gKHNwYXduLCBlbmVyZ3ksIHJvbGVOYW1lKSA9PiB7XHJcblxyXG4gICAgbGV0IGJvZHkgPSBnZW5Cb2R5KGVuZXJneSwgW1xyXG4gICAgICAgIHsgbmFtZTogIFdPUkssIGZsb29yOiAyMDAsIGNlaWw6IDF9LFxyXG4gICAgICAgIHsgbmFtZTogQ0FSUlksIGZsb29yOiAxMDAsIGNlaWw6IDJ9LFxyXG4gICAgICAgIHsgbmFtZTogIE1PVkUsIGZsb29yOiAgNTAsIGNlaWw6IDR9XHJcbiAgICBdKTtcclxuXHJcbiAgICBsZXQgbmFtZSA9IHJvbGVOYW1lICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjI1NisxKTtcclxuICAgIGxldCBtZW1vcnkgPSB7XHJcbiAgICAgICAgb3JpZ2luYWxSb2xlOiByb2xlTmFtZSxcclxuICAgICAgICBjdXJyZW50Um9sZTogcm9sZU5hbWVcclxuICAgIH07XHJcblxyXG4gICAgY29uc29sZS5sb2coJ1NwYXduOiAnLCBzcGF3biwgJyBjcmVhdGVkIGNyZWVwOicsIGJvZHksICd3aXRoIG5hbWUnLCBuYW1lKTtcclxuICAgIGxldCByZXMgPSBHYW1lLnNwYXduc1tzcGF3bl0uc3Bhd25DcmVlcChib2R5LCBuYW1lLCB7IG1lbW9yeSB9KTtcclxuICAgIGNvbnNvbGUubG9nKCdyZXM6JywgcmVzKTtcclxufTtcclxuXHJcblxyXG5sZXQgY3JlZXBTcGF3bmVyID0gKCkgPT4ge1xyXG4gICAgbGV0IGhhcnZlc3RlcnMgPSBfLmZpbHRlcihHYW1lLmNyZWVwcywgKGNyZWVwKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNyZWVwLm1lbW9yeS5jdXJyZW50Um9sZSA9PT0gJ2hhcnZlc3RlcidcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBmb3IgKGxldCBzcGF3biBpbiBHYW1lLnNwYXducykge1xyXG4gICAgICAgIGxldCByb29tID0gR2FtZS5zcGF3bnNbc3Bhd25dLnJvb207XHJcblxyXG4gICAgICAgIHZhciBzb3VyY2VzID0gcm9vbS5maW5kKCBGSU5EX1NPVVJDRVMpO1xyXG4gICAgICAgIHNvdXJjZXMubWFwKHNvdXJjZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic291cmNlXCIsIHNvdXJjZSwgdHlwZW9mIHNvdXJjZSwgc291cmNlLmlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzb3VyY2VcIiwgc291cmNlLnRpY2tzVG9SZWdlbmVyYXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbWF4RW5lcmd5ID0gcm9vbS5lbmVyZ3lDYXBhY2l0eUF2YWlsYWJsZTtcclxuICAgICAgICBsZXQgY3VyckVuZXJneSA9IHJvb20uZW5lcmd5QXZhaWxhYmxlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXg6JywgbWF4RW5lcmd5LCAnICA6ICAnLCAnY3VycjonLCBjdXJyRW5lcmd5KTtcclxuICAgICAgICBpZiAobWF4RW5lcmd5ID09PSBjdXJyRW5lcmd5KSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNyZWVwKHNwYXduLCBtYXhFbmVyZ3ksICdoYXJ2ZXN0ZXInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVlcFNwYXduZXI7XHJcblxyXG5cclxuXHJcblxyXG5cclxubGV0IGNhbGNDb3N0ID0gKGJvZHkpID0+IHtcclxuICAgIGxldCBjb3N0ID0gMDtcclxuICAgIGZvciAobGV0IHBhcnQgaW4gYm9keSkge1xyXG4gICAgICAgIGNvc3QgKz0gQk9EWVBBUlRfQ09TVFtwYXJ0XTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb3N0XHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Spawning/creepSpawner.js\n");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./Helpers/cleanup */ \"./src/Helpers/cleanup.js\")();\r\n__webpack_require__(/*! ./Helpers/logger */ \"./src/Helpers/logger.js\")();\r\n__webpack_require__(/*! ./Spawning/creepSpawner */ \"./src/Spawning/creepSpawner.js\")();\r\n__webpack_require__(/*! ./Helpers/timer */ \"./src/Helpers/timer.js\")();\r\n__webpack_require__(/*! ./Actions/creepActions */ \"./src/Actions/creepActions.js\")();\r\n__webpack_require__(/*! ./Actions/towerActions */ \"./src/Actions/towerActions.js\")();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYWluLmpzPzU2ZDciXSwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi9IZWxwZXJzL2NsZWFudXAnKSgpO1xyXG5yZXF1aXJlKCcuL0hlbHBlcnMvbG9nZ2VyJykoKTtcclxucmVxdWlyZSgnLi9TcGF3bmluZy9jcmVlcFNwYXduZXInKSgpO1xyXG5yZXF1aXJlKCcuL0hlbHBlcnMvdGltZXInKSgpO1xyXG5yZXF1aXJlKCcuL0FjdGlvbnMvY3JlZXBBY3Rpb25zJykoKTtcclxucmVxdWlyZSgnLi9BY3Rpb25zL3Rvd2VyQWN0aW9ucycpKCk7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main.js\n");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/main.js */"./src/main.js");


/***/ })

/******/ });