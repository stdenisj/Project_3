const express = require('express');
const Review = require('../models/review');
const reviewRouter = express.Router();

reviewRouter.get('/', (req, res) => {
    Review.find().then( (reviews) => {
        res.json(reviews);
    }).catch( (e) => {
        console.log(e)
    });
});

reviewRouter.get('/:reviewId', (req, res) => {
    Review.findById(req.params.id).then( (review) => {
        res.json(review);
    }).catch( (e) => {
        console.log(e)
    });
});

reviewRouter.post('/', (req, res) => {
    Review.create(req.body).then( () => {
        res.status(200).end();
    }).catch( (e) => {
        console.log(e)
    });
});

reviewRouter.put('/:reviewId', (req, res) => {
    Review.findByIdAndUpdate(req.params.reviewId, req.body).then( () => {
        res.status(200).end();
    }).catch( (e) => {
        console.log(e)
    });
});

reviewRouter.delete('/:reviewId', (req, res) => {
    Review.findByIdAndRemove(req.params.reviewId).then( () => {
        res.status(200).end();
    }).catch( (e) => {
        console.log(e)
    });
});

module.exports = {
    reviewRouter
};