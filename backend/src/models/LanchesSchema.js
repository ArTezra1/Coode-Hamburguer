import mongoose from "mongoose"

const LanchesSchema = new mongoose.Schema({

},{
    
})

const ProdutosModel = mongoose.model("Lanches", LanchesSchema)

export default ProdutosModel