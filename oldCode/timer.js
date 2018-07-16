module.exports = function() {
    
    if ( Memory.timer == undefined) {
        Memory.timer = 0
    }
    else if ( Memory.timer >= 3000 ) {
        Memory.timer = 0
    }
    else {
        Memory.timer += 1
    }
    console.log( Memory.timer)
    
};
