import mongoose from "mongoose";

async function connectDB() {
    mongoose.connect(process.env.DATABASE_URL)

    return mongoose.connection
}

export default connectDB