import request from "supertest"
import mongoose from "mongoose"
import app from "../../../src/app.js"
import ProductModel from "../../../src/models/ProductModel.js"

describe("ProductsController", () => {
    let produtoId

    beforeAll(async () => {
        app.listen(5000)

        await ProductModel.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    it("deve criar um produto com sucesso", async () => {
        const produto = {
            name: "X-Teste",
            price: 10.5,
            description: "Produto de teste",
            category: "burger",
            imageSrc: "burger.png",
            ingredients: ["pão", "carne"],
            quantity: 5
        }

        const imageMock = {
            fileName: "burger.png"
        }

        const response = await request(app)
            .post("/v1/products")
            .send(produto)
            .expect(201)

        expect(response.body).toHaveProperty("_id")
        expect(response.body.name).toBe(produto.name)
        produtoId = response.body._id
    })

    it("deve listar todos os produtos", async () => {
        const response = await request(app)
            .get("/v1/products")
            .expect(200)

        expect(Array.isArray(response.body.items)).toBe(true)
        expect(response.body.items.length).toBeGreaterThan(0)
    })

    it("deve buscar um produto por ID", async () => {
        const response = await request(app)
            .get(`/v1/products/${produtoId}`)
            .expect(200)

        expect(response.body).toHaveProperty("_id", produtoId)
    })

    it("deve atualizar um produto", async () => {
        const novoNome = "X-Teste Atualizado"
        const response = await request(app)
            .put(`/v1/products/${produtoId}`)
            .send({ name: novoNome })
            .expect(200)

        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toMatch(/atualizado/i)
    })

    it("deve deletar um produto", async () => {
        const response = await request(app)
            .delete(`/v1/products/${produtoId}`)
            .expect(200)

        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toMatch(/deletado/i)
    })

    it("deve retornar erro ao buscar produto inexistente", async () => {
        const idInexistente = "507f1f77bcf86cd799439011"
        const response = await request(app)
            .get(`/v1/products/${idInexistente}`)
            .expect(404)

        expect(response.body).toHaveProperty("message")
    })
})