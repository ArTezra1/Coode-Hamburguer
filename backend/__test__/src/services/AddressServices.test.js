import mongoose from "mongoose";
import AddressModel from "../../../src/models/AddressModel.js";
import AddressServices from "../../../src/services/AddressServices.js";

import app from "../../../src/app.js";

import {
    ErroNotFound
} from "../../../src/error/ErrorClasses.js";

describe('AddressServices', () => {
    beforeEach(async () => {
        await AddressModel.deleteMany({})
    })

    beforeAll(async () => {
        app.listen(5000)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    test('deve criar um endereço', async () => {
        const data = {
            street: 'Rua Teste',
            number: 10,
            neighborhood: "joao",
            zipCode: '12345-678'
        }
        const result = await AddressServices.create(data)
        expect(result).toHaveProperty('_id')
        expect(result.street).toBe('Rua Teste')
    })

    test('deve retornar todos os endereços', async () => {
        await AddressModel.create({
            street: 'Rua Teste 1',
            number: 10,
            neighborhood: "joao",
            zipCode: '12345-678'
        })
        await AddressModel.create({
            street: 'Rua Teste 2',
            number: 10,
            neighborhood: "joao",
            zipCode: '12345-678'
        })
        const result = await AddressServices.getAll()
        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toBe(2)
    })

    test('deve retornar um endereço por ID', async () => {
        const endereco = await AddressModel.create({
            street: 'Rua Teste',
            number: 10,
            neighborhood: "joao",
            zipCode: '12345-678'
        })
        const result = await AddressServices.getById(endereco._id)
        expect(result).toHaveProperty('street', 'Rua Teste')
    })

    test('deve lançar erro ao buscar por ID inexistente', async () => {
        await expect(AddressServices.getById('123456789012345678901234')).rejects.toThrow(ErroNotFound)
    })

    test('deve atualizar um endereço', async () => {
        const endereco = await AddressModel.create({
            street: 'Rua Teste',
            number: 10,
            neighborhood: "joao",
            zipCode: '12345-678'
        })
        const result = await AddressServices.update(endereco._id, { street: 'Rua Atualizada' })
        expect(result).toBe(true)
        const atualizado = await AddressModel.findById(endereco._id)
        expect(atualizado.street).toBe('Rua Atualizada')
    })

    test('deve lançar erro ao atualizar endereço inexistente', async () => {
        await expect(AddressServices.update('123456789012345678901234', { street: 'Teste' })).rejects.toThrow(ErroNotFound)
    })

    test('deve deletar um endereço', async () => {
        const endereco = await AddressModel.create({
            street: 'Rua Teste',
            number: 10,
            neighborhood: "joao",
            zipCode: '12345-678'
        })
        const result = await AddressServices.delete(endereco._id)
        expect(result).toBe(true)
        const deletado = await AddressModel.findById(endereco._id)
        expect(deletado).toBeNull()
    })

    test('deve lançar erro ao deletar endereço inexistente', async () => {
        await expect(AddressServices.delete('123456789012345678901234')).rejects.toThrow(ErroNotFound)
    })
})
