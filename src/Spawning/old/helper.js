let dispObj = (obj, name="obj") => {
	let recursive = false;
	console.log("---" + name +"---");
	for (let key in obj) {
		if (recursive && typeof obj === "object") {
			dispObj(obj[key], key);
		} else {
			console.log(key, ":", obj[key]);
		}
		console.log(key, ":", obj[key]);
	}
};

let dispPath = (path) => {
	console.log('---path---');
	path.map( pos => console.log(pos.x, pos.y) );
}

module.exports = {
	bodyCost: (body) => {
		let cost = 0;
		body.map(part => cost += BODYPART_COST[part]);
		return cost;
	},
	dispObj,
	dispPath
};