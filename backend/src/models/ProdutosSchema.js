import mongoose from "mongoose";

const ProdutosSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, "Por favor insira o nome do Produto."]
    },
    marca:{
        type: String,
        default: ""
    },
    preco_unitario:{
        type: Number,
        required: [true, "Por favor insira o preço do produto."],
        min: [0, "O preço do produto não pode ser negativo."]
    }
},{

})

const ProdutosModel = mongoose.model("Produtos", ProdutosSchema)

export default ProdutosModel