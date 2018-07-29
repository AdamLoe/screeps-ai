module.exports = () => {
	if (Game.time % 1 === 0) {
		for (let id in Memory.creeps){
			if ( !(id in Game.creeps)) {
				delete Memory.creeps[id]
			}
		}
	}
};