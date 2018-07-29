
console.log("Overload File Required");

export class Overlord {
	constructor() {
		console.log("Overlord Constructing");
	}

	get publicGet() {
		console.log("Overlord PublicGet");
	}

	privateGet() {
		console.log("Overlord PrivateGet");
	}
}

