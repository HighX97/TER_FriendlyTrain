// ***** Config
var pathServer = "../../server/";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken');
var moduleRoutes = express.Router();

//Models:
var User   = require('../models/user');

//Helpers:
var commonHelper   = require('../helpers/common');
var authenticationHelper   = require('../helpers/authentication');


// ***** Methods

//NONE
//http://localhost:8081/user/
//Valide
moduleRoutes.get('/', function(req, res) {
    res.json({ success: true, message: 'NONE User action', data: req.decoded });
});

//CREATE

//Create default user
//http://localhost:8081/user/setup
//Valide
moduleRoutes.get('/setup', function(req, res) {
   var dataUser = new User({
        //idUser: 1,
        firstName: 'FriendlyTrain',
        lastName: 'TER M1',
        email: 'firendlytrain@term1um.com',
        password: '1234567',
        address: '2 Place Eugène Bataillon, 34090 Montpellier',
        image: 'images/user/FriendlyTrain.png',
        phone: '+33 695504940',
        rol: 'admin',
        createDate: Date('2016-01-18T14:00:00.000Z'),
        updateDate: Date('2016-01-18T14:00:00.000Z'),
        lastLoginDate: Date('2016-01-18T14:00:00.000Z')
    });
    dataUser.save(function(err) {
        if (err) throw err;

        var msgResponse = 'User saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: [] });
    });
});

//Create user
//http://localhost:8081/user/createUser
moduleRoutes.post('/createUser', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    var rol = ( req.body.rol != undefined )? req.body.rol: '';
    var arrRols = commonHelper.getDataByKey('rol');
    var email = (req.body.email == undefined)? "": req.body.email;
    email = email.toLowerCase();
    if(! HelperValidator.isEmail( email) ){
        validationResponse.addError("Invalid email: " + email);
    }
    //isAscii(str) - check if the string contains ASCII chars only.
    //Not accept ï or é
    //change isAscii by a better fonction
    if(! HelperValidator.isAscii( req.body.firstName )
        && req.body.firstName != "" ){
        validationResponse.addError("Invalid firstName: " + req.body.firstName);
    }
    if(! HelperValidator.isAscii( req.body.lastName)
        && req.body.lastName != "" ){
        validationResponse.addError("Invalid lastName: " + req.body.lastName);
    }
    if(! (HelperValidator.isAlphanumeric( req.body.password)
        && HelperValidator.isLength(req.body.password, {min: 5, max: 10}) ) ){
        validationResponse.addError("Le mot de pass doit être une chaine de characters Alphanumerique entre (5 - 10) : " + req.body.password);
    }
    if(! HelperValidator.isAscii( req.body.phone)
        && req.body.phone != "" ){
        validationResponse.addError("Invalid phone: " + req.body.phone);
    }

    if(! ( HelperValidator.isAscii( req.body.rol)
        && req.body.rol != ""
        && arrRols.indexOf(rol) != -1 ) ){
        validationResponse.addError("Invalid rol: " + req.body.rol);
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        User.findOne({ email: email }).
            select('idUser, email').
            exec( function(err, user){
                if (err) throw err;

                if (!user){
                    //Email no
                    var dataUser = new User({
                        //idUser: req.body.idUser,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: email,
                        password: req.body.password,
                        address: req.body.address,
                        //image: req.body.image,
                        phone: req.body.phone,
                        rol: req.body.rol,
                        createDate: Date(),
                        updateDate: Date(),
                        lastLoginDate: Date()
                    });
                    dataUser.save(function(err) {
                        if (err) throw err;

                        var msgResponse = 'User saved successfully';
                        console.log(msgResponse);
                        res.json({ success: true, message: msgResponse, data: dataUser });
                    });
                }
                else{
                    res.json({ success: false, message: 'Email (' + email + ') Already Exists ', data: [] });
                }
            });
    }

});

//READ

//Get user
//http://localhost:8081/user/getUser?idUser=1
//Valide
moduleRoutes.get('/getUser', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    if(! ( HelperValidator.isNumeric( req.query.idUser ) )  ){
        validationResponse.addError("User not found (" + user.idUser + ")");
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        User.
            findOne({ idUser: req.query.idUser }).
            //where('idUser').equals(req.query.idUser).// =
            //where('idUser').gt(17).lt(66).// gt - lt
            //where('idUser').in(['idUser', req.query.idUser]).// like
            //limit(10).
            sort('-idUser').
            select('idUser firstName lastName email address image phone rol createDate updateDate lastLoginDate').
            exec(function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'User not found.', data: [] });
            }
            else if (user) {
                    res.json({
                    success: true,
                    message: 'User Found',
                    data: user
                });
            }
        });
    }
});

//Get current user
//http://localhost:8081/user/getCurrentUser
moduleRoutes.get('/getCurrentUser', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    var user = authenticationHelper.getUserByToken(token);

    console.log("user: ");
    console.log(user);

    if(! ( HelperValidator.isNumeric( user.idUser ) )  ){
        validationResponse.addError("User not found (" + user.idUser + ") - Login required");
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        User.findOne({ idUser: user.idUser }).
            sort('-idUser').
            select('idUser firstName lastName email address image phone rol createDate updateDate lastLoginDate ').
            exec(function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'User not found.', data: [] });
            }
            else if (user) {
                    res.json({
                    success: true,
                    message: 'User Found',
                    data: user
                });
            }
        });
    }

});

//Get specific user list
//http://localhost:8081/user/getUsersList
moduleRoutes.get('/getUsersList', function(req, res) {
});

//Get all user
//http://localhost:8081/user/getAllUsers
//Valide
moduleRoutes.get('/getAllUsers', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    User.find({}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    sort('-idCategory').
    select('idUser firstName lastName email password address image phone rol createDate updateDate lastLoginDate').
    exec(function(err, Users) {
        res.json({ success: true, message: 'User List:', data: Users });
    });
});

//UPDATE

//http://localhost:8081/user/updateUser?idUser=1
//Valide
moduleRoutes.post('/updateUser', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    var rol = ( req.body.rol != undefined )? req.body.rol: '';
    var arrRols = commonHelper.getDataByKey('rol');
    var email = (req.body.email == undefined)? "": req.body.email;
    email = email.toLowerCase();

    if(! HelperValidator.isNumeric( req.body.idUser)
        && req.body.idUser != "" ){
        validationResponse.addError("Invalid idUser: " + req.body.idUser);
    }

    if(! HelperValidator.isEmail( email) ){
        validationResponse.addError("Invalid email: " + email);
    }
    if(! HelperValidator.isAscii( req.body.firstName )
        && req.body.lastName != "" ){
        validationResponse.addError("Invalid firstName: " + req.body.firstName);
    }
    if(req.body.lastName != "" && ! HelperValidator.isAscii( req.body.lastName)
        ){
        validationResponse.addError("Invalid lastName: " + req.body.lastName);
    }
    if(! (HelperValidator.isAlphanumeric( req.body.password)
        && HelperValidator.isLength(req.body.password, {min: 5, max: 10}) ) ){
        validationResponse.addError("Le mot de pass doit être une chaine de characters Alphanumerique entre (5 - 10) : " + req.body.password);
    }
    if(! HelperValidator.isAscii( req.body.phone)
        && req.body.phone != "" ){
        validationResponse.addError("Invalid phone: " + req.body.phone);
    }

    if(! ( HelperValidator.isAscii( req.body.rol)
        && req.body.rol != ""
        && arrRols.indexOf(rol) != -1 ) ){
        validationResponse.addError("Invalid rol: " + req.body.rol);
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        User.findOne({ idUser: req.body.idUser }).
            select('idUser, email').
            exec( function(err, user){
                if (err) throw err;

                if (!user) {
                    res.json({ success: false, message: 'User not found.', data: [] });
                }
                else if (user) {

                    var queryWhere = { idUser: req.body.idUser };
                    var updateFields = {
                        idUser: req.body.idUser,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: email,
                        password: req.body.password,
                        address: req.body.address,
                        image: req.body.image,
                        phone: req.body.phone,
                        rol: req.body.rol,
                        updateDate: Date()
                    }

                    User.update(
                        queryWhere, //query
                        updateFields, //update
                        function (err, raw) {
                            if (err) return handleError(err);

                            var msgResponse = 'User updated successfully';
                            console.log(msgResponse);
                            res.json({ success: true, message: msgResponse, data: raw });
                        }
                    );
                }
            });

    }
});

//DELETE

//http://localhost:8081/user/removeUser?idUser=1
//Valide
moduleRoutes.delete('/removeUser', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    if(! ( HelperValidator.isNumeric( req.body.idUser) && req.body.idUser!= "" )  ){
        validationResponse.addError("Invalid idUser: " + req.body.idUser);
    }
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        var queryWhere = { idProduct: req.body.idProduct };
        User.findOne( queryWhere ).
            select('idUser, email').
            exec( function(err, user){
                if (err) throw err;

                if (!user) {
                    res.json({ success: false, message: 'User not found.', data: [] });
                }
                else if (user) {
                    User.remove({
                        idUser: req.body.idUser
                    }, function(err, user) {
                        if (err) throw err;

                        if (!user) {
                            res.json({ success: false, message: 'Error: User can not deleted', data: User });
                        }
                        else if (user) {
                            res.json({
                                success: true,
                                message: 'User Deleted',
                                data: user
                            });
                        }
                    });
                }
            });

    }

});

// ***** Exports
module.exports = moduleRoutes;

/*
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

//http://localhost:8081/user/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJhZG1pbiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9fdiI6MCwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjoicGFzc2xvd3giLCJuYW1lIjoiTG93eCIsIl9pZCI6IjU2YjBiMWE0OGJmOTAwZGEzNmFkZjQzZCJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ1NDQyMDQ1NywiZXhwIjoxNDU0NTA2ODU3fQ.j7fyfANQ6gi1EI5SFf6HcQkESRtEsfvM7OoUHYipGGc
moduleRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

moduleRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});
*/
