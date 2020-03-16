/* Step 1 import express
 *
 */
const express = require('express');
const Restaurant = require('../models/restaurant');
const restaurantRouter = express.Router();

restaurantRouter.get('/', (req, res) => {
  Restaurant.find().then( (restaurants) => {
    res.json(restaurants);
  }).catch( (e) => {
    console.log(e)
  });
});


restaurantRouter.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id).populate( 'reviews' ).then( (restaurant) => {
    res.json(restaurant);
  }).catch( (e) => {
    console.log(e)
  });
});

restaurantRouter.get('/:field/:input', (req, res) => {
  const searchInput = req.params.input;
  Restaurant.find().then( (restaurants) => {
    const restaurantsData = restaurants
    const foundRestaurants = []
    for(restaurant of restaurants) {
    if (restaurant.name === searchInput) {
      foundRestaurants.push(restaurant);
    } else if(restaurant.location.state === searchInput) {
      foundRestaurants.push(restaurant);
     } else if (restaurant.location.city === searchInput) {
      foundRestaurants.push(restaurant);
     } else if (restaurant.location.zipCode === searchInput) {
      foundRestaurants.push(restaurant);
     } else { null }
    }
    if(foundRestaurants.length === 0) {
      res.json(restaurantsData)
    } else {
    res.json(foundRestaurants);
    }
  }).catch( (e) => {
    console.log(e)
  });
})


restaurantRouter.post('/', (req, res) => {
  Restaurant.create(req.body).then( () => {
    res.status(200).end();
  }).catch( (e) => {
    console.log(e)
  });
});

restaurantRouter.put('/:id', (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.id, req.body).then( () => {
    res.status(200).end();
  }).catch( (e) => {
    console.log(e)
  });
});

restaurantRouter.delete('/:id', (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id).then( () => {
    res.status(200).end();
  }).catch( (e) => {
    console.log(e)
  });
});

module.exports = {
  restaurantRouter
};
