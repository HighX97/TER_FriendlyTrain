// ***** Config
var pathServer = "../../server/";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken');
var moduleRoutes = express.Router();

//Models:
var Friend   = require('../models/friend');
var User   = require('../models/user');

//Helpers:
var commonHelper   = require('../helpers/common');
var authenticationHelper   = require('../helpers/authentication');


// ***** Methods

//NONE
//http://localhost:8081/friend/
//Valide
moduleRoutes.get('/', function(req, res) {
  res.json({ success: true, message: 'NONE Friend action', data: req.decoded });
});

//CREATE

//Create default friend
//http://localhost:8081/friend/setup
/*
var FriendSchema = new Schema({
idRelation : Number,
userA: { type: Schema.Types.ObjectId, ref: 'User' },
userB: { type: Schema.Types.ObjectId, ref: 'User' }, //UserA != UserB
state: Number, //0 Demande de UserA vers UserB, 1 UserA firend with UserB
createDate: Date,
updateDate : Date
});
*/
moduleRoutes.get('/setup', function(req, res) {
  var dataFriend = new Friend({
    //idRelation : Number,
    userA: "56de853280ee2aab0f0393c4", //{ type: Schema.Types.ObjectId, ref: 'User' },
    userB: "56de84f880ee2aab0f0393c3", // { type: Schema.Types.ObjectId, ref: 'User' }, //UserA != UserB
    state: 0, //0 Demande de UserA vers UserB, 1 UserA firend with UserB
    createDate: Date(),
    updateDate: Date(),
  });
  dataFriend.save(function(err) {
    if (err) throw err;

    var msgResponse = 'Friend saved successfully';
    console.log(msgResponse);
    res.json({ success: true, message: msgResponse, data: [] });
  });
});

//http://localhost:8081/friend/setupById
moduleRoutes.get('/setupById', function(req, res) {
  var userA=null;
  var userB=null;
  User.findOne({ idUser: 1
  }, function (err, userA) {
    if (err) throw err;

    if (! userA) {
      res.json({ success: false, message: 'User not found.', data: [] });
    }
    else {
      User.findOne({ idUser: 4
      }, function (err, userB) {
        if (err) throw err;

        if (! userB) {
          res.json({ success: false, message: 'User not found.', data: [] });
        }
        else {
          var dataFriend = new Friend({
            //idRelation : Number,
            userA: userA, //{ type: Schema.Types.ObjectId, ref: 'User' },
            userB: userB, // { type: Schema.Types.ObjectId, ref: 'User' }, //UserA != UserB
            state: 0, //0 Demande de UserA vers UserB, 1 UserA firend with UserB
            createDate: Date(),
            updateDate: Date(),
          });
          dataFriend.save(function(err) {
            if (err) throw err;

            var msgResponse = 'Friend saved successfully';
            console.log(msgResponse);
            res.json({ success: true, message: msgResponse, data: [] });
          });
        }
      });
    }
  });
});


//Create Friend
//http://localhost:8081/user/createFriend
moduleRoutes.post('/createFriend', function(req, res) {
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;

  //isAscii(str) - check if the string contains ASCII chars only.
  //Not accept ï or é
  //change isAscii by a better fonction
  //vérification si l'identifiant de l'utilisateur A est est un nombre et different de null.
  if(!( !HelperValidator.isNull( req.body.idUserA )
  && HelperValidator.isNumeric( req.body.idUserA )))
  {
    validationResponse.addError("Invalid idUserA: " + req.body.idUserA);
  }
  //pareil pour l'utilisateur B

  if(!( !HelperValidator.isNull( req.body.idUserB )
  && HelperValidator.isNumeric( req.body.idUserB )))
  {
    validationResponse.addError("Invalid idUserB: " + req.body.idUserB);
  }


  if (req.body.idUserA == req.body.idUserB)
  {
    validationResponse.addError("Vous ne pouvez pas etre ami avec vous meme");
  }

  if(! validationResponse.success)
  {
    res.json(validationResponse);
  }
  else
  {
    console.log("tout est bon");
    User.findOne({ idUser: req.body.idUserA
    }, function (err, userA) {
      if (err) throw err;

      if (! userA) {
        res.json({ success: false, message: 'User not found.', data: [] });
      }
      else {
        User.findOne({ idUser: req.body.idUserB
        }, function (err, userB) {
          if (err) throw err;

          if (! userB) {
            res.json({ success: false, message: 'User not found.', data: [] });
          }
          else {
            //db.friends.findOne({$or : [{"userA" : ObjectId("56de7d7bd9c227040d4dbf89"),"userB" : ObjectId("56de84f880ee2aab0f0393c3")},{"userB" : ObjectId("56de7d7bd9c227040d4dbf89"),"userA" : ObjectId("56de84f880ee2aab0f0393c3")}]})

            Friend.findOne({$or : [{"userA" : userA,"userB" : userB},{"userB" : userA,"userA" : userB}]
          }, function (err, friend) {
            if (err) throw err;

            if (friend) {
              res.json({ success: false, message: 'Friend realation already exist.', data: [] });
            }
            else {

              var dataFriend = new Friend({
                //idRelation : Number,
                userA: userA, //{ type: Schema.Types.ObjectId, ref: 'User' },
                userB: userB, // { type: Schema.Types.ObjectId, ref: 'User' }, //UserA != UserB
                state: 0, //0 Demande de UserA vers UserB, 1 UserA firend with UserB
                createDate: Date(),
                updateDate: Date(),
              });
              dataFriend.save(function(err) {
                if (err) throw err;

                var msgResponse = 'Friend saved successfully';
                console.log(msgResponse);
                res.json({ success: true, message: msgResponse, data: [] });
              });
            }
          });
        }
      });
    }
  });
}
});





// ***** Exports
module.exports = moduleRoutes;
