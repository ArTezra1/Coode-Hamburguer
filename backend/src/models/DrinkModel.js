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
    image:{
        type: String,
        required: [true, "Image is required"]
    },
    isAvailable:{
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const DrinkModel = mongoose.model("Drink", DrinkSchema)

export default DrinkModel