const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const restaurant = await Restaurant.findOne({ _id, userId }).lean()
    res.render('show', { restaurant })
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const userId = req.user._id
    const newData = req.body
    const restaurant = await Restaurant.create({ ...newData, userId })
    const id = restaurant._id
    res.redirect(`/restaurants/${id}`)
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const restaurant = await Restaurant.findOne({ _id, userId }).lean()
    res.render('edit', { restaurant })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const newData = req.body
    await Restaurant.findOneAndUpdate({ _id, userId }, { ...newData, userId })
    res.redirect(`/restaurants/${_id}`)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    await Restaurant.findOneAndDelete({ _id, userId })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router