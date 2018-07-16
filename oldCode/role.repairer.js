function getNewConstruction(creep, targets) {
     var closestExtension = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
            filter: (structure) =>  
              ( (structure.structureType == STRUCTURE_ROAD) )
    });
    creep.memory.repairingindex = targets.findIndex( x => x == closestExtension);
}



var roleFunctions = require('role.functions');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    var sources = creep.room.find( FIND_SOURCES);
	    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
	    
	    if (creep.memory.index == undefined) {
            creep.memory.repairing = false;
            creep.memory.index =  Math.round( Math.random() +.01);
            
        } else if(creep.memory.repairing && creep.carry.energy == 0) {
            
            creep.memory.repairing = false;
            creep.memory.index =  Math.round( Math.random() +.01);
            
	    } else if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
             getNewConstruction(creep, targets)
            //var closestExtension = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            //var closestExtension = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
            //filter: (structure) =>  
            //  ( (structure.structureType == STRUCTURE_EXTENSION) )
            //});
            //creep.memory.repairingindex = targets.findIndex( x => x == closestExtension);
	    } 

	    if (creep.memory.repairing) {
            creep.say('RRepa' + creep.memory.index);
            
            if (creep.memory.repairingindex >= targets.length) {  //if repairing out of range, pick new one
                getNewConstruction(creep, targets)
                creep.memory.repairingindex = targets.findIndex( x => x == closestExtension);
            }
            else if (creep.memory.repairingindex < 0) {
                creep.memory.repairingindex = targets.length - 1;
            }
            creep.memory.repairingindex = roleFunctions.clamp( creep.memory.index, targets.length);
	        roleFunctions.repair( targets, creep);
	        
	    } else {
            creep.say('RHarv' + creep.memory.index);
            creep.memory.index = roleFunctions.clamp( creep.memory.index, sources.length);
	        roleFunctions.harvest( sources, creep);
	    }
	}
};


module.exports = roleBuilder;