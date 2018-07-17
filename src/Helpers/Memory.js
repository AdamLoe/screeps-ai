module.exports = () => {

	Memory.nameClk = Memory.nameClk || 0;

	console.log("Setting Memory");

	for (let name in Game.spawns) {
		let spawn = Game.spawns[name];
		let room = spawn.room;

		let roomMem = room.memory.spawns;
		if (roomMem === undefined) {
			room.memory.spawns = [];
		}
		if (spawn in room) {
			room.memory.spawns.concat(spawn);
		}
	}


	Memory.sources = {
	};

	Memory.track = {
		...Memory.track
	};

};