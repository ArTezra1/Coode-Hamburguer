import express from "express"
import EnderecosController from "../controllers/EnderecoController.js"
import paginar from "../middlewares/Paginar.js"

const routes = express.Router()

routes.get("/endereco", (req, res, next) => EnderecosController.listar(req, res, next), paginar)

routes.get("/endereco/query", (req, res, next) => EnderecosController.listarPorFiltro(req, res, next), paginar)

routes.get("/endereco/:id", (req, res, next) => EnderecosController.buscarPorId(req, res, next))

routes.post("/endereco", (req, res, next) => EnderecosController.criar(req, res, next))

routes.put("/endereco/:id", (req, res, next) => EnderecosController.atualizar(req, res, next))

routes.delete("/endereco/:id", (req, res, next) => EnderecosController.deletar(req, res, next))

export default routes