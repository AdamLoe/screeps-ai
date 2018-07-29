let buildCreep = require("./buildCreep");

module.exports = (room, source, maxEnergy, maxParts=10) => {
	let creep = buildCreep({
		room,
		energy: maxEnergy,
		maxParts,
		role: "courier",
		initialLoop: [],
		middleLoop: [[MOVE, WORK], [WORK], [WORK], [WORK], [WORK]],
		memory: {} //No Extra Memory Slots
	});


	//console.log('creep', creep.body, creep.memory, creep.name);
	return creep;
};