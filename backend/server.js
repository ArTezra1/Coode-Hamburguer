import app from "./src/app.js"
import "dotenv/config"

const port = 5000

app.listen(port, ()=>{
    console.log(`Servidor iniciado na porta: ${port}`)
})