const jwt = require("jsonwebtoken")
const users = require("../model/usermodel")

const protectroute = async (req,res,next)=>{
       try {
            const token = req.cookies.jwt

            if(!token){
               return res.status(400).json({error:"Unauthorized No Token Provied"})
            }

            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            if(!decoded){
                return res.status(400).json({error:"Unauthorized Invaild Token P"})
               
            }

            const user = await users.findById(decoded.userId).select("-password")

            if(!user){
                return res.status(404).json({error:"user not found"})
            }
            req.user = user

            next()
       } catch (error) {
        console.log("error is protectroute middleware",error.message);
        res.status(500).json({error:"External server error"})
       }
}

module.exports = protectroute