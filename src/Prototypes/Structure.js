Structure.prototype.currEnergy = function() {
	switch(this.structureType) {
		case STRUCTURE_STORAGE:
		case STRUCTURE_CONTAINER:
			return this.store;
			break;
		case STRUCTURE_SPAWN:
		case STRUCTURE_EXTENSION:
		case STRUCTURE_LINK:
			return this.energyAvailable;
	}
};

Structure.prototype.maxEnergy = function() {
	switch(this.structureType) {
		case STRUCTURE_STORAGE:
		case STRUCTURE_CONTAINER:
			return this.storeCapacity;
			break;
		case STRUCTURE_SPAWN:
		case STRUCTURE_EXTENSION:
		case STRUCTURE_LINK:
			return this.energyCapacity;
	}
};