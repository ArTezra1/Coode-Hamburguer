import express from "express"
import routes from "./routes/index.js"
import connectDB from "./config/dbConnect.js"
import dotenv from "dotenv"
import ManipuladorDeErros from "./middlewares/ErroRouter.js"

dotenv.config()

const conexao = await connectDB()

conexao.on("error", (erro)=>{
    console.error("Erro de conexão", erro)
})

conexao.once("once", ()=>{
    console.error("Conexão feita com sucesso.")
})

const app = express()
app.use(express.json())

routes(app)

app.use(ManipuladorDeErros)

export default app