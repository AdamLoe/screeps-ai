let justReset = () => {
	if (_.size(Game.rooms) === 1) {
		if (_.find(Game.rooms).controller.level === 1) {
			if (_.size(Game.creeps) === 0) {
				return true;
			}
		}
	}
	return false;
};

module.exports = () => {

	Memory.sources = Memory.sources || {};
	Memory.nameClk = Memory.nameClk || 0;
    
	if ( justReset() ) {
		console.log("++++++ CLEARING OLD MEMORY ++++++++++");

		Memory.rooms = {};
		Memory.spawns = {};
		Memory.sources = {};
		Memory.creeps = {};
		Memory.nameClk = 1;
	}

	if (Game.rooms.length === 1) {

	}
};