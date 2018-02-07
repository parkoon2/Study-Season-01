const express = require( "express" );
const bodyParser = require( "body-parser" );
const path = require( "path" );
const app = express();

app.use(express.static(path.join(__dirname, "./public")));

app.use(bodyParser.urlencoded());


const messages = [];

app.set('views', path.join( __dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index", { messages: messages });
});

app.post('/text', function(req,res) {
	console.log('hello', req.body.message);
	res.redirect('/');
});

const server = app.listen(8000, function() {
	console.log("listening on port 8000");
});

const io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
	let user_name;
	
	socket.on('user_connected', function(data) {
		user_name = data.name;
	});
	
	socket.on('message_sent', function(data){
		messages.push({name: user_name, message: data.message});
		console.log(messages);
		io.emit('message_added',{name: user_name, message: data.message });
	});	
});