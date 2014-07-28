// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
	res.send('Hello World!');
});

var host = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = Number(process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.listen(port, host, function() {
	console.log("Listening at " + host + ':' + port);
});
