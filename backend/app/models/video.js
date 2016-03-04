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
var videoSchema = new Schema({
    idVideo: Number,
    labelVideo: String,
    pathVideo: String,
    createDate: Date
});

videoSchema.plugin(autoIncrement.plugin, { model: 'videos', field: 'idVideo' });
var videoModel = Model = mongoose.model('Video', videoSchema);
