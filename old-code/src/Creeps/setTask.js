module.exports = (creep, task, target, options) => {
	options = {
		...defaultOptions,
		...options
	};
	creep.memory = {
		...creep.memory,
		taskName: task,
		taskTarget: target,
		taskPos: options.pos,
		taskRange: options.range,
		taskInRange: false
	};
};

let defaultOptions = {
	range: 1,
	pos: null
};