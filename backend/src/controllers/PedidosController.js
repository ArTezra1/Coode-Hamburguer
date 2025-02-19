import PedidosModel from "../models/PedidosSchema.js"
import Services from "../../services/ServicesController.js"

class PedidosController extends Services{
    constructor(){
        super(PedidosModel)
    }
}

export default new PedidosController()