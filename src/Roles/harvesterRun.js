let { nextTo } = require("../Helpers/navigation");

module.exports = (creep) => {
	let target = Game.getObjectById( creep.memory.target );

	let inRange = creep.memory.inRange;

	if (!inRange && nextTo(creep, target)) creep.memory.inRange = true;

	if (creep.memory.inRange) {
		let res = creep.harvest(target);
		console.log("Harvest:", res);
	} else {
		let res = creep.moveTo(target, {
			range: 1
		});
		console.log("Move:", res);
	}
};