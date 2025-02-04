import express from "express"
import CombosController from "../controllers/CombosController.js"

const routes = express.Router()

routes.get("/combos", CombosController.listarCombos)

routes.get("/combos/:id", CombosController.listarComboPorId)

routes.get("/combos/query", CombosController.listarCombosPorFiltro)

routes.post("/combos", CombosController.cadastrarCombo)

routes.put("/combos/:id", CombosController.atualizarCombo)

routes.delete("/combos/:id", CombosController.deletarCombo)

export default routes