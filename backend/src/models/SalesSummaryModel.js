import mongoose from "mongoose";

const SalesSummarySchema = new mongoose.Schema({
    periodType: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        required: true
    },
    period: {
        type: String,
        required: true,
        unique: true
    },
    totalSales: {
        type: Number,
        required: true
    },
    totalOrders: {
        type: Number
    }
})

const SalesSummaryModel = mongoose.model("SalesSummary", SalesSummarySchema)

export default SalesSummaryModel