const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().lean().sort({ name: 'asc'})
    res.render('index', { restaurants })
  } catch (error) {
    console.log(error)
  }
})

router.get('/search', async (req, res) => {
  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()

  if (!keywords) {
    return res.redirect('/')
  }

  try {
    const restaurantData = await Restaurant.find().lean()
    const restaurants = restaurantData.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(keyword) || 
      restaurant.name_en.toLowerCase().includes(keyword) ||
      restaurant.category.includes(keyword)
    })
    res.render('index', { restaurants , keywords })
  } catch (error) {
    console.log(error)
  }

})

module.exports = router