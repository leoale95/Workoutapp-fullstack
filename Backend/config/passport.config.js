const passport = require("passport");
const userService = require("../models/user.model");
const GitHubStrategy = require("passport-github2")

const initializePassport = () => {
    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.55efb827dddc36bc",
        clientSecret: "78a9115df8b6e870c38ad4b7aa73831ad97d3933",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"

    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userService.findOne({ email: profile._json.email })

            console.log(user)
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 18,
                    email: profile._json.email,
                    password: ""
                }
                let result = await userService.create(newUser)
                done(null, result)
            }
            else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }
    ))}

    module.exports = initializePassport;