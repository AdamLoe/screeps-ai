Structure.prototype.currEnergy = function() {
	switch(this.structureType) {
		case STRUCTURE_STORAGE:
		case STRUCTURE_CONTAINER:
			return this.store;
		case STRUCTURE_EXTENSION:
		case STRUCTURE_LINK:
		case STRUCTURE_SPAWN:
			return this.energy;
	}
};

Structure.prototype.maxEnergy = function() {
	switch(this.structureType) {
		case STRUCTURE_STORAGE:
		case STRUCTURE_CONTAINER:
			return this.storeCapacity;
		case STRUCTURE_EXTENSION:
		case STRUCTURE_LINK:
			return this.energyCapacity;
		case STRUCTURE_SPAWN:
			return this.energyCapacity;
	}
};