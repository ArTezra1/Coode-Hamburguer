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

describe('Testando os métodos CREATE do DrinkServices')