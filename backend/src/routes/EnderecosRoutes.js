import express from "express"
import EnderecosController from "../controllers/EnderecoController.js"
import paginar from "../middlewares/Paginar.js"

const routes = express.Router()

routes.get("/endereco", EnderecosController.listarEnderecos, paginar)

routes.get("/endereco/query", EnderecosController.listarEnderecosPorFiltro, paginar)

routes.get("/endereco/:id", EnderecosController.listarEnderecoPorId)

routes.post("/endereco", EnderecosController.cadastrarEndereco)

routes.put("/endereco/:id", EnderecosController.atualizarEndereco)

routes.delete("/endereco/:id", EnderecosController.deletarEndereco)

export default routes