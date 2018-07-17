/**
 * Created by Adam on 7/17/2018.
 */
module.exports = {
	bodyCost: (body) => {
		let cost = 0;
		body.map(part => cost += BODYPART_COST[part]);
		return cost;
	},
	dispObj: (obj) => {
		for (let key in obj) {
			console.log(key, ":", obj[key]);
		}
	}
};