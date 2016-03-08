// ***** Config
var pathServer = "../../server/";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken');
var moduleRoutes = express.Router();

//Models:
var Commentary   = require('../models/commentary');
var User   = require('../models/user');
var Publication   = require('../models/publication');

//Helpers:
var commonHelper   = require('../helpers/common');


// ***** Methods

//NONE
//http://localhost:8081/commentary/
//Valide
moduleRoutes.get('/', function(req, res) {
  res.json({ success: true, message: 'NONE Commentary action', data: req.decoded });
});


//CREATE

//Create default commentary
//http://localhost:8081/commentary/setup
/*
var commentarySchema = new Schema({
idCommentary: Number,
msgCommentary: String,
user: { type: Schema.Types.ObjectId, ref: 'User' },
publication: { type: Schema.Types.ObjectId, ref: 'Publication'},
createDate: Date,
updateDate : Date
});

"_id" : ObjectId("56d96bf95b9e06804a62295c")

*/
moduleRoutes.get('/setupObjId', function(req, res) {
  var dataCommentary = new Commentary({
    msgCommentary: 'Message DefaultCommentary',
    user : "56d96bf95b9e06804a62295c",
    publication: "56c334c25988fb96d323c1e9" ,
    createDate: Date(),
    updateDate: Date(),
  });
  dataCommentary.save(function(err) {
    if (err) throw err;

    var msgResponse = 'Commentary saved successfully';
    console.log(msgResponse);
    res.json({ success: true, message: msgResponse, data: [] });
  });
});

///*

moduleRoutes.get('/setupId', function(req, res) {
  var user = null;
  var publication = null;
  var idUser = 0;       //idUser != objIdUser
  //idUser généré par auto incremente
  //objIdUser : _id : référence de l'objet user
  var idPublication = 0;
  var HelperValidator = commonHelper.validator;

  User.findOne({ idUser: idUser
  }, function (err, user) {
    if (err) throw err;

    if (! user) {
      res.json({ success: false, message: 'User not found.', data: [] });
    }
    else {
      Publication.findOne({ idPublication: idPublication
      }, function (err, publication) {
        if (err) throw err;

        if (! publication) {
          res.json({ success: false, message: 'Publication not found.', data: [] });
        }
        else {
          console.log("user : ");
          console.log(user);
          console.log(user._id);
          console.log("Coucou Chahinaz");
          console.log(typeof "Coucou Chahinaz");
          console.log(typeof user);
          //console.log(HelperValidator.isAlphanumeric(user));
          console.log("publication : ");
          console.log(publication);
          //console.log(HelperValidator.isAlphanumeric(publication));
          console.log("\n");
          var dataCommentary = new Commentary({
            msgCommentary: 'Message DefaultCommentary',
            user : user,
            publication: publication ,
            createDate: Date(),
            updateDate: Date()
          });
          dataCommentary.save(function(err) {
            if (err) throw err;

            var msgResponse = 'Commentary saved successfully';
            console.log(msgResponse);
            res.json({ success: true, message: msgResponse, data: [] });
          });
        }
      });
    }
  });
});

//*/
//Create Commentary
//http://localhost:8081/commentary/createCommentary
moduleRoutes.post('/createCommentary', function(req, res) {
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;

  if(!(!HelperValidator.isNull( req.body.idUser) && HelperValidator.isNumeric( req.body.idUser)))
  {
    validationResponse.addError("Invalid idUser: " + req.body.idUser);
  }
  if(!(!HelperValidator.isNull( req.body.idPublication) && HelperValidator.isNumeric( req.body.idPublication)))
  {
    validationResponse.addError("Invalid idPublication: " + req.body.idPublication);
  }

  if(! validationResponse.success){
    res.json(validationResponse);
  }
  else {

    User.findOne({ idUser: req.body.idUser
    }, function (err, user) {
      if (err) throw err;

      if (! user) {
        res.json({ success: false, message: 'User not found.', data: [] });
      }
      else {
        Publication.findOne({ idPublication:  req.body.idPublication
        }, function (err, publication) {
          if (err) throw err;

          if (! publication) {
            res.json({ success: false, message: 'Publication not found.', data: [] });
          }
          else {
            console.log("user : ");
            console.log(user);
            console.log(user._id);
            console.log("Coucou Chahinaz");
            console.log(typeof "Coucou Chahinaz");
            console.log(typeof user);
            //console.log(HelperValidator.isAlphanumeric(user));
            console.log("publication : ");
            console.log(publication);
            //console.log(HelperValidator.isAlphanumeric(publication));
            console.log("\n");
            var dataCommentary = new Commentary({
              user : user,
              msgCommentary: req.body.msgCommentary,
              publication: publication ,
              createDate: Date(),
              updateDate: Date()
            });
            dataCommentary.save(function(err) {
              if (err) throw err;

              var msgResponse = 'Commentary saved successfully';
              console.log(msgResponse);
              res.json({ success: true, message: msgResponse, data: [] });
            });
          }
        });
      }
    });
  }
});

//Get Commentary
//http://localhost:8081/commentary/getAllCommentary
//Valide
moduleRoutes.get('/getAllCommentary', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    Commentary.find({}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    sort('-idCommentary').
      select('idCommentary msgCommentary user publication createDate updateDate').
    exec(function(err, commentaries) {
        res.json({ success: true, message: 'Commentary List:', data: commentaries });
    });
});

//Get Commentary
//http://localhost:8081/commentary/getAllCommentary
//Valide
moduleRoutes.post('/getPublicationCommentary', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    if(!(!HelperValidator.isNull( req.body.idPublication) && HelperValidator.isNumeric( req.body.idPublication)))
    {
      validationResponse.addError("Invalid idPublication: " + req.body.idPublication);
    }

    if(! validationResponse.success){
      res.json(validationResponse);
    }
    else
    {
      Publication.findOne({ idPublication: req.body.idPublication
      }, function (err, publication) {
        if (err) throw err;

        if (! publication) {
          res.json({ success: false, message: 'Publication not found.', data: [] });
        }
        else {
      //db.commentaries.find({"publication" : ObjectId("56d975e28da366c24cf45821")})
    Commentary.find({publication : publication._id}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    sort('-idCommentary').
      select('idCommentary msgCommentary user publication createDate updateDate').
    exec(function(err, commentaries) {
        res.json({ success: true, message: 'Commentary List:', data: commentaries });
      });
    }
  });
}
});



// ***** Exports
module.exports = moduleRoutes;
