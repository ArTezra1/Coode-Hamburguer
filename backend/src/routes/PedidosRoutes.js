import express from "express"
import PedidosController from "../controllers/PedidosController.js"

const routes = express.Router()

routes.get("/pedidos", PedidosController.listarPedidos)

routes.get("/pedidos/:id", PedidosController.listarPedidoPorId)

routes.post("/pedidos", PedidosController.cadastrarPedido)

routes.put("/pedidos/:id", PedidosController.atualizarPedido)

routes.delete("/pedidos/:id", PedidosController.deletarPedido)

export default routes