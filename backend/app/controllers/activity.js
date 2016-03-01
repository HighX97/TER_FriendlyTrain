// ***** Config
var pathServer = '../../server/';
var mongoose = require('mongoose');
var config = require(pathServer + 'config');
var Schema = mongoose.Schema;
var commonHelper   = require('../helpers/common');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);

// set up a mongoose model and pass it using module.exports
var ActivitySchema = new Schema({
    idActivity: Number,
    label: String,
    shortDescription: String,
    fullDescription: String,
    category: { type: Schema.Types.ObjectId, ref: 'Activity_Category' },
    beginDate : Date,
    endDate : Date,
    beginTime : Number, // 10h30 --> 630
    endTime : Number, // 12h30 --> 750
    //events : [ { eventId: { type: Schema.Types.ObjectId, ref: 'Event' }, date: { type: Date }],
    organiser: { type: Schema.Types.ObjectId, ref: 'User' },
    createDate : Date
});

ActivitySchema.plugin(autoIncrement.plugin, { model: 'activities', field: 'idActivity' });
var ActivityModel = Model = mongoose.model('Activity', ActivitySchema);

// ***** Methods

/*
//CREATE
UserModel.createActivity = function (res, data, callback){
    var dataActivity = new Model({
        label: req.data.label,
        shortDescription: req.data.shortDescription,
        fullDescription: req.data.fullDescription,
        category: req.data.category,
        beginDate: req.data.beginDate,
        endDate: req.data.endDate,
        events: req.data.events,
        organiser: req.data.organiser,
        createDate: new Date()
    });
    dataActivity.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Activity saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataActivity });
    });
}

//READ
UserModel.getActivity = function (res, idActivity, callback){
    var response = { success: false, message: '', data: [] };

    this.findOne({
       idActivity: idActivity
    }, function(err, activity) {
        if (err) throw err;

        if (!activity) {
            response = { success: false, message: 'Activity not found.', data: [] };
        }
        else if (activity) {
            response = {
                success: true,
                message: 'Activity Found',
                data: activity
            };
        }
    });
    var query = this.findOne({
       idActivity: idActivity
    });
    query.then(function (doc) {
      // use doc
    });
    promise = query.exec();
    promise.then(function (doc) {
      // use doc
        console.log(doc);
        return response;
    });
}

//UPDATE
//db.users.update({"idUser" : 6},{"password" : "981234567"},{ upsert: true })
UserModel.updateActivity = function (res, data, callback){
}

//DELETE
UserModel.removeActivity = function (res, idActivity, callback){
  var response = { success: false, message: '', data: [] };

  //db.users.remove({ "name" : "Lowx"})

  this.remove({
     idActivity: idActivity
  }, function(err, activity) {
      if (err) throw err;

      if (!activity) {
          response = { success: false, message: 'Activity not found.'};
      }
      else if (activity) {
          response = {
              success: true,
              message: 'Activity Deleted'
          };
      }
  });
  var query = this.remove({
     idActivity: idActivity
  });
  query.then(function (doc) {
    // use doc
  });
  promise = query.exec();
  promise.then(function (doc) {
    // use doc
      console.log(doc);
      return response;
  });
}
*/

// ***** Exports
module.exports = UserModel;
