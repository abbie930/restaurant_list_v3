const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const restaurants = await Restaurant.find({ userId }).lean().sort({ name: 'asc' })
    res.render('index', { restaurants })
  } catch (error) {
    console.log(error)
  }
})

router.get('/search', async (req, res) => {
  let { keyword, sort } = req.query
  keyword = keyword.trim().toLowerCase()

  try {
    const userId = req.user._id
    const restaurantData = await Restaurant.find({ userId })
      .lean()
      .sort(sort === 'asc' || sort === 'desc' ? { name: sort } : sort)
    const restaurants = restaurantData.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.name_en.toLowerCase().includes(keyword) ||
        restaurant.category.includes(keyword)
      )
    })

    if (!restaurants.length) {
      res.render('error', { restaurants, keyword, sort })
    } else {
      res.render('index', { restaurants, keyword, sort })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router