//Stolen Code 1&2 https://www.reddit.com/r/screeps/comments/4z38ab/how_do_i_make_my_creeps_go_to_different_sites_for/
Sources.sourcePriority = function(source) {
    let priority;
    if (source.ticksToRegeneration === undefined) {
        priority = 10;
    } else if (source.energy === 0) {
        priority = 0;
    } else {
        priority = source.energy / source.ticksToRegeneration;
    }
    if (priority > 0 && source.ticksToRegeneration < 150) {
        priority = priority * (1 + (150 - source.ticksToRegeneration)/250);
        if (source.ticksToRegeneration < 70) {
            priority = priority + (70 - source.ticksToRegeneration)/10;
        }
    }
    return priority;
};


let sources = room.find(FIND_SOURCES);
let used;

let switchSource = _.random(0, 4) === 0;
if (Sources.sourcePriority(sources[1]) > Sources.sourcePriority(sources[0])) {
    if (switchSource) {
        used = sources[0];
    } else {
        used = sources[1];
    }
} else {
    if (switchSource) {
        used = sources[1];
    } else {
        used = sources[0];
    }
}
//Stolen Code 2
if(!creep.memory.source){
    var sources = creep.room.find(FIND_SOURCES);
    var check=[];
        sources.forEach(function(srs){
            var tmp = creep.room.find(FIND_MY_CREEPS, {filter: (s) => s.memory.source == srs.id})
            if(tmp == '' || tmp.length == 1){
                creep.memory.source = srs.id;
            }
        });
    }
var source = creep.pos.findClosestByPath(FIND_SOURCES,{filter: (s) => s.id == creep.memory.source});
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
        return true;
    }
}