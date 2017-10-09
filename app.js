// include the http module
var http = require('http');
//THIS IS THE CRYPTO STUFF
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

// create a webserver
http.createServer(function (req, res) {

    // respond to any incoming http request
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n' + SHA256("Message"));

}).listen(1337, '127.0.0.1');

console.log(SHA256("Message"));

// log what that we started listening on localhost:1337
console.log('Server running at 127.0.0.1:1337');

