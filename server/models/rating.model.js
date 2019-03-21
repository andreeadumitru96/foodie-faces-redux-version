let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let RatingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Rating', RatingSchema);