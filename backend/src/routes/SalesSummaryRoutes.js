import SalesSummaryController from "../controllers/SalesSummaryController.js"
import express from "express"

import paginate from "../middlewares/Paginate.js"

const router = express.Router()

router.post("/dashboard/summarys", SalesSummaryController.createSummary)

router.get("/dashboard/summarys", SalesSummaryController.getAllOrByDate, paginate)

router.get("/dashboard/summarys/:id", SalesSummaryController.getById)

router.put("/dashboard/summarys/:id", SalesSummaryController.update)

router.delete("/dashboard/summarys/:id", SalesSummaryController.delete)

export default router
