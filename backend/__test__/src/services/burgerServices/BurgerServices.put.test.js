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