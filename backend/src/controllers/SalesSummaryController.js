import SalesSummaryServices from "../services/SalesSummaryServices.js";

class SalesSummaryController{
    constructor(){

    }

    static async create(req, res, next){
        try {
            const data = req.body

            const result = await SalesSummaryServices.create(data)
            
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

    static async delte(req, res, next){
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