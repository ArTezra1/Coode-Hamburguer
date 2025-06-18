import AddressServices from "../services/AddressServices.js";

class AddressController {
    constructor() {

    }

    static async create(req, res, next) {
        try {
            const data = req.body

            const result = await AddressServices.create(data)

            return res.status(201).json(result)

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

            await AddressServices.delete(id)

            return res.status(204).send()

        } catch (error) {
            next(error)
        }
    }

    static async deleteAll(req, res, next) {
        try {
            await AddressServices.deleteAll()

            return res.status(204).send()

        } catch (error) {
            next(error)
        }
    }
}

export default AddressController