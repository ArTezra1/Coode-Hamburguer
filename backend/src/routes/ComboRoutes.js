import express from "express"
import ComboController from "../controllers/ComboController.js"

const router = express.Router()

router.post("/v1/products/combos", ComboController.create)

router.get("/v1/products/combos", ComboController.getAll)

router.post("/v1/products/combos/query", ComboController.getByParams)

router.post("/v1/products/combos/:id", ComboController.getById)

router.post("/v1/products/combos/:id", ComboController.update)

router.post("/v1/products/combos/:id", ComboController.delete)

export default router