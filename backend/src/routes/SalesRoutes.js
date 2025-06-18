import SalesController from "../controllers/SalesController.js"
import express from "express"

import paginate from "../middlewares/Paginate.js"

const router = express.Router()

router.post("/sales", SalesController.createSale)

router.get("/sales", SalesController.getAllOrByGroup, paginate)

router.get("/sales/:id", SalesController.getById)

router.put("/sales/:id", SalesController.update)

router.delete("/sales/:id", SalesController.delete)

export default router