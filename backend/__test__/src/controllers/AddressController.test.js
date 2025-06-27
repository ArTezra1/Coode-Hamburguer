import request from "supertest"
import mongoose from "mongoose"
import app from "../../../src/app.js"
import AddressModel from "../../../src/models/AddressModel.js"

describe("AddressController", () => {
    let addressId

    beforeAll(async () => {
        await AddressModel.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    it("deve criar um endereço com sucesso", async () => {
        const endereco = {
            street: "Rua Teste",
            number: "123",
            neighborhood: "bairro teste",
            zipCode: "12345-678"
        }

        const response = await request(app)
            .post("/v1/addresses")
            .send(endereco)
            .expect(201)

        expect(response.body).toHaveProperty("_id")
        expect(response.body.street).toBe(endereco.street)
        addressId = response.body._id
    })

    it("deve listar todos os endereços", async () => {
        const response = await request(app)
            .get("/v1/addresses")
            .expect(200)

        expect(Array.isArray(response.body.items)).toBe(true)
        expect(response.body.items.length).toBeGreaterThan(0)
    })

    it("deve buscar um endereço por ID", async () => {
        const response = await request(app)
            .get(`/v1/addresses/${addressId}`)
            .expect(200)

        expect(response.body).toHaveProperty("_id", addressId)
    })

    it("deve atualizar um endereço", async () => {
        const novoNumero = "456"
        const response = await request(app)
            .put(`/v1/addresses/${addressId}`)
            .send({ number: novoNumero })
            .expect(200)
    })

    it("deve deletar um endereço", async () => {
        const response = await request(app)
            .delete(`/v1/addresses/${addressId}`)
            .expect(204)
    })

    it("deve retornar erro ao buscar endereço inexistente", async () => {
        const idInexistente = "507f1f77bcf86cd799439011"
        const response = await request(app)
            .get(`/v1/addresses/${idInexistente}`)
            .expect(404)

        expect(response.body).toHaveProperty("message")
    })
})