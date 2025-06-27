import CrudServices from "./CrudServices.js";
import UserModel from "../models/UserModel.js";
import AddressModel from "../models/AddressModel.js";
import OrderModel from "../models/OrderModel.js"

import dotenv from "dotenv"

dotenv.config()

import {
    ErroBadRequest,
    ErroNotFound,
    ErroAuthentication
} from "../error/ErrorClasses.js";

class UserServices extends CrudServices {
    constructor() {
        super(UserModel)
    }

    async login({ auth0Id, email, name }) {
        if (!auth0Id || !email || !name) {
            throw new ErroBadRequest("Preencha todos os campos corretamente.")
        }

        let user = await UserModel.findOne({ auth0Id })

        if (!user) {
            user = await UserModel.create({
                auth0Id,
                name,
                email
            })
        }

        return {
            message: "Login realizado com sucesso.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        }
    }

    async getOrders(auth0Id) {
        if (!auth0Id) {
            throw new ErroAuthentication("Dados de autenticação são obrigatórios.")
        }

        const user = await UserModel.findOne({
            auth0Id: auth0Id
        })

        if (!user) {
            throw new ErroNotFound("Usuário não encontrado.")
        }

        const orders = await OrderModel.find({
            customer: user._id
        })

        if (!orders || orders.length === 0) {
            throw new ErroNotFound("Nenhum pedido encontrado.")
        }

        return {
            message: "Pedidos encontrados com sucesso.",
            orders: orders
        }
    }

    async updateAddress(auth0Id, address) {
        if (!auth0Id || !address) {
            throw new ErroAuthentication("Dados de endereço e autenticação são obrigatórios.")
        }

        const user = await UserModel.findOne({
            auth0Id: auth0Id
        })

        if (!user) {
            throw new ErroNotFound("Usuário não encontrado.")
        }

        let updatedAddress

        if (user.address) {
            updatedAddress = await AddressModel.findByIdAndUpdate(
                user.address,
                address,
                { new: true, runValidators: true }
            )

        } else {
            updatedAddress = await AddressModel.create({
                userId: user._id,
                ...address
            })
            user.address = updatedAddress._id

            await user.save()
        }

        const populatedUser = await UserModel.findById(user._id).populate("address")

        return {
            message: user.address ? "Endereço atualizado com sucesso." : "Endereço criado e vinculado com sucesso.",
            user: populatedUser
        }
    }

    async getAddress(auth0Id) {

        if (!auth0Id) {
            throw new ErroAuthentication("Dados de autenticação são obrigatórios.")
        }

        const user = await UserModel.findOne({
            auth0Id: auth0Id
        })

        if (!user) {
            throw new ErroNotFound("Usuário não encontrado.")
        }

        const address = await AddressModel.findById(user.address)

        if (!address) {
            throw new ErroNotFound("Endereço não encontrado.")
        }

        return {
            message: "Endereço encontrado com sucesso.",
            address
        }
    }
}

export default new UserServices()