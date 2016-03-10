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
    activity: { type: Schema.Types.ObjectId, ref: 'Activity' },
    label: String,
    beginTime : Number,
    endTime : Number,
    eventDate : Date, // Between Activity.beginDate Activity.endDate
    minParticipant : Number, //Without coachs
    maxParticipant : Number, //Without coachs
    //numParticipant : Number, //Without coachs
    activityManager : { type: Schema.Types.ObjectId, ref: 'User' },
    coachs : [ { userId: { type: Schema.Types.ObjectId, ref: 'User' }, date: { type: Date }}],
    participants : [ { userId: { type: Schema.Types.ObjectId, ref: 'User' }, date: { type: Date }}], // {0:"asked ",1:"registered"}
    publications : [ { publicationId: { type: Schema.Types.ObjectId, ref: 'Publication' }}],
    state : Number, // {0:"cancelled ",1:"scheduled",2:"realised"}
    createDate: Date,
    updateDate : Date
});

EventSchema.plugin(autoIncrement.plugin, { model: 'events', field: 'idEvent' });
var EventModel = Model = mongoose.model('Event', EventSchema);

// ***** Exports
module.exports = EventModel;
