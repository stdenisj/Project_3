const mongoose = require('./connection.js');
const Schema = mongoose.Schema;

const Review = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reviewerUserName: String,
    reviewerPic: String,
    date: {
        type: Date,
        default: new Date,
    },
    rating: String,
    comment: String,
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
    }
});

module.exports = mongoose.model('Review', Review);