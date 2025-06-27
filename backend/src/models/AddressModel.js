import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    street:{
        type: String,
        required: [true, "Street is required"]
    },
    number:{
        type: Number,
        required: [true, "Number is required"]
    },
    zipCode:{
        type: String,
        required: [true, "Zip code is required"]
    },
    neighborhood:{
        type: String,
        required: [true, "Neighborhood is required"]
    },
    complement:{
        type: String
    }
}, {
    timestamps: true
})

const AddressModel = mongoose.model("Address", AddressSchema)

export default AddressModel