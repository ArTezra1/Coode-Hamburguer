import mongoose from "mongoose";
import UserModel from "../../../src/models/UserModel.js";
import AddressModel from "../../../src/models/AddressModel.js";
import OrderModel from "../../../src/models/OrderModel.js";
import UserServices from "../../../src/services/UserServices.js";

import app from "../../../src/app.js";

import {
    ErroBadRequest,
    ErroNotFound,
    ErroAuthentication
} from "../../../src/error/ErrorClasses.js";

describe('UserServices', () => {
    beforeEach(async () => {
        await UserModel.deleteMany({})
        await AddressModel.deleteMany({})
        await OrderModel.deleteMany({})
    })

    beforeAll(async () => {
        app.listen(5000)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    describe('login', () => {
        test('deve criar usuário novo e retornar mensagem de sucesso', async () => {
            const data = { auth0Id: 'auth0|123', email: 'user@email.com', name: 'User' }
            const result = await UserServices.login(data)
            expect(result).toHaveProperty('message', 'Login realizado com sucesso.')
            expect(result.user).toHaveProperty('name', 'User')
        })

        test('deve retornar usuário existente', async () => {
            await UserModel.create({ auth0Id: 'auth0|123', email: 'user@email.com', name: 'User' })
            const data = { auth0Id: 'auth0|123', email: 'user@email.com', name: 'User' }
            const result = await UserServices.login(data)
            expect(result.user).toHaveProperty('name', 'User')
        })

        test('deve lançar erro se faltar campos obrigatórios', async () => {
            await expect(UserServices.login({})).rejects.toThrow(ErroBadRequest)
        })
    })

    describe('getOrders', () => {
        test('deve retornar pedidos do usuário', async () => {
            const user = await UserModel.create({ auth0Id: 'auth0|321', email: 'user2@email.com', name: 'User2' })
            await OrderModel.create({
                customer: user._id,
                items: [],
                totalPrice: 10,
                paymentMethod: "pix"
            })
            const result = await UserServices.getOrders('auth0|321')
            expect(result).toHaveProperty('orders')
            expect(Array.isArray(result.orders)).toBe(true)
        })

        test('deve lançar erro se não encontrar usuário', async () => {
            await expect(UserServices.getOrders('inexistente')).rejects.toThrow(ErroNotFound)
        })

        test('deve lançar erro se não houver pedidos', async () => {
            const user = await UserModel.create({ auth0Id: 'auth0|noorders', email: 'noorders@email.com', name: 'NoOrders' })
            await expect(UserServices.getOrders('auth0|noorders')).rejects.toThrow(ErroNotFound)
        })

        test('deve lançar erro se não passar auth0Id', async () => {
            await expect(UserServices.getOrders()).rejects.toThrow(ErroAuthentication)
        })
    })

    describe('updateAddress', () => {
        test('deve criar endereço para usuário sem endereço', async () => {
            const user = await UserModel.create({ auth0Id: 'auth0|add', email: 'add@email.com', name: 'Add' })
            const address = {
                street: 'Rua',
                number: 10,
                neighborhood: "joao",
                neighborhood: 'UF',
                zipCode: '12345-678'
            }
            const result = await UserServices.updateAddress('auth0|add', address);
            expect(result.user.address).toBeDefined()
            expect(result.user.address.street).toBe('Rua')
        })

        test('deve atualizar endereço de usuário já existente', async () => {
            const address = await AddressModel.create({
                street: 'Antiga',
                number: 10,
                neighborhood: 'UF',
                zipCode: '00000-000'
            })
            const user = await UserModel.create({ auth0Id: 'auth0|upd', email: 'upd@email.com', name: 'Upd', address: address._id })
            const novoEndereco = { street: 'Nova', number: 10, neighborhood: 'UF', zipCode: '11111-111' }
            const result = await UserServices.updateAddress('auth0|upd', novoEndereco)
            expect(result.user.address.street).toBe('Nova')
        })

        test('deve lançar erro se faltar auth0Id ou address', async () => {
            await expect(UserServices.updateAddress()).rejects.toThrow(ErroAuthentication)
        })

        test('deve lançar erro se usuário não existir', async () => {
            const address = { street: 'Rua', number: 10, neighborhood: 'UF', zipCode: '12345-678' }
            await expect(UserServices.updateAddress('inexistente', address)).rejects.toThrow(ErroNotFound)
        })
    })

    describe('getAddress', () => {
        test('deve retornar endereço do usuário', async () => {
            const address = await AddressModel.create({ street: 'Rua', number: 10, neighborhood: 'UF', zipCode: '12345-678' })
            await UserModel.create({ auth0Id: 'auth0|get', email: 'get@email.com', name: 'Get', address: address._id })
            const result = await UserServices.getAddress('auth0|get')
            expect(result.address).toHaveProperty('street', 'Rua')
        })

        test('deve lançar erro se não passar auth0Id', async () => {
            await expect(UserServices.getAddress()).rejects.toThrow(ErroAuthentication)
        })

        test('deve lançar erro se usuário não existir', async () => {
            await expect(UserServices.getAddress('inexistente')).rejects.toThrow(ErroNotFound)
        })

        test('deve lançar erro se endereço não existir', async () => {
            await UserModel.create({ auth0Id: 'auth0|noaddr', email: 'noaddr@email.com', name: 'NoAddr', address: new mongoose.Types.ObjectId() })
            await expect(UserServices.getAddress('auth0|noaddr')).rejects.toThrow(ErroNotFound)
        })
    })
})
