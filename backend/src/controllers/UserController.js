import UserServices from "../services/UserServices.js";

class UserController {
    constructor() {

    }

    static async login(req, res, next) {
        try {
            const { sub: auth0Id, email, name } = req.user

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
            const result = await UserServices.getAll()

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

    static async getByParams(req, res, next) {
        try {
            const { params } = req.query

            const result = await UserServices.getByParams(params)

            req.result = result

            next()

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const result = req.body

            await UserServices.update(id, result)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            await UserServices.delete(id)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }
}

export default UserController