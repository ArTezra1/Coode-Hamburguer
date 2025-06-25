import mongoose from "mongoose";
import SalesSummaryModel from "../../../src/models/SalesSummaryModel.js";
import SalesModel from "../../../src/models/SalesModel.js";
import SalesSummaryServices from "../../../src/services/SalesSummaryServices.js";

import app from "../../../src/app.js";

import {
    ErroBadRequest
} from "../../../src/error/ErrorClasses.js";

describe('SalesSummaryServices', () => {
    beforeEach(async () => {
        await SalesSummaryModel.deleteMany({})
        await SalesModel.deleteMany({})
    })

    beforeAll(async () => {
        app.listen(5000)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    describe('createSummary', () => {
        test('deve criar resumo diário com vendas', async () => {
            await SalesModel.create({
                product: new mongoose.Types.ObjectId(),
                category: 'burger',
                productCountSale: 2,
                productTotalSale: 40,
                saleDate: new Date()
            })

            const summary = await SalesSummaryServices.createSummary('daily')
            expect(summary).toHaveProperty('periodType', 'daily')
            expect(summary.totalSales).toBeGreaterThan(0)
            expect(summary.totalOrders).toBeGreaterThan(0)
        })

        test('deve criar resumo semanal e mensal mesmo sem vendas', async () => {
            const summaryWeek = await SalesSummaryServices.createSummary('weekly')
            expect(summaryWeek).toHaveProperty('periodType', 'weekly')
            expect(summaryWeek.totalSales).toBe(0)
            expect(summaryWeek.totalOrders).toBe(0)

            const summaryMonth = await SalesSummaryServices.createSummary('monthly')
            expect(summaryMonth).toHaveProperty('periodType', 'monthly')
            expect(summaryMonth.totalSales).toBe(0)
            expect(summaryMonth.totalOrders).toBe(0)
        })

        test('deve lançar erro ao criar resumo com período inválido', async () => {
            await expect(SalesSummaryServices.createSummary('ano')).rejects.toThrow(ErroBadRequest)
        })
    })

    describe('getByDate', () => {
        test('deve buscar resumo por tipo de período', async () => {
            await SalesSummaryModel.create({
                periodType: 'daily',
                period: '2025-06-25',
                totalSales: 100,
                totalOrders: 5
            })
            const result = await SalesSummaryServices.getByDate('daily')
            expect(Array.isArray(result)).toBe(true)
            expect(result.length).toBeGreaterThanOrEqual(1)
            expect(result[0]).toHaveProperty('periodType', 'daily')
        })

        test('deve lançar erro ao buscar resumo sem informar tipo', async () => {
            await expect(SalesSummaryServices.getByDate()).rejects.toThrow(ErroBadRequest)
        })

        test('deve lançar erro ao buscar resumo com tipo inválido', async () => {
            await expect(SalesSummaryServices.getByDate('ano')).rejects.toThrow(ErroBadRequest)
        })
    })
})
