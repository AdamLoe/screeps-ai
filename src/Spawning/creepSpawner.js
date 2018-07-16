let genBody = (energy, bodyArr) => {
  let body = [];

   bodyArr.map( (part) => {

       let num = Math.ceil( Math.floor( energy / part.floor ) / part.ceil );

       while (num > 0) {
           body.push(part.name);
           num -= 1;
       }
   });

  return body;
};


let createCreep = (spawn, energy, roleName) => {

    let body = genBody(energy, [
        { name:  WORK, floor: 200, ceil: 1},
        { name: CARRY, floor: 100, ceil: 2},
        { name:  MOVE, floor:  50, ceil: 4}
    ]);

    let name = roleName + Math.floor(Math.random()*256+1);
    let memory = {
        originalRole: roleName,
        currentRole: roleName
    };

    console.log('Spawn: ', spawn, ' created creep:', body, 'with name', name);
    let res = Game.spawns[spawn].spawnCreep(body, name, { memory });
    console.log('res:', res);
};


let creepSpawner = () => {
    let harvesters = _.filter(Game.creeps, (creep) => {
        return creep.memory.currentRole === 'harvester'
    });


    for (let spawn in Game.spawns) {
        let room = Game.spawns[spawn].room;

        var sources = room.find( FIND_SOURCES);
        sources.map(source => {
            console.log("source", source, typeof source, source.id);
            console.log("source", source.ticksToRegeneration);
        });

        let maxEnergy = room.energyCapacityAvailable;
        let currEnergy = room.energyAvailable;
        console.log('max:', maxEnergy, '  :  ', 'curr:', currEnergy);
        if (maxEnergy === currEnergy) {
            createCreep(spawn, maxEnergy, 'harvester');
        }

    }
};

module.exports = creepSpawner;





let calcCost = (body) => {
    let cost = 0;
    for (let part in body) {
        cost += BODYPART_COST[part];
    }
    return cost
};