module.exports = {
	harvest,
	store,
	upgrade,
	repair,
	build,
	transfer,
	moveTo
};

//Harvester - Transfer | Harvester
//Carrier - Transfer | Withdraw
//HonestWork- Build | Withdraw
//GreedyWork- Build | Harvest
//Medic- Heal | Withdraw/Harvest
//Repair- Repair | Harvest
//Upgrader - Upgrade | Harvest


let handleAction = (actionFunc, creep, targetArray) => {

	let token = actionFunc(creep, targetArray[creep.memory.index]);
	switch ( token ) {
		case ERR_NOT_IN_RANGE:
			//Move To Target
			break;
		case ERR_NOT_ENOUGH_RESOURCES:
			//Go Back to Harvesting
			break;
		case ERR_FULL:
			//Get New Target
			break;
		case ERR_INVALID_TARGET:
			//Get New Target
			break;
		case ERR_NOT_OWNER:
			//Get New Target
			break;
		case ERR_BUSY:
			//Still being spawned, do nothing
			break;
		case ERR_NO_BODYPART:
			//Wrong Class, Display ERROR
			break;
		case ERR_RCL_NOT_ENOUGH:
			//Abandon Task
			break;
	}
};
let harvest = (creep, targetArray) => {
	let isHarvesting = true;
	let isCreepFull = (creep.carry.energy === creep.carryCapacity);
	let isCreepEmpty = (creep.memory.building && creep.carry.energy === 0);

	let targetIsAcquired = (creep.memory.index !== undefined);
	let targetNotEmpty = false;


	handleAction(creep.harvest, creep, targetArray);
};

let store = () => {

};

let upgrade = () => {

};

let repair = () => {

};

let build = () => {
	//Game.spawns.Spawn1.room.createConstructionSite( x, y, STRUCTURE_ROAD)
};

let transfer = () => {

};

let moveTo = () => {

};