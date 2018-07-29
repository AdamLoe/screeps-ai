let room = "W8N7";

module.exports = (creep) => {

	let { room,  source } = creep.memory;
	let { ogRole, currentRole, work, carry, move } = creep.memory;

	if (room === creep.room.name) {
		let { x, y } = Memory.sources[source];

		let distX = Math.abs(x - creep.pos.x)**2;
		let distY = Math.abs(y - creep.pos.y)**2;
		let inRange = (distX < 2 && distY < 2);

		source = Game.getObjectById(source);
		if (inRange) {
			creep.harvest(source);
		} else {
			creep.moveTo(source);
		}
	} else {
		creep.moveTo(room);
	}
};