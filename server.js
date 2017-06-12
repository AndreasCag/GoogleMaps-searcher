var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('server/sertificate/key.txt');
var certificate = fs.readFileSync('server/sertificate/mainCert.pfx');

const NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Node env %s', NODE_ENV);
var options = {
    pfx: certificate,
    passphrase: 'aprix'
};

var express = require('express');
var app = express();

app.use(express.static('client'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
})


var redirectApp = express();

redirectApp.get('/*', function (req, res) {
    res.redirect('https://' + req.hostname);
})

var httpServer = http.createServer(redirectApp);
var httpsServer = https.createServer(options, app);

require('./server_socket')(httpsServer);
httpServer.listen(80);
httpsServer.listen(443);
