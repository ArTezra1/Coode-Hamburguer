import BurguerServices from "../services/BurguerServices.js";

class BurguerController {
    constructor() {

    }

    static async create(req, res, next) {
        try {
            const { name, description, ingredients, price, image } = req.body

            const result = await BurguerServices.create({
                name, description, ingredients, image, price
            })

            res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAll(req, res, next) {
        try {
            const result = await BurguerServices.getAll()

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params

            const result = await BurguerServices.getById(id)

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getByParams(req, res, next) {
        try {
            const { params } = req.query

            const result = await BurguerServices.getByParams(params)

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getIngredients(req, res, next) {
        try {
            const { id } = req.params

            const result = await BurguerServices.getIngredients(id)

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            await BurguerServices.update(id, data)

            res.status(200).send()

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            await BurguerServices.delete(id)

            res.status(200).send()

        } catch (error) {
            next(error)
        }
    }
}

export default BurguerController