import express from "express"
import OrderController from "../controllers/OrderController.js"

const router = express.Router()

router.post("/v1/orders", OrderController.create)

router.get("/v1/orders", OrderController.getAll)

router.get("/v1/orders/query", OrderController.getByParams)

router.get("/v1/orders/:id", OrderController.getById)

router.put("/v1/orders", OrderController.update)

router.delete("/v1/orders", OrderController.delete)

export default router