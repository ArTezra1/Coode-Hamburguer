import Services from "./ServicesController.js"
import ClientesModel from "../src/models/ClientesSchema.js"

class ClientesServices extends Services{
    constructor(){
        super(ClientesModel)
    }
}

export default ClientesServices