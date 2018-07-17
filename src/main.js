let num = 1;

let log = (str = num) => {
	console.log("--", str, "--");
	num += 1;
};

require("./Helpers/logger")();
log("Controller");
require("./Controller/controller")();
log("Spawner");
require("./Spawning/queueHandler")();
log("Creeps");
require("./Actions/creepActions")();
log("Towers");
require("./Actions/towerActions")();
log("Cleanup");
require("./Helpers/cleanup")();