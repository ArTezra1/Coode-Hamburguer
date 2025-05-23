import SalesSummaryServices from "../services/SalesSummaryServices.js";

class SalesSummaryController{
    constructor(){

    }

    static async createSymmary(req, res, next){
        try {
            const { periodType } = req.body

            const result = await SalesSummaryServices.createSummary(periodType)
            
            return res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAll(req, res, next){
        try {
            const result = await SalesSummaryServices.getAll()

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAllOrByDate(req, res, next){
        try {
            const { periodType } = req.query

            if(periodType){
                const result = await SalesSummaryServices.getByDate(periodType)

                return res.status(200).json(result)
            }

            const result = await SalesSummaryServices.getAll()

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next){
        try {
            const { id } = req.params

            const result = await SalesSummaryServices.getById(id)

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next){
        try {
            const { id } = req.params
            const data = req.body

            await SalesSummaryServices.update(id, data)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next){
        try {
            const { id } = req.params

            await SalesSummaryServices.delete(id)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }
}

export default SalesSummaryController