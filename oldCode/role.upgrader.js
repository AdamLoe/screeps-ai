var roleFunctions = require('role.functions');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find( FIND_SOURCES);
        
        if (creep.memory.index == undefined || creep.memory.upgrading == undefined) {
            
            creep.memory.upgrading = false;
	        creep.memory.index =  Math.round( Math.random());
	        
        } else if (creep.memory.upgrading && creep.carry.energy == 0) {
            
            creep.memory.upgrading = false;
	        creep.memory.index =  Math.round( Math.random()+.01)
	        
	    } else if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        
	        creep.memory.upgrading = true;
	        
	    }
	    
	    if(creep.memory.upgrading) {
	        creep.say('UUGRD' + creep.memory.index);
	        creep.memory.index = roleFunctions.clamp( creep.memory.index, sources.length);
            roleFunctions.upgrade( creep);
        
	        
	    }else {
            creep.say('UHARV' + creep.memory.index);
            creep.memory.index = roleFunctions.clamp( creep.memory.index, sources.length);
	        roleFunctions.harvest( sources, creep);
        
	        
	    }
	}
};



module.exports = roleUpgrader;