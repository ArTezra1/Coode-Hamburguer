import express from "express"
import BebidasController from "../controllers/BebidasController.js"

const routes = express.Router()

routes.get("/bebidas", BebidasController.listarBebida)

routes.get("/bebidas/:id", BebidasController.listarBebidaPorId)

routes.get("/bebidas/query", BebidasController.listarBebida)

routes.post("/bebidas", BebidasController.cadastrarBebida)

routes.put("/bebidas/:id", BebidasController.atualizarBebida)

routes.delete("/bebidas/:id", BebidasController.deletarBebida)

export default routes