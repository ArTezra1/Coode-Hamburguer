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

            res.status(200).json(result)

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
            const { page, limit } = req.query

            const data = await UserServices.getAll()

            return res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params

            const user = await UserServices.getById(id)

            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                })
            }

            return res.status(200).json(user)

        } catch (error) {
            next(error)
        }
    }

    static async getByParams(req, res, next) {
        try {
            const { params } = req.query

            const data = await UserServices.getByParams(params)

            if (!data) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                })
            }

            return res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            const updated = await UserServices.update(id, data)

            if (!updated) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                })
            }

            return res.status(200).json(updated)

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            const deleted = await UserServices.delete(id)

            if (!deleted) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                })
            }

            return res.status(200).json({
                message: "Usuário deletado com sucesso."
            })

        } catch (error) {
            next(error)
        }
    }
}

export default UserController