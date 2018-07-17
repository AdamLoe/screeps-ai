module.exports = () => {
    console.log('------------------------------------');
    for (let spawn in Game.spawns) {
        let room = Game.spawns[spawn].room;
        let maxEnergy = room.energyCapacityAvailable;
        let currEnergy = room.energyAvailable;
        console.log("Spawn:", spawn, "  |  ", "max:", maxEnergy, "|", "curr:", currEnergy);
    }
};