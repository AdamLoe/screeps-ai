let Courier = require("./Roles/Courier");
let Harvester = require("./Roles/Harvester");
let Worker = require("./Roles/Worker");

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

