import mongoose from "mongoose";

const PortionSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    ingredients:{
        type: [String],
        required: [true, "Ingredients are required"]
    },
    imageSrc:{
        type: String,
        required: [true, "Image is required"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"]
    },
    isAvailable:{
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity must be greater than or equal to 0"],
        default: 0
    }
}, {
    timestamps: true
})

const PortionModel = mongoose.model("Portion", PortionSchema)

export default PortionModel