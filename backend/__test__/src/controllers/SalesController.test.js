import request from "supertest"
import mongoose from "mongoose"
import app from "../../../src/app.js"
import SalesModel from "../../../src/models/SalesModel.js"
import OrderModel from "../../../src/models/OrderModel.js"
import ProductModel from "../../../src/models/ProductModel.js"
import AddressModel from "../../../src/models/AddressModel.js"
import UserModel from "../../../src/models/UserModel.js"

describe("SalesController", () => {
    let productId
    let addressId
    let userId

    beforeAll(async () => {
        await SalesModel.deleteMany({})
        await OrderModel.deleteMany({})
        await ProductModel.deleteMany({})
        await UserModel.deleteMany({})
        await AddressModel.deleteMany({})

        const produto = await ProductModel.create({
            name: "X-Sale",
            price: 25,
            description: "Produto para venda",
            category: "burger",
            imageSrc: "burger.png",
            ingredients: ["pão", "carne"],
            quantity: 10
        })
        productId = produto._id

        const address = await AddressModel.create({
            street: "Rua Teste",
            number: "123",
            neighborhood: "bairro teste",
            zipCode: "12345-678"
        })

        addressId = address._id

        const user = await UserModel.create({
            auth0Id: "auth|123",
            name: "Teste User",
            email: "user@user.gmail.com",
            address: addressId
        })

        userId = user._id

        await OrderModel.create({
            customer: userId,
            address: addressId,
            items: [
                {
                    product: productId,
                    quantity: 2,
                    unitPrice: 25,
                    category: "burger"
                }
            ],
            totalPrice: 50,
            isDelivery: true,
            paymentMethod: "dinheiro",
            paymentStatus: "pago"
        })
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    it("deve criar vendas a partir de pedidos pagos", async () => {
        const response = await request(app)
            .post("/v1/sales")
            .expect(201)

        expect(response.body).toHaveProperty("message")
        expect(Array.isArray(response.body.data)).toBe(true)
        expect(response.body.data.length).toBeGreaterThan(0)
    })

    it("deve agrupar vendas por categoria", async () => {
        const response = await request(app)
            .get("/v1/sales")
            .query({ group: "burger" })
            .expect(200)

        expect(Array.isArray(response.body.items)).toBe(true)
        if (response.body.length > 0) {
            expect(response.body.items[0]).toHaveProperty("productModel", "burger")
        }
    })

    it("deve retornar erro ao agrupar vendas com categoria inválida", async () => {
        const response = await request(app)
            .get("/v1/sales")
            .query({ group: "pizza" })
            .expect(400)

        expect(response.body).toHaveProperty("message")
    })
})