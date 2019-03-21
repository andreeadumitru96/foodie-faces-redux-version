let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    ratedLocations: [{
        locationId: {
            type: Schema.Types.ObjectId,
             ref: 'Location'
        },
        ratingId: {
            type: Schema.Types.ObjectId,
             ref: 'Rating'
        }
    }],
    reviewedLocations: [{
        locationId: {
            type: Schema.Types.ObjectId,
             ref: 'Location'
        },
        reviewId: {
            type: Schema.Types.ObjectId,
             ref: 'Review'
        }
    }],
    level: {
        name: String,
        experience: String,
    },
    userFollowers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    usersFollowing: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    wishList:[{
        type: Schema.Types.ObjectId,
        ref:"Location"
    }],
    groups: [{
        type: Schema.Types.ObjectId, 
        ref:"Group"
    }]
});

module.exports = mongoose.model('User', UserSchema);