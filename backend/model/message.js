const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
}, {timestamps:true})

module.exports = mongoose.model("messages",messageSchema)