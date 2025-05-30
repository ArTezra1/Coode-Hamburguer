import CrudServices from "./CrudServices.js";
import SalesModel from "../models/SalesModel.js";

import {
    ErroValidation
} from "../error/ErrorClasses.js";

class SalesServices extends CrudServices {
    constructor() {
        super(SalesModel)
    }

    async createSale() {
        const orderSales = await OrderModel.find({ 
            paymentStatus: "pago" 
        })

        if (orderSales.length === 0) {
            return {
                message: "Nenhuma venda.",
                data: []
            }
        }

        const saleDocuments = []

        orderSales.forEach(order => {
            order.items.forEach(item => {
                saleDocuments.push({
                    product: item.product,
                    productModel: item.productType,
                    productCountSale: item.quantity,
                    productTotalSale: item.quantity * item.unitPrice
                })
            })
        })

        const savedSales = await SalesModel.insertMany(saleDocuments)

        return {
            message: "Vendas registradas com sucesso",
            data: savedSales
        }
    }

    async getByGroups(group) {
        const modelsTypes = ["burger", "drink", "portion", "combo"]

        if (!group) {
            throw new ErroValidation("O tipo de produto é obrigatório.")
        }

        if (!modelsTypes.includes(group)) {
            throw new ErroValidation("Tipo de produto inválido.")
        }

        const result = await SalesModel.aggregate([
            {
                $match: { productModel: group.charAt(0).toUpperCase() + group.slice(1) }
            },
            {
                $group: {
                    _id: {
                        product: "$product",
                        productModel: "$productModel"
                    },
                    totalQuantity: { $sum: "$productCountSale" },
                    totalRevenue: { $sum: "$productTotalSale" },
                    totalSales: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: `${group}s`,
                    localField: "_id.product",
                    foreignField: "_id",
                    as: "productData"
                }
            },
            {
                $unwind: {
                    path: "$productData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    productId: "$_id.product",
                    productModel: "$_id.productModel",
                    totalQuantity: 1,
                    totalRevenue: 1,
                    totalSales: 1,
                    productName: "$productData.name"
                }
            }
        ])

        return result
    }
}

export default new SalesServices()