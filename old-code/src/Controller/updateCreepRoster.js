let updateSources = require("./updateSources");
let updateUpgraders = require("./updateUpgraders");
let updateBuilders = require("./updateBuilders");
let updateSpies = require("./updateSpies");

module.exports = (spawn) => {
	updateSources(spawn);
	updateUpgraders(spawn);
	updateBuilders(spawn);
	updateSpies(spawn);
};