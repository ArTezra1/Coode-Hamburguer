import request from "supertest"
import mongoose from "mongoose"
import app from "../../../src/app.js"
import UserModel from "../../../src/models/UserModel.js"
import OrderModel from "../../../src/models/OrderModel.js"
import AddressModel from "../../../src/models/AddressModel.js"

describe("UserController", () => {
    let auth0Id = "auth|test123"
    let userId
    let addressId

    beforeAll(async () => {
        await UserModel.deleteMany({})
        await OrderModel.deleteMany({})
        await AddressModel.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    it("deve realizar login e criar usuário se não existir", async () => {
        const response = await request(app)
            .post("/v1/login")
            .send({
                auth0Id,
                name: "Usuário Teste",
                email: "teste@teste.com"
            })
            .expect(200)

        expect(response.body).toHaveProperty("message")
        expect(response.body.user).toHaveProperty("id")
        userId = response.body.user.id
    })

    it("deve retornar erro ao tentar login com campos faltando", async () => {
        const response = await request(app)
            .post("/v1/login")
            .send({
                auth0Id,
                name: "Usuário Teste"
            })
            .expect(400)

        expect(response.body).toHaveProperty("message")
    })

    it("deve atualizar/criar endereço do usuário", async () => {
        const endereco = {
            street: "Rua Teste",
            number: 123,
            neighborhood: "pep",
            zipCode: "12345-678"
        }

        const response = await request(app)
            .put(`/v1/users/${auth0Id}/address`)
            .send(endereco)
            .expect(200)

        expect(response.body).toHaveProperty("message")
        expect(response.body).toHaveProperty("address")
        addressId = response.body.address._id
    })

    it("deve buscar endereço do usuário", async () => {
        const response = await request(app)
            .get(`/v1/users/${auth0Id}/address`)
            .expect(200)

        expect(response.body).toHaveProperty("address")
        expect(response.body.address).toHaveProperty("street", "Rua Teste")
    })

    it("deve retornar erro ao buscar pedidos sem auth0Id", async () => {
        const response = await request(app)
            .get("/v1/users//orders")
            .expect(401)

        expect(response.body).toHaveProperty("message")
    })

    it("deve retornar erro ao buscar pedidos de usuário inexistente", async () => {
        const response = await request(app)
            .get("/v1/users/auth|naoexiste/orders")
            .expect(404)

        expect(response.body).toHaveProperty("message")
    })

    it("deve retornar erro ao buscar endereço de usuário inexistente", async () => {
        const response = await request(app)
            .get("/v1/users/auth|naoexiste/address")
            .expect(404)

        expect(response.body).toHaveProperty("message")
    })
})