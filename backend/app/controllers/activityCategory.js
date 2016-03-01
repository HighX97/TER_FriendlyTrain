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
var ActivityCategorySchema = new Schema({
    idActivityCategory: Number,
    label: String,
    idParent: { type: Schema.Types.ObjectId, ref: 'Category' },//Join.
    shortDescription: String,
    level: Number,
	  createDate: Date,
    modificationDate: Date
});

activityCategorySchema.plugin(autoIncrement.plugin, { model: 'activities', field: 'idActivityCategory' });
var activityCategoryModel = Model = mongoose.model('activityCategory', activityCategorySchema);
