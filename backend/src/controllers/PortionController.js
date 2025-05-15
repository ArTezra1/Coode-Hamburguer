import PortionServices from "../services/PortionServices.js";

class PortionController {
    constructor() {

    }

    static async create(req, res, next) {
        try {
            const data = req.body
            const file = req.file

            const result = await PortionServices.create(data, file)

            return res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAll(req, res, next) {
        try {
            const result = await PortionServices.getAll()

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params

            const result = await PortionServices.getById(id)

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getByParams(req, res, next) {
        try {
            const { params } = req.query

            const result = await PortionServices.getByParams(params)

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            await PortionServices.update(id, data)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            await PortionServices.delete(id)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }
}

export default PortionController