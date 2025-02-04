import express from "express"
import LanchesController from "../controllers/LanchesController.js"

const routes = express.Router()

routes.get("/lanches", LanchesController.listarLanches)

routes.get("/lanches/:id", LanchesController.listarLanchesPorId)

routes.get("/lanches/query", LanchesController.listarLanchesPorFiltro)

routes.post("/lanches", LanchesController.cadastrarLanche)

routes.put("/lanches/:id", LanchesController.atualizarLanche)

routes.delete("/lanches/:id", LanchesController.deletarLanche)

export default routes