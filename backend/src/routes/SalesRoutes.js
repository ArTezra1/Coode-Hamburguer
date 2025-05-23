import express from "express"
import SalesController from "../controllers/SalesController.js"

const router = express.Router()

router.post("/dashboard/sales", SalesController.createSale)

router.get("/dashboard/sales", SalesController.getAllOrByGroup)

router.get("/dashboard/sales/:id", SalesController.getById)

router.put("/dashboard/sales/:id", SalesController.update)

router.delete("/dashboard/sales/:id", SalesController.delete)

export default router