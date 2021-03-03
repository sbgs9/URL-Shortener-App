var mongoose = require('mongoose');
var shortid = require('shortid');

const shortURLSchema = new mongoose.Schema({
    long: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortid.generate
    }
})

module.exports = mongoose.model('ShortURL', shortURLSchema);