import express from "express"
import DrinkController from "../controllers/DrinkController.js"

import Upload from "../config/multerConfig.js"

const router = express.Router()

router.post("/products/drinks", Upload.single("image"), DrinkController.create)

router.get("/products/drinks", DrinkController.getAll)

router.get("/products/drinks/query", DrinkController.getByParams)

router.get("/products/drinks/:id", DrinkController.getById)

router.put("/products/drinks/:id", DrinkController.update)

router.delete("/products/drinks/:id", DrinkController.delete)

export default router