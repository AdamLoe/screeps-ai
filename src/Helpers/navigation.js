let nextTo = (pos1, pos2) => {
	if ( pos1.room !== pos2.room ) {
		return 100;
	} else {
		let xNear = Math.abs(pos1.x - pos2.x);
		let yNear = Math.abs(pos1.y - pos2.y);
		return Math.max(xNear, yNear);
	}
};

let getPos = (obj) => {
	if ("x" in obj) {
		return obj;
	} else {
		return obj.pos;
	}
};

exports.nextTo = (obj1, obj2) => {
	if (obj1 === null || obj2 === null) return 0;
	let pos1 = getPos(obj1);
	let pos2 = getPos(obj2);
	return nextTo(pos1, pos2);
};