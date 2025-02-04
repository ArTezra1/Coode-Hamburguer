import mongoose from "mongoose"

const LanchesSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "Por favor insira o Nome do lanche!"]
    },
    tipo: {
        type: String,
        enum: {
            values:["hamburguer", "batata", "pastel"],
            message: "O lanche {VALUE} não é permitido."
        }, 
        required: [true, "Por favor insira o Tipo do lanche!"]
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