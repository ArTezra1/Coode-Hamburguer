import CrudServices from "./CrudServices.js";
import UserModel from "../models/UserModel.js";
import AddressModel from "../models/AddressModel.js";
import OrderModel from "../models/OrderModel.js"

import dotenv from "dotenv"
import jsonwebtoken from "jsonwebtoken"

dotenv.config()

class UserServices extends CrudServices {
    constructor() {
        super(UserModel)
    }

    async login(req, res, next) {
        try {
            const { sub: auth0Id, email, name } = req.user

            if (!auth0Id || !email || !name) {
                return res.status(400).json({ message: "Preencha todos os campos corretamente." })
            }

            let user = await UserModel.findOne({ auth0Id })

            if (!user) {
                user = await UserModel.create({
                    auth0Id,
                    name,
                    email
                })
            }

            const token = jsonwebtoken.sign({
                    id: user._id,
                    email: user.email,
                    auth0Id: user.auth0Id
                },
                process.env.JWT_SECRET,
                { 
                    expiresIn: "1h" 
                })

            return res.status(200).json({
                message: "Login realizado com sucesso.",
                token,
                user:{
                    id: user._id,
                    name: user.name,
                    emaiç: user.email
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async getOrders(req, res, next) {
        const { sub: auth0Id } = req.user

        try {
            if (!auth0Id) {
                return res.status(400).json({
                    message: "Dados de autenticação são obrigatórios."
                })
            }

            const user = await UserModel.findOne({
                auth0Id: auth0Id
            })

            if (user) {
                const orders = await OrderModel.find({
                    customer: user._id
                })

                if (!orders.length) {
                    return res.status(404).json({
                        message: "Nenhum pedido encontrado."
                    })
                }

                return res.status(200).json({
                    message: "Pedidos encontrados com sucesso.",
                    orders: orders
                })
            }

            return res.status(404).json({
                message: "Usuário não encontrado."
            })

        } catch (error) {
            next(error)
        }

    }

    async updateAddress(req, res, next) {
        const { sub: auth0Id } = req.user
        const address = req.body

        try {
            if (!auth0Id || !address) {
                return res.status(400).json({
                    message: "Dados de endereço e autenticação são obrigatórios."
                })
            }

            const user = await UserModel.findOne({
                auth0Id: auth0Id
            })

            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                })
            }

            let updatedAddress

            if (user.address) {
                updatedAddress = await AddressModel.findByIdAndUpdate(
                    user.address,
                    address,
                    { new: true, runValidators: true }
                )

            } else {
                updatedAddress = await AddressModel.create(address)
                user.address = updatedAddress._id

                await user.save()
            }

            const populatedUser = await UserModel.findById(user._id).populate("address")

            return res.status(200).json({
                message: user.address ? "Endereço atualizado com sucesso." : "Endereço criado e vinculado com sucesso.",
                user: populatedUser
            })

        } catch (error) {
            next(error)
        }
    }

    async getAddress(req, res, next) {
        const { sub: auth0Id } = req.user

        try {
            if (!auth0Id) {
                return res.status(400).json({
                    message: "Dados de autenticação são obrigatórios."
                })
            }

            const user = await UserModel.findOne({
                auth0Id: auth0Id
            })

            if (user) {
                const address = await AddressModel.findById(user.address)

                if (!address) {
                    return res.status(404).json({
                        message: "Endereço não encontrado."
                    })
                }

                return res.status(200).json({
                    message: "Endereço encontrado com sucesso.",
                    address
                })
            }

            return res.status(404).json({
                message: "Usuário não encontrado."
            })

        } catch (error) {
            next(error)
        }
    }
}

export default new UserServices()