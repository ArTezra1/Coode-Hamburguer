import express from "express"
import BebidasController from "../controllers/BebidasController.js"
import paginar from "../middlewares/Paginar.js"
import CheckToken from "../middlewares/CheckToken.js"
import CheckAdmin from "../middlewares/CheckAdmin.js"

const routes = express.Router()

routes.get("/bebidas", (req, res, next) => BebidasController.listar(req, res, next), paginar)

routes.get("/bebidas/query", (req, res, next) => BebidasController.listarPorFiltro(req, res, next), paginar)

routes.get("/bebidas/:id", CheckToken, CheckAdmin, (req, res, next) => BebidasController.buscarPorId(req, res, next))

routes.post("/bebidas", CheckToken, CheckAdmin, (req, res, next) => BebidasController.criar(req, res, next))

routes.put("/bebidas/:id", CheckToken, CheckAdmin, (req, res, next) => BebidasController.atualizar(req, res, next))

routes.delete("/bebidas/:id", CheckToken, CheckAdmin, (req, res, next) => BebidasController.deletar(req, res, next))

export default routes