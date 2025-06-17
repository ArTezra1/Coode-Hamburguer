import SalesController from "../controllers/SalesController.js"
import express from "express"

import paginate from "../middlewares/Paginate.js"

const router = express.Router()

router.post("/dashboard/sales", SalesController.createSale)

router.get("/dashboard/sales", SalesController.getAllOrByGroup, paginate)

router.get("/dashboard/sales/:id", SalesController.getById)

router.put("/dashboard/sales/:id", SalesController.update)

router.delete("/dashboard/sales/:id", SalesController.delete)

export default router