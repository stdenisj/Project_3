const express = require('express');
const Product = require('../models/product');
const productRouter = express.Router();

productRouter.get('/', (req, res) => {
    Product.find().then( (products) => {
        res.json(products);
    });
});

productRouter.get('/:restId', (req, res) => {
    Product.find({ restaurant: req.params.restId }).then( (products) => {
        res.json(products);
    });
});

productRouter.post('/', (req, res) => {
    Product.create(req.body).then( () => {
        res.status(200).end();
    });
});

productRouter.put('/:productId', (req, res) => {
    Product.findByIdAndUpdate(req.params.productId, req.body).then( () => {
        res.status(200).end();
    });
});


productRouter.delete('/:productId', (req, res) => {
    Product.findByIdAndRemove(req.params.productId).then( () => {
        res.status(200).end();
    });
});

module.exports = {
    productRouter
};