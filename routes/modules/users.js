const express = require("express")
const router = express.Router()
const User = require("../../models/user")

router.get("/login", (req, res) => {
  res.render("login")
})

router.post("/login", (req, res) => {})

router.get("/register", (req, res) => {
  res.render("register")
})

router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      console.log("User already exists.")
      res.render("register", {
        name,
        email,
        password,
        confirmPassword,
      })
    } else {
      await User.create({
        name,
        email,
        password,
      })
      res.redirect("/")
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router