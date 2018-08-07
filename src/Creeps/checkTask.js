let checkTaskArr = {
	"harvest" (creep, target) {
		return target.energy > 0;
	},
	"pickup" (creep, target) {
		let creepNotFull = creep.carry.energy < creep.carryCapacity;
		let targetNotEmpty = target && target.amount > 0; //target.amount > 0;
		return creepNotFull && targetNotEmpty;
	},
	"transfer": (creep, target) => {
		let creepNotEmpty = creep.carry.energy > 0;
		let targetNotFull = target.currEnergy() < target.maxEnergy();
		return creepNotEmpty && targetNotFull;
	},
	"withdraw": (creep, target) => {
		return true;
	},
	"idle": (creep, target) => {
		return creep.memory.idleTicks > 0;
	}
};

module.exports = (creep, target) => {
	let func = checkTaskArr[creep.memory.taskName];
	return func(creep, target);
};