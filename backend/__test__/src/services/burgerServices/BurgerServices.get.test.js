import BurgerServices from "../../../../src/services/BurgerServices.js"

import app from "../../../../src/app.js"
import BurgerModel from "../../../../src/models/BurgerModel.js"

let server

beforeEach(async () => {
    await BurgerModel.deleteMany({})
    const port = 5000
    server = app.listen(port)
})

afterEach(() => {
    server.close()
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