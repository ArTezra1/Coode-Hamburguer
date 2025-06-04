import { connectDB, disconnectDB, clearDB } from '../../config/dbConnectConfig.test.js'
import BurgerServices from '../../../../src/services/BurgerServices.js'

beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await disconnectDB()
})

beforeEach(async () => {
  await clearDB()
})

describe('Testando os métodos DELETE do BurgerServices', () => {
  it('Deve deletar o registro específico do banco', async () => {
    const burgerMock = {
      name: 'X-bacon',
      ingredients: ['pão', 'salada', 'bacon'],
      price: 18,
      quantity: 10,
    }
    const fileMock = { filename: 'pep.png' }

    const burger = await BurgerServices.create(burgerMock, fileMock)
    const result = await BurgerServices.delete(burger._id)

    expect(result).toBe(true)
  })
})
