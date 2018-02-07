
const 
https = require('https'),
express = require('express'),
 fs = require('fs'),
 app = express();  
 const options = {
	key: fs.readFileSync('./https/key.pem'),
	cert: fs.readFileSync('./https/cert.pem')
};

app.get( '/', function( req, res) {
  res.send( 'Hellllo!!' )
});


https.createServer(options, app).listen(3000, function() {
  console.log("HTTPS server listening on port " + 3000);
});

