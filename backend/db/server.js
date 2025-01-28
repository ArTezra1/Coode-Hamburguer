import express from "express"

const app = express()

app.get("/", (req, res)=>{
    res.status(200).send("Servidor inicializado")
})

const port = 3333

async function inicializeDB(params) {
    app.listen(port, ()=>{
        console.log("servidor inicializado na porta", port)
    })
}

export default inicializeDB
