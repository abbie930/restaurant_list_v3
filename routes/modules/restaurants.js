const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id).lean()
    res.render('show', { restaurant })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body)
    const id = restaurant._id
    res.redirect(`/restaurants/${id}`)
  } catch (error) {
    console.log(error)
  }

})

router.get('/:id/edit', async (req, res) => {
  try {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id).lean()
    res.render('edit', { restaurant })
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Restaurant.findByIdAndUpdate(id, req.body)
    res.redirect(`/restaurants/${id}`)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Restaurant.findByIdAndDelete(id)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router