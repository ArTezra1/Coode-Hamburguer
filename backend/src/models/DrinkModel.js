import mongoose from "mongoose";

const DrinkSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"]
    },
    imageSrc:{
        type: String,
        required: [true, "Image is required"]
    },
    isAvailable:{
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity must be greater than or equal to 0"],
    }
}, {
    timestamps: true
})

const DrinkModel = mongoose.model("Drink", DrinkSchema)

export default DrinkModel