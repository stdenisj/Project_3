const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    rating: {
        type: String,
        default: '***',
        enum: ['*', '**','***', '****', '*****']
    },
    comment: String,
})

module.exports = mongoose.model('Review', Review)