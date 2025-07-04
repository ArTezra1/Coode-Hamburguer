import SalesSummaryServices from "../services/SalesSummaryServices.js";

class SalesSummaryController {
    constructor() {

    }

    static async createSummary(req, res, next) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new ErroBadRequest("O corpo da requisição está vazio.")
            }
            
            const { periodType } = req.body
            
            const result = await SalesSummaryServices.createSummary(periodType)

            return res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAllOrByDate(req, res, next) {
        try {
            const { periodType } = req.query

            const result = periodType
                ? await SalesSummaryServices.getByDate(periodType)
                : await SalesSummaryServices.getAll(req.query)

            req.result = result

            next()

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params

            const result = await SalesSummaryServices.getById(id)

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            const updated = await SalesSummaryServices.update(id, data)

            return res.status(200).json({
                message: updated.message
            })

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            const deleted = await SalesSummaryServices.delete(id)

            return res.status(200).json({
                message: deleted.message
            })

        } catch (error) {
            next(error)
        }
    }

    static async deleteAll(req, res, next) {
        try {
            const deleted = await SalesSummaryServices.deleteAll()

            return res.status(200).json({
                message: deleted.message
            })

        } catch (error) {
            next(error)
        }
    }
}

export default SalesSummaryController