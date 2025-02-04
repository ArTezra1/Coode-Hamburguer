import express from "express"
import EnderecosController from "../controllers/EnderecoController.js"

const routes = express.Router()

routes.get("/endereco", EnderecosController.listarEnderecos)

routes.get("/endereco/:id", EnderecosController.listarEnderecoPorId)

routes.get("/endereco/query", EnderecosController.listarEnderecosPorFiltro)

routes.post("/endereco", EnderecosController.cadastrarEndereco)

routes.put("/endereco/:id", EnderecosController.atualizarEndereco)

routes.delete("/endereco/:id", EnderecosController.deletarEndereco)

export default routes