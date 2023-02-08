const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('./restaurant.json').results
const db = require('../../config/mongoose')

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [0, 1, 2],
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantIndex: [3, 4, 5],
  },
]

db.once('open', async () => {
  try {
    for (const seedUser of SEED_USERS) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(seedUser.password, salt)
      const user = await User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hashedPassword,
      })
      const userId = user._id
      await Promise.all(
        Array.from({ length: 3 }, (_, i) =>
          Restaurant.create({ ...restaurantList[seedUser.restaurantIndex[i]], userId })
        )
      )
    }
    console.log('done')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})
