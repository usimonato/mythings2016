var Twitter = require('twitter');
var fromBits = require( 'math-float32-from-bits' );
require('date-utils');
//var moment = require('moment-timezone');
module.exports = function(Message)
{ //Use the environment variables in production
  var client = new Twitter({ consumer_key: process.env.TWITTER_CONSUMER_KEY, consumer_secret: process.env.TWITTER_CONSUMER_SECRET, access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, });
//Available methods : // client.get(path, params, callback); // client.post(path, params, callback); // client.stream(path, params, callback);

   Message.afterRemote('create', function (ctx, message, next)
   { 
      var ms;
      var f;

      console.log('> testing afterRemote function');
      console.log('time : '+message.time);
      console.log('device: '+message.device);
      console.log('data : '+message.data);
      console.log('name: '+message.name);
      console.log('rssi : '+message.rssi);
      console.log('snr : '+message.snr);
      console.log('station : '+message.station);
      console.log('lat : '+message.lat);
      console.log('log : '+message.log);
      console.log('alt : '+message.alt);
            
      //f = Float.intBitsToFloat(message.lat);
      f = fromBits( message.lat );
      console.log('lat convert: '+f);

      var dataora = new Date();
     // moment(dataora).tz('Europe/Berlin').format(format);
      //var formatted = dt.toFormat("YYYYMMDDHH24MISS");
      console.log(dataora);
      //ms = Long.valueOf(message.time);
      //console.log('ms : '+ms)
      //ti = new Timestamp(ms);
      //console.log('ti : '+ti)
      //dataora = new Date(ti);


      //console.log('dataora : '+dataora);
      //client.post('statuses/update', {status: "Maria2"}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      //console.log(response);
      client.post('/direct_messages/new.json', {screen_name: 'GRS_BREGANZE', 'text': 'Time:' + dataora + ' lat:' +  message.lat + ' log:' +  message.log +  ' alt:' +  message.alt +   ' Evento da ' + message.name + '-' +  message.device + ' data ' + message.data + ' station ' + message.station + ' rssi ' + message.rssi + ' snr ' + message.snr}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      console.log(response);

      // Raw response object.
      }); next(); });
};