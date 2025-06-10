import BurgerServices from '../../../../src/services/BurgerServices.js'
import { connectDB, disconnectDB, clearDB } from '../../config/dbConnectConfig.test.js'

beforeAll(async () => {
    await connectDB()
})

afterAll(async () => {
    await clearDB()
    await disconnectDB()
})

describe('Testando o método de CREATE do BurgerServices', () => {
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

    it('Deve criar uma Hamburguer', async () => {
        const burgerMock = {
            name: 'X-Bacon',
            ingredients: [
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
