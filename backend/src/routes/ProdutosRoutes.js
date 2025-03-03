import express from "express"
import ProdutosController from "../controllers/ProdutosController.js"
import paginar from "../middlewares/Paginar.js"
import CheckAdmin from "../middlewares/CheckAdmin.js"
import CheckToken from "../middlewares/CheckToken.js"

const routes = express.Router()

routes.get("/produtos", CheckToken, CheckAdmin, (req, res, next) => ProdutosController.listar(req, res, next), paginar)

routes.get("/mercadorias", (req, res, next) => ProdutosController.listarMercadorias(req, res, next))

routes.get("/produtos/query", CheckToken, CheckAdmin, (req, res, next) => ProdutosController.listarPorFiltro(req, res, next), paginar)

routes.delete("/produtos/:id", CheckToken, CheckAdmin, (req, res, next) => ProdutosController.deletar(req, res, next))

routes.get("/produtos/:id", CheckToken, (req, res, next) => ProdutosController.buscarPorId(req, res, next))

routes.put("/produtos/:id", CheckToken, (req, res, next) => ProdutosController.atualizar(req, res, next))

routes.post("/login", (req, res, next) => ProdutosController.login(req, res, next))

routes.post("/cadastrar", (req, res, next) => ProdutosController.criar(req, res, next))

export default routes