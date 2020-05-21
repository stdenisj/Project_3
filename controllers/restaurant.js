/* Step 1 import express
 *
 */
const express = require('express');
const Restaurant = require('../models/restaurant');
const restaurantRouter = express.Router();

restaurantRouter.get('/', async(req, res) => {
  try {
    let restaurants = await Restaurant.find();
    res.json(restaurants);
  }
  catch (e) {
    console.log(e);
  }
});


restaurantRouter.get('/:id', async(req, res) => {
  try {
    let restaurant = await Restaurant.findById(req.params.id).populate( 'reviews' );
    res.json(restaurant);
  }
  catch (e) {
    console.log(e);
  }
});

restaurantRouter.get('/:field/:input', async(req, res) => {
  try {
    const searchInput = req.params.input;
    let restaurants = await Restaurant.find();
    const foundRestaurants = [];
    for(restaurant of restaurants) {
      if (restaurant.name === searchInput || restaurant.location.state === searchInput || restaurant.location.city === searchInput || restaurant.location.zipCode === searchInput) {
        foundRestaurants.push(restaurant);
      }
    }
    if(foundRestaurants.length === 0) {
      res.json(restaurants);
    } else {
    res.json(foundRestaurants);
    }
  }
  catch (e) {
    console.log(e);
  }
})


restaurantRouter.post('/', async(req, res) => {
  try {
    await Restaurant.create(req.body)
    res.status(200).end();
  }
  catch (e) {
    console.log(e);
  }
});

restaurantRouter.put('/:id', async(req, res) => {
  try {
    await Restaurant.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).end();
  }
  catch (e) {
    console.log(e);
  }
});

restaurantRouter.delete('/:id', async(req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).end();
  }
  catch (e) {
    console.log(e);
  }
});

module.exports = {
  restaurantRouter
};
