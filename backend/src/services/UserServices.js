import CrudServices from "./CrudServices.js";
import UserModel from "../models/UserModel.js";
import AddressModel from "../models/AddressModel.js";

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

            const token = jsonwebtoken.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            )

            return res.status(200).json({
                message: "Login realizado com sucesso..",
                token,
                user
            })

        } catch (error) {
            next(error)
        }
    }

    async getOrders(req, res, next) {

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

            const newAddress = await AddressModel.create(address)

            const user = await UserModel.findOneAndUpdate(
                { auth0Id },
                { address: newAddress._id },
                { new: true }
            ).populate("Address")

            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado." 
                })
            }

            return res.status(200).json({
                message: "Endereço criado e vinculado com sucesso.",
                user
            })

        } catch (error) {
            next(error)
        }

    }
}

export default new UserServices()