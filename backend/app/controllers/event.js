// ***** Config
var pathServer = "../../server/";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken');
var moduleRoutes = express.Router();

//Models:
var Event   = require('../models/event');
var Activity   = require('../models/activity');
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
//http://localhost:8081/event/
//
moduleRoutes.get('/', function(req, res) {
  res.json({ success: true, message: 'NONE Event action', data: req.decoded });
});

//CREATE

//Create default activity
//http://localhost:8081/event/setup
moduleRoutes.get('/setup', function(req, res) {
  var activityId =null;
  var organiser =null;
  var HelperValidator = commonHelper.validator;

  //
  Activity.findOne({ idActivity: 14
  }, function (err, activity) {
    if (err) throw err;

    if (! activity) {
      res.json({ success: false, message: 'Category not found.', data: [] });
    }
    else {
      activityId=activity.id

      console.log("activityId : ");
      console.log(activityId );
      console.log(HelperValidator.isAlphanumeric(activityId));
      console.log("\n");
      //
      var dataEvent = new Event({
        activity : activityId,
        label: "Taekwendo_Seance1",
        beginTime : 630,
        endTime : 750,
        minParticipant : 5,
        maxParticipant : 15,
        numParticipant : 0,
        coachs : {},
        participants : {},
        publications : {},
        state : 1, //// {0:"cancelled ",1:"scheduled",2:"realised"}
        createDate: Date(),
        updateDate : Date()
      });
      dataEvent.save(function(err)
      {
        if (err) throw err;

        var msgResponse = 'Event saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: [] });
      });
    }
  });
});


// ***** Exports
module.exports = moduleRoutes;
