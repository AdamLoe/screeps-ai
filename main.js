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

/***/ "./src/Actions/Roles/Courier.js":
/*!**************************************!*\
  !*** ./src/Actions/Roles/Courier.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = (creep) => {\r\n\tlet droppedEnergy = room.find(FIND_DROPPED_ENERGY);\r\n\tlet droppedResources = room.find(FIND_DROPPED_RESOURCES);\r\n\r\n\tlet readyContainers = room.find(FIND_MY_STRUCTURES, {\r\n\t\tfilter: (struct) => (\r\n\t\t\tstruct.structureType === STRUCTURE_CONTAINER &&\r\n            struct.store.RESOURCE_ENERGY > 1000\r\n\t\t)\r\n\t});\r\n\r\n\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQWN0aW9ucy9Sb2xlcy9Db3VyaWVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0FjdGlvbnMvUm9sZXMvQ291cmllci5qcz9kYTYwIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gKGNyZWVwKSA9PiB7XHJcblx0bGV0IGRyb3BwZWRFbmVyZ3kgPSByb29tLmZpbmQoRklORF9EUk9QUEVEX0VORVJHWSk7XHJcblx0bGV0IGRyb3BwZWRSZXNvdXJjZXMgPSByb29tLmZpbmQoRklORF9EUk9QUEVEX1JFU09VUkNFUyk7XHJcblxyXG5cdGxldCByZWFkeUNvbnRhaW5lcnMgPSByb29tLmZpbmQoRklORF9NWV9TVFJVQ1RVUkVTLCB7XHJcblx0XHRmaWx0ZXI6IChzdHJ1Y3QpID0+IChcclxuXHRcdFx0c3RydWN0LnN0cnVjdHVyZVR5cGUgPT09IFNUUlVDVFVSRV9DT05UQUlORVIgJiZcclxuICAgICAgICAgICAgc3RydWN0LnN0b3JlLlJFU09VUkNFX0VORVJHWSA+IDEwMDBcclxuXHRcdClcclxuXHR9KTtcclxuXHJcblxyXG59OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Actions/Roles/Courier.js\n");

/***/ }),

/***/ "./src/Actions/Roles/Harvester.js":
/*!****************************************!*\
  !*** ./src/Actions/Roles/Harvester.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let room = \"W8N7\";\r\n\r\nlet defaultActionObj = {\r\n\tharvesting: false,\r\n\tbuilding: false,\r\n\r\n\tsourceId: \"6bfc07721507fca\",\r\n\r\n\tworkParts: 2,\r\n\tcarryParts: 0\r\n};\r\n\r\nmodule.exports = (creep) => {\r\n\tcreep.memory.action = creep.memory.action || defaultActionObj;\r\n\r\n\tlet source = Game.getObjectById(creep.memory.action.sourceId);\r\n\tlet { x, y, roomName } = source.pos;\r\n\r\n\tif (roomName === creep.room.name) {\r\n\r\n\t\tlet distX = Math.abs(x - creep.pos.x)**2;\r\n\t\tlet distY = Math.abs(y - creep.pos.y)**2;\r\n\t\tlet inRange = (distX < 2 && distY < 2);\r\n\r\n\t\tif (inRange) {\r\n\t\t    creep.harvest(source);\r\n\t\t} else {\r\n\t\t\tcreep.moveTo(source);\r\n\t\t}\r\n\t} else {\r\n\t\tcreep.moveTo(source);\r\n\t}\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQWN0aW9ucy9Sb2xlcy9IYXJ2ZXN0ZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQWN0aW9ucy9Sb2xlcy9IYXJ2ZXN0ZXIuanM/ZGVlMyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgcm9vbSA9IFwiVzhON1wiO1xyXG5cclxubGV0IGRlZmF1bHRBY3Rpb25PYmogPSB7XHJcblx0aGFydmVzdGluZzogZmFsc2UsXHJcblx0YnVpbGRpbmc6IGZhbHNlLFxyXG5cclxuXHRzb3VyY2VJZDogXCI2YmZjMDc3MjE1MDdmY2FcIixcclxuXHJcblx0d29ya1BhcnRzOiAyLFxyXG5cdGNhcnJ5UGFydHM6IDBcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGNyZWVwKSA9PiB7XHJcblx0Y3JlZXAubWVtb3J5LmFjdGlvbiA9IGNyZWVwLm1lbW9yeS5hY3Rpb24gfHwgZGVmYXVsdEFjdGlvbk9iajtcclxuXHJcblx0bGV0IHNvdXJjZSA9IEdhbWUuZ2V0T2JqZWN0QnlJZChjcmVlcC5tZW1vcnkuYWN0aW9uLnNvdXJjZUlkKTtcclxuXHRsZXQgeyB4LCB5LCByb29tTmFtZSB9ID0gc291cmNlLnBvcztcclxuXHJcblx0aWYgKHJvb21OYW1lID09PSBjcmVlcC5yb29tLm5hbWUpIHtcclxuXHJcblx0XHRsZXQgZGlzdFggPSBNYXRoLmFicyh4IC0gY3JlZXAucG9zLngpKioyO1xyXG5cdFx0bGV0IGRpc3RZID0gTWF0aC5hYnMoeSAtIGNyZWVwLnBvcy55KSoqMjtcclxuXHRcdGxldCBpblJhbmdlID0gKGRpc3RYIDwgMiAmJiBkaXN0WSA8IDIpO1xyXG5cclxuXHRcdGlmIChpblJhbmdlKSB7XHJcblx0XHQgICAgY3JlZXAuaGFydmVzdChzb3VyY2UpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y3JlZXAubW92ZVRvKHNvdXJjZSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGNyZWVwLm1vdmVUbyhzb3VyY2UpO1xyXG5cdH1cclxufTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Actions/Roles/Harvester.js\n");

/***/ }),

/***/ "./src/Actions/Roles/Worker.js":
/*!*************************************!*\
  !*** ./src/Actions/Roles/Worker.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = (creep) => {\r\n\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQWN0aW9ucy9Sb2xlcy9Xb3JrZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQWN0aW9ucy9Sb2xlcy9Xb3JrZXIuanM/MDAzNyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IChjcmVlcCkgPT4ge1xyXG5cclxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Actions/Roles/Worker.js\n");

/***/ }),

/***/ "./src/Actions/creepActions.js":
/*!*************************************!*\
  !*** ./src/Actions/creepActions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let Courier = __webpack_require__(/*! ./Roles/Courier */ \"./src/Actions/Roles/Courier.js\");\r\nlet Harvester = __webpack_require__(/*! ./Roles/Harvester */ \"./src/Actions/Roles/Harvester.js\");\r\nlet Worker = __webpack_require__(/*! ./Roles/Worker */ \"./src/Actions/Roles/Worker.js\");\r\n\r\nmodule.exports = () => {\r\n\tfor (let name in Game.creeps) {\r\n\t\tlet creep = Game.creeps[name];\r\n\r\n\t\tlet role = creep.memory.currentRole;\r\n\r\n\t\tswitch ( role ) {\r\n\t\t\tcase \"harvester\":\r\n\t\t\t    Harvester(creep);\r\n\t\t\t\tbreak;\r\n\t\t\tcase \"courier\":\r\n\t\t\t    Courier(creep);\r\n\t\t\t\tbreak;\r\n\t\t\tcase \"worker\":\r\n\t\t\t    Worker(creep);\r\n\t\t\t\tbreak;\r\n\t\t}\r\n\t}\r\n};\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQWN0aW9ucy9jcmVlcEFjdGlvbnMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQWN0aW9ucy9jcmVlcEFjdGlvbnMuanM/NjZhNiJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgQ291cmllciA9IHJlcXVpcmUoXCIuL1JvbGVzL0NvdXJpZXJcIik7XHJcbmxldCBIYXJ2ZXN0ZXIgPSByZXF1aXJlKFwiLi9Sb2xlcy9IYXJ2ZXN0ZXJcIik7XHJcbmxldCBXb3JrZXIgPSByZXF1aXJlKFwiLi9Sb2xlcy9Xb3JrZXJcIik7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcclxuXHRmb3IgKGxldCBuYW1lIGluIEdhbWUuY3JlZXBzKSB7XHJcblx0XHRsZXQgY3JlZXAgPSBHYW1lLmNyZWVwc1tuYW1lXTtcclxuXHJcblx0XHRsZXQgcm9sZSA9IGNyZWVwLm1lbW9yeS5jdXJyZW50Um9sZTtcclxuXHJcblx0XHRzd2l0Y2ggKCByb2xlICkge1xyXG5cdFx0XHRjYXNlIFwiaGFydmVzdGVyXCI6XHJcblx0XHRcdCAgICBIYXJ2ZXN0ZXIoY3JlZXApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiY291cmllclwiOlxyXG5cdFx0XHQgICAgQ291cmllcihjcmVlcCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJ3b3JrZXJcIjpcclxuXHRcdFx0ICAgIFdvcmtlcihjcmVlcCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Actions/creepActions.js\n");

/***/ }),

/***/ "./src/Controller/controller.js":
/*!**************************************!*\
  !*** ./src/Controller/controller.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\r\nlet defaultSrcMem = {\r\n\tassignedHarv: null\r\n};\r\n\r\nlet buildHarvester = __webpack_require__(/*! ../Spawning/buildHarvester */ \"./src/Spawning/buildHarvester.js\");\r\n\r\n\r\n\r\n/*\r\n Should Cycle Between Different Spawners\r\n */\r\n\r\n// Returns [ Body, Memory, TicksToBuild ]\r\n\r\n\r\n\r\nmodule.exports = () => {\r\n\r\n\tfor (let name in Game.rooms) {\r\n\t\tlet room = Game.rooms[name];\r\n\r\n\t\tlet coldStart = room.memory.coldStart;\r\n\t\tif (room.memory.coldStart === false) {\r\n\t\t\troom.memory.sources = room.find(FIND_SOURCES).map(src => src.id);\r\n\t\t\troom.memory.spawns  = room.find(FIND_MY_SPAWNS).map(spw => spw.name);\r\n\r\n\t\t\tlet spawn = room.memory.spawns[0];\r\n\t\t\tlet source = room.memory.sources[0];\r\n\r\n\t\t\tGame.spawns[spawn].memory.spawnQueue = [\r\n                buildHarvester(name, source, 300, 5)\r\n            ]\r\n\r\n\r\n\t\t\troom.memory.coldStart = false;\r\n\t\t}\r\n\t\tif (room.memory.coldState === true) {\r\n\r\n\t\t\troom.memory.parentRoom = room.memory.parentRoom || null;\r\n\t\t\tlet parentRoom = room.memory.parent;\r\n\r\n\t\t\tlet sources = room.find(FIND_SOURCES);\r\n\t\t\tsources.map( ({ id }) => {\r\n\t\t\t\tconsole.log(\"id\", id);\r\n\t\t\t\tif (Memory.sources.id === undefined) Memory.sources.id = defaultSrcMem;\r\n\r\n\t\t\t\tlet { assignedHarv } = Memory.sources[id];\r\n\r\n\t\t\t\tif (assignedHarv === null || !(assignedHarv in Game.creeps)) {\r\n\t\t\t\t\tconsole.log(\"Creep Dead Or Something\");\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t}\r\n\t}\r\n\r\n};\r\n\r\n/*\r\n\r\n Game.spawns.Spawn1.spawnCreep([MOVE, MOVE, WORK], 1)\r\n\r\nfor (let name in Game.rooms) {\r\n\r\n    let room =  Game.rooms[name];\r\n    let controller = room.controller;\r\n\r\n     let owned = controller.my;\r\n     let parent = room.memory.parent;\r\n\r\n     let RCL = controller.level;\r\n     let reservation = controller.reservation;\r\n\r\n    let sources = room.find( FIND_SOURCES );\r\n    let numSources = source.length();\r\n\r\n    let workers = room.memory.workers || [];\r\n    if (workers === []) {\r\n        RequestWorkers(room, numSources);\r\n    }\r\n    let harvesters = room.memory.harvesters || [];\r\n    if (harvesters === []) {\r\n        RequestHarvesters(room, numSources);\r\n    }\r\n\r\n\r\n    //Owned = Normal, Defend = Focus on Defense, Non Military Creeps only move energy internally\r\n    //Attack = Spawn Attack Creeps, Send to Room,\r\n    if (owned) {\r\n        room.memory.status = \"Peace\";\r\n        switch (RCL) {\r\n            case 1:\r\n                return RCL1(room, parent);\r\n            case 2:\r\n                return RCL2(room, parent);\r\n        }\r\n    } else if (reservation) {\r\n\r\n    } else {\r\n        room.memory.status = \"Enemy\";\r\n    }\r\n\r\n\r\n    console.log(\"----\", \"room:\", name, \"----\");\r\n    console.log(\"RCL: \", RCL);\r\n    console.log(\"Res: \", reservation);\r\n    console.log(owned ? \"Mine\" : \"Not Mine\");\r\n    console.log(\"--------------------\");\r\n}\r\n\r\n */\r\n/*\r\n\r\n\r\n\r\n\r\n Differentiators\r\n ---------------\r\n Room will make a request for workers, with how many spawns, and max energy to use.\r\n\r\n Planning harvesters, max energy and num sources\r\n Planning  couriers,  num sources, max energy,\r\n Planning builders, maybe use harvesters for now?\r\n\r\n Harvester Roles\r\n If mining, continue,\r\n If not in right room, Go there\r\n Before starting to mine, make sure you can finish container first\r\n Courier Roles\r\n Check all containers,\r\n\r\n RCL1 OR Reserved\r\n !my && owner != undefined //enemy-occupied\r\n !my // empty\r\n\r\n\t30+\r\n\tvs\r\n\t190+, also 37.5, 30.5,\r\n\r\n\r\n Any Room That has Creep or Structure In It.\r\n ------------------\r\n 3 Types\r\n ----\r\n Owned\r\n RCL 1 - 8\r\n Reserved\r\n If Below Certain Ticks Left, Send Claimer, Otherwise RCL 1\r\n In Queue\r\n\r\n Un Reserved\r\n Do Nothing\r\n\r\n *///# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvQ29udHJvbGxlci9jb250cm9sbGVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0NvbnRyb2xsZXIvY29udHJvbGxlci5qcz85ODNkIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5sZXQgZGVmYXVsdFNyY01lbSA9IHtcclxuXHRhc3NpZ25lZEhhcnY6IG51bGxcclxufTtcclxuXHJcbmxldCBidWlsZEhhcnZlc3RlciA9IHJlcXVpcmUoXCIuLi9TcGF3bmluZy9idWlsZEhhcnZlc3RlclwiKTtcclxuXHJcblxyXG5cclxuLypcclxuIFNob3VsZCBDeWNsZSBCZXR3ZWVuIERpZmZlcmVudCBTcGF3bmVyc1xyXG4gKi9cclxuXHJcbi8vIFJldHVybnMgWyBCb2R5LCBNZW1vcnksIFRpY2tzVG9CdWlsZCBdXHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xyXG5cclxuXHRmb3IgKGxldCBuYW1lIGluIEdhbWUucm9vbXMpIHtcclxuXHRcdGxldCByb29tID0gR2FtZS5yb29tc1tuYW1lXTtcclxuXHJcblx0XHRsZXQgY29sZFN0YXJ0ID0gcm9vbS5tZW1vcnkuY29sZFN0YXJ0O1xyXG5cdFx0aWYgKHJvb20ubWVtb3J5LmNvbGRTdGFydCA9PT0gZmFsc2UpIHtcclxuXHRcdFx0cm9vbS5tZW1vcnkuc291cmNlcyA9IHJvb20uZmluZChGSU5EX1NPVVJDRVMpLm1hcChzcmMgPT4gc3JjLmlkKTtcclxuXHRcdFx0cm9vbS5tZW1vcnkuc3Bhd25zICA9IHJvb20uZmluZChGSU5EX01ZX1NQQVdOUykubWFwKHNwdyA9PiBzcHcubmFtZSk7XHJcblxyXG5cdFx0XHRsZXQgc3Bhd24gPSByb29tLm1lbW9yeS5zcGF3bnNbMF07XHJcblx0XHRcdGxldCBzb3VyY2UgPSByb29tLm1lbW9yeS5zb3VyY2VzWzBdO1xyXG5cclxuXHRcdFx0R2FtZS5zcGF3bnNbc3Bhd25dLm1lbW9yeS5zcGF3blF1ZXVlID0gW1xyXG4gICAgICAgICAgICAgICAgYnVpbGRIYXJ2ZXN0ZXIobmFtZSwgc291cmNlLCAzMDAsIDUpXHJcbiAgICAgICAgICAgIF1cclxuXHJcblxyXG5cdFx0XHRyb29tLm1lbW9yeS5jb2xkU3RhcnQgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmIChyb29tLm1lbW9yeS5jb2xkU3RhdGUgPT09IHRydWUpIHtcclxuXHJcblx0XHRcdHJvb20ubWVtb3J5LnBhcmVudFJvb20gPSByb29tLm1lbW9yeS5wYXJlbnRSb29tIHx8IG51bGw7XHJcblx0XHRcdGxldCBwYXJlbnRSb29tID0gcm9vbS5tZW1vcnkucGFyZW50O1xyXG5cclxuXHRcdFx0bGV0IHNvdXJjZXMgPSByb29tLmZpbmQoRklORF9TT1VSQ0VTKTtcclxuXHRcdFx0c291cmNlcy5tYXAoICh7IGlkIH0pID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImlkXCIsIGlkKTtcclxuXHRcdFx0XHRpZiAoTWVtb3J5LnNvdXJjZXMuaWQgPT09IHVuZGVmaW5lZCkgTWVtb3J5LnNvdXJjZXMuaWQgPSBkZWZhdWx0U3JjTWVtO1xyXG5cclxuXHRcdFx0XHRsZXQgeyBhc3NpZ25lZEhhcnYgfSA9IE1lbW9yeS5zb3VyY2VzW2lkXTtcclxuXHJcblx0XHRcdFx0aWYgKGFzc2lnbmVkSGFydiA9PT0gbnVsbCB8fCAhKGFzc2lnbmVkSGFydiBpbiBHYW1lLmNyZWVwcykpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiQ3JlZXAgRGVhZCBPciBTb21ldGhpbmdcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59O1xyXG5cclxuLypcclxuXHJcbiBHYW1lLnNwYXducy5TcGF3bjEuc3Bhd25DcmVlcChbTU9WRSwgTU9WRSwgV09SS10sIDEpXHJcblxyXG5mb3IgKGxldCBuYW1lIGluIEdhbWUucm9vbXMpIHtcclxuXHJcbiAgICBsZXQgcm9vbSA9ICBHYW1lLnJvb21zW25hbWVdO1xyXG4gICAgbGV0IGNvbnRyb2xsZXIgPSByb29tLmNvbnRyb2xsZXI7XHJcblxyXG4gICAgIGxldCBvd25lZCA9IGNvbnRyb2xsZXIubXk7XHJcbiAgICAgbGV0IHBhcmVudCA9IHJvb20ubWVtb3J5LnBhcmVudDtcclxuXHJcbiAgICAgbGV0IFJDTCA9IGNvbnRyb2xsZXIubGV2ZWw7XHJcbiAgICAgbGV0IHJlc2VydmF0aW9uID0gY29udHJvbGxlci5yZXNlcnZhdGlvbjtcclxuXHJcbiAgICBsZXQgc291cmNlcyA9IHJvb20uZmluZCggRklORF9TT1VSQ0VTICk7XHJcbiAgICBsZXQgbnVtU291cmNlcyA9IHNvdXJjZS5sZW5ndGgoKTtcclxuXHJcbiAgICBsZXQgd29ya2VycyA9IHJvb20ubWVtb3J5LndvcmtlcnMgfHwgW107XHJcbiAgICBpZiAod29ya2VycyA9PT0gW10pIHtcclxuICAgICAgICBSZXF1ZXN0V29ya2Vycyhyb29tLCBudW1Tb3VyY2VzKTtcclxuICAgIH1cclxuICAgIGxldCBoYXJ2ZXN0ZXJzID0gcm9vbS5tZW1vcnkuaGFydmVzdGVycyB8fCBbXTtcclxuICAgIGlmIChoYXJ2ZXN0ZXJzID09PSBbXSkge1xyXG4gICAgICAgIFJlcXVlc3RIYXJ2ZXN0ZXJzKHJvb20sIG51bVNvdXJjZXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL093bmVkID0gTm9ybWFsLCBEZWZlbmQgPSBGb2N1cyBvbiBEZWZlbnNlLCBOb24gTWlsaXRhcnkgQ3JlZXBzIG9ubHkgbW92ZSBlbmVyZ3kgaW50ZXJuYWxseVxyXG4gICAgLy9BdHRhY2sgPSBTcGF3biBBdHRhY2sgQ3JlZXBzLCBTZW5kIHRvIFJvb20sXHJcbiAgICBpZiAob3duZWQpIHtcclxuICAgICAgICByb29tLm1lbW9yeS5zdGF0dXMgPSBcIlBlYWNlXCI7XHJcbiAgICAgICAgc3dpdGNoIChSQ0wpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJDTDEocm9vbSwgcGFyZW50KTtcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJDTDIocm9vbSwgcGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHJlc2VydmF0aW9uKSB7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByb29tLm1lbW9yeS5zdGF0dXMgPSBcIkVuZW15XCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiLS0tLVwiLCBcInJvb206XCIsIG5hbWUsIFwiLS0tLVwiKTtcclxuICAgIGNvbnNvbGUubG9nKFwiUkNMOiBcIiwgUkNMKTtcclxuICAgIGNvbnNvbGUubG9nKFwiUmVzOiBcIiwgcmVzZXJ2YXRpb24pO1xyXG4gICAgY29uc29sZS5sb2cob3duZWQgPyBcIk1pbmVcIiA6IFwiTm90IE1pbmVcIik7XHJcbiAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG59XHJcblxyXG4gKi9cclxuLypcclxuXHJcblxyXG5cclxuXHJcbiBEaWZmZXJlbnRpYXRvcnNcclxuIC0tLS0tLS0tLS0tLS0tLVxyXG4gUm9vbSB3aWxsIG1ha2UgYSByZXF1ZXN0IGZvciB3b3JrZXJzLCB3aXRoIGhvdyBtYW55IHNwYXducywgYW5kIG1heCBlbmVyZ3kgdG8gdXNlLlxyXG5cclxuIFBsYW5uaW5nIGhhcnZlc3RlcnMsIG1heCBlbmVyZ3kgYW5kIG51bSBzb3VyY2VzXHJcbiBQbGFubmluZyAgY291cmllcnMsICBudW0gc291cmNlcywgbWF4IGVuZXJneSxcclxuIFBsYW5uaW5nIGJ1aWxkZXJzLCBtYXliZSB1c2UgaGFydmVzdGVycyBmb3Igbm93P1xyXG5cclxuIEhhcnZlc3RlciBSb2xlc1xyXG4gSWYgbWluaW5nLCBjb250aW51ZSxcclxuIElmIG5vdCBpbiByaWdodCByb29tLCBHbyB0aGVyZVxyXG4gQmVmb3JlIHN0YXJ0aW5nIHRvIG1pbmUsIG1ha2Ugc3VyZSB5b3UgY2FuIGZpbmlzaCBjb250YWluZXIgZmlyc3RcclxuIENvdXJpZXIgUm9sZXNcclxuIENoZWNrIGFsbCBjb250YWluZXJzLFxyXG5cclxuIFJDTDEgT1IgUmVzZXJ2ZWRcclxuICFteSAmJiBvd25lciAhPSB1bmRlZmluZWQgLy9lbmVteS1vY2N1cGllZFxyXG4gIW15IC8vIGVtcHR5XHJcblxyXG5cdDMwK1xyXG5cdHZzXHJcblx0MTkwKywgYWxzbyAzNy41LCAzMC41LFxyXG5cclxuXHJcbiBBbnkgUm9vbSBUaGF0IGhhcyBDcmVlcCBvciBTdHJ1Y3R1cmUgSW4gSXQuXHJcbiAtLS0tLS0tLS0tLS0tLS0tLS1cclxuIDMgVHlwZXNcclxuIC0tLS1cclxuIE93bmVkXHJcbiBSQ0wgMSAtIDhcclxuIFJlc2VydmVkXHJcbiBJZiBCZWxvdyBDZXJ0YWluIFRpY2tzIExlZnQsIFNlbmQgQ2xhaW1lciwgT3RoZXJ3aXNlIFJDTCAxXHJcbiBJbiBRdWV1ZVxyXG5cclxuIFVuIFJlc2VydmVkXHJcbiBEbyBOb3RoaW5nXHJcblxyXG4gKi8iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Controller/controller.js\n");

/***/ }),

/***/ "./src/Helpers/Memory.js":
/*!*******************************!*\
  !*** ./src/Helpers/Memory.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = () => {\r\n\r\n\tMemory.nameClk = Memory.nameClk || 0;\r\n\r\n\tconsole.log(\"Setting Memory\");\r\n\r\n\tfor (let name in Game.spawns) {\r\n\t\tlet spawn = Game.spawns[name];\r\n\t\tlet room = spawn.room;\r\n\r\n\t\tlet roomMem = room.memory.spawns;\r\n\t\tif (roomMem === undefined) {\r\n\t\t\troom.memory.spawns = [];\r\n\t\t}\r\n\t\tif (spawn in room) {\r\n\t\t\troom.memory.spawns.concat(spawn);\r\n\t\t}\r\n\t}\r\n\r\n\r\n\tMemory.sources = {\r\n\t};\r\n\r\n\tMemory.track = {\r\n\t\t...Memory.track\r\n\t};\r\n\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvSGVscGVycy9NZW1vcnkuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvSGVscGVycy9NZW1vcnkuanM/MmI2YyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcclxuXHJcblx0TWVtb3J5Lm5hbWVDbGsgPSBNZW1vcnkubmFtZUNsayB8fCAwO1xyXG5cclxuXHRjb25zb2xlLmxvZyhcIlNldHRpbmcgTWVtb3J5XCIpO1xyXG5cclxuXHRmb3IgKGxldCBuYW1lIGluIEdhbWUuc3Bhd25zKSB7XHJcblx0XHRsZXQgc3Bhd24gPSBHYW1lLnNwYXduc1tuYW1lXTtcclxuXHRcdGxldCByb29tID0gc3Bhd24ucm9vbTtcclxuXHJcblx0XHRsZXQgcm9vbU1lbSA9IHJvb20ubWVtb3J5LnNwYXducztcclxuXHRcdGlmIChyb29tTWVtID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cm9vbS5tZW1vcnkuc3Bhd25zID0gW107XHJcblx0XHR9XHJcblx0XHRpZiAoc3Bhd24gaW4gcm9vbSkge1xyXG5cdFx0XHRyb29tLm1lbW9yeS5zcGF3bnMuY29uY2F0KHNwYXduKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHRNZW1vcnkuc291cmNlcyA9IHtcclxuXHR9O1xyXG5cclxuXHRNZW1vcnkudHJhY2sgPSB7XHJcblx0XHQuLi5NZW1vcnkudHJhY2tcclxuXHR9O1xyXG5cclxufTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Helpers/Memory.js\n");

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

eval("module.exports = () => {\r\n\tconsole.log(\"------------------------------------\");\r\n\r\n\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvSGVscGVycy9sb2dnZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvSGVscGVycy9sb2dnZXIuanM/ZWVlNCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcclxuXHRjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuXHJcblxyXG59OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Helpers/logger.js\n");

/***/ }),

/***/ "./src/Spawning/buildCreep.js":
/*!************************************!*\
  !*** ./src/Spawning/buildCreep.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let { bodyCost } = __webpack_require__(/*! ./helper */ \"./src/Spawning/helper.js\");\r\n\r\nmodule.exports = ({\r\n\troom, energy, maxParts, role,\r\n\tinitialLoop, middleLoop,\r\n\tmemory\r\n}) => {\r\n\r\n\tlet works = 0;\r\n\tlet carrys = 0;\r\n\tlet moves = 0;\r\n\r\n\twhile (energy > 50) {\r\n\t\tmiddleLoop.map( (loop) => {\r\n\t\t\tconsole.log(\"loop\", loop);\r\n\t\t\tlet cost = bodyCost(loop);\r\n\t\t\tif (cost <= energy) {\r\n\t\t\t\tenergy -= cost;\r\n\t\t\t}\r\n\t\t});\r\n\t}\r\n\r\n\r\n\tlet body = [];\r\n\twhile (works > 0) body.push(WORK); works -= 1;\r\n\twhile (carrys > 0) body.push(CARRY); carrys -= 1;\r\n\twhile (moves > 0) body.push(MOVE); moves -= 1;\r\n\r\n\tMemory.nameClk += 1;\r\n\treturn {\r\n\t\troomName: \"WN87\",\r\n\t\tbody: [WORK, WORK, MOVE],\r\n\t\tmemory: {\r\n\t\t\togRole: role,\r\n\t\t\tcurrentRole: role,\r\n\t\t\troom: room,\r\n\t\t\twork: works,\r\n\t\t\tcarry: carrys,\r\n\t\t\tmove: moves\r\n\t\t},\r\n\t\tname: role + Memory.nameClk\r\n\t};\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU3Bhd25pbmcvYnVpbGRDcmVlcC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9TcGF3bmluZy9idWlsZENyZWVwLmpzPzg2MWYiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHsgYm9keUNvc3QgfSA9IHJlcXVpcmUoXCIuL2hlbHBlclwiKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKHtcclxuXHRyb29tLCBlbmVyZ3ksIG1heFBhcnRzLCByb2xlLFxyXG5cdGluaXRpYWxMb29wLCBtaWRkbGVMb29wLFxyXG5cdG1lbW9yeVxyXG59KSA9PiB7XHJcblxyXG5cdGxldCB3b3JrcyA9IDA7XHJcblx0bGV0IGNhcnJ5cyA9IDA7XHJcblx0bGV0IG1vdmVzID0gMDtcclxuXHJcblx0d2hpbGUgKGVuZXJneSA+IDUwKSB7XHJcblx0XHRtaWRkbGVMb29wLm1hcCggKGxvb3ApID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJsb29wXCIsIGxvb3ApO1xyXG5cdFx0XHRsZXQgY29zdCA9IGJvZHlDb3N0KGxvb3ApO1xyXG5cdFx0XHRpZiAoY29zdCA8PSBlbmVyZ3kpIHtcclxuXHRcdFx0XHRlbmVyZ3kgLT0gY29zdDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcblx0bGV0IGJvZHkgPSBbXTtcclxuXHR3aGlsZSAod29ya3MgPiAwKSBib2R5LnB1c2goV09SSyk7IHdvcmtzIC09IDE7XHJcblx0d2hpbGUgKGNhcnJ5cyA+IDApIGJvZHkucHVzaChDQVJSWSk7IGNhcnJ5cyAtPSAxO1xyXG5cdHdoaWxlIChtb3ZlcyA+IDApIGJvZHkucHVzaChNT1ZFKTsgbW92ZXMgLT0gMTtcclxuXHJcblx0TWVtb3J5Lm5hbWVDbGsgKz0gMTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cm9vbU5hbWU6IFwiV044N1wiLFxyXG5cdFx0Ym9keTogW1dPUkssIFdPUkssIE1PVkVdLFxyXG5cdFx0bWVtb3J5OiB7XHJcblx0XHRcdG9nUm9sZTogcm9sZSxcclxuXHRcdFx0Y3VycmVudFJvbGU6IHJvbGUsXHJcblx0XHRcdHJvb206IHJvb20sXHJcblx0XHRcdHdvcms6IHdvcmtzLFxyXG5cdFx0XHRjYXJyeTogY2FycnlzLFxyXG5cdFx0XHRtb3ZlOiBtb3Zlc1xyXG5cdFx0fSxcclxuXHRcdG5hbWU6IHJvbGUgKyBNZW1vcnkubmFtZUNsa1xyXG5cdH07XHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Spawning/buildCreep.js\n");

/***/ }),

/***/ "./src/Spawning/buildHarvester.js":
/*!****************************************!*\
  !*** ./src/Spawning/buildHarvester.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let buildCreep = __webpack_require__(/*! ./buildCreep */ \"./src/Spawning/buildCreep.js\");\r\n\r\nmodule.exports = (room, source, maxEnergy, maxParts=10) => {\r\n\tlet creep = buildCreep({\r\n\t\troom,\r\n\t\tenergy: maxEnergy,\r\n\t\tmaxParts,\r\n\t\trole: \"harvester\",\r\n\t\tinitialLoop: [],\r\n\t\tmiddleLoop: [[MOVE, WORK], [WORK], [WORK], [WORK], [WORK]],\r\n\t\tmemory: {} //No Extra Memory Slots\r\n\t});\r\n\r\n\tMemory.sources = {\r\n\t\t...Memory.sources,\r\n\t\t[source]: {\r\n\t\t\t...Memory.sources[source],\r\n\t\t\tharvs:\r\n(Memory.sources.harvs === undefined) ?\r\n\t[ creep ]\r\n\t:\r\n\tMemory.sources.harvs + [creep]\r\n\t\t}\r\n\t};\r\n\tMemory.sources.source = Memory.sources.source || {};\r\n\tMemory.sources.source.harvs = Memory.sources.source.harvs || [];\r\n\r\n\tconsole.log('creep', creep.body, creep.memory, creep.name);\r\n\treturn creep;\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU3Bhd25pbmcvYnVpbGRIYXJ2ZXN0ZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU3Bhd25pbmcvYnVpbGRIYXJ2ZXN0ZXIuanM/M2IwOSJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYnVpbGRDcmVlcCA9IHJlcXVpcmUoXCIuL2J1aWxkQ3JlZXBcIik7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChyb29tLCBzb3VyY2UsIG1heEVuZXJneSwgbWF4UGFydHM9MTApID0+IHtcclxuXHRsZXQgY3JlZXAgPSBidWlsZENyZWVwKHtcclxuXHRcdHJvb20sXHJcblx0XHRlbmVyZ3k6IG1heEVuZXJneSxcclxuXHRcdG1heFBhcnRzLFxyXG5cdFx0cm9sZTogXCJoYXJ2ZXN0ZXJcIixcclxuXHRcdGluaXRpYWxMb29wOiBbXSxcclxuXHRcdG1pZGRsZUxvb3A6IFtbTU9WRSwgV09SS10sIFtXT1JLXSwgW1dPUktdLCBbV09SS10sIFtXT1JLXV0sXHJcblx0XHRtZW1vcnk6IHt9IC8vTm8gRXh0cmEgTWVtb3J5IFNsb3RzXHJcblx0fSk7XHJcblxyXG5cdE1lbW9yeS5zb3VyY2VzID0ge1xyXG5cdFx0Li4uTWVtb3J5LnNvdXJjZXMsXHJcblx0XHRbc291cmNlXToge1xyXG5cdFx0XHQuLi5NZW1vcnkuc291cmNlc1tzb3VyY2VdLFxyXG5cdFx0XHRoYXJ2czpcclxuKE1lbW9yeS5zb3VyY2VzLmhhcnZzID09PSB1bmRlZmluZWQpID9cclxuXHRbIGNyZWVwIF1cclxuXHQ6XHJcblx0TWVtb3J5LnNvdXJjZXMuaGFydnMgKyBbY3JlZXBdXHJcblx0XHR9XHJcblx0fTtcclxuXHRNZW1vcnkuc291cmNlcy5zb3VyY2UgPSBNZW1vcnkuc291cmNlcy5zb3VyY2UgfHwge307XHJcblx0TWVtb3J5LnNvdXJjZXMuc291cmNlLmhhcnZzID0gTWVtb3J5LnNvdXJjZXMuc291cmNlLmhhcnZzIHx8IFtdO1xyXG5cclxuXHRjb25zb2xlLmxvZygnY3JlZXAnLCBjcmVlcC5ib2R5LCBjcmVlcC5tZW1vcnksIGNyZWVwLm5hbWUpO1xyXG5cdHJldHVybiBjcmVlcDtcclxufTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Spawning/buildHarvester.js\n");

/***/ }),

/***/ "./src/Spawning/helper.js":
/*!********************************!*\
  !*** ./src/Spawning/helper.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * Created by Adam on 7/17/2018.\r\n */\r\nmodule.exports = {\r\n\tbodyCost: (body) => {\r\n\t\tlet cost = 0;\r\n\t\tbody.map(part => cost += BODYPART_COST[part]);\r\n\t\treturn cost;\r\n\t},\r\n\tdispObj: (obj) => {\r\n\t\tfor (let key in obj) {\r\n\t\t\tconsole.log(key, \":\", obj[key]);\r\n\t\t}\r\n\t}\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU3Bhd25pbmcvaGVscGVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1NwYXduaW5nL2hlbHBlci5qcz8zMGMxIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFkYW0gb24gNy8xNy8yMDE4LlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Ym9keUNvc3Q6IChib2R5KSA9PiB7XHJcblx0XHRsZXQgY29zdCA9IDA7XHJcblx0XHRib2R5Lm1hcChwYXJ0ID0+IGNvc3QgKz0gQk9EWVBBUlRfQ09TVFtwYXJ0XSk7XHJcblx0XHRyZXR1cm4gY29zdDtcclxuXHR9LFxyXG5cdGRpc3BPYmo6IChvYmopID0+IHtcclxuXHRcdGZvciAobGV0IGtleSBpbiBvYmopIHtcclxuXHRcdFx0Y29uc29sZS5sb2coa2V5LCBcIjpcIiwgb2JqW2tleV0pO1xyXG5cdFx0fVxyXG5cdH1cclxufTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Spawning/helper.js\n");

/***/ }),

/***/ "./src/Spawning/queueHandler.js":
/*!**************************************!*\
  !*** ./src/Spawning/queueHandler.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let { bodyCost, dispObj } = __webpack_require__(/*! ./helper */ \"./src/Spawning/helper.js\");\r\n\r\nlet defaultSpawnMemory = {\r\n\tspawnQueue: []\r\n};\r\n\r\nlet spawnCreep = (body, memory, name) => {\r\n\tconsole.log(\"Created creep:\", body, \"with name\", name);\r\n\treturn this.spawnCreep(body, name, { memory });\r\n};\r\n\r\n\r\n\r\nmodule.exports = () => {\r\n\tfor (let name in Game.spawns) {\r\n\t\tlet spawn = Game.spawns[name];\r\n\t\tif (!spawn.spawning) {\r\n\r\n\t\t\tlet room = spawn.room;\r\n\t\t\tlet maxEnergy = room.energyCapacityAvailable;\r\n\t\t\tlet currEnergy = room.energyAvailable;\r\n\t\t\tconsole.log(\"Spawn:\", spawn, \"  |  \", \"max:\", maxEnergy, \"|\", \"curr:\", currEnergy);\r\n\r\n\t\t\tif (maxEnergy === currEnergy) {\r\n\r\n\t\t\t\tif (spawn.memory === {}) spawn.memory = defaultSpawnMemory;\r\n\t\t\t\tlet { spawnQueue } = spawn.memory;\r\n\r\n\t\t\t\tif ( spawnQueue.length > 0) {\r\n\t\t\t\t\tlet { body, memory } = spawnQueue[0];\r\n\r\n\t\t\t\t\tlet cost = bodyCost( body );\r\n\r\n\t\t\t\t\tlet res = spawn.spawnCreep(body, memory, name);\r\n\t\t\t\t\tconsole.log(\"res: \", res);\r\n\t\t\t\t}\r\n\r\n\t\t\t}\r\n\r\n\t\t}\r\n\t}\r\n};\r\n\r\n\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU3Bhd25pbmcvcXVldWVIYW5kbGVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1NwYXduaW5nL3F1ZXVlSGFuZGxlci5qcz9jZWY0Il0sInNvdXJjZXNDb250ZW50IjpbImxldCB7IGJvZHlDb3N0LCBkaXNwT2JqIH0gPSByZXF1aXJlKFwiLi9oZWxwZXJcIik7XHJcblxyXG5sZXQgZGVmYXVsdFNwYXduTWVtb3J5ID0ge1xyXG5cdHNwYXduUXVldWU6IFtdXHJcbn07XHJcblxyXG5sZXQgc3Bhd25DcmVlcCA9IChib2R5LCBtZW1vcnksIG5hbWUpID0+IHtcclxuXHRjb25zb2xlLmxvZyhcIkNyZWF0ZWQgY3JlZXA6XCIsIGJvZHksIFwid2l0aCBuYW1lXCIsIG5hbWUpO1xyXG5cdHJldHVybiB0aGlzLnNwYXduQ3JlZXAoYm9keSwgbmFtZSwgeyBtZW1vcnkgfSk7XHJcbn07XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xyXG5cdGZvciAobGV0IG5hbWUgaW4gR2FtZS5zcGF3bnMpIHtcclxuXHRcdGxldCBzcGF3biA9IEdhbWUuc3Bhd25zW25hbWVdO1xyXG5cdFx0aWYgKCFzcGF3bi5zcGF3bmluZykge1xyXG5cclxuXHRcdFx0bGV0IHJvb20gPSBzcGF3bi5yb29tO1xyXG5cdFx0XHRsZXQgbWF4RW5lcmd5ID0gcm9vbS5lbmVyZ3lDYXBhY2l0eUF2YWlsYWJsZTtcclxuXHRcdFx0bGV0IGN1cnJFbmVyZ3kgPSByb29tLmVuZXJneUF2YWlsYWJsZTtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJTcGF3bjpcIiwgc3Bhd24sIFwiICB8ICBcIiwgXCJtYXg6XCIsIG1heEVuZXJneSwgXCJ8XCIsIFwiY3VycjpcIiwgY3VyckVuZXJneSk7XHJcblxyXG5cdFx0XHRpZiAobWF4RW5lcmd5ID09PSBjdXJyRW5lcmd5KSB7XHJcblxyXG5cdFx0XHRcdGlmIChzcGF3bi5tZW1vcnkgPT09IHt9KSBzcGF3bi5tZW1vcnkgPSBkZWZhdWx0U3Bhd25NZW1vcnk7XHJcblx0XHRcdFx0bGV0IHsgc3Bhd25RdWV1ZSB9ID0gc3Bhd24ubWVtb3J5O1xyXG5cclxuXHRcdFx0XHRpZiAoIHNwYXduUXVldWUubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0bGV0IHsgYm9keSwgbWVtb3J5IH0gPSBzcGF3blF1ZXVlWzBdO1xyXG5cclxuXHRcdFx0XHRcdGxldCBjb3N0ID0gYm9keUNvc3QoIGJvZHkgKTtcclxuXHJcblx0XHRcdFx0XHRsZXQgcmVzID0gc3Bhd24uc3Bhd25DcmVlcChib2R5LCBtZW1vcnksIG5hbWUpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJyZXM6IFwiLCByZXMpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuXHJcblxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Spawning/queueHandler.js\n");

/***/ }),

/***/ "./src/Structures/towerActions.js":
/*!****************************************!*\
  !*** ./src/Structures/towerActions.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = () => {\r\n\tfor (let name in Game.rooms) {\r\n\t    let room = Game.rooms[name];\r\n\r\n\t\tlet towers = room.find(FIND_STRUCTURES, {\r\n\t\t\tfilter: (struct) => (\r\n\t\t\t\tstruct.structureType === STRUCTURE_TOWER\r\n\t\t\t)\r\n\t\t});\r\n\t}\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU3RydWN0dXJlcy90b3dlckFjdGlvbnMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU3RydWN0dXJlcy90b3dlckFjdGlvbnMuanM/MDg5YyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcclxuXHRmb3IgKGxldCBuYW1lIGluIEdhbWUucm9vbXMpIHtcclxuXHQgICAgbGV0IHJvb20gPSBHYW1lLnJvb21zW25hbWVdO1xyXG5cclxuXHRcdGxldCB0b3dlcnMgPSByb29tLmZpbmQoRklORF9TVFJVQ1RVUkVTLCB7XHJcblx0XHRcdGZpbHRlcjogKHN0cnVjdCkgPT4gKFxyXG5cdFx0XHRcdHN0cnVjdC5zdHJ1Y3R1cmVUeXBlID09PSBTVFJVQ1RVUkVfVE9XRVJcclxuXHRcdFx0KVxyXG5cdFx0fSk7XHJcblx0fVxyXG59OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Structures/towerActions.js\n");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let num = 1;\r\n\r\nlet log = (str = num) => {\r\n\tconsole.log(\"--\", str, \"--\");\r\n\tnum += 1;\r\n};\r\n\r\n__webpack_require__(/*! ./Helpers/Memory */ \"./src/Helpers/Memory.js\")();\r\n__webpack_require__(/*! ./Helpers/logger */ \"./src/Helpers/logger.js\")();\r\nlog(\"Controller\");\r\n__webpack_require__(/*! ./Controller/controller */ \"./src/Controller/controller.js\")();\r\nlog(\"Spawner\");\r\n__webpack_require__(/*! ./Spawning/queueHandler */ \"./src/Spawning/queueHandler.js\")();\r\nlog(\"Creeps\");\r\n__webpack_require__(/*! ./Actions/creepActions */ \"./src/Actions/creepActions.js\")();\r\nlog(\"Towers\");\r\n__webpack_require__(/*! ./Structures/towerActions */ \"./src/Structures/towerActions.js\")();\r\nlog(\"Cleanup\");\r\n__webpack_require__(/*! ./Helpers/cleanup */ \"./src/Helpers/cleanup.js\")();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYWluLmpzPzU2ZDciXSwic291cmNlc0NvbnRlbnQiOlsibGV0IG51bSA9IDE7XHJcblxyXG5sZXQgbG9nID0gKHN0ciA9IG51bSkgPT4ge1xyXG5cdGNvbnNvbGUubG9nKFwiLS1cIiwgc3RyLCBcIi0tXCIpO1xyXG5cdG51bSArPSAxO1xyXG59O1xyXG5cclxucmVxdWlyZShcIi4vSGVscGVycy9NZW1vcnlcIikoKTtcclxucmVxdWlyZShcIi4vSGVscGVycy9sb2dnZXJcIikoKTtcclxubG9nKFwiQ29udHJvbGxlclwiKTtcclxucmVxdWlyZShcIi4vQ29udHJvbGxlci9jb250cm9sbGVyXCIpKCk7XHJcbmxvZyhcIlNwYXduZXJcIik7XHJcbnJlcXVpcmUoXCIuL1NwYXduaW5nL3F1ZXVlSGFuZGxlclwiKSgpO1xyXG5sb2coXCJDcmVlcHNcIik7XHJcbnJlcXVpcmUoXCIuL0FjdGlvbnMvY3JlZXBBY3Rpb25zXCIpKCk7XHJcbmxvZyhcIlRvd2Vyc1wiKTtcclxucmVxdWlyZShcIi4vU3RydWN0dXJlcy90b3dlckFjdGlvbnNcIikoKTtcclxubG9nKFwiQ2xlYW51cFwiKTtcclxucmVxdWlyZShcIi4vSGVscGVycy9jbGVhbnVwXCIpKCk7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main.js\n");

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