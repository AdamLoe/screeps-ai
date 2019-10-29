let setTask = require("../Creeps/setTask");

module.exports = (creep) => {
	setTask(creep, "harvest", creep.memory.target, {
		pos: creep.memory.dropPos,
		range: 0
	});

};