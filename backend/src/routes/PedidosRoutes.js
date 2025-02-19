import express from "express"
import PedidosController from "../controllers/PedidosController.js"

const routes = express.Router()

routes.get("/pedidos", (req, res, next) => PedidosController.listar(req, res, next))

routes.get("/pedidos/query", (req, res, next) => PedidosController.buscarPorId(req, res, next))

routes.get("/pedidos/:id", (req, res, next) => PedidosController.buscarPorId(req, res, next))

routes.post("/pedidos", (req, res, next) => PedidosController.criar(req, res, next))

routes.put("/pedidos/:id", (req, res, next) => PedidosController.atualizar(req, res, next))

routes.delete("/pedidos/:id", (req, res, next) => PedidosController.deletar(req, res, next))

export default routes