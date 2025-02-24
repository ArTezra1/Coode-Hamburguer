import express from "express"
import LanchesController from "../controllers/LanchesController.js"
import paginar from "../middlewares/Paginar.js"
import CheckToken from "../middlewares/CheckToken.js"
import CheckAdmin from "../middlewares/CheckAdmin.js"

const routes = express.Router()

routes.get("/lanches", (req, res, next) => LanchesController.listar(req, res, next), paginar)

routes.get("/lanches/query", (req, res, next) => LanchesController.listarPorFiltro(req, res, next), paginar)

routes.get("/lanches/:id", CheckToken, CheckAdmin, (req, res, next) => LanchesController.buscarPorId(req, res, next))

routes.post("/lanches", CheckToken, CheckAdmin, (req, res, next) => LanchesController.criar(req, res, next))

routes.put("/lanches/:id", CheckToken, CheckAdmin, (req, res, next) => LanchesController.atualizar(req, res, next))

routes.delete("/lanches/:id", CheckToken, CheckAdmin, (req, res, next) => LanchesController.deletar(req, res, next))

export default routes