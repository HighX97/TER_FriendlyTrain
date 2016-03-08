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
idFriend : Number,
userA: { type: Schema.Types.ObjectId, ref: 'User' },
userB: { type: Schema.Types.ObjectId, ref: 'User' }, //UserA != UserB
state: Number, //0 Demande de UserA vers UserB, 1 UserA firend with UserB
createDate: Date,
updateDate : Date
});
*/
moduleRoutes.get('/setup', function(req, res) {
  var dataFriend = new Friend({
    //idFriend : Number,
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
  User.findOne({ idUser: 9
  }, function (err, userA) {
    if (err) throw err;

    if (! userA) {
      res.json({ success: false, message: 'User not found.', data: [] });
    }
    else {
      User.findOne({ idUser: 8
      }, function (err, userB) {
        if (err) throw err;

        if (! userB) {
          res.json({ success: false, message: 'User not found.', data: [] });
        }
        else {
          var dataFriend = new Friend({
            //idFriend : Number,
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
//http://localhost:8081/friend/createFriend
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
                //idFriend : Number,
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

//READ

//Get Friend
//http://localhost:8081/friend/getFriend

moduleRoutes.post('/getFriend', function(req, res) {
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;

  //vérification si l'identifiant de l'utilisateur A est est un nombre et different de null.
  if(!( !HelperValidator.isNull( req.body.idFriend )
  && HelperValidator.isNumeric( req.body.idFriend )))
  {
    validationResponse.addError("Invalid idFriend: " + req.body.idFriend);
  }
  //pareil pour l'utilisateur B
  if(! validationResponse.success)
  {
    res.json(validationResponse);
  }
  else
  {
    Friend.findOne({idFriend : req.body.idFriend}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    select('idFriend userA userB state createDate updateDate').
    exec(function(err, FriendRelation) {
      res.json({ success: true, message: 'FriendRelation:', data: FriendRelation });
    });
  }
});

//Get Friend
//http://localhost:8081/friend/getUserFriendsRelations
moduleRoutes.post('/getUserFriendsRelations', function(req, res)
{
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;

  //vérification si l'identifiant de l'utilisateur A est est un nombre et different de null.
  if(!( !HelperValidator.isNull( req.body.idUser )
  && HelperValidator.isNumeric( req.body.idUser )))
  {
    validationResponse.addError("Invalid idUser: " + req.body.idUser);
  }
  //pareil pour l'utilisateur B
  if(! validationResponse.success)
  {
    res.json(validationResponse);
  }
  else
  {
    User.findOne({ idUser: req.body.idUser
    }, function (err, user) {
      if (err) throw err;

      if (! user)
      {
        res.json({ success: false, message: 'User not found.', data: [] });
      }
      else
      {
        Friend.find({$or : [{userA : user},{userB : user}]}).
        //where('idCategory').equals(req.query.idCategory).// =
        //where('idCategory').gt(17).lt(66).// gt - lt
        //where('idCategory').in(['idCategory', req.query.idCategory]).// like
        //limit(10).
        select('idFriend userA userB state createDate updateDate').
        exec(function(err, UserFriends) {
          res.json({ success: true, message: 'FriendRelation:', data: UserFriends });
        });
      }
    });
  }
});

//Get Friend
//http://localhost:8081/friend/getAllFriendsRelations
moduleRoutes.get('/getAllFriendsRelations', function(req, res)
{
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;

  if(! validationResponse.success)
  {
    res.json(validationResponse);
  }
  else
  {
    Friend.find({}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    select('idFriend userA userB state createDate updateDate').
    exec(function(err, UserFriends) {
      res.json({ success: true, message: 'FriendRelation:', data: UserFriends });
    });
  }
});

//UPDATE

//http://localhost:8081/friend/confirmeFriend
moduleRoutes.post('/confirmeFriend', function(req, res) {
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;
  if(!( !HelperValidator.isNull( req.body.idUserA )
  && HelperValidator.isNumeric( req.body.idUserA )))
  {
    validationResponse.addError("Invalid idUserA: " + req.body.idUserA);
  }

  if(!( !HelperValidator.isNull( req.body.idUserB )
  && HelperValidator.isNumeric( req.body.idUserB )))
  {
    validationResponse.addError("Invalid idUserB: " + req.body.idUserB);
  }
  if (req.body.idUserA == req.body.idUserB)
  {
    validationResponse.addError("Invalid idUserA == idUserB");
  }

  if(! validationResponse.success)
  {
    res.json(validationResponse);
  }
  else
  {
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
            Friend.findOne({$or : [{"userA" : userA,"userB" : userB},{"userB" : userA,"userA" : userB}]}).
            exec( function(err, friend)
            {
              if (err) throw err;

              if (friend)
              {
                var queryWhere = { idFriend: friend.idFriend };
                var updateFields = {
                  idFriend : friend.idFriend,
                  userA: friend.userA,
                  userB: friend.userB, //UserA != UserB
                  state: 1, //0 Demande de UserA vers UserB, 1 UserA firend with UserB
                  createDate: friend.createDate,
                  updateDate : Date()
                }
                Friend.update(
                  queryWhere, //query
                  updateFields, //update
                  function (err, raw) {
                    if (err) return handleError(err);

                    var msgResponse = 'Friend Relation updated successfully';
                    console.log(msgResponse);
                    res.json({ success: true, message: msgResponse, data: raw });
                  });
                }
                else {
                  res.json({ success: false, message: 'Friend Relation not found.', data: [] });
                }
              });
            }
          });
        }
      });
    }
  });


  //http://localhost:8081/friend/confirmeFriendById
  moduleRoutes.post('/confirmeFriendById', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    if(!( !HelperValidator.isNull( req.body.idFriend )
    && HelperValidator.isNumeric( req.body.idFriend )))
    {
      validationResponse.addError("Invalid idFriend: " + req.body.idUserA);
    }
    else
    {
      Friend.findOne({ idFriend : req.body.idFriend}).
      exec( function(err, friend)
      {
        if (err) throw err;

        if (friend)
        {
          var queryWhere = { idFriend: friend.idFriend };
          var updateFields = {
            idFriend : req.body.idFriend,
            userA: friend.userA,
            userB: friend.userB, //UserA != UserB
            state: 1, //0 Demande de UserA vers UserB, 1 UserA firend with UserB
            createDate: friend.createDate,
            updateDate : Date()
          }
          Friend.update(
            queryWhere, //query
            updateFields, //update
            function (err, raw) {
              if (err) return handleError(err);

              var msgResponse = 'Friend Relation updated successfully';
              console.log(msgResponse);
              res.json({ success: true, message: msgResponse, data: raw });
            });
          }
          else {
            res.json({ success: false, message: 'Friend Relation not found.', data: [] });
          }
        });
      }
    });

    //http://localhost:8081/friend/deleteFriendById

    moduleRoutes.delete('/deleteFriendById', function(req, res) {
      var validationResponse = commonHelper.getValidationResponse();
      var HelperValidator = commonHelper.validator;
      if(!( !HelperValidator.isNull( req.body.idFriend )
      && HelperValidator.isNumeric( req.body.idFriend )))
      {
        validationResponse.addError("Invalid idFriend: " + req.body.idFriend);
      }
      else
      {
        Friend.findOne({ idFriend : req.body.idFriend}).
        exec( function(err, friend)
        {
          if (err) throw err;

          if (friend)
          {
            Friend.remove({idFriend: req.body.idFriend}, function(err, friend) {
              if (err) throw err;

              if (!friend) {
                res.json({ success: false, message: 'Error: FriendRelation can not deleted', data: Friend });
              }
              else {
                res.json({
                  success: true,
                  message: 'FriendRelation Deleted',
                  data: friend
                });
              }
            });
          }
          else {
            res.json({ success: false, message: 'Friend Relation not found.', data: [] });
          }
        });
      }
    });

    //http://localhost:8081/friend/deleteFriend

    moduleRoutes.delete('/deleteFriend', function(req, res) {
      var validationResponse = commonHelper.getValidationResponse();
      var HelperValidator = commonHelper.validator;
      if(!( !HelperValidator.isNull( req.body.idUserA )
      && HelperValidator.isNumeric( req.body.idUserA )))
      {
        validationResponse.addError("Invalid idUserA: " + req.body.idUserA);
      }

      if(!( !HelperValidator.isNull( req.body.idUserB )
      && HelperValidator.isNumeric( req.body.idUserB )))
      {
        validationResponse.addError("Invalid idUserB: " + req.body.idUserB);
      }
      if (req.body.idUserA == req.body.idUserB)
      {
        validationResponse.addError("Invalid idUserA == idUserB");
      }

      if(! validationResponse.success)
      {
        res.json(validationResponse);
      }
      else
      {
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
                Friend.findOne({$or : [{"userA" : userA,"userB" : userB},{"userB" : userA,"userA" : userB}]}).
                exec( function(err, friend)
                {
                  if (err) throw err;

                  if (friend)
                  {
                    Friend.remove({idFriend: friend.idFriend}, function(err, friend) {
                      if (err) throw err;

                      if (!friend) {
                        res.json({ success: false, message: 'Error: FriendRelation can not deleted', data: Friend });
                      }
                      else {
                        res.json({
                          success: true,
                          message: 'FriendRelation Deleted',
                          data: friend
                        });
                      }
                    });
                  }
                  else {
                    res.json({ success: false, message: 'Friend Relation not found.', data: [] });
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
