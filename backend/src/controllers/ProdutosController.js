import Services from "../../services/ServicesController.js"
import ProdutosModel from "../models/ProdutosSchema.js"

class ProdutosController extends Services{
    constructor(){
        super(ProdutosModel)
    }
}

export default new ProdutosController()