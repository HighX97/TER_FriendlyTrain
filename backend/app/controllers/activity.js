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

var MIN_BEGIN_TIME = 0;
var MIN_END_TIME = 0;
var MAX_BEGIN_TIME = 3599;
var MAX_END_TIME = 3599;


// ***** Methods

//NONE
//http://localhost:8081/activity/
//
moduleRoutes.get('/', function(req, res) {
  res.json({ success: true, message: 'NONE Activity action', data: req.decoded });
});

//CREATE

//Create default activity
//http://localhost:8081/activity/setup_id
moduleRoutes.get('/setupId', function(req, res) {
  var category =null;
  var organiser =null;
  var HelperValidator = commonHelper.validator;

  //
  ActivityCategory.findOne({ idActivityCategory: 0
  }, function (err, activityCategory) {
    if (err) throw err;

    if (! activityCategory) {
      res.json({ success: false, message: 'Category not found.', data: [] });
    }
    else {
      category=activityCategory.id
      //
      User.findOne({ idUser: 2
      }, function (err, user) {
        if (err) throw err;
        console.log("\n\n");
        console.log(user.id);
        console.log("\n\n");
        if (! user) {
          res.json({ success: false, message: 'User not found.' , data: [] });
        }
        else {
          organiser=user.id

          console.log("category : ");
          console.log(category );
          console.log(HelperValidator.isAlphanumeric(category));
          console.log("organiser : ");
          console.log(organiser);
          console.log(HelperValidator.isAlphanumeric(organiser));
          console.log("\n");
          //
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
        }
      });
    }
  });
});

//http://localhost:8081/activity/setup_id
moduleRoutes.get('/setupObjId', function(req, res) {
  var category ="56d7cba9bfffb4c428caaa26";
  var organiser ="56d7a42bdfcb92f21a6fe5ee";
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
  //Check label
  if(! HelperValidator.isAscii( req.body.label ) && req.body.label != "" ){
    validationResponse.addError("Invalid label: " + req.body.label);
  }
  //Check time
  if(! ( HelperValidator.isNumeric( req.body.beginTime ) && req.body.beginTime >= MIN_BEGIN_TIME && req.body.beginTime <= MAX_BEGIN_TIME))
  {
    validationResponse.addError("Invalid beginTime: " + req.body.beginTime);
  }
  if(! ( HelperValidator.isNumeric( req.body.endTime ) && req.body.endTime >= MIN_END_TIME && req.body.endTime <= MAX_END_TIME))
  {
    validationResponse.addError("Invalid endTime: " + req.body.endTime);
  }
  if(HelperValidator.isNumeric(req.body.beginTime)  && HelperValidator.isNumeric( req.body.endTime) && req.body.beginTime >= req.body.endTime  )
  {
    validationResponse.addError("beginTime "+req.body.beginTime+" must be lower than endTime " + req.body.endTime);
  }
  //Check date
  if(! (HelperValidator.isDate(req.body.beginDate) && req.body.beginDate >= Date()  ))
  {
    validationResponse.addError("Invalid  beginDate " + req.body.beginDate + " must be higher than " +Date());
  }
  if(! (HelperValidator.isDate(req.body.endDate) && req.body.beginDate >= Date() ))
  {
    validationResponse.addError("Invalid endDate " + req.body.endDate + " must be higher than " +Date());
  }
  if(HelperValidator.isDate(req.body.beginDate)  && HelperValidator.isDate( req.body.endDate) && req.body.beginDate > req.body.endDate  )
  {
    validationResponse.addError("beginDate "+req.body.beginDate+" must be lower than endDate " + req.body.endDate);
  }
  //Check idCategory with undefined category
  if(! (HelperValidator.isNumeric(req.body.idCategory) ))
  {
    validationResponse.addError("Invalid idCategory: " + req.body.idCategory);
  }
  //Check idOrganiser
  if(! (HelperValidator.isNumeric(req.body.idOrganiser) ))
  {
    validationResponse.addError("Invalid idOrganiser: " + req.body.idOrganiser);
  }
  if(! validationResponse.success){
    res.json(validationResponse);
  }
  else {
    var category =null;
    //
    ActivityCategory.findOne({ idActivityCategory: req.body.idCategory
    }, function (err, activityCategory) {
      if (err) throw err;

      if (! activityCategory) {
        res.json({ success: false, message: 'Category not found.', data: [] });
      }
      else {
        category=activityCategory.id
        //
        User.findOne({ idUser: req.body.idOrganiser
        }, function (err, user) {
          if (err) throw err;
          if (! user) {
            res.json({ success: false, message: 'User not found.' , data: [] });
          }
          else {
            organiser=user.id

            console.log("category : ");
            console.log(category );
            console.log(HelperValidator.isAlphanumeric(category));
            console.log("organiser : ");
            console.log(organiser);
            console.log(HelperValidator.isAlphanumeric(organiser));
            console.log("\n");
            //
            var dataActivity = new Activity({
              label: req.body.label,
              shortDescription: req.body.shortDescription,
              fullDescription: req.body.fullDescription,
              category: category,
              beginDate : req.body.beginDate,
              endDate : req.body.endDate,
              beginTime : req.body.beginTime,
              endTime : req.body.endTime,
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
          }
        });
      }
    });
  }
});

//READ

//Get activity
//http://localhost:8081/activity/getActivity?idActivity=1
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
    select('idActivity label shortDescription fullDescription category createDate beginDate endDate beginTime endTime organiser createDate updateDate').
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
  select('idActivity label shortDescription fullDescription category createDate beginDate endDate beginTime endTime organiser createDate updateDate').
  exec(function(err, ActivityCategories) {
    res.json({ success: true, message: 'Activity List:', data: ActivityCategories });
  });
});

//UPDATE

//http://localhost:8081/activity/updateActivity
//
moduleRoutes.post('/updateActivity', function(req, res) {
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;
  //Check label
  if(! HelperValidator.isAscii( req.body.label ) && req.body.label != "" ){
    validationResponse.addError("Invalid label: " + req.body.label);
  }
  //Check time
  if(! ( HelperValidator.isNumeric( req.body.beginTime ) && req.body.beginTime >= MIN_BEGIN_TIME && req.body.beginTime <= MAX_BEGIN_TIME))
  {
    validationResponse.addError("Invalid beginTime: " + req.body.beginTime);
  }
  if(! ( HelperValidator.isNumeric( req.body.endTime ) && req.body.endTime >= MIN_END_TIME && req.body.endTime <= MAX_END_TIME))
  {
    validationResponse.addError("Invalid endTime: " + req.body.endTime);
  }
  if(HelperValidator.isNumeric(req.body.beginTime)  && HelperValidator.isNumeric( req.body.endTime) && req.body.beginTime >= req.body.endTime  )
  {
    validationResponse.addError("beginTime "+req.body.beginTime+" must be lower than endTime " + req.body.endTime);
  }
  //Check date
  if(! (HelperValidator.isDate(req.body.beginDate) && req.body.beginDate >= Date()  ))
  {
    validationResponse.addError("Invalid  beginDate " + req.body.beginDate + " must be higher than " +Date());
  }
  if(! (HelperValidator.isDate(req.body.endDate) && req.body.beginDate >= Date() ))
  {
    validationResponse.addError("Invalid endDate " + req.body.endDate + " must be higher than " +Date());
  }
  if(HelperValidator.isDate(req.body.beginDate)  && HelperValidator.isDate( req.body.endDate) && req.body.beginDate > req.body.endDate  )
  {
    validationResponse.addError("beginDate "+req.body.beginDate+" must be lower than endDate " + req.body.endDate);
  }
  if(! validationResponse.success){
    res.json(validationResponse);
  }
  else {
    Activity.findOne({ idActivity: req.body.idActivity}).
    select('idActivity, label').
    exec( function(err, activity){
      if (err) throw err;

      if (!activity) {
        res.json({ success: false, message: 'Activity not found.', data: [] });
      }
      else if (activity) {

        ActivityCategory.findOne({ idActivityCategory: req.body.idCategory
        }, function (err, activityCategory) {
          if (err) throw err;

          if (activityCategory)
          {
            console.log(activityCategory);
            console.log(activityCategory.label);
            console.log(activityCategory.idActivityCategory);
            console.log(req.body.idActivity);
            var queryWhere = { idActivity: req.body.idActivity };
            var updateFields =
            {
              label: req.body.label,
              shortDescription: req.body.shortDescription,
              fullDescription: req.body.fullDescription,
              category: activityCategory,
              beginDate : req.body.beginDate,
              endDate : req.body.endDate,
              beginTime : req.body.beginTime,
              endTime : req.body.endTime,
              organiser: req.body.organiser,
              createDate: req.body.createDate,
              updateDate: Date()
            }

            Activity.update(
              queryWhere, //query
              updateFields, //update
              function (err, raw) {
                if (err) return handleError(err);

                var msgResponse = 'Activity updated successfully';
                console.log(msgResponse);
                res.json({ success: true, message: msgResponse, data: [] });
              });
          }
          else {
            res.json({ success: false, message: 'Category (' + req.body.idCategory + ') not found ', data: [] });
          }
        });
      }
    });
  }
});

//DELETE

//http://localhost:8081/activityCategory/removeActivity
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
