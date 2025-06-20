import ProductModel from "../../../src/models/ProductModel.js"
import ProductServices from "../../../src/services/ProductServices.js"
import mongoose from "mongoose"
import { ErroValidation, ErroNotFound } from "../../../src/error/ErrorClasses.js"

describe('ProductServices Tests', () => {
    let server;
    
    beforeEach(async () => {
        await ProductModel.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    describe('Método createProduct', () => {
        test('deve criar um produto com sucesso quando dados válidos são fornecidos', async () => {
            const produtoMock = {
                name: 'X-Burger',
                price: 15.90,
                description: 'Hambúrguer delicioso',
                category: 'burger',
                ingredients: ['pão', 'hambúrguer', 'queijo'],
                isAvailable: true,
                quantity: 10
            }

            const fileMock = {
                filename: 'burger.jpg'
            }

            const result = await ProductServices.createProduct(produtoMock, fileMock)

            expect(result).toMatchObject({
                name: produtoMock.name,
                price: produtoMock.price,
                description: produtoMock.description,
                category: produtoMock.category,
                ingredients: produtoMock.ingredients,
                isAvailable: produtoMock.isAvailable,
                quantity: produtoMock.quantity,
                imageSrc: expect.stringContaining(fileMock.filename)
            })
        })

        test('deve lançar erro ao tentar criar produto sem nome', async () => {
            const produtoInvalido = {
                price: 15.90,
                category: 'burger'
            }

            const fileMock = {
                filename: 'burger.jpg'
            }

            await expect(ProductServices.createProduct(produtoInvalido, fileMock))
                .rejects.toThrow('Nome é obrigatório')
        })

        test('deve lançar erro ao tentar criar produto sem categoria', async () => {
            const produtoInvalido = {
                name: 'X-Burger',
                price: 15.90
            }

            const fileMock = {
                filename: 'burger.jpg'
            }

            await expect(ProductServices.createProduct(produtoInvalido, fileMock))
                .rejects.toThrow('Categoria é obrigatória')
        })

        test('deve lançar erro ao tentar criar produto sem imagem', async () => {
            const produtoMock = {
                name: 'X-Burger',
                price: 15.90,
                category: 'burger'
            }

            await expect(ProductServices.createProduct(produtoMock))
                .rejects.toThrow('Imagem é obrigatória')
        })
    })

    // describe('Método getAll', () => {
    //     test('deve retornar todos os produtos de uma categoria específica', async () => {
    //         const produtos = [
    //             {
    //                 name: 'X-Burger',
    //                 price: 15.90,
    //                 category: 'burger',
    //                 imageSrc: 'images/burger.jpg',
    //                 quantity: 10
    //             },
    //             {
    //                 name: 'X-Salada',
    //                 price: 17.90,
    //                 category: 'burger',
    //                 imageSrc: 'images/burger2.jpg',
    //                 quantity: 10
    //             }
    //         ]

    //         await ProductModel.insertMany(produtos)

    //         const result = await ProductServices.getAll({ category: 'burger' })

    //         expect(result).not.toBeNull()
    //         expect(Array.isArray(result)).toBe(true)
    //         expect(result.length).toBe(2)
    //         expect(result[0]).toHaveProperty('name', 'X-Burger')
    //         expect(result[1]).toHaveProperty('name', 'X-Salada')
    //     })

    //     test('deve retornar null quando categoria não é fornecida', async () => {
    //         const result = await ProductServices.getAll({})
    //         expect(result).toBeNull()
    //     })

    //     test('deve filtrar produtos por preço', async () => {
    //         const produtos = [
    //             {
    //                 name: 'X-Burger',
    //                 price: 15.90,
    //                 category: 'burger',
    //                 imageSrc: 'images/burger.jpg',
    //                 quantity: 10
    //             },
    //             {
    //                 name: 'X-Especial',
    //                 price: 25.90,
    //                 category: 'burger',
    //                 imageSrc: 'images/burger2.jpg',
    //                 quantity: 10
    //             }
    //         ]

    //         await ProductModel.insertMany(produtos)

    //         const result = await ProductServices.getAll({
    //             category: 'burger',
    //             price_lte: 20
    //         })

    //         expect(result).not.toBeNull()
    //         expect(Array.isArray(result)).toBe(true)
    //         expect(result.length).toBe(1)
    //         expect(result[0]).toHaveProperty('name', 'X-Burger')
    //     })
    // })

    // describe('Método getProductsByCategory', () => {
    //     test('deve retornar produtos com projeção correta para categoria burger', async () => {
    //         const burgerMock = {
    //             name: 'X-Burger',
    //             price: 15.90,
    //             category: 'burger',
    //             ingredients: ['pão', 'hambúrguer'],
    //             brand: 'Marca Teste',
    //             itensCombo: [],
    //             imageSrc: 'images/burger.jpg',
    //             quantity: 10
    //         }

    //         await ProductModel.create(burgerMock)

    //         const result = await ProductServices.getProductsByCategory('burger', {}, {})
    //         const burger = await result.exec()

    //         expect(burger[0]._doc).not.toHaveProperty('__v')
    //         expect(burger[0]._doc).not.toHaveProperty('updatedAt')
    //         expect(burger[0]._doc).not.toHaveProperty('createdAt')
    //         expect(burger[0]._doc).not.toHaveProperty('brand')
    //         expect(burger[0]._doc).not.toHaveProperty('itensCombo')
    //     })

    //     test('deve popular itensCombo quando categoria é combo', async () => {
    //         // Cria produtos para o combo
    //         const burger = await ProductModel.create({
    //             name: 'X-Burger',
    //             price: 15.90,
    //             category: 'burger',
    //             imageSrc: 'images/burger.jpg',
    //             quantity: 10
    //         })

    //         const drink = await ProductModel.create({
    //             name: 'Refrigerante',
    //             price: 5.90,
    //             category: 'drink',
    //             imageSrc: 'images/drink.jpg',
    //             quantity: 10
    //         })

    //         const combo = await ProductModel.create({
    //             name: 'Combo X-Burger',
    //             price: 20.90,
    //             category: 'combo',
    //             itensCombo: [burger._id, drink._id],
    //             imageSrc: 'images/combo.jpg',
    //             quantity: 10
    //         })

    //         const result = await ProductServices.getProductsByCategory('combo', {}, {})
    //         const comboPopulated = await result.exec()

    //         expect(comboPopulated[0].itensCombo).toHaveLength(2)
    //         expect(comboPopulated[0].itensCombo[0]).toHaveProperty('name')
    //         expect(comboPopulated[0].itensCombo[1]).toHaveProperty('name')
    //     })
    // })
})
