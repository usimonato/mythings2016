describe('myLogger module', function () {

    var Logger = require('./../lib/Logger'),
        myLogger = Logger.getLogger(),
        _ = require('lodash');

    // we use child process to excute parser via CLI
    it('should require the stdout-logger module', function (done) {
        if (Logger) {
            done();
        } else {
            return done('Failed to require Logger');
        }
    });

    // we use child process to excute parser via CLI
    it('should return an instance of the the stdout-Logger', function (done) {
        if (myLogger) {
            done();
        } else {
            return done('Failed to instantciate stdout-logger');
        }
    });

    it('should return a colorized output for each log level', function (done) {
        if (myLogger) {

            console.log('\n\n');
            myLogger('silly', 'test silly level');
            myLogger('verbose', 'test verbose level');
            myLogger('debug', 'test debug level');
            myLogger('info', 'test info level');
            myLogger('warn', 'test warn level');
            myLogger('error', 'test error level');
            console.log('\n');

            done();
        } else {
            return done('Failed to instantciate stdout-logger');
        }
    });

    it('should turn off colorized output to console', function (done) {
        if (Logger) {
            Logger.set('colorize', false);
            if (Logger.get('colorize') === false) {
                done();
            }
        } else {
            return done('Failed to instantciate stdout-logger');
        }
    });

    it('should silence log output to console', function (done) {
        if (Logger) {
            Logger.set('silent', true);
            if (Logger.get('silent') === true) {
                done();
            }
        } else {
            return done('Failed to instantciate stdout-logger');
        }
    });

    it('should turn on json format output to console\n', function (done) {
        if (Logger) {
            Logger.set('json', true);
            if (Logger.get('json') === true) {
                done();
            }
        } else {
            return done('Failed to instantciate stdout-logger');
        }
    });

    it('should not handle exceptions', function (done) {
        if (Logger) {
            Logger.set('handleExceptions', false);
            if (Logger.get('handleExceptions') === false) {
                done();
            }
        } else {
            return done('Failed to instantciate stdout-logger');
        }
    });
});
