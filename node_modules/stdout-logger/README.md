stdout-logger
====

![Build Passing](https://travis-ci.org/col1985/logger.svg?branch=master)
[![NPM version](https://badge.fury.io/js/stdout-logger.svg)](http://badge.fury.io/js/stdout-logger)

This is my preferred configuration of Winston Logger module. I think it is nice a simple!

stdout-logger default logging level is ```debug``` and will look for a environment variable DEV_ENV or defaults to ```"DEV"```. If set to ```"PROD"``` logging level is set to ```info``` and colorized logging is turned off!  

Basic look and feel... 

![logger_output](https://github.com/col1985/logger/raw/master/logger_output.png)

### How to install?

From command line.. 

```bash
npm install stdout-logger
```

### stdout-logger default config

Default settings of instance Winston Logger.

```javascript

  {
      "colorize": true, // set to false to turn colorized messaging off.
      "json": false, // set to true to turn json formated messaging on.
      "slient": false, // set to true to turn off messaging
      "handleExceptions": true, // set to false to turn off handling exceptions
      "level": "debug", 
      "timestamp": function () {
          return new Date().toUTCString();
      }
  }

```

### stdout-logger levels

+ Level 0 ::  ```debug```
+ Level 1 :: ```info```
+ Level 2 :: ```silly```
+ Level 3 :: ```warn```
+ Level 4 :: ```error```

### How to use?

Very easy.. see example below.

```javascript
    
// require module
var Logger = require('stdout-logger'),
  myLogger = Logger.getLogger();

Logger.set('colorize', false); 
Logger.set('level', 'error');

// returns "error"
console.log(Logger.get('level'));

// Now use logger 
myLogger('info', 'Hello World');
myLogger('debug', JSON.stringify({debug: 'Object'}, null, 2));
myLogger('warn', 'Hello World');
myLogger('silly', 'Hello World');
myLogger('error',  JSON.stringify({error: 'Object'}, null, 2));

```
