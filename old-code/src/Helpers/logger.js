exports.log = () => {

};

exports.display = (param) => {
	console.log(disp(param));
};

let disp = (param) => {
	if (typeof param === "object") {
	    if (Array.isArray(param)) {
			return dispArr(param);

		} else {
			return dispObj(param);
		}
	} else {
	    return dispVal(param);
	}
};

let dispVal = (val) => {
	return val;
};

let dispArr = (arr) => {
	let string = "[";
	arr.map( (item, index) =>  {
		let addComma = (index !== arr.length-1);
		string += disp(item) + (addComma ? "," : "");
	});
	string += "]";

	return string;
};

let dispObj = (obj) => {
    let string = "";
	for (let id in obj) {
	    string += id + ": " + disp(obj[id]) + ", ";
	}
	if (string.length > 2) {
	    string = string.slice(0, string.length-2);
	    string = "{ " + string + "}";
	} else {
	    string = "{}";
	}

	return string;
};
exports.dispObj = dispObj;