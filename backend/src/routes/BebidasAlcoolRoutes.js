import express from "express"
import BebidasAlcoolController from "../controllers/BebidasAlcoolController.js"
import paginar from "../middlewares/Paginar.js"

const routes = express.Router()

routes.get("/alcool", BebidasAlcoolController.listarAlcool, paginar)

routes.get("/alcool/query", BebidasAlcoolController.listarAlcoolPorFiltro, paginar)

routes.get("/alcool/:id", BebidasAlcoolController.listarAlcoolPorId)

routes.post("/alcool", BebidasAlcoolController.cadastrarAlcool)

routes.put("/alcool/:id", BebidasAlcoolController.atualizarAlcool)

routes.delete("/alcool/:id", BebidasAlcoolController.deletarAlcool)

export default routes