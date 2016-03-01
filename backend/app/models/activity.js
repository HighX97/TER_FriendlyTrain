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
    createDate: Date,
    updateDate : Date
});

ActivitySchema.plugin(autoIncrement.plugin, { model: 'activities', field: 'idActivity' });
var ActivityModel = Model = mongoose.model('Activity', ActivitySchema);
