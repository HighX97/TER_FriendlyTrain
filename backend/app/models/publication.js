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
var publicationSchema = new Schema({
    idPublication: Number,
    msgPublication: String,
    picturePublication: String,
    soundPublication: String,
    videoPublication: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createDate: Date,
    updateDate : Date
});

publicationSchema.plugin(autoIncrement.plugin, { model: 'publications', field: 'idPublication' });
var publicationModel = Model = mongoose.model('Publication', publicationSchema);
