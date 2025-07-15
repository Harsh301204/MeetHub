import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        console.log(typeof process.env.MONGO_URI)
        console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    } catch (error) {
        console.log("Connection to MongoDB Failed :",error);
        process.exit(1)
    }
}

