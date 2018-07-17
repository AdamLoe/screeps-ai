module.exports = (creep) => {
	let droppedEnergy = room.find(FIND_DROPPED_ENERGY);
	let droppedResources = room.find(FIND_DROPPED_RESOURCES);

	let readyContainers = room.find(FIND_MY_STRUCTURES, {
		filter: (struct) => (
			struct.structureType === STRUCTURE_CONTAINER &&
            struct.store.RESOURCE_ENERGY > 1000
		)
	});


};