const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json').results
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  for(let i = 0; i < restaurantList.length; i++) {
    console.log(`add id: ${restaurantList[i]['id']} to mongodb`)
    Restaurant.create(restaurantList[i])
  } 
})


