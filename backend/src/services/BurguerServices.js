import CrudServices from "./CrudServices.js";
import BurguerModel from "../models/BurguerModel.js";

class BurguerServices extends CrudServices{
    constructor(){
        super(BurguerModel)
    }
}

export default new BurguerServices()