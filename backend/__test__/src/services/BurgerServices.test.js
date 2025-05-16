import BurgerServices from "../../../src/services/BurgerServices.js"

import app from "../../../src/app.js"
import BurgerModel from "../../../src/models/BurgerModel.js"

let server

beforeEach(async () => {
    await BurgerModel.deleteMany({})
    const port = 5000
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

describe('Testando os erros de CREATE do BurgerServices', () => {

    it('Deve lançar um erro ao criar o Hamburguer sem nome', async () => {
        const burgerMock = {
            ingredients: [
                'Pão',
                'Bacon',
                'Salada'
            ],
            price: 18,
            quantity: 10
        }

        const fileMock = {
            filename: 'pep.png'
        }

        const result = BurgerServices.create(burgerMock, fileMock)

        await expect(result).rejects.toThrowError('Name is required')
    })

    it('Deve lançar um erro ao criar o Hamburguer sem ingredientes', async () => {
        const burgerMock = {
            name: 'X-Bacon',
            ingredients: [],
            price: 18,
            quantity: 10
        }

        const fileMock = {
            filename: 'pep.png'
        }

        const result = BurgerServices.create(burgerMock, fileMock)

        await expect(result).rejects.toThrowError('Ingredients must contain at least one item')
    })

    it('Deve lançar um erro ao criar o Hamburguer sem o preço', async () => {
        const burgerMock = {
            name: 'X-Bacon',
            ingredients: [
                'Pão',
                'Bacon',
                'Salada'
            ],
            quantity: 10
        }

        const fileMock = {
            filename: 'pep.png'
        }

        const result = BurgerServices.create(burgerMock, fileMock)

        await expect(result).rejects.toThrowError('Price is required')
    })

    it('Deve lançar um erro ao criar o Hamburguer sem imagem', async () => {
        const burgerMock = {
            name: 'X-Bacon',
            ingredients: [
                'Pão',
                'Bacon',
                'Salada'
            ],
            price: 18,
            quantity: 10
        }

        const result = BurgerServices.create(burgerMock, null)

        await expect(result).rejects.toThrowError('Image is required')
    })

    it('Deve lançar um erro ao criar o Hamburguer sem a quantidade', async () => {
        const burgerMock = {
            name: 'X-Bacon',
            ingredients: [
                'Pão',
                'Bacon',
                'Salada'
            ],
            price: 18,
        }

        const fileMock = {
            filename: 'pep.png'
        }

        await expect(BurgerServices.create(burgerMock, fileMock))
            .rejects
            .toThrow('Quantity is required')
    })

    it('Deve criar uma Hamburguer', async ()=>{
            const burgerMock = {
                name: 'X-Bacon',
                ingredients:[
                    'pão',
                    'salada'
                ],
                price: 18,
                quantity: 10
            }
            const fileMock = {
                filename: 'pep.png'
            }
    
            const result = await BurgerServices.create(burgerMock, fileMock)
    
            expect(result).toMatchObject({
                name: burgerMock.name,
                price: burgerMock.price,
                quantity: burgerMock.quantity,
                imageSrc: expect.stringContaining(fileMock.filename)
            })

            expect(result.ingredients).toStrictEqual(burgerMock.ingredients)

        })

})

describe('Testando os métodos de GET do BurgerServices', () => {

    it('Deve retornar todos os registros do banco', async () => {
        const burgerMock = {
            name: 'X-bacon',
            ingredients: [
                'pão',
                'salada',
                'bacon'
            ],
            price: 18,
            quantity: 10
        }
        const fileMock = {
            filename: 'pep.png'
        }

        await BurgerServices.create(burgerMock, fileMock)

        const result = await BurgerServices.getAll()

        expect(result.length).toBe(1)
    })

    it('Deve retornar o registro específico do banco', async () => {
        const burgerMock = {
            name: 'X-bacon',
            ingredients: [
                'pão',
                'salada',
                'bacon'
            ],
            price: 18,
            quantity: 10
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const burguer = await BurgerServices.create(burgerMock, fileMock)
        const result = await BurgerServices.getById(burguer._id)

        expect(result).toMatchObject({
            name: burgerMock.name,
            ingredients: burgerMock.ingredients,
            price: burgerMock.price,
            quantity: burgerMock.quantity
        })
    })

    it('Deve retornar os ingredientes do registro específico do banco', async () => {
        const burgerMock = {
            name: 'X-bacon',
            ingredients: [
                'pão',
                'salada',
                'bacon'
            ],
            price: 18,
            quantity: 10
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const burguer = await BurgerServices.create(burgerMock, fileMock)
        const result = await BurgerServices.getIngredients(burguer._id)

        expect(result).toStrictEqual(burgerMock.ingredients)
    })
})

describe('Testando os métodos PUT do BurgerServices', () => {
    it('Deve atualizar o registro específico', async () => {
        const burgerMock = {
            name: 'X-bacon',
            ingredients: [
                'pão',
                'salada',
                'bacon'
            ],
            price: 18,
            quantity: 10
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const burgerUpdatedMock = {
            name: 'X-Salada',
            ingredients: [
                'pão',
                'salada',
                'queijo',
                'tomate'
            ],
            price: 22,
            quantity: 5
        }

        const burger = await BurgerServices.create(burgerMock, fileMock)
        await BurgerServices.update(burger._id, burgerUpdatedMock)

        const updatedBurger = await BurgerServices.getById(burger._id)

        expect(updatedBurger).toMatchObject({
            name: burgerUpdatedMock.name,
            ingredients: burgerUpdatedMock.ingredients,
            price: burgerUpdatedMock.price,
            quantity: burgerUpdatedMock.quantity
        })
    })
})

describe('Testando os métodos DELETE do BurgerServices', () => {
    it('Deve deletar o registro específico do banco', async () => {
        const burgerMock = {
            name: 'X-bacon',
            ingredients: [
                'pão',
                'salada',
                'bacon'
            ],
            price: 18,
            quantity: 10
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const burguer = await BurgerServices.create(burgerMock, fileMock)
        const result = await BurgerServices.delete(burguer._id)

        expect(result).toBe(true)
    })
})