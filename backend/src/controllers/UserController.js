import UserServices from "../services/UserServices.js";

import { verifyAuth0Token } from "../utils/auth.js";

class UserController {
    constructor() {

    }

    static async login(req, res, next) {
        try {
            const authHeader = req.headers.authorization

            if(!authHeader?.startsWith("Bearer ")){
                return res.status(401).json({
                    message: "Token inválido."
                })
            }

            const token = authHeader.split(" ")[1]

            const { sub: auth0Id, email, name } = await verifyAuth0Token(token)

            const result = await UserServices.login({
                auth0Id, email, name
            })

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getOrders(req, res, next) {
        try {
            const { sub: auth0Id } = req.user

            const result = await UserServices.getOrders(auth0Id)

            req.result = result

            next()

        } catch (error) {
            next(error)
        }
    }

    static async updateAddress(req, res, next) {
        try {
            const { sub: auth0Id } = req.user

            const address = req.body

            const result = await UserServices.updateAddress(auth0Id, address)

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAddress(req, res, next) {
        try {
            const { sub: auth0Id } = req.user

            const result = await UserServices.getAddress(auth0Id)

            res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAll(req, res, next) {
        try {
            const result = await UserServices.getAll(req.query)

            req.result = result

            next()

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params

            const user = await UserServices.getById(id)

            return res.status(200).json(user)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const result = req.body

            const update = await UserServices.update(id, result)

            return res.status(200).json({
                message: update.message
            })

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            const deleted = await UserServices.delete(id)

            return res.status(200).json({
                message: deleted.message
            })

        } catch (error) {
            next(error)
        }
    }
}

export default UserController