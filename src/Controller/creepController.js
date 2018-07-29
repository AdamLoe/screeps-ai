let harvesterRun = require("../Roles/harvesterRun");
let courierRun = require("../Roles/courierRun");

module.exports = () => {
	for (let id in Game.creeps) {
		let creep = Game.creeps[id];

		switch (creep.memory.role) {
			case "harvester": return harvesterRun(creep);
			case "courier": return courierRun(creep);
		}
	}
};