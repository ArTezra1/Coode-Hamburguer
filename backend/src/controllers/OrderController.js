import OrderServices from "../services/OrderServices.js";

import { ErroBadRequest } from "../error/ErrorClasses.js";

class OrderController {
    constructor() {

    }

    static async createOrder(req, res, next) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new ErroBadRequest("O corpo da requisição está vazio.")
            }

            const data = req.body

            const result = await OrderServices.createOrder(data)

            return res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAllOrders(req, res, next) {
        try {
            const result = await OrderServices.getAllOrders(req.query)

            req.result = result

            next()

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

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            const updated = await OrderServices.update(id, data)

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

            const deleted = await OrderServices.delete(id)

            return res.status(200).json({
                message: deleted.message
            })

        } catch (error) {
            next(error)
        }
    }

    static async deleteAll(req, res, next) {
        try {
            const deleted = await OrderServices.deleteAll()

            return res.status(200).json({
                message: deleted.message
            })

        } catch (error) {
            next(error)
        }
    }
}

export default OrderController