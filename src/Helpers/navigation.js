let nextTo = (pos1, pos2) => {
	return (pos1.x + 1 >= pos2.x ) && (pos1.x - 1 <= pos2.x);
};

let getPos = (obj) => {
	if ("x" in obj) {
		return obj;
	} else {
		return obj.pos;
	}
};

exports.nextTo = (obj1, obj2) => {
	let pos1 = getPos(obj1);
	let pos2 = getPos(obj2);
	return nextTo(pos1.x, pos2.x) && nextTo(pos1.y, pos2.y);
};