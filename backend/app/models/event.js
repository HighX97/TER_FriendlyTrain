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
var EventSchema = new Schema({
    idEvent: Number,
    label: String,
    beginTime : Time,
    endTime : Time,
    minParticipant : Number,
    maxParticipant : Number,
    numParticipant : Number,
    coachs : [ { userId: { type: Schema.Types.ObjectId, ref: 'User' }, date: { type: Date }]
    participants : [ { userId: { type: Schema.Types.ObjectId, ref: 'User' }, date: { type: Date }]
    publications : [ { publicationId: { type: Schema.Types.ObjectId, ref: 'Publication' }]
    state : Number, //// {0:"cancelled ",1:"scheduled",2:"realised"}
    createDate: Date,
    updateDate : Date
});

EventSchema.plugin(autoIncrement.plugin, { model: 'events', field: 'idEvent' });
var EventModel = Model = mongoose.model('Event', EventSchema);
