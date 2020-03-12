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
    res.json(restaurant)
  })
})


module.exports = {
  restaurantRouter
};
