module.exports = (body, memory, name) => {
	console.log("Created creep:", body, "with name", name);
	return this.spawnCreep(body, name, { memory });
};
