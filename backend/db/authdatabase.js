import mongoose from "mongoose";


const connectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONG0_URI )
        console.log("connect database");
    } catch (error) {
        console.log("connect error",error.message);
    }
}

export default connectToMongoDB;