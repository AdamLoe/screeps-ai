let harvesterAction = require('./creepActions-harvester');

module.exports = () => {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        let role = creep.memory.currentRole;

        if (role === 'harvester') harvesterAction(creep);
    }
};

