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
var soundSchema = new Schema({
    idSound: Number,
    labelSound: String,
    pathSound: String,
    createDate: Date
});

soundSchema.plugin(autoIncrement.plugin, { model: 'sounds', field: 'idSound' });
var soundModel = Model = mongoose.model('Sound', soundSchema);
