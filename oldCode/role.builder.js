function getNewConstruction(creep, targets) {
     var closestExtension = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
            filter: (structure) =>  
              ( (structure.structureType == STRUCTURE_ROAD) ||
                (structure.structureType == STRUCTURE_EXTENSION) )
    });
    creep.memory.Buildingindex = targets.findIndex( x => x == closestExtension);
}



var roleFunctions = require('role.functions');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    var sources = creep.room.find( FIND_SOURCES);
	    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
	    
	    if (creep.memory.index === undefined) {
            creep.memory.building = false;
            creep.memory.index =  Math.round( Math.random() +.01);
            
        } else if (creep.memory.building && creep.carry.energy == 0) {
            
            creep.memory.building = false;
            creep.memory.index =  Math.round( Math.random() +.01);
            
	    } else if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
	        creep.memory.building = true;
             getNewConstruction(creep, targets)
            //var closestExtension = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            //var closestExtension = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
            //filter: (structure) =>  
            //  ( (structure.structureType == STRUCTURE_EXTENSION) )
            //});
            //creep.memory.Buildingindex = targets.findIndex( x => x == closestExtension);
	    } 

	    if (creep.memory.building) {
            creep.say('BBuil' + creep.memory.index);
            
            if (creep.memory.Buildingindex >= targets.length) {  //if building out of range, pick new one
                getNewConstruction(creep, targets)
                creep.memory.Buildingindex = targets.findIndex( x => x === closestExtension);
            }
            else if (creep.memory.Buildingindex < 0) {
                creep.memory.Buildingindex = targets.length - 1;
            }
            creep.memory.Buildingindex = roleFunctions.clamp( creep.memory.index, targets.length);
	        roleFunctions.build( targets, creep);
	        
	    } else {
            creep.say('BHarv' + creep.memory.index);
            creep.memory.index = roleFunctions.clamp( creep.memory.index, sources.length);
	        roleFunctions.harvest( sources, creep);
	    }
	}
};


module.exports = roleBuilder;