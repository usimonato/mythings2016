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
  apiKey: 'AIzaSyDMYtkCOaCIUcES2QDNDYIMUOjfldouwtc', /// YOUR_API_KEY for Geocoding Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

var time_convert;
var device_convert;
var data_convert;
var name_convert;
var rssi_convert;
var snr_convert;
var station_convert;
var lat_convert;
var lon_convert;
var alt_convert;
var address_new;
var address_last;
var evento;
var wait_address;
var owner_things;
var client = new Twitter({ consumer_key: process.env.TWITTER_CONSUMER_KEY, consumer_secret: process.env.TWITTER_CONSUMER_SECRET, access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, });

var myCallback = function(err, data) {
   console.log('passo 2D');
   wait_address = false;
   if (err) {console.log(err);}; // Check for the error and throw if it exists.
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
    console.log(res);
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
       alt_convert =  alt_convert & 0x00FF;
       console.log('passo TTTTTTTTTTTTTT');

       if(address_last == null)
          address_last = 'non risolto';

       console.log('address_last: '+address_last);
       var dataora = new Date();
       console.log('dataora : '+dataora);

       owner_things = 'GRS_BREGANZE'
       if(name_convert == 'IOT_01')
          owner_things = 'GRS_BREGANZE';
       if(name_convert == 'IOT_02')
          owner_things = 'poli_dan';
       if(name_convert == 'IOT_03')
          owner_things = 'GRS_BREGANZE';
          
       client.post('/direct_messages/new.json', {screen_name: owner_things, 'text': ' Evento:' + evento + ' - codice: ' + name_convert + ' - in ' + address_last + ' - lat:' +  +lat_convert+ ', lng:' +  lon_convert +  ', alt:' +  alt_convert  + ' - base:' + station_convert + ', rssi:' + rssi_convert + 'dbm, snr:' + snr_convert}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet); console.log(response);console.log('Messaggio Twitter');});
       //client.post('statuses/update', {status: " Evento:" + evento + "- codice: " + name_convert + " - in " + address_last + " - lat:" +  +lat_convert + ", lng:" +  lon_convert +  ", alt:" +  alt_convert  + " - base:" + station_convert + ", rssi:" + rssi_convert + "dbm, snr:" + snr_convert}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet); console.log(response); console.log('Stato Twitter');});
    });

    console.log('passo 00000000000000');
    callback(null,address_new);
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
      device_convert  = message.device;
      data_convert  = message.data;
      name_convert  = message.name;
      rssi_convert  = message.rssi;
      snr_convert  = message.snr;
      station_convert  = message.station;
      lat_convert = message.lat;
      lon_convert = message.lon;
      alt_convert = message.alt;
      console.log('passo 11111111111');
      address_new = null;
      wait_address = true;
      usingItNow(myCallback)
      next();
      });
};