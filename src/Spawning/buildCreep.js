let { bodyCost } = require("./helper");

module.exports = ({
	room, energy, maxParts, role,
	initialLoop, middleLoop,
	memory
}) => {

	let works = 0;
	let carrys = 0;
	let moves = 0;

	while (energy > 50) {
		middleLoop.map( (loop) => {
			console.log("loop", loop);
			let cost = bodyCost(loop);
			if (cost <= energy) {
				energy -= cost;
			}
		});
	}


	let body = [];
	while (works > 0) body.push(WORK); works -= 1;
	while (carrys > 0) body.push(CARRY); carrys -= 1;
	while (moves > 0) body.push(MOVE); moves -= 1;

	Memory.nameClk += 1;
	return {
		roomName: "WN87",
		body: [WORK, WORK, MOVE],
		memory: {
			ogRole: role,
			currentRole: role,
			room: room,
			work: works,
			carry: carrys,
			move: moves
		},
		name: role + Memory.nameClk
	};
};