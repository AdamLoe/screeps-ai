let Courier = require("./Courier");
let Harvester = require("./Harvester");
let Worker = require("./Worker");

module.exports = () => {
	for (let name in Game.creeps) {
		let creep = Game.creeps[name];

		let role = creep.memory.currentRole;

		switch ( role ) {
			case "harvester":
			    Harvester(creep);
				break;
			case "courier":
			    Courier(creep);
				break;
			case "worker":
			    Worker(creep);
				break;
		}
	}
};

