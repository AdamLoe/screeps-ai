module.exports = function(grunt) {
    var config = require('./.screeps.json');
    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: config.email,
                password: config.password,
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['dist/main.js']
            }
        }
    });
}
