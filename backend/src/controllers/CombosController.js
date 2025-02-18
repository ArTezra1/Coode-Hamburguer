import CombosModel from "../models/CombosSchema.js"
import Services from "../../services/ServicesController.js"

class CombosController extends Services{
    constructor(){
        super(CombosModel)
    }
}

export default new CombosController()