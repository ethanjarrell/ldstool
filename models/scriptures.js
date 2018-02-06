const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


let Schema = mongoose.Schema;

const scriptureSchema = new Schema({
    reference: [{
    type : String,
  }],
    blurb: [{
    type : String,
  }],
    lesson: {
    type : Number,
    }


})
scriptureSchema.plugin(timestamps);
const Scripture = mongoose.model('scripture', scriptureSchema);

module.exports = Scripture;
