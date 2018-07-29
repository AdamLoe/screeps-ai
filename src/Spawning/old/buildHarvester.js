let buildCreep = require("./buildCreep");

console.log("Hiya");

module.exports = (roomName, sourceId, maxEnergy, maxParts=10) => {
	let creep = buildCreep({
		roomName,
		energy: maxEnergy,
		maxParts,
		role: "harvester",
		initialLoop: [],
		middleLoop: [[MOVE, WORK], [WORK], [WORK], [WORK], [WORK]],
		memory: {} //No Extra Memory Slots
	});

	creep.memory["source"] = sourceId;

	Memory.sources[sourceId] = { ...Memory.sources[sourceId] };
	if (Memory.sources[sourceId].harvs === undefined) {
		Memory.sources[sourceId].harvs = [ creep ];
	} else {
		Memory.sources[sourceId].harvs.push(creep);
	}

	//console.log('creep', creep.body, creep.memory, creep.name);
	return creep;
};

let addHarvester = (roomName, creep) => {
	let name = creep.name;
};