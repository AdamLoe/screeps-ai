let setTask = require("../Creeps/setTask");

let findEnergyStorage = (creep) => {
	return Game.spawns.Spawn1.id;
};

let withdraw = (creep) => {
	let { x, y, roomName } = creep.memory.targetWithdraw;
	let target = new RoomPosition(x, y, roomName);

	let objects = target.look();

	let container = _.find(objects, obj => obj.type === "structure");
	let energy = _.find(objects, obj => obj.type === "energy" && obj.energy.resourceType === "energy");


	if (container) {
		setTask(creep, "pickup", container.id);
	} else if (energy) {
		setTask(creep, "pickup", energy.energy.id);
	} else {
		creep.memory.idleTicks = 1;
		setTask(creep, "idle", null);
	}

};

let transfer = (creep) => {
	let target = findEnergyStorage(creep);

	if (target !== null) {
		setTask(creep, "transfer", target);
	} else {

		if (creep.carry.energy / creep.carryCapacity > .75 ) {
			setTask(creep, "idle", 1);

		} else {
			withdraw(creep);
		}
	}

};

module.exports = (creep) => {
	let hasEnergy = creep.carry.energy > 0;

	if (hasEnergy) {
		transfer(creep);
	} else {
		withdraw(creep);
	}
};

//Could transfer to a router type system

//We set the creep object to the current creep in loop, and then run it'