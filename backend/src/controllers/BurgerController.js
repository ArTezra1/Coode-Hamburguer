import BurgerServices from "../services/BurgerServices.js"

import { 
    ErrorMessage 
} from "../error/ErrorClasses.js"

class BurgerController {
    constructor() {

    }

    static async create(req, res, next) {
        try {
            const data = req.body
            const file = req.file

            if (!file) {
                throw new ErrorMessage("Imagem não enviada.")
            }

            const result = await BurgerServices.create(data, file)

            res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAll(req, res, next) {
        try {
            const result = await BurgerServices.getAll()

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params

            const result = await BurgerServices.getById(id)

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getByParams(req, res, next) {
        try {
            const { params } = req.query

            const result = await BurgerServices.getByParams(params)

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getIngredients(req, res, next) {
        try {
            const { id } = req.params

            const result = await BurgerServices.getIngredients(id)

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            await BurgerServices.update(id, data)

            res.status(200).send()

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            await BurgerServices.delete(id)

            res.status(200).send()

        } catch (error) {
            next(error)
        }
    }
}

export default BurgerController