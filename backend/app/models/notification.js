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
var notificationSchema = new Schema({
    idNotification: Number,
    valueNotification: String,
    createDate: Date,
    updateDate : Date
});

notificationSchema.plugin(autoIncrement.plugin, { model: 'notifications', field: 'idNotification' });
var notificationModel = Model = mongoose.model('Notification', notificationSchema);
