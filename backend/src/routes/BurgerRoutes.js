import express from "express"
import BurgerController from "../controllers/BurgerController.js"

import Upload from "../config/multerConfig.js"

const router = express.Router()

router.post("/products/burgers", Upload.single("image"), BurgerController.create)

router.get("/products/burgers", BurgerController.getAll)

router.get("/products/burgers/:id/ingredients", BurgerController.getIngredients)

router.get("/products/burgers/:id", BurgerController.getById)

router.put("/products/burgers/:id", BurgerController.update)

router.delete("/products/burgers/:id", BurgerController.delete)

export default router