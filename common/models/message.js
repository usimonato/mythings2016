var Twitter = require('twitter');

function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000);	// Convert the passed timestamp to milliseconds
  yyyy = d.getFullYear();
  mm = ('0' + (d.getMonth() + 1)).slice(-2);	// Months are zero based. Add leading 0.
  dd = ('0' + d.getDate()).slice(-2);			// Add leading 0.
  hh = d.getHours();
  min = ('0' + d.getMinutes()).slice(-2);		// Add leading 0.
  time;
  time = yyyy + '-' + mm + '-' + dd + ', ' + hh + ':' + min;
  return time;
};


module.exports = function(Message) 
{ //Use the environment variables in production
  var client = new Twitter({ consumer_key: process.env.TWITTER_CONSUMER_KEY, consumer_secret: process.env.TWITTER_CONSUMER_SECRET, access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, });
//Available methods : // client.get(path, params, callback); // client.post(path, params, callback); // client.stream(path, params, callback);

   Message.afterRemote('create', function (ctx, message, next)
   { 
      console.log('> testing afterRemote function');
      console.log('time : '+message.time); 
      console.log('device: '+message.device);
      console.log('data : '+message.data);
      dataora = convertTimestamp(message.time);
      //client.post('statuses/update', {status: "Maria2"}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      //console.log(response);
      client.post('/direct_messages/new.json', {screen_name: 'GRS_BREGANZE', 'text': 'Time:' + dataora + ' Msg Alarm from code ' + message.device + '-' +  message.name + ' data ' + message.data}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      console.log(response);
 
      // Raw response object. 
      }); next(); });
};