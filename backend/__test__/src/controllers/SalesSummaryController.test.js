import request from "supertest"
import mongoose from "mongoose"
import app from "../../../src/app.js"
import SalesSummaryModel from "../../../src/models/SalesSummaryModel.js"

describe("SalesSummaryController", () => {
    beforeAll(async () => {
        await SalesSummaryModel.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    it("deve criar um resumo diário de vendas", async () => {
        const response = await request(app)
            .post("/v1/summarys")
            .send({ periodType: "daily" })
            .expect(201)

        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("periodType", "daily")
    })

    it("deve criar um resumo semanal de vendas", async () => {
        const response = await request(app)
            .post("/v1/summarys")
            .send({ periodType: "weekly" })
            .expect(201)

        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("periodType", "weekly")
    })

    it("deve criar um resumo mensal de vendas", async () => {
        const response = await request(app)
            .post("/v1/summarys")
            .send({ periodType: "monthly" })
            .expect(201)

        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("periodType", "monthly")
    })

    it("deve retornar erro ao criar resumo com período inválido", async () => {
        const response = await request(app)
            .post("/v1/summarys")
            .send({ periodType: "anual" })
            .expect(400)

        expect(response.body).toHaveProperty("message")
    })

    it("deve buscar resumos diários", async () => {
        const response = await request(app)
            .get("/v1/summarys")
            .query({ periodType: "daily" })
            .expect(200)

        expect(Array.isArray(response.body.items)).toBe(true)
    })
})