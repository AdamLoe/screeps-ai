module.exports = (room) => {
	room.memory.sources.map( (src) => {
		let { harvs, pathToSource } = Memory.sources[src];


		// Could easily get path length from pathToSource


		// If harvesters are dead ?
		// If harvesters dont have enough ticks left


		// Each source should have a harvester, and a courier, or multiple?
		//Multiple would only be neccesary


		// After Creating two 2/1 Harvesters, and 4 1/1 Couriers
		// 6e/t , 34 Ticks to Upgrade,
		//Source sees 4e/t from Harvester (would normally have container, could add logic to handle containers)
		//Knows lenght in 13, so 26 Roundtrip, 26 * 4 = 104 Energy, So 2 1/1 Basically,
		//Theoretticaly only 11 and 12, so we should be able to make two 1/1
		//Would make a 2/2,


		//RCL1, Bum Rush one source at a time, upgrade RCL
		//Once we have all things firing, we got 8e/t
		//We can build however many builders
		//Add up to 10 Builders,
		//1-1-1 36 RoundTrip, 50 Upgrading, 50 Points    50/86   0.58139534883  / 200

		//RCL2 1st Stage : Extension, Creep Upgrade, Recycle Old

		//RCL2 2nd Stage: Expand / Roads
		//Can use alot of builders, because recycling, need calculations here though

		//RCL2 3rd Stage : Upgrade Controller
		// After Room Expansion Building Over, start pouring extra energy into upgrading

	});
};