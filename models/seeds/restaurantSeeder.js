const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('./restaurant.json').results
const db = require('../../config/mongoose')

// const SEED_USER = [
// {
//   name: 'user1',
//   email: 'user1@example.com',
//   password: '12345678'
// },
// { name: 'user2',
//   email: 'user2@example.com',
//   password: '12345678'
// }
// ]

const SEED_USER =
{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  restaurantIndex: [0, 1, 2],
}


db.once('open', async () => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(SEED_USER.password, salt)
    const user = await User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hashedPassword,
    })
    const userId = user._id
    await Promise.all(
      Array.from({ length: 3 }, (_, i) =>
        Restaurant.create({ ...restaurantList[SEED_USER.restaurantIndex[i]], userId })
      )
    )
    console.log('done')
    process.exit()
  } 
  catch (err) {
    console.log(err)
  }
})

 //   for(let i = 0; i < restaurantList.length; i++) {
  //   console.log(`add id: ${restaurantList[i]['id']} to mongodb`)
  //   Restaurant.create({ ...restaurantList[i], userId })
  // } 

