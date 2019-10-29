let getTask = {
	"build": (creep, target) => {
		creep.build(target);
	},
	"claimController": (creep, target) => {
		creep.claimController(target);
	},
	"harvest": (creep, target) => {
		creep.harvest(target);
	},
	"pickup": (creep, target) => {
		creep.pickup(target);
	},
	"reserveController": (creep, target) => {
	    creep.reserveController(target);
	},
	"transfer": (creep, target) => {
		creep.transfer(target, RESOURCE_ENERGY);
	},
	"withdraw": (creep, target) => {
		return creep.withdraw(target);
	},
	"upgradeController": (creep, target) => {
		return creep.upgradeController(target);
	},
	"idle": (creep, ticks) => {
		creep.memory.idleTicks -= 1;
	}
};

let { nextTo } = require("../Helpers/navigation");

exports.setTask = (creep, task, target, options) => {
	options = {
		...defaultOptions,
		...options
	};
	creep.memory = {
		...creep.memory,
		taskName: task,
		taskTarget: target,
		taskPos: options.pos,
		taskRange: options.range,
		taskInRange: false
	};
};

let defaultOptions = {
	range: 1,
	pos: null
};

exports.runTask = (creep, target) => {
	let { taskName, taskOptions, taskInRange, taskPos, taskRange } = creep.memory;

	if (taskPos === null || taskPos === undefined) {
		taskPos = target;
	} else {
		taskPos = new RoomPosition(taskPos.x, taskPos.y, taskPos.roomName);
	}

	let res;
	if (nextTo(creep, taskPos) <= taskRange ) {
		res = getTask[taskName](creep, target, taskOptions);
	} else {
		res = creep.travelTo(taskPos, {
			range: taskRange
		});
	}

	//console.log(JSON.stringify(creep.memory));
	//console.log(creep.name, creep.memory.taskName, nextTo(creep, taskPos), creep.memory.taskTarget, Game.getObjectById(creep.memory.taskTarget));
	//console.log(creep.memory.name, taskName, creep.memory.taskInRange, nextTo(creep, taskPos) <= taskRange, JSON.stringify(target));
};


//No Errror should be theoretically
/*
 switch (token) {
 case OK:
 break;
 case ERR_NOT_OWNER: //Should never happen
 break;
 case ERR_NO_PATH: //Creep Probably blocking, might want to abandon task though
 break;
 case ERR_NAME_EXISTS: //Creating Flag or Spawning Creep
 break;
 case ERR_BUSY: //Being Spawned, or Trying to Delete something with hostile creeps in room
 break;
 case ERR_NOT_FOUND:  //No Extractor, not in path, or cant cancel order
 break;
 case ERR_NOT_ENOUGH_RESOURCES: //Source/Container is empty, or creep is empty
 break;
 case ERR_INVALID_TARGET: //Should reTask creep
 break;
 case ERR_FULL: //
 break;
 case ERR_NOT_IN_RANGE:  //Need to move obviously
 break;
 case ERR_INVALID_ARGS:
 break;
 case ERR_TIRED: //Wait til next turn
 break;
 case ERR_NO_BODYPART:
 break;
 case ERR_RCL_NOT_ENOUGH:
 break;
 case ERR_GCL_NOT_ENOUGH:
 break;
 }
 */

