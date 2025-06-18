import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    category: {
        type: String,
        required: true,
        enum: ["burger", "drink", "portion", "combo", "other"]
    },
    productCountSale: {
        type: Number,
        required: true,
        min: 1
    },
    productTotalSale: {
        type: Number,
        required: true,
        min: 0
    },
    saleDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const SalesModel = mongoose.model("Sales", SalesSchema)

export default SalesModel
