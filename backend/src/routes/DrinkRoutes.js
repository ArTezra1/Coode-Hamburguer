import express from "express"
import DrinkController from "../controllers/DrinkController.js"

import Upload from "../config/multerConfig.js"

const router = express.Router()

router.post("/v1/products/drinks", Upload.single("image"), DrinkController.create)

router.get("/v1/products/drinks", DrinkController.getAll)

router.get("/v1/products/drinks/query", DrinkController.getByParams)

router.get("/v1/products/drinks/:id", DrinkController.getById)

router.put("/v1/products/drinks/:id", DrinkController.update)

router.delete("/v1/products/drinks/:id", DrinkController.delete)

export default router