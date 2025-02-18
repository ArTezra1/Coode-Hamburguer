import EnderecosModel from "../models/EnderecosSchema.js"
import Services from "../../services/ServicesController.js"

class EnderecosController extends Services{
    constructor(){
        super(EnderecosModel)
    }
}

export default new EnderecosController()