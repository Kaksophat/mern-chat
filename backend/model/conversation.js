const mongoose = require("mongoose")

const conversationSchema = mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }],
    message:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"messages",
        default:[],
    }],
},{timestamps:true})

module.exports = mongoose.model("conversations",conversationSchema)