
let func1 = function(param) {
	console.log(param);
};
let run = function() {
	this.func1(this.var1);
};
let getCreep = (creep) => {
	return {
		var1: 5,
		func1,
		run
	};
};

module.exports = () => {
	if (Game.time % 1 === 0) {
		for (let id in Memory.creeps){
			if ( !(id in Game.creeps)) {
				delete Memory.creeps[id];
			}
		}
	}

};
