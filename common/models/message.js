var Twitter = require('twitter');
var fromBits = require( 'math-float32-from-bits' );
var math = require('mathjs');
require('date-utils');
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default 
  apiKey: 'AIzaSyDMYtkCOaCIUcES2QDNDYIMUOjfldouwtc', // YOUR_API_KEY for Geocoding Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

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
      var address;


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
      lat_convert = Bytes2Float32(0x4236cfb6);
      console.log('lat convert: '+lat_convert);
      lng_convert = Bytes2Float32(0x413909c8);
      console.log('lng convert: '+lng_convert);
      var dataora = new Date();
     // moment(dataora).tz('Europe/Berlin').format(format);
      //var formatted = dt.toFormat("YYYYMMDDHH24MISS");
      //client.post('statuses/update', {status: "Test1"}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      //console.log(response);
      //client.post('/direct_messages/new.json', {screen_name: 'GRS_BREGANZE', 'text': 'Time:' + dataora + ' lat:' +  +message.lat + ' lng:' +  message.log +  ' alt:' +  message.alt +   ' Evento da ' + message.name + ' -' + ' station ' + message.station + ' rssi ' + message.rssi + ' snr ' + message.snr}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Using callback
      console.log('passo 0 : ');
      //var address = document.getElementById("Address");
      console.log('passo 1 : ');
      geocoder.reverse({lat:message.lat, lon:message.log}, function(err, res) {console.log(res); (address = res[0].formatted_address);});
      console.log('passo 2 : ');
      console.log(address);
      console.log('dataora : '+dataora);
      client.post('/direct_messages/new.json', {screen_name: 'GRS_BREGANZE', 'text': ' Evento da code: ' + message.name + ' - ' + ' - lat:' +  +message.lat + ', lng:' +  message.log +  ', alt:' +  message.alt  + ' - base:' + message.station + ', rssi:' + message.rssi + 'dbm , snr:' + message.snr}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)// Tweet body.
      console.log(response);

      // Raw response object.
      }); next(); });
};