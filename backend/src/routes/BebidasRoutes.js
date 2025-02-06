import express from "express"
import BebidasController from "../controllers/BebidasController.js"
import paginar from "../middlewares/Paginar.js"

const routes = express.Router()

routes.get("/bebidas", BebidasController.listarBebida, paginar)

routes.get("/bebidas/query", BebidasController.listarBebidaPorFiltro, paginar)

routes.get("/bebidas/:id", BebidasController.listarBebidaPorId)

routes.post("/bebidas", BebidasController.cadastrarBebida)

routes.put("/bebidas/:id", BebidasController.atualizarBebida)

routes.delete("/bebidas/:id", BebidasController.deletarBebida)

export default routes