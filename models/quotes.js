const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


let Schema = mongoose.Schema;

const quoteSchema = new Schema({
    date: {
    type : String,
    },
    author: {
    type : String,
    },
    lesson: {
    type : Number,
    },
    talk_reference: {
    type : String,
    },
    text: {
    type : String,
    },
    tags: [{
    type : String,
    }]

})
quoteSchema.plugin(timestamps);
const Quote = mongoose.model('quote', quoteSchema);

module.exports = Quote;
