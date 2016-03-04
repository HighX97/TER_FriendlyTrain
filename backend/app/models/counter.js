var pathServer = "../../server/";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commonHelper   = require('../helpers/common');


module.exports = mongoose.model('Counter', new Schema({
    _id: String,
    seq: Number
}));
