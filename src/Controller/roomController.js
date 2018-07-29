let initializeRoomMemory = require("./initializeRoomMemory");
let roomPlanner = require("./roomPlanner");

module.exports = () => {
	for (let name in Game.rooms) {
		let room = Game.rooms[name];

		initializeRoomMemory(room);
		roomPlanner(room);

	}
};
//Every Main Room Needs
//SourceHarvester and SourceCourier
//Upgrader Role
//Worker Role (Build and Repairs)
//Queen (Handles spawning energy)
//King  (Handles main transportation)
//Transporter (Late game courier after links and shit)

//Room Planner
//Build Structures Based on RCL
//One at a time
//
//Rebuild Missing Structures

//Colony
//Run Towers, Roles, Groups

//Overseer
//Check Room Enemies ( Main and Tendrils)
//Check Emergency Help
//Handle Safe Mode

//Groups
//Miners
//Harvs
//Upgraders
//Requesting energy for links, calcing power needed, finding battery
//Hatchery
//Handle hatchery logistics and spawning of creeps

//Groups Module
//Init/Spawn
//Check if we need to spawn
//Roles
//Miner
//Harvester
//
//Upgrade
//Upgrading, withdrawing, and repairing shit
//Hatch Queen
//Handle Energy Movement

//Role Module
//Init / Spawn
//If we need more power, make another creep
//Run
//If ValidTask & ValidTarget) Work
//Else Get new Task
//LifeTime Filter
//3*bodylength + spawnDistance
//RequestCreep
//Wishilist


//Actions
//Harvest
//Withdraw
//Upgrade

//Action Module
//IsValid
//ValidTask
//ValidTarget
//Valid Room
//Run
//If in range, work
//OTherwise goto


//Action.js

//Creep
//Set Task
//
//Directives
//New Way would be to say like
//Overall
//Rooms
//Tendrils
//Creep


//Key problem is thing these we want to do, we should not wait to add them to the list
//We should just add them at a lower priority


//Priority Sorting Example-
/*
Overlord Setups Pros
	Allows us to use overlords based on priority

Source Active
	Spawns / Tracks Harvesters and Couriers
Source Inactive
	Show usage cost
Full Room
	Tracks Energy Output
	On RCL Levelup, Increase Construction Tracker
	Track Construction
Controller
	Decisions
		New Room? Non-claim, claim, or owned
		Construction
*/