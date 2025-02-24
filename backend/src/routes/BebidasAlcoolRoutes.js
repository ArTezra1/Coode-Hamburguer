import express from "express"
import BebidasAlcoolController from "../controllers/BebidasAlcoolController.js"
import paginar from "../middlewares/Paginar.js"
import CheckToken from "../middlewares/CheckToken.js"
import CheckAdmin from "../middlewares/CheckAdmin.js"

const routes = express.Router()

routes.get("/alcool", (req, res, next) => BebidasAlcoolController.listar(req, res, next), paginar)

routes.get("/alcool/query", (req, res, next) => BebidasAlcoolController.listarPorFiltro(req, res, next), paginar)

routes.get("/alcool/:id", CheckToken, CheckAdmin, (req, res, next) => BebidasAlcoolController.buscarPorId(req, res, next))

routes.post("/alcool", CheckToken, CheckAdmin, (req, res, next) => BebidasAlcoolController.criar(req, res, next))

routes.put("/alcool/:id", CheckToken, CheckAdmin, (req, res, next) => BebidasAlcoolController.atualizar(req, res, next))

routes.delete("/alcool/:id", CheckToken, CheckAdmin, (re1, res, next) => BebidasAlcoolController.deletar(req, res, next))

export default routes