import express from "express"
import BurgerController from "../controllers/BurgerController.js"

import Upload from "../config/multerConfig.js"

const router = express.Router()

router.post("/v1/products/burgers", Upload.single("image"), BurgerController.create)

router.get("/v1/products/burgers", BurgerController.getAll)

router.get("/v1/products/burgers/query", BurgerController.getByParams)

router.get("/v1/products/burgers/:id/ingredients", BurgerController.getIngredients)

router.get("/v1/products/burgers/:id", BurgerController.getById)

router.put("/v1/products/burgers/:id", BurgerController.update)

router.delete("/v1/products/burgers/:id", BurgerController.delete)

export default router