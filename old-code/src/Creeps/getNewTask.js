let harvesterRun 	= require("../Roles/harvesterRun");
let spyRun 			= require("../Roles/spyRun");
let courierRun		= require("../Roles/courierRun");

module.exports = (creep) => {
	switch (creep.memory.role) {
		case "harvester":  	harvesterRun(creep); 	break;
		case "spy":			spyRun(creep);			break;
		case "courier": 	courierRun(creep);		break;
	}
};