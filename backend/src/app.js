import { createRequire } from "module"
import express from "express"
import routes from "./routes/index.js"
import connectDB from "./config/dbConnect.js"
import dotenv from "dotenv"
import ErrorRouter from "./middlewares/ErroRouter.js"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import startCron from "./auto/autoCron.js"

const require = createRequire(import.meta.url)
const swaggerFile = require("../docs/swagger_output.json")

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

startCron()

app.use(cors({
    origin: "http://localhost:3000", 
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization"
}))
routes(app)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(ErrorRouter)

export default app