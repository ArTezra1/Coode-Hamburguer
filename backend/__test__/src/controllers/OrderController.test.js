import request from "supertest"
import mongoose from "mongoose"
import app from "../../../src/app.js"
import OrderModel from "../../../src/models/OrderModel.js"
import ProductModel from "../../../src/models/ProductModel.js"
import AddressModel from "../../../src/models/AddressModel.js"
import UserModel from "../../../src/models/UserModel.js"

describe("OrderController", () => {
    let productId
    let orderId
    let userId
    let addressId

    beforeAll(async () => {
        await OrderModel.deleteMany({})
        await ProductModel.deleteMany({})
        await UserModel.deleteMany({})
        await AddressModel.deleteMany({})

        const produto = await ProductModel.create({
            name: "X-Teste Pedido",
            price: 20,
            description: "Produto para pedido",
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

        addressId  = address._id

        const user = await UserModel.create({
            auth0Id: "auth|123",
            name: "Teste User",
            email: "user@user.gmail.com",
            address: addressId
        })

        userId = user._id
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    it("deve criar um pedido com sucesso", async () => {
        const pedido = {
            customer: userId,
            address: addressId,
            items: [
                {
                    product: productId,
                    quantity: 2,
                    unitPrice: 20,
                    category: "burger"
                }
            ],
            isDelivery: true,
            paymentMethod: "dinheiro",
            paymentStatus: "pago"
        }

        const response = await request(app)
            .post("/v1/orders")
            .send(pedido)
            .expect(201)

        expect(response.body).toHaveProperty("_id")
        expect(response.body.items[0].product).toBe(String(productId))
        orderId = response.body._id
    })

    it("deve listar todos os pedidos", async () => {
        const response = await request(app)
            .get("/v1/orders")
            .expect(200)

        expect(Array.isArray(response.body.items)).toBe(true)
        expect(response.body.items.length).toBeGreaterThan(0)
    })

    it("deve buscar um pedido por ID", async () => {
        const response = await request(app)
            .get(`/v1/orders/${orderId}`)
            .expect(200)

        expect(response.body).toHaveProperty("_id", orderId)
    })

    it("deve retornar erro ao criar pedido sem itens", async () => {
        const pedido = {
            customer: userId,
            address: addressId,
            items: [],
            isDelivery: true,
            paymentMethod: "dinheiro",
            paymentStatus: "pago"
        }

        const response = await request(app)
            .post("/v1/orders")
            .send(pedido)
            .expect(400)

        expect(response.body).toHaveProperty("message")
    })

    it("deve retornar erro ao buscar pedido inexistente", async () => {
        const idInexistente = "507f1f77bcf86cd799439011"
        const response = await request(app)
            .get(`/v1/orders/${idInexistente}`)
            .expect(404)

        expect(response.body).toHaveProperty("message")
    })
})