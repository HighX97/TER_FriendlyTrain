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
var evaluationSchema = new Schema({
    idEvaluation: Number,
    valueEvaluation: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    publication: { type: Schema.Types.ObjectId, ref: 'Publication'},
    createDate: Date,
    updateDate : Date
});

evaluationSchema.plugin(autoIncrement.plugin, { model: 'evaluations', field: 'idEvaluation' });
var evaluationModel = Model = mongoose.model('Evaluation', evaluationSchema);
