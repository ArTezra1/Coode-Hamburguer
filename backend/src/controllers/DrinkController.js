import DrinkServices from "../services/DrinkServices.js";

class DrinkController {
    constructor() {

    }

    static async create(req, res, next) {
        try {
            const data = req.body
            const file = req.file

            const result = await DrinkServices.create(data, file)

            return res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAll(req, res, next) {
        try {
            const result = await DrinkServices.getAll()

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params

            const result = await DrinkServices.getById(id)

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getByParams(req, res, next) {
        try {
            const { params } = req.query

            const result = await DrinkServices.getByParams(params)

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            await DrinkServices.update(id, data)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            await DrinkServices.delete(id)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }
}

export default DrinkController