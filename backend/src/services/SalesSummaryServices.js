import CrudServices from "./CrudServices.js";
import SalesSummaryModel from "../models/SalesSummaryModel.js";

class SalesSummaryServices extends CrudServices{
    constructor(){
        super(SalesSummaryModel)
    }
}

export default new SalesSummaryServices()