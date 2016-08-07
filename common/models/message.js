var Twitter = require('twitter');

function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		time;


	// ie: 2013-02-18, 8:35 AM
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min;

	return time;
}

module.exports = function(Message)
{ //Use the environment variables in production
  //var client = new Twitter({ consumer_key: process.env.TWITTER_CONSUMER_KEY, consumer_secret: process.env.TWITTER_CONSUMER_SECRET, access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, });
  var client = new Twitter({ consumer_key: 'eE7WLUbqT8Xlk1vXwBWeHdjSF', consumer_secret: 'oPePewnIGB0skdpMqbFyYcYfQumfBMV3ga6fOlUt7lL9pcVLIO', access_token_key: '757098722538979328-niLdd2zA2MfJyWRTS8Zt5ZYq8kPKHLb', access_token_secret: 'AY0I0lfVzxImKxLbqNQCPVsrOfAVhIgt4jZcI9Yq61F0H',});
//Available methods : // client.get(path, params, callback); // client.post(path, params, callback); // client.stream(path, params, callback);
   var data_ora = '2016-08-07, 8:35';
   Message.afterRemote('create', function (ctx, message, next)
   {
      console.log('> testing afterRemote function');
      console.log('time : '+message.time);
      console.log('device id : '+message.device);
      console.log('data : '+message.data);

      //client.post('statuses/update', {status: "Maria2"}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      //console.log(response);
      //data_ora= convertTimestamp(message.time);
      console.log('data : ' + data_ora);
      client.post('/direct_messages/new.json', {screen_name: 'GRS_BREGANZE', 'text':'Time:' + data_ora + ' Msg Alarm from ' + message.device}, function(error, tweet, response){ if(error) console.log(error); console.log(tweet)
      // Tweet body.
      console.log(response);

      // Raw response object.
      }); next(); });
};