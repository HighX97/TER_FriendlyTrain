// ***** Config
var pathServer = "../../server/";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken');
var moduleRoutes = express.Router();

//Models:
var ActivityCategory   = require('../models/activityCategory');

//Helpers:
var commonHelper   = require('../helpers/common');


// ***** Methods

//NONE
//http://localhost:8081/activityCategory/
//Valide
moduleRoutes.get('/', function(req, res) {
    res.json({ success: true, message: 'NONE ActivityCategory action', data: req.decoded });
});

//CREATE

//Create default activityCategory
//http://localhost:8081/activityCategory/setup
//Valide
moduleRoutes.get('/setup', function(req, res) {
   var dataUser = new ActivityCategory({
        label: 'DefaultActivityCategory',
        //idParent: 'TER M1',
        shortDescription: 'Description DefaultActivityCategory',
        level: '0',
        createDate: Date(),
        updateDate: Date(),
    });
    dataUser.save(function(err) {
        if (err) throw err;

        var msgResponse = 'ActivityCategory saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: [] });
    });
});

//Create activityCategory
//http://localhost:8081/activityCategory/createActivityCategory
moduleRoutes.post('/createActivityCategory', function(req, res) {
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
        ActivityCategory.findOne({ idActivityCategory: req.body.idParent
        }, function (err, activityCategoryParent) {
          if (err) throw err;
          console.log("\n\n");
          console.log(activityCategoryParent);
          console.log("\n\n");

          if (! activityCategoryParent && req.body.idParent > 0) {
          res.json({ success: false, message: 'Category Parent not found.' + req.body.idParent, data: [] });
        }
        else {
                ActivityCategory.findOne({ label: req.body.label }).
                select('idActivityCategory, label').
                exec( function(err, activityCategory){
                if (err) throw err;

                if (!activityCategory){
                console.log("activityCategoryParent: ");
                console.log(activityCategoryParent);
                var idParent = null;
                var level = 1;
                if (activityCategoryParent){//Found
                    idParent = activityCategoryParent._id;
                    level = activityCategoryParent.level + 1;
                }
                var dataCategory = new ActivityCategory({
            			idParent: idParent,
            			label: req.body.label,
            			level: level,
            			createDate: Date(),
            			updateDate: Date()
            		});
            		dataCategory.save(function(err) {
            			if (err) throw err;

            			var msgResponse = 'Category saved successfully';
            			console.log(msgResponse);
            			res.json({ success: true, message: msgResponse, data: dataCategory });
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

//Get activityCategory
//http://localhost:8081/activityCategory/getActivityCategory?idActivityCategory=1
//Valide
moduleRoutes.get('/getActivityCategory', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    if(! ( HelperValidator.isNumeric( req.query.idActivityCategory ) )  ){
        validationResponse.addError("ActivityCategory not found (" + activityCategory.idActivityCategory + ")");
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        ActivityCategory.
            findOne({ idActivityCategory: req.query.idActivityCategory }).
            //where('idUser').equals(req.query.idUser).// =
            //where('idUser').gt(17).lt(66).// gt - lt
            //where('idUser').in(['idUser', req.query.idUser]).// like
            //limit(10).
            sort('-idActivityCategory').
            select('idActivityCategory label idParent shortDescription level createDate updateDate').
            exec(function(err, activityCategory) {
            if (err) throw err;

            if (!activityCategory) {
                res.json({ success: false, message: 'ActivityCategory not found.', data: [] });
            }
            else if (activityCategory) {
                    res.json({
                    success: true,
                    message: 'ActivityCategory Found',
                    data: activityCategory
                });
            }
        });
    }
});

//Get all activityCategory
//http://localhost:8081/activityCategory/getAllActivityCategory
//Valide
moduleRoutes.get('/getAllActivityCategory', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    ActivityCategory.find({}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    sort('-idCategory').
      select('idActivityCategory label idParent shortDescription level createDate updateDate lastLoginDate').
    exec(function(err, ActivityCategories) {
        res.json({ success: true, message: 'ActivityCategory List:', data: ActivityCategories });
    });
});

//UPDATE

//http://localhost:8081/user/updateActivityCategory?idUser=1
//Valide
moduleRoutes.post('/updateActivityCategory', function(req, res) {
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
        ActivityCategory.findOne({ idActivityCategory: req.body.idActivityCategory }).
            select('idActivityCategory, label').
            exec( function(err, activityCategory){
                if (err) throw err;

                if (!activityCategory) {
                    res.json({ success: false, message: 'ActivityCategory not found.', data: [] });
                }
                else if (activityCategory) {

                    ActivityCategory.findOne({ label: req.body.label }).
                    select('idActivityCategory, label').
                    exec( function(err, activityCategory){
                    if (err) throw err;

                    if (!activityCategory){


                    var queryWhere = { idActivityCategory: req.body.idActivityCategory };
                    var updateFields = {
                      //idactivityCategory: req.body.idactivityCategory,
                      label: req.body.label,
                      shortDescription: req.body.shortDescription,
                      //idParent: req.body.idParent,
                      level: req.body.level,
                      //createDate: Date(),
                      updateDate: Date()
                    }

                    ActivityCategory.update(
                        queryWhere, //query
                        updateFields, //update
                        function (err, raw) {
                            if (err) return handleError(err);

                            var msgResponse = 'ActivityCategory updated successfully';
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

//http://localhost:8081/user/removeActivityCategory?idActivityCategory=1
//Valide
moduleRoutes.delete('/removeActivityCategory', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    if(! ( HelperValidator.isNumeric( req.body.idActivityCategory) && req.body.idActivityCategory!= "" )  ){
        validationResponse.addError("Invalid idActivityCategory: " + req.body.idActivityCategory);
    }
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        var queryWhere = { idActivityCategory: req.body.idActivityCategory };
        ActivityCategory.findOne( queryWhere ).
            select('idActivityCategory, label').
            exec( function(err, activityCategory){
                if (err) throw err;

                if (!activityCategory) {
                    res.json({ success: false, message: 'ActivityCategory not found.', data: [] });
                }
                else if (activityCategory) {
                    ActivityCategory.remove({
                        idActivityCategory: req.body.idActivityCategory
                    }, function(err, activityCategory) {
                        if (err) throw err;

                        if (!activityCategory) {
                            res.json({ success: false, message: 'Error: ActivityCategory can not deleted', data: ActivityCategory });
                        }
                        else if (activityCategory) {
                            res.json({
                                success: true,
                                message: 'ActivityCategory Deleted',
                                data: activityCategory
                            });
                        }
                    });
                }
            });
    }
});


// ***** Exports
module.exports = moduleRoutes;
