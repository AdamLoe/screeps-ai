module.exports = {
    run: function() {
        cleanUpCreepMemory();
    }
};

function cleanUpCreepMemory() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name] || Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
};