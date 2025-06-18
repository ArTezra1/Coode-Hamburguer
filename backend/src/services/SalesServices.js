import CrudServices from "./CrudServices.js";
import SalesModel from "../models/SalesModel.js";
import OrderModel from "../models/OrderModel.js";
import ProductModel from "../models/ProductModel.js";

import {
    ErroBadRequest
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

        for (const order of orderSales) {
            for (const item of order.items) {
                const product = await ProductModel.findById(item.product).select("category")

                if (!product) {
                    continue
                }

                saleDocuments.push({
                    product: item.product,
                    category: product.category,
                    productCountSale: item.quantity,
                    productTotalSale: item.quantity * item.unitPrice
                })
            }
        }

        const savedSales = await SalesModel.insertMany(saleDocuments)

        return {
            message: "Vendas registradas com sucesso",
            data: savedSales
        }
    }

    async getByGroups(group) {
        const groups = ["burger", "drink", "portion", "combo", "other"]

        if (!group) {
            throw new ErroBadRequest("O tipo de produto é obrigatório.")
        }

        if (!groups.includes(group)) {
            throw new ErroBadRequest("Tipo de produto inválido.")
        }

        const result = await SalesModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "productData"
                }
            },
            {
                $unwind: {
                    path: "$productData",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $match: {
                    "productData.category": group
                }
            },
            {
                $group: {
                    _id: {
                        product: "$product",
                        productModel: "$productData.category",
                        productName: "$productData.name"
                    },
                    totalQuantity: { $sum: "$productCountSale" },
                    totalRevenue: { $sum: "$productTotalSale" },
                    totalSales: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id.product",
                    productModel: "$_id.productModel",
                    productName: "$_id.productName",
                    totalQuantity: 1,
                    totalRevenue: 1,
                    totalSales: 1
                }
            }
        ])

        return result
    }

}

export default new SalesServices()