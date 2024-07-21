const mongoose = require("mongoose")

const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONG0_URI )
        console.log("connect database");
    } catch (error) {
        console.log("connect error",error.message);
    }
}

module.exports = connectdb