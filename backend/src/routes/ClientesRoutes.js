import express from "express"
import ClientesController from "../controllers/ClientesController.js"
import paginar from "../middlewares/Paginar.js"

const routes = express.Router()

routes.get("/clientes", ClientesController.listarClientes, paginar)

routes.get("/clientes/query", ClientesController.listarClientesPorFiltro, paginar)

routes.get("/clientes/:id", ClientesController.listarClientePorId)

routes.post("/clientes", ClientesController.cadastrarCliente)

routes.put("/clientes/:id", ClientesController.atualizarCliente)

routes.delete("/clientes/:id", ClientesController.deletarCliente)

export default routes