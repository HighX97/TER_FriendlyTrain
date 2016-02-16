var pathServer = "../../server/";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken');
//Models:
var User   = require('../models/user');

var moduleRoutes = express.Router();



//Public Methods:
moduleRoutes.get('/setup', function(req, res) {
	var jimmy = new User({
		name: 'Lowx',
		password: 'passlowx',
		admin: true
	});
	jimmy.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});


moduleRoutes.post('/authenticate', function(req, res) {
	User.findOne({
		name: req.body.name
	}, function(err, user) {
		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		}
		else if (user) {

			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			}
			else {

				var token = jwt.sign(user, config.secret, {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});

moduleRoutes.get('/public', function(req, res) {
	res.json({ message: 'public get' });
});

//Restricted Methods:
moduleRoutes.use(function(req, res, next) {
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			}
			else {

				req.decoded = decoded;
				next();
			}
		});
	}
	else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}
});


moduleRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

//http://localhost:8080/user/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJhZG1pbiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9fdiI6MCwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjoicGFzc2xvd3giLCJuYW1lIjoiTG93eCIsIl9pZCI6IjU2YjBiMWE0OGJmOTAwZGEzNmFkZjQzZCJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ1NDQyMDQ1NywiZXhwIjoxNDU0NTA2ODU3fQ.j7fyfANQ6gi1EI5SFf6HcQkESRtEsfvM7OoUHYipGGc
moduleRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

moduleRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});


module.exports = moduleRoutes;
