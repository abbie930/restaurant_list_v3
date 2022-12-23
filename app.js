// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))
//setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

//routes setting
app.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().lean().sort({ name: 'asc'})
    res.render('index', { restaurants })
  } catch (error) {
    console.log(error)
  }
})

//新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//瀏覽餐廳特定頁面
app.get('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id
    const restaurant = await Restaurant.findById(id).lean()
    res.render('show', { restaurant })
  } catch (error) {
  }
})

//新增餐廳
app.post('/restaurants', async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }

})

//編輯餐廳頁面
app.get('/restaurants/:id/edit', async (req, res) => {
  try {
    const id = req.params.id
    const restaurant = await Restaurant.findById(id).lean()
    res.render('edit', { restaurant })
  } catch (error) {
    console.log(error)
  }
})

//編輯餐廳資料
app.put('/restaurants/:id', async (req, res) => {
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

//刪除餐廳
app.delete('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id
    const restaurant = await Restaurant.findById(id)
    await restaurant.remove()
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})


//搜尋餐廳
app.get('/search', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})