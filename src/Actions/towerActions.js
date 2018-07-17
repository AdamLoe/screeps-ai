module.exports = () => {
	for (let name in Game.rooms) {
	    let room = Game.rooms[name];

		let towers = room.find(FIND_STRUCTURES, {
			filter: (struct) => (
				struct.structureType === STRUCTURE_TOWER
			)
		});
	}
};