import OrderController from "../controllers/OrderController.js"
import express from "express"

import paginate from "../middlewares/Paginate.js"

const router = express.Router()

router.post("/orders", OrderController.createOrder)

router.get("/orders", OrderController.getAllOrders, paginate)

router.get("/orders/query", OrderController.getByParams)

router.get("/orders/:id", OrderController.getById)

router.put("/orders/:id", OrderController.update)

router.patch("/orders/:id", OrderController.update)

router.delete("/orders/:id", OrderController.delete)

export default router