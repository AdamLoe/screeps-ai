module.exports = {
    harvest,
    store,
    upgrade,
    repair,
    build,
    moveTo,
    clamp
;



function harvest( array, creep) {
    token = creep.harvest(array[creep.memory.index]);
    switch ( token ) {
        case ERR_NOT_IN_RANGE:
            moveTo( array[creep.memory.index], creep);
            break;
        case ERR_NOT_ENOUGH_RESOURCES:
            creep.memory.index += 1;
            break;
        case ERR_BUSY:
            break;
        case ERR_NO_BODYPART:
            break;
        case OK:
            break;
        case ERR_NOT_OWNER:
            break;
        case ERR_INVALID_TARGET:
            break;
    }
}


function store( array, creep) {
    token =  creep.transfer(array[creep.memory.index], RESOURCE_ENERGY);
    switch ( token ) {
        case ERR_NOT_IN_RANGE:
            moveTo( array[creep.memory.index], creep);
            break;
        case ERR_INVALID_TARGET:
            if ( Game.spawns.Spawn1.room.energyCapacityAvailable === Game.spawns.Spawn1.room.energyAvailable) {
                moveTo( Game.spawns.Spawn1, creep);
            }
            break;
    }
}

function upgrade(creep) {
    if(creep.upgradeController(creep.room.controller) !== 0) {
        creep.moveTo(creep.room.controller);
    }
}

function repair(creep) {
    if(creep.upgradeController(creep.room.controller) !== 0) {
        creep.moveTo(creep.room.controller);
    }
}

function build( array, creep) {
    switch ( creep.build(array[creep.memory.Buildingindex]) ) {
        case ERR_NOT_IN_RANGE:
            moveTo( array[creep.memory.Buildingindex], creep);
    }
}

function moveTo( object, creep) {
    token = creep.moveTo( object);
    switch ( token  ) {
        case ERR_NO_PATH:
            creep.memory.index += 1;
            break;
        case ERR_TIRED:
            if (creep.memory.ogRole == 'harvester') { //Needs to be original harvester so we dont build useless roads when changings a creep to harvester
                Game.spawns.Spawn1.room.createConstructionSite( creep.pos[0], creep.pos[1], STRUCTURE_ROAD)
            }
            break;
        case ERR_INVALID_TARGET:
            creep.memory.index += 1;
            break;
        case OK:
            break;
    }
}




function clamp(number, length) {
  if (number < 0) {
      return length -1;
  }
  else if (number >= length) {
      return 0;
  }
  else {
        return number;     
  }
}