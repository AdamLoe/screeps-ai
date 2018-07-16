require('prototype.spawn')();

module.exports = {
    run
};

function run() {
    var numHarvesters = 1;
    var numBuilders = 1;
    var numUpgraders = 3;
    var numMedics = 0;
    
    var maxEnergy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var currEnergy= Game.spawns.Spawn1.room.energyAvailable
    
    var harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
    var builders = _.filter(Game.creeps, creep => creep.memory.role === 'builder');
    var upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');
    var medics = _.filter(Game.creeps, creep => creep.memory.role === 'medic');
    //console.log('Curr:harv: ' + harvesters.length + ', build: ' + builders.length + ', upgraders: ' + upgraders.length + ', medics: ' + medics.length);
    
    //var ogHarvesters = _.filter(Game.creeps, (creep) => creep.memory.ogRole == 'harvester');
    //var ogBuilders = _.filter(Game.creeps, (creep) => creep.memory.ogRole == 'builder');
    //var ogUpgraders = _.filter(Game.creeps, (creep) => creep.memory.ogRole == 'upgrader');
    //var ogMedics = _.filter(Game.creeps, (creep) => creep.memory.ogRole == 'medic');
    //console.log('Orig:harv: ' + ogHarvesters.length + ', build: ' + ogBuilders.length + ', upgraders: ' + ogUpgraders.length + ', medics: ' + ogMedics.length);
    
    
    //If we dont have the right amount of harvesters, and one is needed, change upgrader to harvest
    //if( (harvesters.length < numHarvesters)  &&   (Game.spawns.Spawn1.room.energyCapacityAvailable != Game.spawns.Spawn1.room.energyAvailable)) {
    //    if (upgraders != undefined) {
    //        upgraders[0].memory.role = 'harvester';
    //    }
    //    else if (builders != undefined) {
    //        builders[0].memory.role = 'harvester';
    //    }
    //}
    if (maxEnergy == currEnergy) {
        //If we max out energy, try to make a creep
        if(harvesters.length < numHarvesters) {
            var newName = Game.spawns['Spawn1'].createCustomCreep( maxEnergy, 'harvester')
        } else if(medics.length < numMedics) {
            var newName = Game.spawns['Spawn1'].createCustomCreep( maxEnergy, 'medic')
        } else if(upgraders.length < numUpgraders) {
            var newName = Game.spawns['Spawn1'].createCustomCreep( maxEnergy, 'upgrader')
        } else if(builders.length < numBuilders) {
            var newName = Game.spawns['Spawn1'].createCustomCreep( maxEnergy, 'builder')
        } 
    }
    else {
        //If we somehow run out of all harvesters, try to use one of our other workers
        //If none available, make one, have to make sure we have enough energy though, since ours will make one w/ just 1 body part
        if((harvesters.length == 0) || (harvesters == undefined)) {
            if (builders.length > 0) {
                builders[0].memory.role = 'harvester';
                
            }
            else if (upgraders.length > 0) {
                upgraders[0].memory.role = 'harvester';
                
            }
            else if (medics.length > 0) {
                medics[0].memory.role = 'harvester';
                
            } 
            else if (currEnergy >= 300) {
                var newName = Game.spawns['Spawn1'].createCustomCreep( maxEnergy, 'harvester')
            }
            
        }
    }
    
}