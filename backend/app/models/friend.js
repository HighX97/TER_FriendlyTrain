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

var FriendSchema = new Schema({
    idFriend : Number,
    userA: { type: Schema.Types.ObjectId, ref: 'User' },
    userB: { type: Schema.Types.ObjectId, ref: 'User' }, //UserA != UserB
    state: Number, //0 Demande de UserA vers UserB, 1 UserA firend with UserB
    createDate: Date,
    updateDate : Date
});

FriendSchema.plugin(autoIncrement.plugin, { model: 'friends', field: 'idFriend' });
var FriendModel = Model = mongoose.model('Friend', FriendSchema);


// ***** Exports
module.exports = FriendModel;
