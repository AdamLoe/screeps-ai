let checkTask = require("./checkTask");
let runTask = require("./runTask");
let getNewTask = require("./getNewTask");

let getTarget = (creep) => {
	let target = creep.memory.taskTarget;
	if (target === null) return null;
	if (target === undefined) return null;
	else if (typeof target === "object") {
		let { x, y, roomName } = target;
		return new RoomPosition(x, y, roomName);
	} else {
		return Game.getObjectById(target);
	}
};

module.exports = () => {
	for (let id in Game.creeps) {
		let creep = Game.creeps[id];

		let hasTask =  creep.memory.taskName;

		let target;
		let taskValid;

		if (hasTask) {
			target = getTarget(creep);
			taskValid = checkTask(creep, target);
			if (!taskValid) {
				getNewTask(creep);
			}
		} else {
			getNewTask(creep);
			target = getTarget(creep);
		}

		runTask(creep, target);


	}
};

//Role decides what function to run when deciding what to do
//Task decides what creep is currently doing,