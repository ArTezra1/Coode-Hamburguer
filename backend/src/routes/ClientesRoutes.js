import express from "express"
import ClientesController from "../controllers/ClientesController.js"
import paginar from "../middlewares/Paginar.js"

const routes = express.Router()

routes.get("/clientes", (req, res, next) => ClientesController.listar(req, res, next))

// routes.get("/clientes/query", ClientesController.listarClientesPorFiltro, paginar)

routes.get("/clientes/:id", (req, res, next) => ClientesController.buscarPorId(req, res, next))

routes.post("/clientes", (req, res, next) => ClientesController.criar(req, res, next))

// routes.put("/clientes/:id", ClientesController.atualizarCliente)

// routes.delete("/clientes/:id", ClientesController.deletarCliente)

export default routes