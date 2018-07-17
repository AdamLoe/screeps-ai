let buildCreep = require("./buildCreep");

module.exports = (room, source, maxEnergy, maxParts=10) => {
	let creep = buildCreep({
		room,
		energy: maxEnergy,
		maxParts,
		role: "harvester",
		initialLoop: [],
		middleLoop: [[MOVE, WORK], [WORK], [WORK], [WORK], [WORK]],
		memory: {} //No Extra Memory Slots
	});

	Memory.sources = {
		...Memory.sources,
		[source]: {
			...Memory.sources[source],
			harvs:
(Memory.sources.harvs === undefined) ?
	[ creep ]
	:
	Memory.sources.harvs + [creep]
		}
	};
	Memory.sources.source = Memory.sources.source || {};
	Memory.sources.source.harvs = Memory.sources.source.harvs || [];

	console.log('creep', creep.body, creep.memory, creep.name);
	return creep;
};