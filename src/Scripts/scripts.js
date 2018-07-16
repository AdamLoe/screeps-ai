let getCreepByName = (name) => {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.name === name) {
            return creep
        }
    }
};

module.exports = {
    addName,
    addArea,
    removeAll,
    removeName,

    drop,
    pickup,

    setRole,
    setTarget,

    buildOne,
    build,

};

let addName = (name, group = "default") => {

};

let addArea = (pair1, pair2, group = "default") => {

};

let removeAll = (group = "default") => {

};

let removeName = (name, group = "default") => {

};

let

let drop = (type, group = "default") => {
};

/*
 console.log("drop: ", getCreepByName(name).drop(type));
 },
 pickup: (name, type) => {
 console.log("pickup: ", getCreepByName(name).pickup(type));
 },
 build: (pair1, pair2, type) => {

 let x1, y1 = pair1;
 let x2, y2 = pair2;

 let deltaX = x2 - x1; deltaY = y2 - y1;
 let absX = Math.abs(deltaX);  let absY = Math.abs(deltaY);
 deltaX = deltaX / absX;  deltaY = deltaY / absY;

 if (absX > absY) {
 }

 console.log(x1, x2, y1, y2);
 let token = Game.spawns.Spawn1.room.createConstructionSite(x, y, type);
 console.log(token);
 */