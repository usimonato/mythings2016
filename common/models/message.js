var Twitter = require('twitter');
var fromBits = require( 'math-float32-from-bits' );
var math = require('mathjs');
require('date-utils');

//var moment = require('moment-timezone');
function Bytes2Float32(bytes) {
    var sign = (bytes & 0x80000000) ? -1 : 1;
    var exponent = ((bytes >> 23) & 0xFF) - 127;
    var significand = (bytes & ~(-1 << 23));

    if (exponent == 128) 
        return sign * ((significand) ? Number.NaN : Number.POSITIVE_INFINITY);

    if (exponent == -127) {
        if (significand == 0) return sign * 0.0;
        exponent = -126;
        significand /= (1 << 22);
    } else significand = (significand | (1 << 23)) / (1 << 23);

    return sign * significand * Math.pow(2, exponent);
}

module.exports = function(Message)
{ //Use the environment variables in production
  var client = new Twitter({ consumer_key: process.env.TWITTER_CONSUMER_KEY, consumer_secret: process.env.TWITTER_CONSUMER_SECRET, access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, });
//Available methods : // client.get(path, params, callback); // client.post(ngath, params, callback); // client.stream(path, params, callback);

   Message.afterRemote('create', function (ctx, message, next)
   {
      var ms;
      var lat_convert;
      var lng_convert;

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

      lat_convert = Bytes2Float32(message.lat);
      console.log('lat convert: '+lat_convert);
      lng_convert = Bytes2Float32(message.log);
      console.log('lat convert: '+lng_convert);
      var dataora = new Date();
     // moment(dataora).tz('Europe/Berlin').format(format);
      //var formatted = dt.toFormat("YYYYMMDDHH24MISS");
      console.log('dataora : '+dataora);
      //client.post('statuses/update', {status: "Test1"}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      //console.log(response);
      client.post('/direct_messages/new.json', {screen_name: 'GRS_BREGANZE', 'text': 'Time:' + dataora + ' lat:' +  lat_convert + ' lng:' +  lng_convert +  ' alt:' +  message.alt +   ' Evento da ' + message.name + '-' +  message.device + ' data ' + message.data + ' station ' + message.station + ' rssi ' + message.rssi + ' snr ' + message.snr}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      console.log(response);

      // Raw response object.
      }); next(); });
};