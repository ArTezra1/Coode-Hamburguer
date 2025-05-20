import CrudServices from "./CrudServices.js";
import SalesModel from "../models/SalesModel.js";

class SalesServices extends CrudServices{
    constructor(){
        super(SalesModel)
    }


}

export default new SalesServices()