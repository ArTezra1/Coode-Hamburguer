import app from "./src/app.js"
import "dotenv/config"

const port = 3000

app.listen(port, ()=>{
    console.log(`Servidor iniciado na porta: ${port}`)
})