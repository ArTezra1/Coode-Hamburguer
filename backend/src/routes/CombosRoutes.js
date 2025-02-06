import express from "express"
import CombosController from "../controllers/CombosController.js"
import paginar from "../middlewares/Paginar.js"

const routes = express.Router()

routes.get("/combos", CombosController.listarCombos, paginar)

routes.get("/combos/query", CombosController.listarCombosPorFiltro, paginar)

routes.get("/combos/:id", CombosController.listarComboPorId)

routes.post("/combos", CombosController.cadastrarCombo)

routes.put("/combos/:id", CombosController.atualizarCombo)

routes.delete("/combos/:id", CombosController.deletarCombo)

export default routes