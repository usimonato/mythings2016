var Twitter = require('twitter');
require('date-utils');
module.exports = function(Message)
{ //Use the environment variables in production
  var client = new Twitter({ consumer_key: process.env.TWITTER_CONSUMER_KEY, consumer_secret: process.env.TWITTER_CONSUMER_SECRET, access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, });
//Available methods : // client.get(path, params, callback); // client.post(path, params, callback); // client.stream(path, params, callback);

   Message.afterRemote('create', function (ctx, message, next)
   { 
      var ms;
      var ti;
      var dataora;

      console.log('> testing afterRemote function');
      console.log('time : '+message.time);
      console.log('device: '+message.device);
      console.log('data : '+message.data);
      

      var dt = new Date();
      //var formatted = dt.toFormat("YYYYMMDDHH24MISS");
      console.log(dt);
      //ms = Long.valueOf(message.time);
      //console.log('ms : '+ms)
      //ti = new Timestamp(ms);
      //console.log('ti : '+ti)
      //dataora = new Date(ti);


      //console.log('dataora : '+dataora);
      //client.post('statuses/update', {status: "Maria2"}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      //console.log(response);
      client.post('/direct_messages/new.json', {screen_name: 'GRS_BREGANZE', 'text': 'Time:' + message.time + ' Msg Alarm from code ' + message.device + '-' +  message.name + ' data ' + message.data}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      console.log(response);
 
      // Raw response object. 
      }); next(); });
};