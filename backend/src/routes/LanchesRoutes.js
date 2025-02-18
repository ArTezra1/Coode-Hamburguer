import express from "express"
import LanchesController from "../controllers/LanchesController.js"
import paginar from "../middlewares/Paginar.js"

const routes = express.Router()

routes.get("/lanches", (req, res, next) => LanchesController.listar(req, res, next), paginar)

routes.get("/lanches/query", (req, res, next) => LanchesController.listarPorFiltro(req, res, next), paginar)

routes.get("/lanches/:id", (req, res, next) => LanchesController.buscarPorId(req, res, next))

routes.post("/lanches", (req, res, next) => LanchesController.criar(req, res, next))

routes.put("/lanches/:id", (req, res, next) => LanchesController.atualizar(req, res, next))

routes.delete("/lanches/:id", (req, res, next) => LanchesController.deletar(req, res, next))

export default routes