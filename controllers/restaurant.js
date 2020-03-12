/* Step 1 import express
 *
 */
const express = require('express')
const Restaurant = require('../models/restaurant')
const restaurantRouter = express.Router()

module.exports = {
  restaurantRouter
}
