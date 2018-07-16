var main_cleanup = require('main.cleanup');
var main_tower = require('main.tower');
var main_spawn = require('main.spawn');
var main_creep = require('main.creep');
require('timer')();

mainLoop();
module.exports = {
    mainLoop: function() {
        mainLoop();
    }
};

function mainLoop() {
    main_cleanup.run();
    main_tower.run();
    main_spawn.run();
    main_creep.run();
    
}