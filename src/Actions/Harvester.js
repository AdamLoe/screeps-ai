let room = "W8N7";

let defaultActionObj = {
	harvesting: false,
	building: false,

	sourceId: "6bfc07721507fca",

	workParts: 2,
	carryParts: 0
};

module.exports = (creep) => {
	creep.memory.action = creep.memory.action || defaultActionObj;

	let source = Game.getObjectById(creep.memory.action.sourceId);
	let { x, y, roomName } = source.pos;

	if (roomName === creep.room.name) {

		let distX = Math.abs(x - creep.pos.x)**2;
		let distY = Math.abs(y - creep.pos.y)**2;
		let inRange = (distX < 2 && distY < 2);

		if (inRange) {
		    creep.harvest(source);
		} else {
			creep.moveTo(source);
		}
	} else {
		creep.moveTo(source);
	}
};