import ProductModel from "../../../src/models/ProductModel.js"
import ProductServices from "../../../src/services/ProductServices.js"
import app from "../../../src/app.js"
import mongoose from "mongoose"
import {
    ErroNotFound,
    ErroBadRequest
} from "../../../src/error/ErrorClasses.js"

describe('ProductServices Tests', () => {
    beforeEach(async () => {
        await ProductModel.deleteMany({})
    })

    beforeAll(async ()=>{
        app.listen(5000)
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
                description: 'Hambúrguer delicioso',
                category: 'burger',
                ingredients: ['pão', 'hambúrguer', 'queijo'],
                isAvailable: true,
                quantity: 10
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
                .rejects.toThrow('Categoria inválida')
        })

        test('deve lançar erro ao tentar criar produto sem imagem', async () => {
            const produtoMock = {
                name: 'X-Burger',
                price: 15.90,
                ingredients: ['pão', 'hambúrguer', 'queijo'],
                description: 'Hambúrguer delicioso',
                category: 'burger',
                quantity: 10
            }

            await expect(ProductServices.createProduct(produtoMock))
                .rejects.toThrow('Imagem é obrigatória')
        })
    })

    describe('Método getAll', () => {
        test('deve retornar todos os produtos de uma categoria específica', async () => {
            const produtos = [
                {
                    name: 'X-Burger',
                    price: 15.90,
                    description: 'Hambúrguer delicioso',
                    category: 'burger',
                    imageSrc: 'images/burger.jpg',
                    quantity: 10
                },
                {
                    name: 'X-Salada',
                    price: 17.90,
                    description: 'Hambúrguer delicioso',
                    category: 'burger',
                    imageSrc: 'images/burger2.jpg',
                    quantity: 10
                }
            ]

            await ProductModel.insertMany(produtos)

            const result = await ProductServices.getAll({ category: 'burger' })

            expect(result).not.toBeNull()
            expect(Array.isArray(result)).toBe(true)
            expect(result.length).toBe(2)
            expect(result[0]).toHaveProperty('name', 'X-Burger')
            expect(result[1]).toHaveProperty('name', 'X-Salada')
        })

        test('deve filtrar produtos por preço', async () => {
            const produtos = [
                {
                    name: 'X-Burger',
                    price: 15.90,
                    description: 'Hambúrguer delicioso',
                    category: 'burger',
                    imageSrc: 'images/burger.jpg',
                    quantity: 10
                },
                {
                    name: 'X-Especial',
                    price: 25.90,
                    description: 'Hambúrguer delicioso',
                    category: 'burger',
                    imageSrc: 'images/burger2.jpg',
                    quantity: 10
                }
            ]

            await ProductModel.insertMany(produtos)

            const result = await ProductServices.getAll({
                category: 'burger',
                max: "20",
                min: "15"
            })

            expect(result).not.toBeNull()
            expect(Array.isArray(result)).toBe(true)
            expect(result.length).toBe(1)
            expect(result[0]).toHaveProperty('name', 'X-Burger')
        })
    })

    describe('Método getById', () => {
        test('deve retornar um produto pelo ID', async () => {
            const productMock = {
                name: "X-Burger",
                description: "Hambúrguer delicioso",
                ingredients: ["Pão", "hambúrguer", "queijo"],
                price: 15.9,
                category: "burger",
                quantity: 10
            }

            const fileMock = {
                filename: "burger.jpg"
            }

            const product = await ProductServices.createProduct(productMock, fileMock)
            const result = await ProductServices.getById(product._id)

            expect(result).toMatchObject({
                name: "X-Burger"
            })
        })

        test('deve retornar um erro ao não encontrar um produto pelo ID', async () => {
            await expect(ProductServices.getById("123456789012345678901234")).rejects.toThrow(ErroNotFound)
        })

        test('deve retornar um erro ao tentar obter um produto com ID inválido', async () => {
            await expect(ProductServices.getById("1234")).rejects.toThrow(ErroBadRequest)
        })
    })

    describe('Método update', () => {
        test('deve atualizar um produto com sucesso', async () => {
            const produtoOriginal = {
                name: 'X-Burger',
                price: 15.90,
                description: 'Hambúrguer delicioso',
                category: 'burger',
                ingredients: ['pão', 'hambúrguer', 'queijo'],
                isAvailable: true,
                quantity: 10
            }

            const fileMock = { filename: 'burger.jpg' }
            const produtoCriado = await ProductServices.createProduct(produtoOriginal, fileMock)
            const dadosAtualizacao = { name: 'Super X-Burger', price: 18.90 }

            const resultado = await ProductServices.update(produtoCriado._id, dadosAtualizacao)
            const produtoAtualizado = await ProductModel.findById(produtoCriado._id)

            expect(resultado).toBe(true)
            expect(produtoAtualizado.name).toBe(dadosAtualizacao.name)
            expect(produtoAtualizado.price).toBe(dadosAtualizacao.price)
        })

        test('deve lançar erro ao tentar atualizar produto com ID inválido', async () => {
            await expect(ProductServices.update('123', { name: 'Novo Nome' }))
                .rejects.toThrow(ErroBadRequest)
        })

        test('deve lançar erro ao tentar atualizar produto inexistente', async () => {
            await expect(ProductServices.update('123456789012345678901234', { name: 'Novo Nome' }))
                .rejects.toThrow(ErroNotFound)
        })
    })

    describe('Método delete', () => {
        test('deve deletar um produto com sucesso', async () => {
            const produtoMock = {
                name: 'X-Burger',
                price: 15.90,
                description: 'Hambúrguer delicioso',
                category: 'burger',
                ingredients: ['pão', 'hambúrguer', 'queijo'],
                isAvailable: true,
                quantity: 10
            }
            const fileMock = { filename: 'burger.jpg' }
            const produtoCriado = await ProductServices.createProduct(produtoMock, fileMock)

            const resultado = await ProductServices.delete(produtoCriado._id)
            const produtoDeletado = await ProductModel.findById(produtoCriado._id)

            expect(resultado).toBe(true)
            expect(produtoDeletado).toBeNull()
        })

        test('deve lançar erro ao tentar deletar produto com ID inválido', async () => {
            await expect(ProductServices.delete('123'))
                .rejects.toThrow(ErroBadRequest)
        })

        test('deve lançar erro ao tentar deletar produto inexistente', async () => {
            await expect(ProductServices.delete('123456789012345678901234'))
                .rejects.toThrow(ErroNotFound)
        })
    })

})
