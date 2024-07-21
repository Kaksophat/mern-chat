const Users = require("../model/usermodel")
const bcryptjs = require("bcryptjs")
const generateToken = require("../utils/Token")
const { use } = require("../routes/authroute")
const Signup = async(req,res)=>{
    try {
        const {fullname,username,password,comfirmpassword,gender} = req.body

        if(password !== comfirmpassword){
            return res.status(400).json({error:"Password don`t match"})

        }
        const user = await Users.findOne({username})

        if(user){
            return res.status(400).json({error:"Username already exists"})
        }

        const salt = await bcryptjs.genSalt(10)
        const hash = await bcryptjs.hash(password,salt)

        const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        
        const newUser = new Users({
            fullname,
            username,
            password:hash,
            gender,
            profilepic: gender === "male" ? boyprofilepic : girlprofilepic
        })
         
        if(newUser){
            //generate jwt token
        await generateToken(newUser._id,res)
        await newUser.save()

        res.status(201).json({
            _id:newUser._id,
            username: newUser.username,
            profilepic:newUser.profilepic
        })
    }
    else{
        res.status(400).json({error:"invaild user data"})
    }

    } catch (error) {
        console.log("error is signup",error.message);
        res.status(500).json({error:"External server error"})
    }
}

const Login = async(req,res)=>{
 try {
    const {username,password} = req.body
    const user = await Users.findOne({username})
    const matchpassword = await bcryptjs.compare(password, user?.password || "")

    if(!user || !matchpassword){
        return res.status(400).json({error:"Invaild username or password"})
    }

    generateToken(user._id,res)

    res.status(200).json({
        _id:user._id,
        username: user.username,
        profilepic:user.profilepic
    })
 } catch (error) {
    console.log("error is login",error.message);
    res.status(500).json({error:"External server error"})
 }
}

const Logout = async(req,res)=>{
try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({messge:"logout seccesfully"})
} catch (error) {
    console.log("error is login",error.message);
    res.status(500).json({error:"External server error"})
}}

module.exports = {
    Signup,
    Login,
    Logout,
}