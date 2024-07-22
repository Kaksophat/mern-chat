const express = require("express")
const router = express.Router()

const {
    Signup,
    Login,
    Logout
} = require("../controller/authcontroller")

router.post('/signup',Signup)
router.post('/login',Login)
router.post('/logout',Logout)

module.exports = router