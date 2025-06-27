import AddressServices from "../services/AddressServices.js";

import { ErroBadRequest } from "../error/ErrorClasses.js";

class AddressController {
    constructor() {

    }

    static async create(req, res, next) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new ErroBadRequest("O corpo da requisição está vazio.")
            }

            const data = req.body

            console.log(data.lenght)

            if (data) {

            }

            // const result = await AddressServices.create(data)

            // return res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAll(req, res, next) {
        try {
            const result = await AddressServices.getAll(req.query)

            req.result = result

            next()

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params

            const result = await AddressServices.getById(id)

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            await AddressServices.update(id, data)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            const deleted = await AddressServices.delete(id)

            return res.status(200).json({
                message: deleted.message
            })

        } catch (error) {
            next(error)
        }
    }

    static async deleteAll(req, res, next) {
        try {
            const deleted = await AddressServices.deleteAll()

            return res.status(200).json({
                message: deleted.message
            })

        } catch (error) {
            next(error)
        }
    }
}

export default AddressController