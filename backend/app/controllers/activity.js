// ***** Config
var pathServer = "../../server/";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken');
var moduleRoutes = express.Router();

//Models:
var Activity   = require('../models/activity');
var ActivityCategory   = require('../models/activityCategory');
var User   = require('../models/user');

//Helpers:
var commonHelper   = require('../helpers/common');


// ***** Methods

//NONE
//http://localhost:8081/activity/
//
moduleRoutes.get('/', function(req, res) {
    res.json({ success: true, message: 'NONE Activity action', data: req.decoded });
});

//CREATE

//Create default activity
//http://localhost:8081/activity/setup
//
moduleRoutes.get('/setup', function(req, res) {
  var category =null;
  var organiser =null;

  ActivityCategory.findOne({ idActivityCategory: 0
  }, function (err, activityCategory) {
    if (err) throw err;

    console.log(activityCategory);

    if (! activityCategory) {
    res.json({ success: false, message: 'Category not found.', data: [] });
  }
  else {
    category=activityCategory
  }});

  User.findOne({ idUser: 2
  }, function (err, user) {
    if (err) throw err;

    console.log(user);

    if (! user) {
    res.json({ success: false, message: 'User not found.' , data: [] });
  }
  else {
    organiser=user
  }});

   var dataActivity = new Activity({
        label: 'DefaultActivity',
        shortDescription: 'shortDescription DefaultActivity',
        fullDescription: 'fullDescription DefaultActivity',
        category: category,
        beginDate :Date('2016-01-18T14:00:00.000Z'),
        endDate : Date('2016-03-18T14:00:00.000Z'),
        beginTime : 630, // 10h30 --> 630
        endTime : 750, // 12h30 --> 750
        organiser: organiser,
        createDate: Date(),
        updateDate: Date()
    });
    dataActivity.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Activity saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: [] });
    });
});

//Create activity
//http://localhost:8081/activity/createActivity
moduleRoutes.post('/createActivity', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    if(! HelperValidator.isAscii( req.body.label )
        && req.body.label != "" ){
        validationResponse.addError("Invalid label: " + req.body.label);
    }
    if(! HelperValidator.isNumeric( req.body.level)
        && req.body.level != "" ){
        validationResponse.addError("Invalid lastName: " + req.body.level);
    }
    // validation idParent
    if(! ( HelperValidator.isNumeric( req.body.idParent ) && req.body.idParent >= 0 )  ){
      validationResponse.addError("Invalid categoy idParent: " + req.body.idParent);
    }
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        Activity.findOne({ idActivity: req.body.idParent
        }, function (err, activityParent) {
          if (err) throw err;

          console.log(activityParent);

          if (! activityParent && req.body.idParent > 0) {
          res.json({ success: false, message: ' Parent not found.' + req.body.idParent, data: [] });
        }
        else {
                Activity.findOne({ label: req.body.label }).
                select('idActivity, label').
                exec( function(err, activity){
                if (err) throw err;

                if (!activity){
                console.log("activityParent: ");
                console.log(activityParent);
                var idParent = null;
                var level = 1;
                if (activityParent){//Found
                    idParent = activityParent._id;
                    level = activityParent.level + 1;
                }
                var data = new Activity({
            			idParent: idParent,
            			label: req.body.label,
            			level: level,
            			createDate: Date(),
            			updateDate: Date()
            		});
            		data.save(function(err) {
            			if (err) throw err;

            			var msgResponse = ' saved successfully';
            			console.log(msgResponse);
            			res.json({ success: true, message: msgResponse, data: data });
            		});
                }
                else{
                    res.json({ success: false, message: 'Label (' + req.body.label + ') Already Exists ', data: [] });
                }
            });
          }});
        }
    });

//READ

//Get activity
//http://localhost:8081/activity/getActivity?idActivity=1
//
moduleRoutes.get('/getActivity', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    if(! ( HelperValidator.isNumeric( req.query.idActivity ) )  ){
        validationResponse.addError("Activity not found (" + activity.idActivity + ")");
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        Activity.
            findOne({ idActivity: req.query.idActivity }).
            //where('idUser').equals(req.query.idUser).// =
            //where('idUser').gt(17).lt(66).// gt - lt
            //where('idUser').in(['idUser', req.query.idUser]).// like
            //limit(10).
            sort('-idActivity').
            select('idActivity label idParent shortDescription level createDate updateDate lastLoginDate').
            exec(function(err, activity) {
            if (err) throw err;

            if (!activity) {
                res.json({ success: false, message: 'Activity not found.', data: [] });
            }
            else if (activity) {
                    res.json({
                    success: true,
                    message: 'Activity Found',
                    data: activity
                });
            }
        });
    }
});

//Get all activity
//http://localhost:8081/activity/getAllActivity
//
moduleRoutes.get('/getAllActivity', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    Activity.find({}).
    //where('id').equals(req.query.id).// =
    //where('id').gt(17).lt(66).// gt - lt
    //where('id').in(['id', req.query.id]).// like
    //limit(10).
    sort('-id').
      select('idActivity label idParent shortDescription level createDate updateDate lastLoginDate').
    exec(function(err, ActivityCategories) {
        res.json({ success: true, message: 'Activity List:', data: ActivityCategories });
    });
});

//UPDATE

//http://localhost:8081/user/updateActivity?idUser=1
//
moduleRoutes.post('/updateActivity', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    if(! HelperValidator.isAscii( req.body.label )
        && req.body.label != "" ){
        validationResponse.addError("Invalid label: " + req.body.label);
    }
    if(! HelperValidator.isNumeric( req.body.level)
        && req.body.level != "" ){
        validationResponse.addError("Invalid lastName: " + req.body.level);
    }
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        Activity.findOne({ idActivity: req.body.idActivity }).
            select('idActivity, label').
            exec( function(err, activity){
                if (err) throw err;

                if (!activity) {
                    res.json({ success: false, message: 'Activity not found.', data: [] });
                }
                else if (activity) {

                    Activity.findOne({ label: req.body.label }).
                    select('idActivity, label').
                    exec( function(err, activity){
                    if (err) throw err;

                    if (!activity){


                    var queryWhere = { idActivity: req.body.idActivity };
                    var updateFields = {
                      //idactivity: req.body.idactivity,
                      label: req.body.label,
                      shortDescription: req.body.shortDescription,
                      //idParent: req.body.idParent,
                      level: req.body.level,
                      //createDate: Date(),
                      updateDate: Date()
                    }

                    Activity.update(
                        queryWhere, //query
                        updateFields, //update
                        function (err, raw) {
                            if (err) return handleError(err);

                            var msgResponse = 'Activity updated successfully';
                            console.log(msgResponse);
                            res.json({ success: true, message: msgResponse, data: raw });
                        }
                    );
                }
                else {
                  res.json({ success: false, message: 'Label (' + req.body.label + ') Already Exists ', data: [] });
                }
            });
          }
    });
}
});

//DELETE

//http://localhost:8081/user/removeActivity?idActivity=1
//
moduleRoutes.delete('/removeActivity', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    if(! ( HelperValidator.isNumeric( req.body.idActivity) && req.body.idActivity!= "" )  ){
        validationResponse.addError("Invalid idActivity: " + req.body.idActivity);
    }
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        var queryWhere = { idActivity: req.body.idActivity };
        Activity.findOne( queryWhere ).
            select('idActivity, label').
            exec( function(err, activity){
                if (err) throw err;

                if (!activity) {
                    res.json({ success: false, message: 'Activity not found.', data: [] });
                }
                else if (activity) {
                    Activity.remove({
                        idActivity: req.body.idActivity
                    }, function(err, activity) {
                        if (err) throw err;

                        if (!activity) {
                            res.json({ success: false, message: 'Error: Activity can not deleted', data: Activity });
                        }
                        else if (activity) {
                            res.json({
                                success: true,
                                message: 'Activity Deleted',
                                data: activity
                            });
                        }
                    });
                }
            });
    }
});


// ***** Exports
module.exports = moduleRoutes;
