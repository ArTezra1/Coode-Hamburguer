import mongoose from "mongoose";

async function connectDB() {
    try {
        mongoose.connect(process.env.DATABASE_URL)
        console.log("Conectado ao banco de dados.")
    } catch (error) {
        throw error
    }

    return mongoose.connection
}

export default connectDB