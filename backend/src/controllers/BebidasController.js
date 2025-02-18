import BebidasModel from "../models/BebidasSchema.js";
import Services from "../../services/ServicesController.js";

class BebidasController extends Services{
    constructor(){
        super(BebidasModel)
    } 
}
export default new BebidasController()