let handleExtraLoad = (source) => {
    let { harvestEPT, courierEPT } = Memory.sources[source.id];
	//

	if ( courierEPT < harvestEPT ) {
	}
};

//Valid Task
//Valid Target78/
let handleCouriers = (source) => {
};

module.exports = (source) => {
	handleExtraLoad(source);
	handleCouriers(source);
};