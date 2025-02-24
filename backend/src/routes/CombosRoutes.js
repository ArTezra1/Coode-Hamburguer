import express from "express"
import CombosController from "../controllers/CombosController.js"
import paginar from "../middlewares/Paginar.js"
import CheckToken from "../middlewares/CheckToken.js"
import CheckAdmin from "../middlewares/CheckAdmin.js"

const routes = express.Router()

routes.get("/combos", (req, res, next) => CombosController.listar(req, res, next), paginar)

routes.get("/combos/query", (req, res, next) => CombosController.listarPorFiltro(req, res, next), paginar)

routes.get("/combos/:id", CheckToken, CheckAdmin, (req, res, next) => CombosController.buscarPorId(req, res, next))

routes.post("/combos", CheckToken, CheckAdmin, (req, res, next) => CombosController.criar(req, res, next))

routes.put("/combos/:id", CheckToken, CheckAdmin, (req, res, next) => CombosController.atualizar(req, res, next))

routes.delete("/combos/:id", CheckToken, CheckAdmin, (req, res, next) => CombosController.deletar(req, res, next))

export default routes