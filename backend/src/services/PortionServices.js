import CrudServices from "./CrudServices.js";
import PortionModel from "../models/PortionModel.js";

class PortionServices extends CrudServices{
    constructor(){
        super(PortionModel)
    }
}

export default new PortionServices()