// ***** Config
var pathServer = "../../server/";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken');
var moduleRoutes = express.Router();

//Models:
var Publication   = require('../models/publication');
var User   = require('../models/user');

//Helpers:
var commonHelper   = require('../helpers/common');

var MIN_BEGIN_TIME = 0;
var MIN_END_TIME = 0;
var MAX_BEGIN_TIME = 3599;
var MAX_END_TIME = 3599;


// ***** Methods

//NONE
//http://localhost:8081/publication/
//
moduleRoutes.get('/', function(req, res) {
  res.json({ success: true, message: 'NONE Publication action', data: req.decoded });
});


//CREATE

//Create default publication
//http://localhost:8081/publication/setup
moduleRoutes.get('/setup', function(req, res) {
  var userId =null;
  var HelperValidator = commonHelper.validator;

  User.findOne({ idUser: 5
  }, function (err, user) {
    if (err) throw err;

    if (! user) {
      res.json({ success: false, message: 'User not found.', data: [] });
    }
    else {
      userId=user.id

      console.log("userId : ");
      console.log(userId );
      console.log(HelperValidator.isAlphanumeric(userId));
      console.log("\n");
      //
      var dataPublication = new Publication({
        msgPublication: "Default Publication",
        /*
        picturePublication: String,
        soundPublication: String,
        videoPublication: String,
        */
        user: userId,
        commentaries : [
          { userId: "56d7b9c25d3ee90e22a7a964", msgCommentary : "First Publication", dateCommentary: Date()},
          { userId: "56d7b769dbe69a5521a6d8a1", msgCommentary : "Second Publication", dateCommentary: Date()},
          { userId: "56d7b9c25d3ee90e22a7a964", msgCommentary : "Third Publication", dateCommentary: Date()}],
          likes : [
            {userId: "56d7b9c25d3ee90e22a7a964" , dateLike: Date()},
            {userId: "56d7b769dbe69a5521a6d8a1" , dateLike: Date()}],
            createDate: Date(),
            updateDate : Date()
          });
          dataPublication.save(function(err)
          {
            if (err) throw err;

            var msgResponse = 'Publication saved successfully';
            console.log(msgResponse);
            res.json({ success: true, message: msgResponse, data: [] });
          });
        }
      });
    });

    //Create publication
    //http://localhost:8081/publication/createPublication

    moduleRoutes.post('/createPublication', function(req, res) {
      var validationResponse = commonHelper.getValidationResponse();
      var HelperValidator = commonHelper.validator;
      //Check msgPublication
      if( HelperValidator.isNull( req.body.msgPublication ))
      {
        validationResponse.addError("Invalid msgPublication can't be empty " + req.body.label);
      }
      //Check idUser
      if(! (HelperValidator.isNumeric(req.body.idUser) ))
      {
        validationResponse.addError("Invalid idUser: " + req.body.idUser);
      }
      if(! validationResponse.success){
        res.json(validationResponse);
      }
      else {
        var publisherObjId = null;
        User.findOne({ idUser: req.body.idUser
        }, function (err, user) {
          if (err) throw err;
          if (! user) {
            res.json({ success: false, message: 'User not found.' , data: [] });
          }
          else {
            publisherObjId=user.id

            console.log("publisherObjId : ");
            console.log(publisherObjId );
            console.log(HelperValidator.isAlphanumeric(publisherObjId));
            console.log("\n");
            //
            var dataPublication = new Publication({
              msgPublication: req.body.msgPublication,
              user: publisherObjId,
              commentaries: null,
              likes: null,
              createDate: Date(),
              updateDate: Date()
            });
            dataPublication.save(function(err)
            {
              if (err) throw err;

              var msgResponse = 'Publication saved successfully';
              console.log(msgResponse);
              res.json({ success: true, message: msgResponse, data: [] });
            });
          }
        });
      }
    });

    //READ

    //Get Publication
    //http://localhost:8081/publication/getPublication?idPublication=5
    //Valide
    moduleRoutes.get('/getPublication', function(req, res) {
      var validationResponse = commonHelper.getValidationResponse();
      var HelperValidator = commonHelper.validator;
      //Check idUser
      if(! (HelperValidator.isNumeric(req.query.idPublication) ))
      {
        validationResponse.addError("Invalid idPublication: " + req.body.idPublication);
      }
      if(! validationResponse.success){
        res.json(validationResponse);
      }
      else {
        Publication.
        findOne({ idPublication: req.query.idPublication }).
        //where('idUser').equals(req.query.idUser).// =
        //where('idUser').gt(17).lt(66).// gt - lt
        //where('idUser').in(['idUser', req.query.idUser]).// like
        //limit(10).
        sort('-idUser').
        select('_id idPublication msgPublication user commentaries likes createDate updateDate').
        exec(function(err, publication) {
          if (err) throw err;

          if (!publication) {
            res.json({ success: false, message: 'Publication not found.', data: [] });
          }
          else if (publication) {
            res.json({
              success: true,
              message: 'Publication Found',
              data: publication
            });
          }
        });
      }
    });

    //Get all publication
    //http://localhost:8081/publication/getAllPublications
    //Valide
    moduleRoutes.get('/getAllPublications', function(req, res) {
      var validationResponse = commonHelper.getValidationResponse();
      var HelperValidator = commonHelper.validator;

      Publication.find({}).
      //where('idCategory').equals(req.query.idCategory).// =
      //where('idCategory').gt(17).lt(66).// gt - lt
      //where('idCategory').in(['idCategory', req.query.idCategory]).// like
      //limit(10).
      sort('-idCategory').
      select('_id idPublication msgPublication user commentaries likes createDate updateDate').
      exec(function(err, Publications) {
        res.json({ success: true, message: 'Publication List:', data: Publications });
      });
    });

    //UPDATE

    //Add commentary

    //Add like

    //Change msgPublication
    //Todo Control that the userId is the same
    //http://localhost:8081/publication/updatePublication
    //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/L_op%C3%A9rateur_typeof
    //typeof {a:1} === 'object';
    // Utiliser la méthode Array.isArray ou Object.prototype.toString.call
    // afin de différencier les objets des tableaux
    //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/isArray
    //typeof [1, 2, 4] === 'object';
    //Array.isArray([]);

    //Valide
    moduleRoutes.post('/updatePublication', function(req, res) {
      var validationResponse = commonHelper.getValidationResponse();
      var HelperValidator = commonHelper.validator;
      //Check msgPublication
      if( HelperValidator.isNull( req.body.msgPublication ))
      {
        validationResponse.addError("Invalid msgPublication can't be empty " + req.body.label);
      }

      var arrRequestCommentary = (typeof req.body['commentaries[]'] == "string")? [req.body['commentaries[]']]: req.body['commentaries[]'];
      var arrRequestLike = (typeof req.body['likes[]'] == "string")? [req.body['likes[]']]: req.body['likes[]'];
      /*
      for (var x in arrRequestCommentary)
      {
        console.log(arrRequestCommentary[x]);
      }
      */
      /*
      console.log("\n");
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log(req.body['commentaries[]']);
      console.log(typeof req.body['commentaries[]']);
      console.log(String(req.body['commentaries[]']));
      var arrRequestCommentary = [];
      arrRequestCommentary = "["+String(req.body['commentaries[]'])+"]";
      console.log(arrRequestCommentary);
      console.log(typeof arrRequestCommentary);
      console.log(Array(arrRequestCommentary));
      console.log(typeof Array(arrRequestCommentary));
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("\n");
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log(req.body['likes[]']);
      console.log(typeof req.body['likes[]']);
      console.log(String(req.body['likes[]']));
      var arrRequestLike = [];
      arrRequestLike = "["+String(req.body['likes[]'])+"]";
      console.log(arrRequestLike);
      console.log(typeof arrRequestLike);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("\n");
      */

      console.log(arrRequestCommentary);
      console.log(typeof arrRequestCommentary);
      var arrRequestCommentary_unquoted = [];
      for (var x in arrRequestCommentary)
      {
        console.log(JSON.parse(arrRequestCommentary[x]));
        console.log(typeof JSON.parse(arrRequestCommentary[x]));
        arrRequestCommentary_unquoted.push(JSON.parse(arrRequestCommentary[x]));
      }
      console.log(arrRequestCommentary_unquoted);
      console.log(typeof arrRequestCommentary_unquoted);

      console.log(arrRequestLike);
      console.log(typeof arrRequestLike);
      var arrRequestLike_unquoted = [];
      for (var x in arrRequestLike)
      {
        console.log(JSON.parse(arrRequestLike[x]));
        console.log(typeof JSON.parse(arrRequestLike[x]));
        arrRequestLike_unquoted.push(JSON.parse(arrRequestLike[x]));
      }
      console.log(arrRequestLike_unquoted);
      console.log(typeof arrRequestLike_unquoted);




      //JSONARRAY
      //http://www.w3schools.com/js/js_json.asp

      /*
      if(! ( HelperValidator.isAscii( req.body['commentaries[]'] ) && typeof arrRequestCommentary == "object" )  )
      {
        validationResponse.addError("Invalid commentaries: " + req.body['commentaries[]']);
      }
      if(! ( HelperValidator.isAscii( req.body['likes[]'] ) && typeof arrRequestLike == "object" )  )
      {
        validationResponse.addError("Invalid likes: " + req.body['likes[]']);
      }
      */
      if(! validationResponse.success){
        res.json(validationResponse);
      }
      else {
        Publication.findOne({idPublication: req.body.idPublication}).
        exec( function(err, publication){
          if (err) throw err;

          if (!publication) {
            res.json({ success: false, message: 'Publication not found.', data: [] });
          }
          else if (publication) {

            console.log("\n");
            console.log(arrRequestCommentary);
            console.log(typeof arrRequestCommentary);
            console.log(arrRequestLike);
            console.log(typeof arrRequestLike);
            console.log("\n");

            var queryWhere = { idPublication: req.body.idPublication };
            var updateFields = {
              msgPublication: req.body.msgPublication,
              user: req.body.user,
              commentaries: arrRequestCommentary_unquoted,
              likes: arrRequestLike_unquoted,
              /*
              commentaries: [
                { userId: "56d7b9c25d3ee90e22a7a964", msgCommentary : "First Publication", dateCommentary: Date()},
                { userId: "56d7b769dbe69a5521a6d8a1", msgCommentary : "Second Publication", dateCommentary: Date()},
                { userId: "56d7b9c25d3ee90e22a7a964", msgCommentary : "Third Publication", dateCommentary: Date()}],
              likes: [
                {userId: "56d7b9c25d3ee90e22a7a964" , dateLike: Date()},
                {userId: "56d7b769dbe69a5521a6d8a1" , dateLike: Date()}],
                */
              createDate: req.body.createDate,
              updateDate: Date()
            }

            Publication.update(
              queryWhere, //query
              updateFields, //update
              function (err, raw) {
                if (err) return handleError(err);

                var msgResponse = 'Publication updated successfully';
                console.log(msgResponse);
                res.json({ success: true, message: msgResponse, data: raw });
              }
            );
          }
        });
      }
    });
    // ***** Exports
    module.exports = moduleRoutes;
