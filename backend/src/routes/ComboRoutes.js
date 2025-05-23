import express from "express"
import ComboController from "../controllers/ComboController.js"

import Upload from "../config/multerConfig.js"

const router = express.Router()

router.post("/products/combos", Upload.single("image"), ComboController.create)

router.get("/products/combos", ComboController.getAll)

router.post("/products/combos/query", ComboController.getByParams)

router.post("/products/combos/:id", ComboController.getById)

router.post("/products/combos/:id", ComboController.update)

router.post("/products/combos/:id", ComboController.delete)

export default router