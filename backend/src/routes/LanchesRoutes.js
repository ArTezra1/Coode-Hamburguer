import express from "express"
import LanchesController from "../controllers/LanchesController.js"
import paginar from "../middlewares/Paginar.js"

const routes = express.Router()

// routes.get("/lanches", LanchesController.listarLanches, paginar)

routes.get("/lanches/query", (req, res, next) => LanchesController.listarPorFiltro(req, res, next))

// routes.get("/lanches/:id", LanchesController.listarLanchesPorId)

// routes.post("/lanches", LanchesController.cadastrarLanche)

// routes.put("/lanches/:id", LanchesController.atualizarLanche)

// routes.delete("/lanches/:id", LanchesController.deletarLanche)

export default routes