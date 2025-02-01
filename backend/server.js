import app from "./src/app.js"
import "dotenv/config"

const port = 3333

app.listen(port, ()=>{
    console.log("Servidor iniciado.")
})