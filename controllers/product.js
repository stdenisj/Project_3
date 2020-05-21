const express = require('express');
const Product = require('../models/product');
const productRouter = express.Router();

productRouter.get('/', async(req, res) => {
    try {
        let products = await Product.find();
        res.json(products);
    }
    catch (e) {
        console.log(e);
    }
});

productRouter.get('/:restId', async(req, res) => {
    try {
        let products = await Product.find({ restaurant: req.params.restId });
        res.json(products);
    }
    catch (e) {
        console.log(e);
    }
});

productRouter.post('/', async(req, res) => {
    try {
        await Product.create(req.body);
        res.status(200).end();
    }
    catch (e) {
        console.log(e);
    }
});

productRouter.put('/:productId', async(req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.productId, req.body);
        res.status(200).end();
    }
    catch (e) {
        console.log(e);
    }
});


productRouter.delete('/:productId', async(req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.productId);
        res.status(200).end();
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = {
    productRouter
};