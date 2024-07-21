const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],
    },
    profilepic:{
        type:String,
        default:"",
    },
},{timestamps:true})

module.exports = mongoose.model("users",userschema)