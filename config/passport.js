const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, {
            message: 'That email is not registered!',
          })
        }
        if (user.password !== password) {
          return done(null, false, {
            message: 'Email or Password incorrect.',
          })
        }
        return done(null, user)
      } catch (err) {
        done(err, false)
      }
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      return done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
}
