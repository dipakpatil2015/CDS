var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser     =        require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,cache-control");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  
  console.log('In Use');
  next();
  
});

app.get('/', function(req, res, next) {
    //..set headers etc.
console.log('In default get');
    
});
app.post('/', function(req, res, next) {
console.log('In post');
});


app.get('/requests', function (req, res,next) {
	console.log("get req ");
   fs.readFile( __dirname + "/" + "requests.json", 'utf8', function (err, data) {
       console.log( data );
//	    res.setHeader('Access-Control-Allow-Origin', '*');
       res.end( data );
   });
   
})

app.post('/addRequest', function (req, res,next) {
      fs.readFile( __dirname + "/" + "requests.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		
		var record = { 'id':data.requests.length, 'requesterName': req.body.requesterName, 'approversName': req.body.approversName, 'requestersTeamName': req.body.requestersTeamName, 'domain': req.body.domain, 'requestDescription': req.body.requestDescription, 'requestStatus': 'pending' };

	   data.requests[data.requests.length]= record;
 fs.writeFile( __dirname + "/" + "requests.json", JSON.stringify(data), function (err) {
  if (err) return console.log(err);
  console.log('Sucess');
});
		  var statusJson ={
					"SuccessMessage":'OK',
					"StatusCode":'200',
					"ErrorMessage" : ''
			};
       res.end(JSON.stringify(statusJson));   
   });
})

app.post('/approveRequest', function (req, res, next) {
	fs.readFile(__dirname + "/" + "requests.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		console.log("ID :");
		console.log(req.body.id);
		//console.log(data.requests[req.body.id]);
		data.requests[req.body.id].requestStatus = "Approved";
		fs.writeFile(__dirname + "/" + "requests.json", JSON.stringify(data), function (err) {
			if (err) return console.log(err);
			console.log('Sucess');
		});
		var statusJson = {
			"SuccessMessage": 'OK',
			"StatusCode": '200',
			"ErrorMessage" : ''
		};
		res.end(JSON.stringify(statusJson));
	});
})

app.post('/rejectRequest', function (req, res, next) {
	fs.readFile(__dirname + "/" + "requests.json", 'utf8', function (err, data) {
		data = JSON.parse(data);
		console.log("ID :");
		console.log(req.body.id);
		//console.log(data.requests[req.body.id]);
		data.requests[req.body.id].requestStatus = "Reject";
		fs.writeFile(__dirname + "/" + "requests.json", JSON.stringify(data), function (err) {
			if (err) return console.log(err);
			console.log('Sucess');
		});
		var statusJson = {
			"SuccessMessage": 'OK',
			"StatusCode": '200',
			"ErrorMessage" : ''
		};
		res.end(JSON.stringify(statusJson));
	});
})


var server = app.listen(8088, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})