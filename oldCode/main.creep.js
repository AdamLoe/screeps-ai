var roleHarvester = require('role.harvester');
var roleBigHarvester = require('role.bigHarvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMedic = require('role.medic');

module.exports = {
    run: function( ) {
        run( );
    }
};

function run() {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch ( creep.memory.role ) {            //creep.memory.role ) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'medic':
                roleMedic.run(creep);
                break;
            default:
                break;
        }
    }
}