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
    //friends : [ { userId: { type: Schema.Types.ObjectId, ref: 'User' }, date: { type: Date }}],
    //friendsRequests : [ { userId: { type: Schema.Types.ObjectId, ref: 'User' }, date: { type: Date }}],
    notifications : [ { notificationId: { type: Schema.Types.ObjectId, ref: 'Notification' }, state: { type: Number }}], // {0:"unRead",1:"read",2:"hide"}
    createDate: Date,
    updateDate : Date,
    lastLoginDate : Date
});

UserSchema.plugin(autoIncrement.plugin, { model: 'users', field: 'idUser' });
var UserModel = Model = mongoose.model('User', UserSchema);


// ***** Exports
module.exports = UserModel;
