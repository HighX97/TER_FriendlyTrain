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

//Create default event
//http://localhost:8081/event/setup

moduleRoutes.get('/setup', function(req, res) {
  /*
  var activityId =null;
  var organiser =null;
  */
  //
  Activity.findOne({ idActivity: 17
  }, function (err, activity) {
    if (err) throw err;

    if (! activity) {
      res.json({ success: false, message: 'Activity not found.', data: [] });
    }
    else {
      //activityId=activity.id
      //
      var dataEvent = new Event({
        activity : activity._id,
        label: "Taekwendo_Seance1",
        beginTime : 630,
        endTime : 750,
        eventDate : new Date("08-03-2016"),
        minParticipant : 5,
        maxParticipant : 15,
        numParticipant : 0,
        activityManager : activity.organiser,
        coachs : [{userId: activity.organiser , date: Date()}],
        participants : [],
        publications : [],
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

//Create event
//http://localhost:8081/event/createEvent

function cleanArray(array) {
  var i, j, len = array.length, out = [], obj = {};
  for (i = 0; i < len; i++) {
    obj[array[i]] = 0;
  }
  for (j in obj) {
    out.push(j);
  }
  return out;
}

moduleRoutes.post('/createEvent', function(req, res) {
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
  var eventDate = new Date(req.body.eventDate);
  if(eventDate < Date())
  {
    validationResponse.addError("Invalid  eventDate " + eventDate + " must be higher than " +Date());
  }
  //Check idActivity with undefined category
  if(! (HelperValidator.isNumeric(req.body.idActivity) ))
  {
    validationResponse.addError("Invalid idActivity: " + req.body.idActivity);
  }
  //Check minParticipant && maxParticipant
  if(! (HelperValidator.isNumeric(req.body.minParticipant) ))
  {
    validationResponse.addError("Invalid minParticipant: " + req.body.minParticipant + " must be a number");
  }
  if(! (HelperValidator.isNumeric(req.body.maxParticipant) ))
  {
    validationResponse.addError("Invalid maxParticipant: " + req.body.maxParticipant + " must be a number");
  }
  //List coach
  var arrRequestCoach= (typeof req.body['idCoachs[]'] == "string")? [req.body['idCoachs[]']]: req.body['idCoachs[]'];
  var uniquearrRequestCoach = cleanArray(arrRequestCoach);
  var uniquearrRequestCoach2 = commonHelper.cleanArray(arrRequestCoach);
  console.log("\n\n\n");
  console.log(arrRequestCoach);
  console.log(uniquearrRequestCoach);
  console.log(uniquearrRequestCoach2);
  console.log("\n\n\n");
  //
  if(! validationResponse.success){
    res.json(validationResponse);
  }
  else {
    Activity.findOne({ idActivity: req.body.idActivity
    }, function (err, activity) {
      if (err) throw err;

      if (! activity) {
        res.json({ success: false, message: 'Activity not found.', data: [] });
      }
      else {
        User.find({}).
        where('idUser').in( arrRequestCoach ).// like
        //limit(10).
        sort('-firstName').
        //populate('category'). WHY
        //http://mongoosejs.com/docs/populate.html
        exec(function(err, coachs) {
          if (err) throw err;

          if (!coachs) {
            res.json({ success: false, message: 'Coachs not found :(' + arrRequestCoach.join(', ') + ')', data: arrRequestProduct });

          }
          else {
            var arrUnfoundCoachs = [];
            var arrCoach = [];
            for ( keyRc in arrRequestCoach){
              var tmpCoach = null;
              for ( keyC in coachs){
                if( coachs[keyC].idUser == arrRequestCoach[keyRc] ){
                  tmpCoach = coachs[keyC];
                  break;
                }
              }
              if(! tmpCoach ){
                arrUnfoundCoachs.push(arrRequestCoach[keyRc]);
              }
              else{ //Product Found - Add to orderLines
                arrCoach.push({ userId : tmpCoach._id, date : Date() });
              }
            }
            if( arrUnfoundCoachs.length > 0 ){
              res.json({ success: false, message: 'Coachs not found :(' + arrUnfoundCoachs.join(', ') + ')', data: arrUnfoundCoachs });
            }
            else {
              //activityId=activity.id
              //
              var dataEvent = new Event({
                activity : activity._id,
                label: req.body.label,
                beginTime : req.body.beginTime,
                endTime : req.body.endTime,
                eventDate : req.body.eventDate,
                minParticipant : req.body.minParticipant,
                maxParticipant : req.body.maxParticipant,
                numParticipant : 0,
                activityManager : activity.organiser,
                coachs : arrCoach,
                participants : null,
                publications : null,
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
          }
        });
      }
    });
  }
});

//~~~~~~READ

//Get all event
//http://localhost:8081/event/getAllEvent
//
moduleRoutes.get('/getAllEvent', function(req, res) {
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;

  Event.find({}).
  //where('id').equals(req.query.id).// =
  //where('id').gt(17).lt(66).// gt - lt
  //where('id').in(['id', req.query.id]).// like
  //limit(10).
  sort('-idEvent').
  select('idEvent activity label beginTime endTime eventDate minParticipant maxParticipant numParticipant activityManager coachs participants publications state createDate updateDate').
  exec(function(err, Events) {
    res.json({ success: true, message: 'Event List:', data: Events });
  });
});

//Get all event from activities
//http://localhost:8081/event/getAllActivityEvents
//
moduleRoutes.post('/getAllActivityEvents', function(req, res) {
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;
  //Check time
  if(! ( !HelperValidator.isNull(req.body.idActivity) && HelperValidator.isNumeric( req.body.idActivity )))
  {
    validationResponse.addError("Invalid idActivity: " + req.body.idActivity);
  }
  if(! validationResponse.success){
    res.json(validationResponse);
  }
  else {
    Activity.findOne({ idActivity: req.body.idActivity
    }, function (err, activity) {
      if (err) throw err;

      if (! activity) {
        res.json({ success: false, message: 'Activity not found.', data: [] });
      }
      else {

        Event.find({activity : activity._id}).
        //where('id').equals(req.query.id).// =
        //where('id').gt(17).lt(66).// gt - lt
        //where('id').in(['id', req.query.id]).// like
        //limit(10).
        sort('-idEvent').
        select('idEvent activity label beginTime endTime eventDate minParticipant maxParticipant numParticipant activityManager coachs participants publications state createDate updateDate').
        exec(function(err, Events) {
          res.json({ success: true, message: 'Event List:', data: Events });
        });
      }
    });
  }
});

//Get event
//http://localhost:8081/event/getEvent
//
moduleRoutes.post('/getEvent', function(req, res) {
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;
  //Check time
  if(! ( !HelperValidator.isNull(req.body.idEvent) && HelperValidator.isNumeric( req.body.idEvent )))
  {
    validationResponse.addError("Invalid idEvent: " + req.body.idEvent);
  }
  if(! validationResponse.success){
    res.json(validationResponse);
  }
  else {
    Event.find({idEvent : req.body.idEvent}).
    //where('id').equals(req.query.id).// =
    //where('id').gt(17).lt(66).// gt - lt
    //where('id').in(['id', req.query.id]).// like
    //limit(10).
    select('idEvent activity label beginTime endTime eventDate minParticipant maxParticipant numParticipant activityManager coachs participants publications state createDate updateDate').
    exec(function(err, event) {
      if (err) throw err;

      if (!event) {
        res.json({ success: false, message: 'Event not found.', data: [] });
      }
      else{
        res.json({
          success: true,
          message: 'Event Found',
          data: event
        });
      }
    });
  }
});

//UPDATE

//Add participant
//http://localhost:8081/event/addParticipant
moduleRoutes.post('/addParticipant', function(req, res) {
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;
  //Check time
  if(! ( !HelperValidator.isNull(req.body.idEvent) && HelperValidator.isNumeric( req.body.idEvent )))
  {
    validationResponse.addError("Invalid idEvent: " + req.body.idEvent);
  }
  if(! ( !HelperValidator.isNull(req.body.idUser) && HelperValidator.isNumeric( req.body.idUser )))
  {
    validationResponse.addError("Invalid idUser: " + req.body.idUser);
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
        Event.findOne({ idEvent: req.body.idEvent
        }, function (err, event) {
          if (err) throw err;

          if (! event) {
            res.json({ success: false, message: 'Event not found.', data: [] });
          }
          else {
            if (event.maxParticipant <= event.participants.length)
            {
              res.json({ success: false, message: 'maxParticipant', data: [] });
            }
            else {
              var participantAlreadyPresent = false;
              for (participantEvent in event.participants)
              {
                console.log(event.participants[participantEvent].userId);
                console.log(user._id);
                if (String(event.participants[participantEvent].userId) == String(user._id))
                {
                  console.log('User already registered');
                  participantAlreadyPresent = true;
                }
                else
                {
                  console.log('\n\n\n');
                  console.log(String(event.participants[participantEvent].userId) == String(user._id))
                  console.log(event.participants[participantEvent].userId == user._id)
                  console.log(event.participants[participantEvent].userId);
                  console.log(user._id);
                  console.log('\n\n\n');
                }
              }
              if(participantAlreadyPresent)
              {
                res.json({ success: false, message: 'Partcipant : '+user.firstName+' already present in '+event.label, data: [] });
              }
              else
              {
                event.participants.push({ userId: user._id, date: Date()});
                var queryWhere = { idEvent: req.body.idEvent };
                var updateFields =
                {
                  idEvent: event.idEvent,
                  activity: event.activity,
                  label: event.label,
                  beginTime : event.beginTime,
                  endTime : event.endTime,
                  eventDate : event.eventDate, // Between Activity.beginDate Activity.endDate
                  minParticipant : event.minParticipant, //Without coachs
                  maxParticipant : event.maxParticipant, //Without coachs
                  //numParticipant : Number, //Without coachs
                  activityManager : event.activityManager,
                  coachs : event.coachs,
                  participants : event.participants, // {0:"asked ",1:"registered"}
                  publications : event.publications,
                  state : event.state, // {0:"cancelled ",1:"scheduled",2:"realised"}
                  createDate: event.createDate,
                  updateDate : Date()
                }

                Event.update(
                  queryWhere, //query
                  updateFields, //update
                  function (err, raw) {
                    if (err) return handleError(err);

                    var msgResponse = 'Partcipant added successfully';
                    console.log(msgResponse);
                    res.json({ success: true, message: msgResponse, data: [] });
                  });
                }
              }
            }
          });
        }
      });
    }
  });

  //Remove participant
  //http://localhost:8081/event/removeParticipant
  moduleRoutes.post('/removeParticipant', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    //Check time
    if(! ( !HelperValidator.isNull(req.body.idEvent) && HelperValidator.isNumeric( req.body.idEvent )))
    {
      validationResponse.addError("Invalid idEvent: " + req.body.idEvent);
    }
    if(! ( !HelperValidator.isNull(req.body.idUser) && HelperValidator.isNumeric( req.body.idUser )))
    {
      validationResponse.addError("Invalid idUser: " + req.body.idUser);
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
          Event.findOne({ idEvent: req.body.idEvent
          }, function (err, event) {
            if (err) throw err;

            if (! event) {
              res.json({ success: false, message: 'Event not found.', data: [] });
            }
            else {
              if (event.maxParticipant <= event.participants.length)
              {
                res.json({ success: false, message: 'maxParticipant', data: [] });
              }
              else {
                var participantAlreadyPresent = false;
                for (participantEvent in event.participants)
                {
                  console.log(event.participants[participantEvent].userId);
                  console.log(user._id);
                  if (String(event.participants[participantEvent].userId) == String(user._id))
                  {
                    console.log('User already registered');
                    participantAlreadyPresent = true;
                    //event.participants[participantEvent] = undefined;
                    //delete event.participants[participantEvent];
                    event.participants.splice(participantEvent);
                    break;
                  }
                  else
                  {
                    console.log('\n\n\n');
                    console.log(String(event.participants[participantEvent].userId) == String(user._id))
                    console.log(event.participants[participantEvent].userId == user._id)
                    console.log(event.participants[participantEvent].userId);
                    console.log(user._id);
                    console.log('\n\n\n');
                  }
                }
                if(!participantAlreadyPresent)
                {
                  res.json({ success: false, message: 'Partcipant : '+user.firstName+' not found in '+event.label, data: [] });
                }
                else
                {
                  var queryWhere = { idEvent: req.body.idEvent };
                  var updateFields =
                  {
                    idEvent: event.idEvent,
                    activity: event.activity,
                    label: event.label,
                    beginTime : event.beginTime,
                    endTime : event.endTime,
                    eventDate : event.eventDate, // Between Activity.beginDate Activity.endDate
                    minParticipant : event.minParticipant, //Without coachs
                    maxParticipant : event.maxParticipant, //Without coachs
                    //numParticipant : Number, //Without coachs
                    activityManager : event.activityManager,
                    coachs : event.coachs,
                    participants : event.participants, // {0:"asked ",1:"registered"}
                    publications : event.publications,
                    state : event.state, // {0:"cancelled ",1:"scheduled",2:"realised"}
                    createDate: event.createDate,
                    updateDate : Date()
                  }

                  Event.update(
                    queryWhere, //query
                    updateFields, //update
                    function (err, raw) {
                      if (err) return handleError(err);

                      var msgResponse = 'Partcipant removed successfully';
                      console.log(msgResponse);
                      res.json({ success: true, message: msgResponse, data: [] });
                    });
                  }
                }
              }
            });
          }
        });
      }
    });

    //Add coach
    //http://localhost:8081/event/addCoach
    moduleRoutes.post('/addCoach', function(req, res) {
      var validationResponse = commonHelper.getValidationResponse();
      var HelperValidator = commonHelper.validator;
      //Check time
      if(! ( !HelperValidator.isNull(req.body.idEvent) && HelperValidator.isNumeric( req.body.idEvent )))
      {
        validationResponse.addError("Invalid idEvent: " + req.body.idEvent);
      }
      if(! ( !HelperValidator.isNull(req.body.idUser) && HelperValidator.isNumeric( req.body.idUser )))
      {
        validationResponse.addError("Invalid idUser: " + req.body.idUser);
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
            Event.findOne({ idEvent: req.body.idEvent
            }, function (err, event) {
              if (err) throw err;

              if (! event) {
                res.json({ success: false, message: 'Event not found.', data: [] });
              }
              else {
                var coachAlreadyPresent = false;
                for (coachEvent in event.coachs)
                {
                  console.log(event.coachs[coachEvent].userId);
                  console.log(user._id);
                  if (String(event.coachs[coachEvent].userId) == String(user._id))
                  {
                    console.log('Coach already registered');
                    coachAlreadyPresent = true;
                  }
                }
                if(coachAlreadyPresent)
                {
                  res.json({ success: false, message: 'Coach : '+user.firstName+' is already present in '+event.label, data: [] });
                }
                else
                {
                  event.coachs.push({ userId: user._id, date: Date()});
                  var queryWhere = { idEvent: req.body.idEvent };
                  var updateFields =
                  {
                    idEvent: event.idEvent,
                    activity: event.activity,
                    label: event.label,
                    beginTime : event.beginTime,
                    endTime : event.endTime,
                    eventDate : event.eventDate, // Between Activity.beginDate Activity.endDate
                    minParticipant : event.minParticipant, //Without coachs
                    maxParticipant : event.maxParticipant, //Without coachs
                    //numParticipant : Number, //Without coachs
                    activityManager : event.activityManager,
                    coachs : event.coachs,
                    participants : event.participants, // {0:"asked ",1:"registered"}
                    publications : event.publications,
                    state : event.state, // {0:"cancelled ",1:"scheduled",2:"realised"}
                    createDate: event.createDate,
                    updateDate : Date()
                  }

                  Event.update(
                    queryWhere, //query
                    updateFields, //update
                    function (err, raw) {
                      if (err) return handleError(err);

                      var msgResponse = 'Coach added successfully';
                      console.log(msgResponse);
                      res.json({ success: true, message: msgResponse, data: [] });
                    });
                  }
                }
              });
            }
          });
        }
      });

      //Remove coach
      //http://localhost:8081/event/removeCoach
      moduleRoutes.post('/removeCoach', function(req, res) {
        var validationResponse = commonHelper.getValidationResponse();
        var HelperValidator = commonHelper.validator;
        //Check time
        if(! ( !HelperValidator.isNull(req.body.idEvent) && HelperValidator.isNumeric( req.body.idEvent )))
        {
          validationResponse.addError("Invalid idEvent: " + req.body.idEvent);
        }
        if(! ( !HelperValidator.isNull(req.body.idUser) && HelperValidator.isNumeric( req.body.idUser )))
        {
          validationResponse.addError("Invalid idUser: " + req.body.idUser);
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
              Event.findOne({ idEvent: req.body.idEvent
              }, function (err, event) {
                if (err) throw err;
                console.log('\n\n\n');
                console.log(String(user._id));
                console.log(String(event.activityManager));
                console.log("String(user._id) == String(event.activityManager) : "+String(user._id) == String(event.activityManager));
                console.log('\n\n\n');
                if (! event) {
                  res.json({ success: false, message: 'Event not found.', data: [] });
                }
                else if (String(user._id) == String(event.activityManager) )
                {
                  res.json({ success: false, message: 'activityManager can not bet removed.', data: [] });
                }
                else {
                  var coachAlreadyPresent = false;
                  for (coachEvent in event.coachs)
                  {
                    console.log(event.coachs[coachEvent].userId);
                    console.log(user._id);
                    if (String(event.coachs[coachEvent].userId) == String(user._id))
                    {
                      console.log('User already registered');
                      coachAlreadyPresent = true;
                      //event.participants[participantEvent] = undefined;
                      //delete event.participants[participantEvent];
                      event.coachs.splice(coachEvent);
                      break;
                    }
                    else
                    {
                      console.log('\n\n\n');
                      console.log(String(event.coachs[coachEvent].userId) == String(user._id))
                      console.log(event.coachs[coachEvent].userId == user._id)
                      console.log(event.coachs[coachEvent].userId);
                      console.log(user._id);
                      console.log('\n\n\n');
                    }
                  }
                  if(!coachAlreadyPresent)
                  {
                    res.json({ success: false, message: 'Coach : '+user.firstName+' not found in '+event.label, data: [] });
                  }
                  else
                  {
                    var queryWhere = { idEvent: req.body.idEvent };
                    var updateFields =
                    {
                      idEvent: event.idEvent,
                      activity: event.activity,
                      label: event.label,
                      beginTime : event.beginTime,
                      endTime : event.endTime,
                      eventDate : event.eventDate, // Between Activity.beginDate Activity.endDate
                      minParticipant : event.minParticipant, //Without coachs
                      maxParticipant : event.maxParticipant, //Without coachs
                      //numParticipant : Number, //Without coachs
                      activityManager : event.activityManager,
                      coachs : event.coachs,
                      participants : event.participants, // {0:"asked ",1:"registered"}
                      publications : event.publications,
                      state : event.state, // {0:"cancelled ",1:"scheduled",2:"realised"}
                      createDate: event.createDate,
                      updateDate : Date()
                    }

                    Event.update(
                      queryWhere, //query
                      updateFields, //update
                      function (err, raw) {
                        if (err) return handleError(err);

                        var msgResponse = 'Coach removed successfully';
                        console.log(msgResponse);
                        res.json({ success: true, message: msgResponse, data: [] });
                      });
                    }
                  }
                });
              }
            });
          }
        });

        //Add publication
        //http://localhost:8081/event/addPublication
        moduleRoutes.post('/addPublication', function(req, res) {
          var validationResponse = commonHelper.getValidationResponse();
          var HelperValidator = commonHelper.validator;
          //Check time
          if(! ( !HelperValidator.isNull(req.body.idEvent) && HelperValidator.isNumeric( req.body.idEvent )))
          {
            validationResponse.addError("Invalid idEvent: " + req.body.idEvent);
          }
          if(! ( !HelperValidator.isNull(req.body.idPublication) && HelperValidator.isNumeric( req.body.idPublication )))
          {
            validationResponse.addError("Invalid idPublication: " + req.body.idPublication);
          }
          if(! validationResponse.success){
            res.json(validationResponse);
          }
          else {
            Publication.findOne({ idPublication: req.body.idPublication
            }, function (err, publication) {
              if (err) throw err;

              if (! publication) {
                res.json({ success: false, message: 'Publication not found.', data: [] });
              }
              else {
                Event.findOne({ idEvent: req.body.idEvent
                }, function (err, event) {
                  if (err) throw err;

                  if (! event) {
                    res.json({ success: false, message: 'Event not found.', data: [] });
                  }
                  else {
                    var publicationAlreadyPresent = false;
                    for (publicationEvent in event.publications)
                    {
                      if (String(event.publications[publicationEvent].publicationId) == String(publication._id))
                      {
                        publicationAlreadyPresent = true;
                      }
                    }
                    if(publicationAlreadyPresent)
                    {
                      res.json({ success: false, message: 'Publication : '+publication.idPublication+' is already present in '+event.label, data: [] });
                    }
                    else
                    {
                      event.publications.push({ publicationId : publication._id});
                      var queryWhere = { idEvent: req.body.idEvent };
                      var updateFields =
                      {
                        idEvent: event.idEvent,
                        activity: event.activity,
                        label: event.label,
                        beginTime : event.beginTime,
                        endTime : event.endTime,
                        eventDate : event.eventDate, // Between Activity.beginDate Activity.endDate
                        minParticipant : event.minParticipant, //Without coachs
                        maxParticipant : event.maxParticipant, //Without coachs
                        //numParticipant : Number, //Without coachs
                        activityManager : event.activityManager,
                        coachs : event.coachs,
                        participants : event.participants, // {0:"asked ",1:"registered"}
                        publications : event.publications,
                        state : event.state, // {0:"cancelled ",1:"scheduled",2:"realised"}
                        createDate: event.createDate,
                        updateDate : Date()
                      }

                      Event.update(
                        queryWhere, //query
                        updateFields, //update
                        function (err, raw) {
                          if (err) return handleError(err);

                          var msgResponse = 'Publication added successfully';
                          console.log(msgResponse);
                          res.json({ success: true, message: msgResponse, data: [] });
                        });
                      }
                    }
                  });
                }
              });
            }
          });

          //Remove publication
          //http://localhost:8081/event/removePublication
          moduleRoutes.post('/removePublication', function(req, res) {
            var validationResponse = commonHelper.getValidationResponse();
            var HelperValidator = commonHelper.validator;
            //Check time
            if(! ( !HelperValidator.isNull(req.body.idEvent) && HelperValidator.isNumeric( req.body.idEvent )))
            {
              validationResponse.addError("Invalid idEvent: " + req.body.idEvent);
            }
            if(! ( !HelperValidator.isNull(req.body.idPublication) && HelperValidator.isNumeric( req.body.idPublication )))
            {
              validationResponse.addError("Invalid idPublication: " + req.body.idPublication);
            }
            if(! validationResponse.success){
              res.json(validationResponse);
            }
            else {
              Publication.findOne({ idPublication: req.body.idPublication
              }, function (err, publication) {
                if (err) throw err;

                if (! publication) {
                  res.json({ success: false, message: 'Publication not found.', data: [] });
                }
                else {
                  Event.findOne({ idEvent: req.body.idEvent
                  }, function (err, event) {
                    if (err) throw err;
                    if (! event) {
                      res.json({ success: false, message: 'Event not found.', data: [] });
                    }
                    else {

                      var publicationAlreadyPresent = false;
                      for (publicationEvent in event.publications)
                      {
                        console.log(String(event.publications[publicationEvent].publicationId));
                        console.log(String(publication._id));
                        if (String(event.publications[publicationEvent].publicationId) == String(publication._id))
                        {
                          publicationAlreadyPresent = true;
                          event.publications.splice(publicationEvent);
                          break;
                        }
                      }
                      if(!publicationAlreadyPresent)
                      {
                        res.json({ success: false, message: 'Publication : '+publication.idPublication+' not found in '+event.label, data: [] });
                      }
                      else
                      {
                        var queryWhere = { idEvent: req.body.idEvent };
                        var updateFields =
                        {
                          idEvent: event.idEvent,
                          activity: event.activity,
                          label: event.label,
                          beginTime : event.beginTime,
                          endTime : event.endTime,
                          eventDate : event.eventDate, // Between Activity.beginDate Activity.endDate
                          minParticipant : event.minParticipant, //Without coachs
                          maxParticipant : event.maxParticipant, //Without coachs
                          //numParticipant : Number, //Without coachs
                          activityManager : event.activityManager,
                          coachs : event.coachs,
                          participants : event.participants, // {0:"asked ",1:"registered"}
                          publications : event.publications,
                          state : event.state, // {0:"cancelled ",1:"scheduled",2:"realised"}
                          createDate: event.createDate,
                          updateDate : Date()
                        }

                        Event.update(
                          queryWhere, //query
                          updateFields, //update
                          function (err, raw) {
                            if (err) return handleError(err);

                            var msgResponse = 'Publication removed successfully';
                            console.log(msgResponse);
                            res.json({ success: true, message: msgResponse, data: [] });
                          });
                        }
                      }
                    });
                  }
                });
              }
            });

            //Update event
            //http://localhost:8081/event/updateEvent
            moduleRoutes.post('/updateEvent', function(req, res) {
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
              var eventDate = new Date(req.body.eventDate);
              if(eventDate < Date())
              {
                validationResponse.addError("Invalid  eventDate " + eventDate + " must be higher than " +Date());
              }
              //Check idEvent
              if(! (HelperValidator.isNumeric(req.body.idEvent) ))
              {
                validationResponse.addError("Invalid idEvent: " + req.body.idEvent);
              }
              //Check minParticipant && maxParticipant
              if(! (HelperValidator.isNumeric(req.body.minParticipant) ))
              {
                validationResponse.addError("Invalid minParticipant: " + req.body.minParticipant + " must be a number");
              }
              if(! (HelperValidator.isNumeric(req.body.maxParticipant) ))
              {
                validationResponse.addError("Invalid maxParticipant: " + req.body.maxParticipant + " must be a number");
              }
              if(! validationResponse.success){
                res.json(validationResponse);
              }
              else {
                    Event.findOne({ idEvent: req.body.idEvent
                    }, function (err, event) {
                      if (err) throw err;

                      if (! event) {
                        res.json({ success: false, message: 'Event not found.', data: [] });
                      }
                        else
                        {
                          var queryWhere = { idEvent: req.body.idEvent };
                          var updateFields =
                          {
                            idEvent: event.idEvent,
                            activity: event.activity,
                            label: req.body.label,
                            beginTime : req.body.beginTime,
                            endTime : req.body.endTime,
                            eventDate : req.body.eventDate, // Between Activity.beginDate Activity.endDate
                            minParticipant : req.body.minParticipant, //Without coachs
                            maxParticipant : req.body.maxParticipant, //Without coachs
                            //numParticipant : Number, //Without coachs
                            activityManager : event.activityManager,
                            coachs : event.coachs,
                            participants : event.participants, // {0:"asked ",1:"registered"}
                            publications : event.publications,
                            state : event.state, // {0:"cancelled ",1:"scheduled",2:"realised"}
                            createDate: event.createDate,
                            updateDate : Date()
                          }
                          Event.update(
                            queryWhere, //query
                            updateFields, //update
                            function (err, raw) {
                              if (err) return handleError(err);

                              var msgResponse = 'Event update successfully';
                              console.log(msgResponse);
                              res.json({ success: true, message: msgResponse, data: [] });
                            });
                          }
                      });
                    }
                  });

              //Change event.state
              //http://localhost:8081/event/updateEventState
              moduleRoutes.post('/updateEventState', function(req, res) {
                var validationResponse = commonHelper.getValidationResponse();
                var HelperValidator = commonHelper.validator;
                //Check idEvent
                if(! (HelperValidator.isNumeric(req.body.idEvent) ))
                {
                  validationResponse.addError("Invalid idEvent: " + req.body.idEvent);
                }
                //Check time
                if(! ( !HelperValidator.isNull(req.body.state) &&HelperValidator.isNumeric( req.body.state ) && req.body.state <= 2 && req.body.state >= 0))
                {
                  validationResponse.addError("Invalid state: " + req.body.state + " must be in {0: cancelled ,1: scheduled ,2: realised }");
                }
                if(! validationResponse.success){
                  res.json(validationResponse);
                }
                else {
                      Event.findOne({ idEvent: req.body.idEvent
                      }, function (err, event) {
                        if (err) throw err;

                        if (! event) {
                          res.json({ success: false, message: 'Event not found.', data: [] });
                        }
                          else
                          {
                            var queryWhere = { idEvent: req.body.idEvent };
                            var updateFields =
                            {
                              idEvent: event.idEvent,
                              activity: event.activity,
                              label: event.label,
                              beginTime : event.beginTime,
                              endTime : event.endTime,
                              eventDate : event.eventDate, // Between Activity.beginDate Activity.endDate
                              minParticipant : event.minParticipant, //Without coachs
                              maxParticipant : event.maxParticipant, //Without coachs
                              //numParticipant : Number, //Without coachs
                              activityManager : event.activityManager,
                              coachs : event.coachs,
                              participants : event.participants, // {0:"asked ",1:"registered"}
                              publications : event.publications,
                              state : req.body.state, // {0:"cancelled ",1:"scheduled",2:"realised"}
                              createDate: event.createDate,
                              updateDate : Date()
                            }
                            Event.update(
                              queryWhere, //query
                              updateFields, //update
                              function (err, raw) {
                                if (err) return handleError(err);

                                var msgResponse = 'EventState updatesuccessfully';
                                console.log(msgResponse);
                                res.json({ success: true, message: msgResponse, data: [] });
                              });
                            }
                          });
                        }
                      });

                      //DELETE

                      //http://localhost:8081/event/removeEvent
                      //
                      moduleRoutes.delete('/removeEvent', function(req, res) {
                        var validationResponse = commonHelper.getValidationResponse();
                        var HelperValidator = commonHelper.validator;
                        if(! ( !HelperValidator.isNull(req.body.idEvent) && HelperValidator.isNumeric( req.body.idEvent))  ){
                          validationResponse.addError("Invalid idEvent: " + req.body.idEvent);
                        }
                        if(! validationResponse.success){
                          res.json(validationResponse);
                        }
                        else {
                          var queryWhere = { idEvent: req.body.idEvent };
                          Event.findOne( queryWhere ).
                          exec( function(err, event){
                            if (err) throw err;

                            if (!event) {
                              res.json({ success: false, message: 'Event not found.', data: [] });
                            }
                            else {
                              Event.remove({
                                idEvent: req.body.idEvent
                              }, function(err, event) {
                                if (err) throw err;

                                if (!event) {
                                  res.json({ success: false, message: 'Error: Event not deleted', data: Activity });
                                }
                                else {
                                  res.json({
                                    success: true,
                                    message: 'event Deleted',
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
