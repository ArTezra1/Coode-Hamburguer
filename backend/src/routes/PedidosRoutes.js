import express from "express"
import PedidosController from "../controllers/PedidosController.js"
import CheckToken from "../middlewares/CheckToken.js"
import CheckAdmin from "../middlewares/CheckAdmin.js"

const routes = express.Router()

routes.get("/pedidos", CheckToken, CheckAdmin, (req, res, next) => PedidosController.listar(req, res, next))

routes.get("/pedidos/query", CheckToken, CheckAdmin, (req, res, next) => PedidosController.buscarPorId(req, res, next))

routes.get("/pedidos/:id", CheckToken, (req, res, next) => PedidosController.buscarPorId(req, res, next))

routes.post("/pedidos", CheckToken, (req, res, next) => PedidosController.criar(req, res, next))

routes.put("/pedidos/:id", CheckToken, (req, res, next) => PedidosController.atualizar(req, res, next))

routes.delete("/pedidos/:id", CheckToken, CheckToken, (req, res, next) => PedidosController.deletar(req, res, next))

export default routes