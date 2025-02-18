import LanchesModel from "../models/LanchesSchema.js"
import Services from "../../services/ServicesController.js"

class LanchesController extends Services{
    constructor(){
        super(LanchesModel)
    }
}

export default new LanchesController()