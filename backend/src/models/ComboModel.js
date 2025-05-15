import mongoose from "mongoose";

 const ComboSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    description:{
        type: String,
        required: [true, "Description is required"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"]
    },
    burguer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Burger"
    },
    drink:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drink"
    },
    portion:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portion"
    },
    imageSrc:{
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

const ComboModel = mongoose.model("Combo", ComboSchema)

export default ComboModel