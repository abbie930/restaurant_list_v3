const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const restaurant = await Restaurant.findById(id).lean()
    res.render('show', { restaurant })
  } catch (error) {
  }
})

router.post('/', async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }

})

router.get('/:id/edit', async (req, res) => {
  try {
    const id = req.params.id
    const restaurant = await Restaurant.findById(id).lean()
    res.render('edit', { restaurant })
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const restaurant = await Restaurant.findById(id)
    for (let key in req.body) {
      restaurant[key] = req.body[key]
    }
    await restaurant.save()
    res.redirect(`/restaurants/${id}`)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const restaurant = await Restaurant.findById(id)
    await restaurant.remove()
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router