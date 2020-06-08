const express = require('express');
const Review = require('../models/review');
const User = require('../models/user');
const reviewRouter = express.Router();

reviewRouter.get('/', async(req, res) => {
    try {
        let foundReviews = await Review.find();
        let reviews = [ ...foundReviews ];
        for (review in reviews){
            review.user = '';
        }
        res.json(reviews);
    }
    catch(e) {
        console.log(e)
    }
});

reviewRouter.get('/:restId', async(req, res) => {
    try {
        let foundReviews = await Review.find( {restaurant: req.params.restId} );
        let reviews = [ ...foundReviews ];
        for (review of reviews){
            review.user = null;
        }
        res.json(reviews);
    }
    catch (e) {
        console.log(e)
    }
});

reviewRouter.post('/', async(req, res) => {
    try {
        await Review.create(req.body);
        res.status(200).end();
    }
    catch (e) {
        console.log(e)
    }
});

reviewRouter.delete('/:reviewId/:userId', async(req, res) => {
    try {
        let review = await Review.findById(req.params.reviewId);
        let user = await User.findById( req.params.userId);
        if (review.user == req.params.userId || user.adminStatus === true){
            await Review.findByIdAndDelete(req.params.reviewId);
            res.status(200).end();
        } else {
            res.status(400).end();
        }s
    }
    catch (e) {
        console.log(e)
    }
});

reviewRouter.put('/:reviewId', async(req, res) => {
    try {
        await Review.findByIdAndUpdate(req.params.reviewId, req.body);
        res.status(200).end();
    }
    catch (e) {
        console.log(e)
    }
});

module.exports = {
    reviewRouter
}