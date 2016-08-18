var Twitter = require('twitter');
var fromBits = require( 'math-float32-from-bits' );
var math = require('mathjs');
var stdout = require('stdout-stream');
var sleep = require('thread-sleep');
///var wait=require('wait.for');
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
//var geocoder = require('geocoder');
var lat_convert;
var lon_convert;
var alt_convert;
var address_new;
var address_last;
var evento;
var wait_address;

var client = new Twitter({ consumer_key: process.env.TWITTER_CONSUMER_KEY, consumer_secret: process.env.TWITTER_CONSUMER_SECRET, access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, });

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

var myCallback = function(err, data) {
   console.log('passo 2D');
   wait_address = false;
  if (err) {console.log(err);}; // Check for the error and throw if it exists.
  if(data != null)
  {
         address_new  = data;
         address_last = data;
  }
  console.log('got data: '+data); // Otherwise proceed as usual.
};

var usingItNow = function(callback) {
   console.log('passo 2A');
   console.log('lat : '+lat_convert);
   console.log('lon : '+lon_convert);
   geocoder.reverse({lat:lat_convert, lon:lon_convert}, function(err, res) {
     console.log('passo 2B')
     wait_address = false;
     if(res[0].formattedAddress == null)
     {
         console.log('address non risolto: ' +res[0].formattedAddress) ;
         address_new = null;
     }
     else
      {
         address_new = res[0].formattedAddress;
         address_last = address_new;
         console.log('address risolto : '+address_new);
     }

   console.log(res);});
   console.log('passo 2C')
   var j = 0;
   sleep(100);
   callback(null,address_new);
  // callback(null, 'get it?'); // I dont want to throw an error, so I pass null for the error argument
};





module.exports = function(Message)
{ //Use the environment variables in production
//Available methods : // client.get(path, params, callback); // client.post(ngath, params, callback); // client.stream(path, params, callback);
   var Sequence = exports.Sequence || require('sequence').Sequence, sequence = Sequence.create(), err;
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
      console.log('lon : '+message.lon);
      console.log('alt : '+message.alt);
      console.log('event :'+message.event);
      console.log('passo 0');
      wait_address = true;


     // getLocationData(function(locationData) {console.log(locationData)});


     // Using callback
     /*geocoder.reverse({lat:message.lat, lon:message.lon}, function(err, res)
     {
           if(err)
                  {console.log(err);}
           else {
                  console.log('passo 1A');
                  address = res[0].formattedAddress;
                  if(address == 'undefined')
                  {
                   if(res[1].formattedAddress != 'undefined')
                   {
                        address = res[1].formattedAddress;
                        console.log('passo 1B');
                   }
                  }
                  wait_address = false;
                  console.log(res);
                  console.log('passo 1C');
           }

     }); */
     lat_convert = message.lat;
     lon_convert = message.lon;
     alt_convert = message.alt;
     console.log('passo 11111111111');
     address_new = null;
     wait_address = true;
     usingItNow(myCallback);

     //getLocation('1060 W Addison St, Chicago, IL 60613');

    /* geocoder.reverse(
      {lat:message.lat, lon:message.lon}).then(function(res)
         {
           console.log('passo 1A');
           address = res[0].formattedAddress;
           if(address == 'undefined')
           {
             if(res[1].formattedAddress != 'undefined')
             {
               address = res[1].formattedAddress;
               console.log('passo 1B');
             }
           }
           wait_address = false;
           console.log(res);
           console.log('passo 1C');
         }
      ).catch(function(err) {console.log(err);}); */

       sequence
      .then(function (next) {
          /*wait_address = true;
          geocoder.reverse({lat:lat_convert, lon:lon_convert}).then(function(res)
          {
               console.log('passo 1D');
               address_last = res[0].formattedAddress;
               if(address_last == null)
               {
                  if(res[1].formattedAddress != null)
                  {
                      address_last = res[1].formattedAddress;
                      console.log('passo 1E')
                  }
               }
               wait_address = false;
               console.log(res);
               console.log('passo 1F');
               next();
               }
          ).catch(function(err) {console.log(err);});
          //usingItNow(myCallback);   */
          setTimeout(function () {next(err, "Hi", "World!");}, 120);
          console.log('passo IIIIIIIIIIIIIIIIIIIII');
      })
      .then(function (next) {
          console.log('passo ZZZZZZZZZZ');
          console.log('address_last: '+address_last);
          evento =  alt_convert & 0xFF00;
          switch (evento)
          {
		case 0x0100: {
                    evento = 'Tasto';
		    break;
		}
		case 0x0200: {
                    evento = 'Mosso';
                    break;
		}

		case 0x0300: {
                     evento = 'Periodico';
                     break;
		}
                case 0x0400: {
                     evento = 'Aperto';
                     break;
		}
		case 0x0500: {
                     evento = 'Chiuso';
                     break;
		}
		default: {
                  evento = 'Prova';
		}
          }
          alt_convert =  alt_convert.alt & 0x00FF;
          console.log('passo TTTTTTTTTTTTTT');

         if(address_last == null)
           address_last = 'non risolto';

         console.log('address_last: '+address_last);
         var dataora = new Date();
         console.log('dataora : '+dataora);
         client.post('statuses/update', {status: " Evento:" + evento + "- codice: " + message.name + " - in " + address_last + " - lat:" +  +message.lat + ", lng:" +  message.lon +  ", alt:" +  alt_convert  + " - base:" + message.station + ", rssi:" + message.rssi + "dbm, snr:" + message.snr}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet); console.log(response);});
         client.post('/direct_messages/new.json', {screen_name: 'GRS_BREGANZE', 'text': ' Evento:' + evento + ' - codice: ' + message.name + ' - in ' + address_last + ' - lat:' +  +message.lat + ', lng:' +  message.lon +  ', alt:' +  alt_convert  + ' - base:' + message.station + ', rssi:' + message.rssi + 'dbm, snr:' + message.snr}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet); console.log(response);});
         console.log('passo 00000000000000');
         next();
      });

      /*var i = 0;
      while ((i < 10000) && (wait_address == true)) //attendo fino a quando no ho l'indirizzo risolto
      {
            sleep(1);
            i++;
      }   */
      console.log('passo EEEEEEEEEEEEEEEEEEEEEEEE');

      /*evento =  message.alt & 0xFF00;
      switch (evento)
      {
		case 0x0100: {
                    evento = 'Tasto';
		    break;
		}
		case 0x0200: {
                    evento = 'Mosso';
                    break;
		}

		case 0x0300: {
                     evento = 'Periodico';
                     break;
		}
                case 0x0400: {
                     evento = 'Aperto';
                     break;
		}
		case 0x0500: {
                     evento = 'Chiuso';
                     break;
		}
		default: {
                  evento = 'Prova';
		}
      }
      alt_convert =  message.alt & 0x00FF;
      /*if(address == null)
      {
          wait_address = true;
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
               wait_address = false;
               console.log(res);
               console.log('passo 1F');
               }
           ).catch(function(err) {console.log(err);});
           while ((i < 30) && (wait_address == true)) //attendo fino a quando no ho l'indirizzo risolto
           {
                 sleep(1000);
                 i++;
           }
      } */
      /*console.log('passo 6666666');
      if(address_new == null)
      {
         console.log('passo 77777777');
         usingItNow(myCallback);
      }

      if(address_new != address_last)
      {
         console.log('passo 88888888');
         usingItNow(myCallback);

      }

      if(address_last == null)
         address_last = 'non risolto';

      console.log('address_last: '+address_last);
      console.log('attesi msec: '+i);
      var dataora = new Date();
      console.log('dataora : '+dataora);

      client.post('statuses/update', {status: " Evento:" + evento + "- codice: " + message.name + " - in " + address_last + " - lat:" +  +message.lat + ", lng:" +  message.lon +  ", alt:" +  alt_convert  + " - base:" + message.station + ", rssi:" + message.rssi + "dbm, snr:" + message.snr}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet); console.log(response);});
      client.post('/direct_messages/new.json', {screen_name: 'GRS_BREGANZE', 'text': ' Evento:' + evento + ' - codice: ' + message.name + ' - in ' + address_last + ' - lat:' +  +message.lat + ', lng:' +  message.lon +  ', alt:' +  alt_convert  + ' - base:' + message.station + ', rssi:' + message.rssi + 'dbm, snr:' + message.snr}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet); console.log(response);}); */
      //next(); 
      });
};