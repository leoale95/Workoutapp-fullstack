const express = require ('express')
const passport = require("passport");
// Controller functions
const {SignupUser, loginUser} = require ('../controllers/user.controller')

const router = express.Router()

// Login route
router.post('/login', loginUser)

// Sign up router
router.post('/signup', SignupUser)


// Github
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user
    res.redirect("/api/sessions/profile")

})


module.exports = router

