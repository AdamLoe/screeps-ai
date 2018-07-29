Object.defineProperty(Source.prototype, "memory", {
	get: function() {
		return Memory.sources[this.id];
	},
	enumerable: false,
	configurable: true
});

Object.defineProperty(Source.prototype, "harvesters", {
	get: function() {
		return Memory.sources[this.id].harvesters.map( creepId => Game.creeps[creepId] );
	},
	enumerable: false,
	configurable: true
});

Object.defineProperty(Source.prototype, "couriers", {
	get: function() {
		return Memory.sources[this.id].couriers.map( creepId => Game.creeps[creepId] );
	},
	enumerable: false,
	configurable: true
});


module.exports = () => {};

