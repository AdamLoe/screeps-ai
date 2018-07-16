var roleFunctions = require('role.functions');
var roleMedic = {
    run : function(creep) {
        target = creep.memory.healTarget;
        if ( (target == undefined) || (target.hits = target.hitsMax)) {
            creep.memory.healTarget = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                filter:  x =>
                    (x != creep)   &&  (x.hits < (x.hitsMax/2)) 
            });
        }
    }
}
module.exports = roleMedic;