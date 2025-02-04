import express from "express"
import ClientesController from "../controllers/ClientesController.js"

const routes = express.Router()

routes.get("/clientes", ClientesController.listarClientes)

routes.get("/clientes/:id", ClientesController.listarClientePorId)

routes.get("/clientes/query", ClientesController.listarClientesPorFiltro)

routes.post("/clientes", ClientesController.cadastrarCliente)

routes.put("/clientes/:id", ClientesController.atualizarCliente)

routes.delete("/clientes/:id", ClientesController.deletarCliente)

export default routes