import express from "express"
import BurguerController from "../controllers/BurguerController.js"

const router = express.Router()

router.post("/v1/products/burguers", BurguerController.create)

router.get("/v1/products/burguers", BurguerController.getAll)

router.get("/v1/products/burguers/:id/ingredients", BurguerController.getIngredients)

router.get("/v1/products/burguers/query", BurguerController.getByParams)

router.get("/v1/products/burguers/:id", BurguerController.getById)

router.put("/v1/products/burguers/:id", BurguerController.update)

router.delete("/v1/products/burguers/:id", BurguerController.delete)

export default router