let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Review', ReviewSchema);