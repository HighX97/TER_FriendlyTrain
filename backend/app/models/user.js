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

var UserSchema = new Schema({
    idUser: Number,
    firstName: String,
    lastName: String,
    email: String,
    rol: String,
    password: String,
    address: String,
    image: String,
    phone: String,
    friends : [ { userId: { type: Schema.Types.ObjectId, ref: 'User' }, date: { type: Date }}],
    friendsRequests : [ { userId: { type: Schema.Types.ObjectId, ref: 'User' }, date: { type: Date }}],
    notifications : [ { notificationId: { type: Schema.Types.ObjectId, ref: 'Notification' }, state: { type: Number }}], // {0:"unRead",1:"read",2:"hide"}
    createDate: Date,
    updateDate : Date,
    lastLoginDate : Date
});

UserSchema.plugin(autoIncrement.plugin, { model: 'users', field: 'idUser' });
var UserModel = Model = mongoose.model('User', UserSchema);

/*
// ***** Methods

//CREATE
UserModel.createUser = function (res, data, callback){
    var dataUser = new Model({
        firstName: req.data.firstName,
        lastName: req.data.lastName,
        email: req.data.email,
        password: req.data.password,
        rol: "client",
        dateRegistration: new Date(),
        dateUpdate: new Date(),
        dateLastLogin: new Date()
    });
    dataUser.save(function(err) {
        if (err) throw err;

        var msgResponse = 'User saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataUser });
    });
}

//READ
UserModel.getUser = function (res, data, callback){
    var response = { success: false, message: '', data: [] };

    this.findOne({
       idUser: idUser
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            response = { success: false, message: 'User not found.', data: [] };
        }
        else if (user) {
            response = {
                success: true,
                message: 'User Found',
                data: user
            };
        }
    });
    var query = this.findOne({
       idUser: idUser
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
UserModel.updateUser = function (res, idUser, callback){
}

//DELETE
UserModel.removeUser = function (res, idUser, callback){
  var response = { success: false, message: '', data: [] };

  //db.users.remove({ "name" : "Lowx"})

  this.remove({
     idUser: idUser
  }, function(err, user) {
      if (err) throw err;

      if (!user) {
          response = { success: false, message: 'User not found.', data: [] };
      }
      else if (user) {
          response = {
              success: true,
              message: 'User Deleted',
              data: user
          };
      }
  });
  var query = this.remove({
     idUser: idUser
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
