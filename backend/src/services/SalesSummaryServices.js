import CrudServices from "./CrudServices.js";
import SalesSummaryModel from "../models/SalesSummaryModel.js";

import {
    ErroBadRequest,
    ErroNotFound,
    ErroValidation
} from "../error/ErrorClasses.js";

class SalesSummaryServices extends CrudServices {
    constructor() {
        super(SalesSummaryModel)
    }

    async getByDate(data){
        const validDates = ["daily", "weekly", "monthly"]
        
        if(!data){
            throw new ErroValidation("A o tipo de periodo é obrigatório.")
        }

        if(!validDates.includes(data)){
            throw new ErroBadRequest("Tipo de periodo inválido")
        }

        const result = await SalesSummaryModel.find({
            periodType: data
        })

        return result
    }
}

export default new SalesSummaryServices()