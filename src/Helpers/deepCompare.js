let compare = (param1, param2) => {
	if (typeof param1 !== typeof param2) {
		return false;
	}
	if (typeof param1 === "object") {
		if (Array.isArray(param1)) {
			if (Array.isArray(param2)) {
			    return compareArrays(param1, param2);
			} else {
				return false;
			}
		}
		return compareObjects(param1, param2);
	}
	return param1 === param2;
};

let compareArrays = (arr1, arr2) => {
	let ret = true;
	arr1.forEach( (item1, index) => {
		let item2 = arr2[index];

		if ( !compare(item1, item2) ) {
		    ret = false;
		}
	});
	return ret;
};

let compareObjects = (obj1, obj2) => {
	for (let key in obj1) {
		if (!(key in obj2)) {
			return false;
		}

		if ( !compare(obj1[key], obj2[key]) ) {
		    return false;
		}
	}
	for (let key in obj2) {
	    if (!(key in obj1)) {
	        return false;
		}
	}
	return true;
};

module.exports = compare;