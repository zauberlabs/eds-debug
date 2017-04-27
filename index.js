var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());

app.get('/schema', function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });

  var schema = {
    "type": "object",
    "properties": {
      "count": {
        "type": "string",
        "description": "Counter",
        "maxLength": 10,
        "sample": "9999999999"
      },
      "message": {
        "type": "string",
        "description": "A random message",
        "maxLength": 20,
        "sample": "this is a message!!!"
      }
    },
    "required": ["count", "message"]
  };

  res.end(JSON.stringify(schema));
});

function statusReply(hashtag, res) {
  var status = parseInt(hashtag.substring(6, hashtag.length));
  res.sendStatus(status);
}

function contentReply(hashtag, res) {
  res.writeHead(200, { "Content-Type": "application/json" });

  var data = {
    "count": "20",
    "message": "hello push!"
  };

  res.end(JSON.stringify(data));
}

app.post('/push/', function (req, res) {
  if (!req.body) return res.sendStatus(400);

  var hashtagFunctions = {
    "status": statusReply,
    "content": contentReply
  }

  var found = null;
  var matchingHashtag = null;
  var hashtags = req.body.mention.hashtags;
  for (var i = 0; !found && i < hashtags.length; i++) {
    for (var j = 0; !found && j < Object.keys(hashtagFunctions).length; j++) {
      var key = Object.keys(hashtagFunctions)[j];
      var hashtag = hashtags[i]['hashtag'];

      if (hashtag.startsWith(key)) {
        found = key;
        matchingHashtag = hashtag;
      }
    }
  }

  if (!found) {
    res.sendStatus(422);
  } else {
    hashtagFunctions[found](matchingHashtag, res);
  }
});

app.post('/push-message/', function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });

  var data = {
    "count": "30",
    "message": "hello pushm!"
  };

  res.end(JSON.stringify(data));
});

app.get('/poll/', function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });

  var data = {
    "count": "10",
    "message": "hello world!"
  };

  res.end(JSON.stringify(data));
});

app.listen(app.get('port'), function () {
  console.log('Flowics EDS Debug is running on port', app.get('port'));
});


