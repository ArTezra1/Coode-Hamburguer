import express from "express"
import routes from "./routes/index.js"
import connectDB from "./config/dbConnect.js"
import dotenv from "dotenv"
import ManipuladorDeErros from "./middlewares/ErroRouter.js"
import cors from "cors"

dotenv.config()

const conexao = await connectDB()

conexao.on("error", (erro)=>{
    console.error("Erro de conexão", erro)
})

conexao.once("once", ()=>{
    console.log("Conexão feita com sucesso.")
})

const app = express()
app.use(express.json())

app.use(cors({
    origin: "http://localhost:3000", 
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization"
}))
routes(app)

app.use(ManipuladorDeErros)

export default app