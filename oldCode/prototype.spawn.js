module.exports = function() {
    StructureSpawn.prototype.createCustomCreep = 
        function(energy, roleName) {
            var numWork  = Math.floor( energy  /  200);
            var numCarry = Math.ceil( Math.floor( energy/ 100) /2);
            var numMove  = Math.ceil( Math.floor( energy/50) /4 );
            var body = [];
            console.log( energy, body);
            if (roleName == 'harvester') {
                return this.createCreep(body, undefined, {ogRole : roleName, role: roleName} )
            }
            else {
                return this.createCreep(body, undefined, {role: roleName})
            }
        };
};