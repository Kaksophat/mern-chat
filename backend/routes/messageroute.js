const express = require("express")
const router = express.Router()
const protectroute = require("../middleware/protectroute")

const {sendmessage,getmessage} = require("../controller/messagecontroller")

router.post("/send/:id",protectroute,sendmessage)
router.get("/:id",protectroute,getmessage)

module.exports = router