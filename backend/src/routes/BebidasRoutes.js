import express from "express"
import BebidasController from "../controllers/BebidasController.js"
import paginar from "../middlewares/Paginar.js"

const routes = express.Router()

routes.get("/bebidas", (req, res, next) => BebidasController.listar(req, res, next), paginar)

routes.get("/bebidas/query", (req, res, next) => BebidasController.listarPorFiltro(req, res, next), paginar)

routes.get("/bebidas/:id", (req, res, next) => BebidasController.buscarPorId(req, res, next))

routes.post("/bebidas", (req, res, next) => BebidasController.criar(req, res, next))

routes.put("/bebidas/:id", (req, res, next) => BebidasController.atualizar(req, res, next))

routes.delete("/bebidas/:id", (req, res, next) => BebidasController.deletar(req, res, next))

export default routes