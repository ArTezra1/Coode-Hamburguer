import DrinkServices from "../../../src/services/DrinkServices.js"
import DrinkModel from "../../../src/models/DrinkModel.js"
import app from "../../../src/app.js"

let server

beforeEach(async () => {
    await DrinkModel.deleteMany({})
    const port = 5000
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

describe('Testando os métodos CREATE do DrinkServices', () => {

    it('Deve lançar um erro ao criar uma bebida sem nome', async () => {
        const bebidaMock = {
            price: 10,
            quantity: 50
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const result = DrinkServices.create(bebidaMock, fileMock)

        await expect(result).rejects.toThrowError('Name is required')
    })

    it('Deve lançar um erro ao criar uma bebida sem preço', async () => {
        const bebidaMock = {
            name: 'Dolly',
            quantity: 50
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const result = DrinkServices.create(bebidaMock, fileMock)

        await expect(result).rejects.toThrowError('Price is required')
    })

    it('Deve lançar um erro ao criar uma bebida sem o campo quantidade', async () => {
        const bebidaMock = {
            name: 'Dolly',
            price: 7
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const result = DrinkServices.create(bebidaMock, fileMock)

        await expect(result).rejects.toThrowError('Quantity is required')
    })

    it('Deve lançar um erro ao criar uma bebida sem valor no campo quantidade', async () => {
        const bebidaMock = {
            name: 'Dolly',
            price: 7,
            quantity: -1
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const result = DrinkServices.create(bebidaMock, fileMock)

        await expect(result).rejects.toThrowError('Drink validation failed: quantity: Quantity must be greater than or equal to 0')
    })

    it('Deve criar uma bebida', async () => {
        const bebidaMock = {
            name: 'Dolly',
            price: 7,
            quantity: 10
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const result = await DrinkServices.create(bebidaMock, fileMock)

        expect(result).toMatchObject({
            name: bebidaMock.name,
            price: bebidaMock.price,
            quantity: bebidaMock.quantity,
            imageSrc: expect.stringContaining(fileMock.filename)
        })
    })

})

describe('Testando os métodos GET do DrinkServices', () => {

    it('Deve retornar todos os registros', async () => {
        const drinkMock = {
            name: 'dolly',
            price: 10,
            quantity: 50
        }
        const fileMock = {
            filename: 'pep.png'
        }

        await DrinkServices.create(drinkMock, fileMock)
        const result = await DrinkServices.getAll()

        expect(result.length).toBe(1)
    })

    it('Deve retornar o registro específico', async () => {
        const drinkMock = {
            name: 'dolly',
            price: 10,
            quantity: 50
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const result = await DrinkServices.create(drinkMock, fileMock)
        const drink = await DrinkServices.getById(result._id)

        expect(drink).toMatchObject({
            name: drinkMock.name,
            price: drinkMock.price,
            quantity: drinkMock.quantity
        })
    })

})

describe('Testando os métodos PUT do DrinkServices', () => {

    it('Deve atualizar o registro específico', async () => {
        const drinkMock = {
            name: 'Dolly',
            price: 7,
            quantity: 10
        }
        const drinkMockUpdated = {
            name: 'Coca',
            price: 12,
            quantity: 10
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const drink = await DrinkServices.create(drinkMock, fileMock)
        await DrinkServices.update(drink._id, drinkMockUpdated)
        const updatedDrink = await DrinkServices.getById(drink._id)

        expect(updatedDrink).toMatchObject({
            name: drinkMockUpdated.name,
            price: drinkMockUpdated.price,
            quantity: drinkMockUpdated.quantity,
        })

    })

})

describe('Testando os métodos DELETE do DrinkServices', () => {
    it('Deve deletar o resgitro específico', async () => {
        const drinkMock = {
            name: 'dolly',
            price: 10,
            quantity: 50
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const drink = await DrinkServices.create(drinkMock, fileMock)
        const result = await DrinkServices.delete(drink._id)

        expect(result).toBe(true)
    })

    it('Deve lançar erro ao tentar deletar uma bebida com ID inválido', async () => {
        const invalidId = '123456789012345678901234'

        const result = DrinkServices.delete(invalidId)

        await expect(result).rejects.toThrow()
    })

    it('Deve retornar false ao tentar deletar uma bebida que não existe', async () => {
        const nonExistentId = '507f1f77bcf86cd799439011'

        const result = await DrinkServices.delete(nonExistentId)

        expect(result).toBe(false)
    })
})

describe('Testando validações adicionais do DrinkServices', () => {
    it('Deve lançar erro ao criar bebida com preço negativo', async () => {
        const bebidaMock = {
            name: 'Dolly',
            price: -5,
            quantity: 10
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const result = DrinkServices.create(bebidaMock, fileMock)

        await expect(result).rejects.toThrow()
    })

    it('Deve lançar erro ao atualizar bebida com quantidade negativa', async () => {
        const bebidaMock = {
            name: 'Dolly',
            price: 7,
            quantity: 10
        }
        const bebidaUpdateMock = {
            quantity: -5
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const drink = await DrinkServices.create(bebidaMock, fileMock)
        const result = DrinkServices.update(drink._id, bebidaUpdateMock)

        await expect(result).rejects.toThrow()
    })

    it('Deve lançar erro ao buscar bebida com ID inválido', async () => {
        const invalidId = '123'

        const result = DrinkServices.getById(invalidId)

        await expect(result).rejects.toThrow()
    })

    it('Deve retornar null ao buscar bebida que não existe', async () => {
        const nonExistentId = '507f1f77bcf86cd799439011'

        const result = await DrinkServices.getById(nonExistentId)

        expect(result).toBeNull()
    })

    it('Deve filtrar bebidas por preço máximo', async () => {
        const drink1 = {
            name: 'Dolly',
            price: 5,
            quantity: 10
        }
        const drink2 = {
            name: 'Coca',
            price: 8,
            quantity: 10
        }
        const fileMock = {
            filename: 'pep.png'
        }

        await DrinkServices.create(drink1, fileMock)
        await DrinkServices.create(drink2, fileMock)

        const result = await DrinkServices.getAll({ maxPrice: 6 })

        expect(result.length).toBe(1)
        expect(result[0].price).toBeLessThanOrEqual(6)
    })

    it('Deve atualizar apenas os campos fornecidos', async () => {
        const bebidaMock = {
            name: 'Dolly',
            price: 7,
            quantity: 10
        }
        const updateMock = {
            price: 8
        }
        const fileMock = {
            filename: 'pep.png'
        }

        const drink = await DrinkServices.create(bebidaMock, fileMock)
        await DrinkServices.update(drink._id, updateMock)
        const updatedDrink = await DrinkServices.getById(drink._id)

        expect(updatedDrink.name).toBe(bebidaMock.name)
        expect(updatedDrink.price).toBe(updateMock.price)
        expect(updatedDrink.quantity).toBe(bebidaMock.quantity)
    })
})