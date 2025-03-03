import mongoose from "mongoose";

const CombosSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "Por favor insira o Nome do combo!"]
    },
    tipo: {
        type: String,
        enum: {
            values: ["completo", "bebida", "lanches"],
            message: "O tipo de combo {VALUE} não é permitido."
        },
        required: [true, "Por favor insira o tipo do Combo."]
    },
    items:{
        type: Array,
        required: [true, "Por favor insira os items do combo."],
        min: [2, "O mínimo de itens de um combo deve ser 2."]
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