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