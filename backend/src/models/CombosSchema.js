import mongoose from "mongoose";

const CombosSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "Por favor insira o Nome do combo!"]
    },
    tipo: {
        type: String,
        enum: ["completo", "bebida"]
    },
    preco_unitario: {
        type: Number,
        required: [true, "Por favor insira o Preço do combo!"],
        min: [0, "O preço não pode ser negativo!"]
    }
}, {

})

const CombosModel = mongoose.model("Combos", CombosSchema)

export default CombosModel