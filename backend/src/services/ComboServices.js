import CrudServices from "./CrudServices.js";
import ComboModel from "../models/ComboModel.js";

class ComboServices extends CrudServices{
    constructor(){
        super(ComboModel)
    }
}

export default new ComboServices()