const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  try {
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: 'All fields are required!' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: 'Password & Confirm Password do not match!' })
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
      })
    }
    const user = await User.findOne({ email })
    if (user) {
      errors.push({ message: 'User already exists.' })
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
      })
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      await User.create({
        name,
        email,
        password: hashedPassword,
      })
      res.redirect('/')
    }
    // return bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash('password', salt, async (err, hash) => {
    //     // Store hash in your password DB.
    //     await User.create({
    //       name,
    //       email,
    //       password: hash
    //     })
    //     res.redirect('/')
    //   })
    // })
  } catch (err) {
    console.log(err)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have successfully logged out.')
  res.redirect('/users/login')
})

module.exports = router
