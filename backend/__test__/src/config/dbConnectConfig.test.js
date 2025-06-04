import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
configDotenv()

export async function connectDB() {
    mongoose.connect(process.env.DATABASE_URL)
    console.log('🟢 Banco de dados de testes conectado')
}

export async function disconnectDB() {
    await mongoose.connection.close()
    console.log('🔴 Banco de dados de testes desconectado')
}

export async function clearDB() {
    const collections = mongoose.connection.collections
    for (const key in collections) {
        await collections[key].deleteMany({})
    }
}
