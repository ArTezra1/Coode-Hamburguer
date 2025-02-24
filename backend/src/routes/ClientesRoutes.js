import express from "express"
import ClientesController from "../controllers/ClientesController.js"
import paginar from "../middlewares/Paginar.js"
import CheckAdmin from "../middlewares/CheckAdmin.js"
import CheckToken from "../middlewares/CheckToken.js"

const routes = express.Router()

routes.get("/clientes", CheckToken, CheckAdmin, (req, res, next) => ClientesController.listar(req, res, next), paginar)

routes.get("/clientes/query", CheckToken, CheckAdmin, (req, res, next) => ClientesController.listarPorFiltro(req, res, next), paginar)

routes.delete("/clientes/:id", CheckToken, CheckAdmin, (req, res, next) => ClientesController.deletar(req, res, next))

routes.get("/clientes/:id", CheckToken, (req, res, next) => ClientesController.buscarPorId(req, res, next))

routes.put("/clientes/:id", CheckToken, (req, res, next) => ClientesController.atualizar(req, res, next))

routes.post("/login", (req, res, next) => ClientesController.login(req, res, next))

routes.post("/cadastrar", (req, res, next) => ClientesController.criar(req, res, next))

export default routes