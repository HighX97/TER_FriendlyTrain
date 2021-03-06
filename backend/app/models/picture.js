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
var pictureSchema = new Schema({
    idPicture: Number,
    labelPicture: String,
    pathPicture: String,
    createDate: Date
});

pictureSchema.plugin(autoIncrement.plugin, { model: 'pictures', field: 'idPicture' });
var PictureModel = Model = mongoose.model('Picture', pictureSchema);
