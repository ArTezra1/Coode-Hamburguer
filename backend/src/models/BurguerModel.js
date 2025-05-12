import mongoose from "mongoose";

const BurguerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    ingredients:{
        type: [String],
        required: [true, "Ingredients are required"]
    },
    image:{
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
    }
}, {
    timestamps: true
})

const BurguerModel = mongoose.model("Burguer", BurguerSchema)

export default BurguerModel