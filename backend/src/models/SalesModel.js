import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "productModel"
    },
    productModel: {
        type: String,
        required: true,
        enum: ["Burger", "Drink", "Portion", "Combo"]
    },
    productCountSale: {
        type: Number,
        required: true
    },
    productTotalSale: {
        type: Number,
        required: true
    },
    saleDate: {
        type: Date,
        default: Date.now
    }
})

const SalesModel = mongoose.model("Sales", SalesSchema)

export default SalesModel