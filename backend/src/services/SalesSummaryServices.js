import CrudServices from "./CrudServices.js";
import SalesSummaryModel from "../models/SalesSummaryModel.js";
import SalesModel from "../models/SalesModel.js"

import {
    ErroBadRequest,
    ErroValidation
} from "../error/ErrorClasses.js";

class SalesSummaryServices extends CrudServices {
    constructor() {
        super(SalesSummaryModel)
    }

    async createSummary(periodType) {
        const validPeriods = ["daily", "weekly", "monthly"]

        if (!validPeriods.includes(periodType)) {
            throw new Error("Tipo de período inválido.")
        }

        const now = new Date()
        let startDate, endDate

        if (periodType === "daily") {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
            
        } else if (periodType === "weekly") {
            const firstDay = now.getDate() - now.getDay()
            
            startDate = new Date(now.getFullYear(), now.getMonth(), firstDay)
            endDate = new Date(now.getFullYear(), now.getMonth(), firstDay + 7)
        
        } else if (periodType === "monthly") {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1)
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        }

        const result = await SalesModel.aggregate([
            {
                $match: {
                    saleDate: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$productTotalSale" },
                    totalOrders: { $sum: 1 }
                }
            }
        ])

        const summaryData = {
            periodType: periodType,
            period: startDate.toISOString().split("T")[0],
            totalSales: result[0]?.totalSales || 0,
            totalOrders: result[0]?.totalOrders || 0
        }

        const summary = await SalesSummaryModel.create(summaryData)

        return summary
    }


    async getByDate(data) {
        const periodTypes = ["daily", "weekly", "monthly"]

        if (!data) {
            throw new ErroValidation("A o tipo de periodo é obrigatório.")
        }

        if (!periodTypes.includes(data)) {
            throw new ErroBadRequest("Tipo de periodo inválido")
        }

        const result = await SalesSummaryModel.find({
            periodType: data
        })

        return result
    }
}

export default new SalesSummaryServices()