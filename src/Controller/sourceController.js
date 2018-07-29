let handleEnergyUsage = (source) => {
	let storage = source.room.find(FIND_MY_SPAWNS)[0];

	let numWorkParts = 0;
	source.harvesters.map( (creep) => {
		creep.body.map( (part) => {
			if (part === WORK) {
				numWorkParts += 1;
			}
		});
	});
	let numCarryParts = 0;
	source.couriers.map( (creep) => {
		creep.body.map( (part) => {
			if (part === WORK) {
				numCarryParts += 1;
			}
		});
	});

	let distance = source.pos.findPathTo(storage, { range: 1, ignoreCreeps: true}).length;

	Memory.sources[source.id].harvestEPT = numWorkParts * 2;
	Memory.sources[source.id].courierEPT = numCarryParts * 50 / (distance * 2);
	Memory.sources[source.id].sourceEPT = source.energyCapacity / 300;
};

let setupHarvesters = require("../Roles/harvesterSetup");
let setupCouriers = require("../Roles/courierRun");

module.exports = () => {
	for (let sourceId in Memory.sources) {
		let { isActive } = Memory.sources[sourceId];
		if (isActive) {

			let source = Game.getObjectById(sourceId);

			handleEnergyUsage(source);
			console.log("harv:", source.memory.harvestEPT, "| cour:", source.memory.courierEPT, "| source:", source.memory.sourceEPT);
			setupHarvesters(source);
			setupCouriers(source);
		}
	}
};
