import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    auth0Id:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel