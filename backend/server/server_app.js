var express 	= require('express');
var app         = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var fs = require('fs');

var pathAngular2 = "../../frontend/angular2_TS/";

var config = require('./config'); // get our config file

var IndexController   = require('../app/controllers/index');

var User   = require('../app/models/user');
var UserController   = require('../app/controllers/user');
var AuthentificationController   = require('../app/controllers/authentification');

var ActivityCategory   = require('../app/models/activityCategory');
var ActivityCategoryController   = require('../app/controllers/activityCategory');

var Activity  = require('../app/models/activity');
var ActivityController   = require('../app/controllers/activity');

var Event  = require('../app/models/event');
var EventController   = require('../app/controllers/event');

var Publication  = require('../app/models/publication');
var PublicationController   = require('../app/controllers/publication');

var Friend  = require('../app/models/friend');
var FriendController   = require('../app/controllers/friend');

var port = process.env.PORT || 8081;
mongoose.connect(config.database); // connect to database
//app.set('superSecret', config.secret);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

console.log('app.use('/', IndexController);');
//app.use('/', IndexController);
app.use('/user', UserController);
app.use('/authentification', AuthentificationController);
app.use('/activityCategory', ActivityCategoryController);
app.use('/activity', ActivityController);
app.use('/event', EventController);
app.use('/publication', PublicationController);
app.use('/friend', FriendController);

app.use(morgan('dev'));

app.set('view engine', 'ejs');

/*
app.get('/', function(req, res) {
	console.log(pathAngular2+'index.html');
	res.writeHead(200, {'Content-Type': 'text/html'});
	//fs.createReadStream(pathAngular2+'index.html').pipe(res);
	//res.send('Hello! The API is at http://localhost:' + port + '/api');
});
*/

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
