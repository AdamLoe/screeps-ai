let { nextTo } = require("../Helpers/navigation");

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
	"moveTo": (creep, target) => {
		creep.moveTo(target);
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
		creep.withdraw(target);
	},
	"upgradeController": (creep, target) => {
		creep.upgradeController(target);
	},
	"idle": (creep, ticks) => {
		creep.memory.idleTicks -= 1;
	}
};

module.exports = (creep, target) => {
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
};

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