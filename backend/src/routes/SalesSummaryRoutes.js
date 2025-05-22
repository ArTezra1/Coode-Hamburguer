import express from "express"
import SalesSummaryController from "../controllers/SalesSummaryController.js"

const router = express.Router()

router.post("/dashboard/summarys", SalesSummaryController.create)

router.get("/dashboard/summarys", SalesSummaryController.getAllOrByDate)

router.get("/dashboard/summarys/:id", SalesSummaryController.getById)

router.put("/dashboard/summarys/:id", SalesSummaryController.update)

router.delete("/dashboard/summarys/:id", SalesSummaryController.delete)

export default router
