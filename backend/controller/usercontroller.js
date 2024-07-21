const users = require("../model/usermodel")

const getusersforsidebar = async(req,res)=>{
          try {
            const loggedinuser = req.user._id
            const fillterinuser = await users.find({_id: {$eq:loggedinuser}}).select("-password")
            res.status(200).json(fillterinuser)
          } catch (error) {
            console.log("error in getuserforsidebarcontroller:", error.message);
            res.status(500).json({ error: "External server error" });
          }
}

module.exports = {getusersforsidebar}