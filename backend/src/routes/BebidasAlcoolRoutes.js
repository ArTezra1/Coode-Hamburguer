import express from "express"
import BebidasAlcoolController from "../controllers/BebidasAlcoolController.js"

const routes = express.Router()

routes.get("/alcool", BebidasAlcoolController.listarAlcool)

routes.get("/alcool/query", BebidasAlcoolController.listarAlcoolPorFiltro)

routes.get("/alcool/:id", BebidasAlcoolController.listarAlcoolPorId)

routes.post("/alcool", BebidasAlcoolController.cadastrarAlcool)

routes.put("/alcool/:id", BebidasAlcoolController.atualizarAlcool)

routes.delete("/alcool/:id", BebidasAlcoolController.deletarAlcool)

export default routes