import mongoose from "mongoose"

const LanchesSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "Por favor insira o Nome do lanche!"]
    },
    tipo: {
        type: String,
        enum: ["hamburguer", "batata", "pastel"],
        required: [true, "Por favor insira o Tipo do lance!"]
    },
    sabor: {
        type: String,
        required: [true, "Por favor insira o Sabor do lanche!"]
    },
    preco_unitario: {
        type: Number,
        required: [true, "Por favor insira o Preço do lanche!"],
        min: [0, "O preço não pode ser negativo!"]
    }
}, {

})

const ProdutosModel = mongoose.model("Lanches", LanchesSchema)

export default ProdutosModel