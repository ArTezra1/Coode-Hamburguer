import mongoose from "mongoose";
import SalesModel from "../../../src/models/SalesModel.js";
import OrderModel from "../../../src/models/OrderModel.js";
import ProductModel from "../../../src/models/ProductModel.js";
import SalesServices from "../../../src/services/SalesServices.js";

import app from "../../../src/app.js";

import {
    ErroBadRequest
} from "../../../src/error/ErrorClasses.js";

describe('SalesServices', () => {
    beforeEach(async () => {
        await SalesModel.deleteMany({})
        await OrderModel.deleteMany({})
        await ProductModel.deleteMany({})
    })

    beforeAll(async () => {
        app.listen(5000)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    describe('createSale', () => {
        test('deve criar vendas a partir de pedidos pagos', async () => {
            const produto = await ProductModel.create({
                name: 'X-Burger',
                price: 20,
                description: "xburger",
                ingredients: ["pão", "hamburger"],
                imageSrc: "burger.png",
                category: 'burger',
                quantity: 100
            })

            await OrderModel.create({
                customer: new mongoose.Types.ObjectId(),
                address: new mongoose.Types.ObjectId(),
                items: [
                    { product: produto._id, category: 'burger', quantity: 2, unitPrice: 20 }
                ],
                totalPrice: 40,
                isDelivery: true,
                paymentMethod: 'dinheiro',
                paymentStatus: 'pago'
            })

            const result = await SalesServices.createSale()
            expect(result.message).toBe("Vendas registradas com sucesso")
            expect(Array.isArray(result.data)).toBe(true)
            expect(result.data.length).toBe(1)
            expect(result.data[0]).toMatchObject({
                product: produto._id,
                category: 'burger',
                productCountSale: 2,
                productTotalSale: 40
            })
        })

        test('deve retornar mensagem adequada quando não há vendas', async () => {
            const result = await SalesServices.createSale()
            expect(result.message).toBe("Nenhuma venda.")
            expect(Array.isArray(result.data)).toBe(true)
            expect(result.data.length).toBe(0)
        })
    })

    describe('getByGroups', () => {
        test('deve lançar erro se não informar o grupo', async () => {
            await expect(SalesServices.getByGroups()).rejects.toThrow(ErroBadRequest)
        })

        test('deve lançar erro se informar grupo inválido', async () => {
            await expect(SalesServices.getByGroups('invalido')).rejects.toThrow(ErroBadRequest)
        })

        test('deve agrupar vendas por categoria corretamente', async () => {
            const produto = await ProductModel.create({
                name: 'X-Burger',
                price: 20,
                description: "xburger",
                ingredients: ["pão", "hamburger"],
                imageSrc: "burger.png",
                category: 'burger',
                quantity: 100
            })

            await SalesModel.create({
                product: produto._id,
                category: 'burger',
                productCountSale: 2,
                productTotalSale: 40
            })

            const result = await SalesServices.getByGroups('burger')
            expect(Array.isArray(result)).toBe(true)
            expect(result.length).toBeGreaterThanOrEqual(1)
            expect(result[0]).toHaveProperty('productId')
            expect(result[0]).toHaveProperty('productModel', 'burger')
            expect(result[0]).toHaveProperty('totalQuantity')
            expect(result[0]).toHaveProperty('totalRevenue')
        })
    })
})
