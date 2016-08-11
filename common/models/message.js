var Twitter = require('twitter');
var fromBits = require( 'math-float32-from-bits' );
var math = require('mathjs');
var stdout = require('stdout-stream');
var sleep = require('thread-sleep');
//var moment = require('moment-timezone');

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
var lat_convert;
var lng_convert;
var address;
var Wait_address;

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

function getLocationData(callback) {
   console.log('passo 2A');
   geocoder.reverse({lat:lat_convert, lon:lng_convert}, function(err, res) {console.log(res);});
   console.log('passo 2B');
   callback(res[0].formatted_address);
   console.log('passo 2C');
}

module.exports = function(Message)
{ //Use the environment variables in production
  var client = new Twitter({ consumer_key: process.env.TWITTER_CONSUMER_KEY, consumer_secret: process.env.TWITTER_CONSUMER_SECRET, access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, });
//Available methods : // client.get(path, params, callback); // client.post(ngath, params, callback); // client.stream(path, params, callback);

   Message.afterRemote('create', function (ctx, message, next)
   {
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
      lat_convert = message.lat;
      lng_convert = message.log;
      console.log('passo 0');
      Wait_address = true;
      geocoder.reverse({lat:message.lat, lon:message.log}).then(function(res)
      {
           console.log('passo 1A');
           address = res[0].formattedAddress;
           if(address == null)
           {
             if(res[1].formattedAddress != null)
             {
               address = res[1].formattedAddress;
               console.log('passo 1B');
             }
           }
           Wait_address = false;
           console.log(res);
           console.log('passo 1C');
      }
      ).catch(function(err) {console.log(err);});
      var i = 0;
      while ((i < 15) && (Wait_address == true)) //attendo fino a quando no ho l'indirizzo risolto
      {
            sleep(1000);
            i++;
      }
      if(address == null)
      {
          Wait_address = true;
          geocoder.reverse({lat:message.lat, lon:message.log}).then(function(res)
          {
               console.log('passo 1D');
               address = res[0].formattedAddress;
               if(address == null)
               {
                  if(res[1].formattedAddress != null)
                  {
                      address = res[1].formattedAddress;
                      console.log('passo 1E')
                  }
               }
               Wait_address = false;
               console.log(res);
               console.log('passo 1F');
               }
           ).catch(function(err) {console.log(err);});
           while ((i < 25) && (Wait_address == true)) //attendo fino a quando no ho l'indirizzo risolto
           {
                 sleep(1000);
                 i++;
           }
      }
      console.log('attesi sec: '+i);
      var dataora = new Date();
      console.log('dataora : '+dataora);
      client.post('/direct_messages/new.json', {screen_name: 'GRS_BREGANZE', 'text': ' Evento da codice: ' + message.name + ' - in ' + address + ' - lat:' +  +message.lat + ', lng:' +  message.log +  ', alt:' +  message.alt  + ' - base:' + message.station + ', rssi:' + message.rssi + ' dbm , snr:' + message.snr}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)// Tweet body.
      console.log(response);

      // Raw response object.
      }); next(); });
};