import mongoose from "mongoose";

const BurgerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    ingredients: {
        type: [String],
        required: [true, "Ingredients are required"],
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: "Ingredients must contain at least one item"
        }
    },
    imageSrc: {
        type: String,
        required: [true, "Image is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    isAvailable: {
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

const BurgerModel = mongoose.model("Burger", BurgerSchema)

export default BurgerModel