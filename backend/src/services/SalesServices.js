import CrudServices from "./CrudServices.js";
import SalesModel from "../models/SalesModel.js";

import { 
    ErroValidation 
} from "../error/ErrorClasses.js";

class SalesServices extends CrudServices{
    constructor(){
        super(SalesModel)
    }

    async createSale(data){
        if(!Array.isArray(data) || data.length === 0){
            throw new ErroValidation("Lista de vendas vazia ou inválida")
        }

        const saleDocuments = data.map((item) =>({
            product: item.product,
            productModel: item.productModel,
            productCountSale: item.quantity,
            productTotalSale: item.quantity * item.unitPrice
        }))

        const savedSales = await SalesModel.insertMany(saleDocuments)

        return {
            message: "Vendas registradas com sucesso",
            data: savedSales
        }

    }
}

export default new SalesServices()