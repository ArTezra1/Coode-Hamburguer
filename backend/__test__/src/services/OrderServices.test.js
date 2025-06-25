import mongoose from "mongoose";
import OrderModel from "../../../src/models/OrderModel.js";
import ProductModel from "../../../src/models/ProductModel.js";
import OrderServices from "../../../src/services/OrderServices.js";

import app from "../../../src/app.js";

import {
    ErroBadRequest,
    ErroNotFound
} from "../../../src/error/ErrorClasses.js";

describe('OrderServices', () => {
    beforeEach(async () => {
        await OrderModel.deleteMany({})
        await ProductModel.deleteMany({})
    })

    beforeAll(async () => {
        app.listen(5000)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    describe('createOrder', () => {
        test('deve criar um pedido com sucesso', async () => {
            const produto = await ProductModel.create({
                name: 'X-Burger',
                price: 20,
                description: "xburger",
                ingredients: ["pão", "hamburger"],
                imageSrc: "burger.png",
                category: 'burger',
                quantity: 100
            })

            const orderData = {
                customer: new mongoose.Types.ObjectId(),
                address: new mongoose.Types.ObjectId(),
                items: [
                    { product: produto._id, category: 'burger', quantity: 2 }
                ],
                isDelivery: true,
                paymentMethod: 'dinheiro',
                paymentStatus: 'pago'
            }

            const order = await OrderServices.createOrder(orderData);

            expect(order).toHaveProperty('_id')
            expect(order.items[0]).toMatchObject({
                product: produto._id,
                category: 'burger',
                quantity: 2,
                unitPrice: produto.price
            })
            expect(order.totalPrice).toBe(produto.price * 2)
            expect(order.paymentStatus).toBe('pago')
        })

        test('deve lançar erro ao criar pedido sem itens', async () => {
            const orderData = {
                customer: new mongoose.Types.ObjectId(),
                address: new mongoose.Types.ObjectId(),
                items: [],
                isDelivery: true,
                paymentMethod: 'dinheiro'
            }
            await expect(OrderServices.createOrder(orderData)).rejects.toThrow(ErroBadRequest)
        })

        test('deve lançar erro ao criar pedido com produto inexistente', async () => {
            const orderData = {
                customer: new mongoose.Types.ObjectId(),
                address: new mongoose.Types.ObjectId(),
                items: [
                    { product: new mongoose.Types.ObjectId(), category: 'burger', quantity: 1 }
                ],
                isDelivery: true,
                paymentMethod: 'dinheiro'
            }
            await expect(OrderServices.createOrder(orderData)).rejects.toThrow(ErroNotFound)
        })
    })

    describe('getAllOrders', () => {
        test('deve retornar todos os pedidos', async () => {
            const produto = await ProductModel.create({
                name: 'X-Burger',
                price: 20,
                description: "xburger",
                ingredients: ["pão", "hamburger"],
                imageSrc: "burger.png",
                category: 'burger',
                quantity: 100
            })

            await OrderServices.createOrder({
                customer: new mongoose.Types.ObjectId(),
                address: new mongoose.Types.ObjectId(),
                items: [
                    { product: produto._id, category: 'burger', quantity: 2 }
                ],
                isDelivery: true,
                paymentMethod: 'dinheiro',
                paymentStatus: 'pago'
            })

            const orders = await OrderServices.getAllOrders()
            expect(Array.isArray(orders)).toBe(true)
            expect(orders.length).toBeGreaterThanOrEqual(1)
            expect(orders[0]).toHaveProperty('items')
            expect(orders[0]).toHaveProperty('totalPrice')
        })
    })
})
