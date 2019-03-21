import { Mongoose } from 'mongoose';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdBy: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    interests: Array[String],
    members: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    posts: [{
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            text: String,
            date: {
                type: Date,
                default: Date.now()
            }
        }

    }]
})

module.exports = mongoose.model('Group', GroupSchema);