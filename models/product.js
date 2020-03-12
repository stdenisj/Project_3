const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: String,
    description: String,
    price: Number,
    img: String,
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
    }
});

module.exports = mongoose.model('Product', Product);