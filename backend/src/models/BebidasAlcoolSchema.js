import mongoose from "mongoose";

const BebidasAlcoolSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: [true, "Por favor insira a Marca do produto!"]
    },
    tipo: {
        type: String,
        enum: {
            values: ["cerveja", "dose", "caipirinha", "fardinho"],
            message: "A bebida {VALUE} não é permitida."
        }, 
        required: [true, "Por favor insira o Tipo de bebida!"]
    },
    preco_unitario: {
        type: Number,
        required: [true, "Por favor insira o Preço do produto!"],
        min: [0, "O preço não pode ser negativo!"]
    }
}, {

})

const BebidasAlcoolModel = mongoose.model("BebidasAlcool", BebidasAlcoolSchema)

export default BebidasAlcoolModel