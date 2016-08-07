var Twitter = require('twitter');
module.exports = function(Message) 
{ //Use the environment variables in production
  var client = new Twitter({ consumer_key: process.env.TWITTER_CONSUMER_KEY, consumer_secret: process.env.TWITTER_CONSUMER_SECRET, access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, });
  //var client = new Twitter({ consumer_key: 'bsx4tgBYfslT5TzmjqJqxifk4', consumer_secret: 'aljTXQ8tVs8R8AIdV48flBu7QIv4R6MWWuZ7hL4hewFY9F6KyT', access_token_key: '762367617407545344-DxgiPtDgP4Ou5owzhO3drxlkSHixNVX', access_token_secret: 'i9umH6w71Tkj61khvCZ9jKuJ5KoVLLtJXZrCoITEDTfES',});
//Available methods : // client.get(path, params, callback); // client.post(path, params, callback); // client.stream(path, params, callback);

   Message.afterRemote('create', function (ctx, message, next)
   { 
      console.log('> testing afterRemote function');
      console.log('time : '+message.time); 
      console.log('device: '+message.device);
      console.log('data : '+message.data);

      //client.post('statuses/update', {status: "Maria2"}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      //console.log(response);
      client.post('/direct_messages/new.json', {screen_name: 'GRS_BREGANZE', 'text': 'Time:' + message.time + ' Msg Alarm from ' + message.device + ' data' + +message.data}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      console.log(response);

      // Raw response object. 
      }); next(); });
};