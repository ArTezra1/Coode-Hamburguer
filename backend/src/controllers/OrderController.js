import OrderServices from "../services/OrderServices.js";

class OrderController {
    constructor() {

    }

    static async create(req, res, next) {
        try {
            const data = req.body

            const result = await OrderServices.create(data)

            return res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAll(req, res, next) {
        try {
            const result = await OrderServices.getAll()

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params

            const result = await OrderServices.getById(id)

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getByParams(req, res, next) {
        try {
            const { params } = req.query

            const result = await OrderServices.getByParams()

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            await OrderServices.update(id, data)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params    
        
            await OrderServices.delete(id)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }
}

export default OrderController