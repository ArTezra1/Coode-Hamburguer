import express from "express"
import EnderecosController from "../controllers/EnderecoController.js"
import paginar from "../middlewares/Paginar.js"
import CheckToken from "../middlewares/CheckToken.js"
import CheckAdmin from "../middlewares/CheckAdmin.js"

const routes = express.Router()

routes.get("/endereco", CheckToken, CheckAdmin, (req, res, next) => EnderecosController.listar(req, res, next), paginar)

routes.get("/endereco/query", CheckToken, CheckAdmin, (req, res, next) => EnderecosController.listarPorFiltro(req, res, next), paginar)

routes.get("/endereco/:id", CheckToken, (req, res, next) => EnderecosController.buscarPorId(req, res, next))

routes.post("/endereco", CheckToken, (req, res, next) => EnderecosController.criar(req, res, next))

routes.put("/endereco/:id", CheckToken, (req, res, next) => EnderecosController.atualizar(req, res, next))

routes.delete("/endereco/:id", CheckToken, CheckAdmin, (req, res, next) => EnderecosController.deletar(req, res, next))

export default routes