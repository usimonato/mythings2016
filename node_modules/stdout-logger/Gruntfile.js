module.exports = function (grunt) {

    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // monitor length each task takes
    require('time-grunt')(grunt);

    grunt.initConfig({

        // first we will read the projects package.json
        // and any other specfic project configm required
        pkg: grunt.file.readJSON('package.json'),

        shell: {
            mocha: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'mocha test'
            }
        },

        jshint: {
            with_overrides: {
                options: grunt.config('jshintrc'),
                reporter: require('jshint-stylish'),
                files: {
                    src: ['*.js', 'lib/*.js', 'test/*.js', '!node_moduels']
                }
            }
        },

        lintspaces: {
            javascript: {
                options: {
                    newline: true,
                    trailingspaces: true,
                    spaces: 2,
                    indentation: 'spaces', // defaults to 4
                    ignores: ['js-comments']
                },
                src: ['*.js', 'lib/*.js', 'test/*.js', '!node_moduels']
            }
        },

    });

    grunt.registerTask('format', ['lintspaces', 'jshint:with_overrides']);
    grunt.registerTask('test', ['shell:mocha']);
};
