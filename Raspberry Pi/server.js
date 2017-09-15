/*Call using twilio*/
var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
require("jsdom/lib/old-api").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
    $ = require("jquery")(window);
    //doSomething();
});
// Twilio Credentials

var accountSid = 'AC368353af798f45611ca034875071390c';
var authToken = 'd5986470f972dc85428997786377696f';

//require the Twilio module and create a REST client
var twilio = require('twilio');
//var client = new twilio(accountSid, authToken);
var client = require('twilio')(accountSid, authToken);



//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.bodyParser());

app.post('/myaction', function(req, res) {
console.log("In Server");
var test = req.body;
console.log(test);
//console.log(JSON.stringify(test));
//var test1 = JSON.stringify(test);
console.log("------------\n");
console.log(typeof test);
var numbers = test;//= JSON.stringify(test);
// console.log(numbers[1].contact);
// console.log(numbers[0].name);
 for(var i = 0; i<=numbers.length; i++) {
    client.messages.create({
      //url: "https://handler.twilio.com/twiml/EH580a87163d69afbaf9788f963f3ba3c6",
        to: numbers[i].contact,
        from: "+18472609524",
        body: "Hi "+numbers[i].name+",\nWill be there in 5 minutes.\nIIT Public Safety",
    }, function(err, message) {
        console.log(message.sid);
    });
}
console.log("Message Sent");
  res.end("Yo buddy !!!");
   //next();
});

app.listen(8080, function() {
  console.log('Server running at Raspberry Pi @ Raspberry Pi 2');
});
