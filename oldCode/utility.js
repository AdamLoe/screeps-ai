module.exports = {
    setAllRoles: function( role) {
        setAllRoles( role);
    },
    resetAllRoles: function() {
        resetAllRoles();
    },
    build: function(startX, startY, endX, endY, object) {
        build(startX, startY, endX, endY, object);
    }
};

function setAllRoles( role) {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.memory.role = role
    }
}

function resetAllRoles() {
     for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.memory.role = creep.memory.ogRole;
    }
}

function build(startX, startY, endX, endY, object) {
    deltaX= endX-startX;
    deltaY= endY-startY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        var riseOverRun = deltaY/deltaX;
        var inc = deltaX/ Math.abs(deltaX);
        for (var i = 0; i <= Math.abs(deltaX); i++) {
            if (build) {
                Game.spawns.Spawn1.room.createConstructionSite(startX+i*inc, Math.round(startY+i*riseOverRun*inc), object);
            }
            else {
                
            }
        }
    } else {
        var runOverRise = deltaX/deltaY;
        var inc = deltaY/ Math.abs(deltaY);
        for (var i = 0; i <= Math.abs(deltaY); i++) {
            if (build) {
                Game.spawns.Spawn1.room.createConstructionSite(startX+(i*runOverRise*inc), startY+i*inc, object);
            }
            else {
                
            }
        }  
    }
    
}


