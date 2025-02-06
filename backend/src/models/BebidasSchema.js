import mongoose from "mongoose";

const BebidasSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, "Por favor insira o nome da bebida!"]
    },
    marca:{
        type: String,
        required: [true, "Por favor insira a Marca da bebida!"]
    },
    sabor:{
        type: String,
        required: [true, "Por favor insira o Sabor da bebida!"]
    },
    tipo:{
        type: String,
        enum: {
            values: ["refrigerante", "suco", "agua"],
            message: "A bebida {VALUE} não é permitida."
        },
        required: [true, "Por favor insira o tipo da bebida!"]
    },
    preco_unitario:{
        type: Number,
        required: [true, "Por favor insira o preço do Produto!"],
        min: [0, "O preço não pode ser negativo!"]
    }
},{
    timestamps: true
})

const BebidasModel = mongoose.model("Bebidas", BebidasSchema)

export default BebidasModel