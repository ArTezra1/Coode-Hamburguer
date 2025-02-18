import BebidasAlcoolModel from "../models/BebidasAlcoolSchema.js"
import Services from "../../services/ServicesController.js"

class BebidasAlcoolController extends Services{
    constructor() {
        super(BebidasAlcoolModel)
    }
}

export default new BebidasAlcoolController()