import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    imageSrc: {
        type: String,
        required: [true, "Image is required"]
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity must be greater than or equal to 0"],
        default: 0
    },
    category: {
        type: String,
        enum: ["burger", "drink", "portion", "combo", "other"],
        required: [true, "Category is required"]
    },
    ingredients: {
        type: [String],
    },
    itensCombo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        }
    ],
    brand: {
        type: String
    }
}, {
    timestamps: true
})

const ProductModel = mongoose.model("Product", ProductSchema)

export default ProductModel