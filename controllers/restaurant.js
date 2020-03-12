/* Step 1 import express
 *
 */
const express = require('express');
const Restaurant = require('../models/restaurant');
const restaurantRouter = express.Router();

restaurantRouter.get('/', (req, res) => {
  Restaurant.find().then( (restaurants) => {
    res.json(restaurants);
  });
});

restaurantRouter.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id).then( (restaurant) => {
    res.json(restaurant);
  });
});

restaurantRouter.post('/', (req, res) => {
  Restaurant.create(req.body).then( () => {
    res.status(200).end();
  });
});

restaurantRouter.put('/:id', (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.id, req.body)
})

module.exports = {
  restaurantRouter
};
