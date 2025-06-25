import mongoose from "mongoose";
import ProductModel from "../../../src/models/ProductModel.js";
import CrudServices from "../../../src/services/CrudServices.js";

import app from "../../../src/app.js";

import { 
    ErroNotFound 
} from "../../../src/error/ErrorClasses.js";

const crud = new CrudServices(ProductModel)

describe('CrudServices', () => {
    beforeEach(async () => {
        await ProductModel.deleteMany({})
    })

    beforeAll(async ()=>{
        app.listen(5000)
    })

    afterAll(async () => {
        await mongoose.connection.close();
    })

    test('deve criar um registro', async () => {
        const data = {
            name: 'X-Burger',
            price: 20,
            description: "xburger",
            ingredients: ["pão", "hamburger"],
            imageSrc: "burger.png",
            category: 'burger',
            quantity: 100
        }
        const result = await crud.create(data)
        expect(result).toHaveProperty('_id')
        expect(result.name).toBe('X-Burger')
    })

    test('deve retornar todos os registros', async () => {
        await ProductModel.create({
            name: 'X-Burger',
            price: 20,
            description: "xburger",
            ingredients: ["pão", "hamburger"],
            imageSrc: "burger.png",
            category: 'burger',
            quantity: 100
        })
        await ProductModel.create({
            name: 'X-Burger 2',
            price: 20,
            description: "xburger",
            ingredients: ["pão", "hamburger"],
            imageSrc: "burger.png",
            category: 'burger',
            quantity: 100
        })
        const result = await crud.getAll()
        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toBe(2)
    })

    test('deve retornar um registro por ID', async () => {
        const produto = await ProductModel.create({
            name: 'X-Burger',
            price: 20,
            description: "xburger",
            ingredients: ["pão", "hamburger"],
            imageSrc: "burger.png",
            category: 'burger',
            quantity: 100
        })
        const result = await crud.getById(produto._id)
        expect(result).toHaveProperty('name', 'X-Burger')
    })

    test('deve lançar erro ao buscar por ID inexistente', async () => {
        await expect(crud.getById('123456789012345678901234')).rejects.toThrow(ErroNotFound)
    })

    test('deve atualizar um registro', async () => {
        const produto = await ProductModel.create({
            name: 'X-Burger',
            price: 20,
            description: "xburger",
            ingredients: ["pão", "hamburger"],
            imageSrc: "burger.png",
            category: 'burger',
            quantity: 100
        })
        const result = await crud.update(produto._id, { name: 'Produto Atualizado' })
        expect(result).toBe(true)
        const atualizado = await ProductModel.findById(produto._id)
        expect(atualizado.name).toBe('Produto Atualizado')
    })

    test('deve lançar erro ao atualizar registro inexistente', async () => {
        await expect(crud.update('123456789012345678901234', { name: 'Teste' })).rejects.toThrow(ErroNotFound);
    })

    test('deve deletar um registro', async () => {
        const produto = await ProductModel.create({
            name: 'X-Burger',
            price: 20,
            description: "xburger",
            ingredients: ["pão", "hamburger"],
            imageSrc: "burger.png",
            category: 'burger',
            quantity: 100
        })
        const result = await crud.delete(produto._id)
        expect(result).toBe(true)
        const deletado = await ProductModel.findById(produto._id)
        expect(deletado).toBeNull()
    })

    test('deve lançar erro ao deletar registro inexistente', async () => {
        await expect(crud.delete('123456789012345678901234')).rejects.toThrow(ErroNotFound)
    })

    test('deve deletar todos os registros', async () => {
        await ProductModel.create({
            name: 'X-Burger',
            price: 20,
            description: "xburger",
            ingredients: ["pão", "hamburger"],
            imageSrc: "burger.png",
            category: 'burger',
            quantity: 100
        })
        await ProductModel.create({
            name: 'X-Burger 2',
            price: 20,
            description: "xburger",
            ingredients: ["pão", "hamburger"],
            imageSrc: "burger.png",
            category: 'burger',
            quantity: 100
        })
        await crud.deleteAll()
        const count = await ProductModel.countDocuments()
        expect(count).toBe(0)
    })
})
