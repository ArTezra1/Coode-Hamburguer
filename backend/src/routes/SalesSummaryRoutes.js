import SalesSummaryController from "../controllers/SalesSummaryController.js"
import express from "express"

import paginate from "../middlewares/Paginate.js"

const router = express.Router()

router.post("/summarys", SalesSummaryController.createSummary)

router.get("/summarys", SalesSummaryController.getAllOrByDate, paginate)

router.get("/summarys/:id", SalesSummaryController.getById)

router.put("/summarys/:id", SalesSummaryController.update)

router.delete("/summarys/:id", SalesSummaryController.delete)

export default router
