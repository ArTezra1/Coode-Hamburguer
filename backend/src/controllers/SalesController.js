import SalesServices from "../services/SalesServices.js";

class SalesController {
    constructor() {

    }

    static async createSale(req, res, next) {
        try {
            const result = await SalesServices.createSale()

            res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAllOrByGroup(req, res, next) {
        try {
            const { group } = req.query

            const result = group
                ? await SalesServices.getByGroups(group)
                : await SalesServices.getAll(req.query)

            req.result = result

            next()

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params

            const result = await SalesServices.getById(id)

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            const updated = await SalesServices.update(id, data)

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

            const deleted = await SalesServices.delete(id)

            return res.status(200).json({
                message: deleted.message
            })

        } catch (error) {
            next(error)
        }
    }

    static async deleteAll(req, res, next) {
        try {
            const deleted = await SalesServices.deleteAll()

            return res.status(200).json({
                message: deleted.message
            })

        } catch (error) {
            next(error)
        }
    }
}

export default SalesController