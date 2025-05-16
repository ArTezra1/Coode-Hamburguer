import DrinkServices from "../../../src/services/DrinkServices.js"
import DrinkModel from "../../../src/models/DrinkModel.js"
import app from "../../../src/app.js"

let server

beforeEach( async ()=>{
    await DrinkModel.deleteMany({})
    const port = 5000
    server = app.listen(port)
})

afterEach(()=>{
    server.close()
})

describe('Testando os métodos CREATE do DrinkServices', ()=>{
    
    it('Deve lançar um erro ao criar uma bebida sem nome', async ()=>{
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
    
    it('Deve lançar um erro ao criar uma bebida sem preço', async ()=>{
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
    
    it('Deve lançar um erro ao criar uma bebida sem o campo quantidade', async ()=>{
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
    
    it('Deve lançar um erro ao criar uma bebida sem valor no campo quantidade', async ()=>{
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
    
    it('Deve criar uma bebida', async ()=>{
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

describe('Testando os métodos GET do DrinkServices', ()=>{
    
    it('Deve retornar todos os registros', async ()=>{
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
    
    it('Deve retornar o registro específico', async ()=>{
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

describe('Testando os métodos PUT do DrinkServices', ()=>{
   
    it('Deve atualizar o registro específico', async ()=>{
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

describe('Testando os métodos DELETE do DrinkServices', ()=>{
    it('Deve deletar o resgitro específico', async ()=>{
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
})