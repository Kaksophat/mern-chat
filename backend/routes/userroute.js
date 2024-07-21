const express = require("express")
const router = express.Router()

const {getusersforsidebar} = require("../controller/usercontroller")
const protectroute = require("../middleware/protectroute")

router.get("/",protectroute,getusersforsidebar)

module.exports = router