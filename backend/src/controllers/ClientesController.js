import ClientesModel from "../models/ClientesSchema.js";

class ClientesController{
    constructor(){

    }
    static async listarClientes(req, res, next){
        try {
            const lista = await BebidasAlcoolModel.find({})
            
        } catch (error) {
            next(error)
        }
    }

    static async listarClientePorId(req, res, next) {
        try {
            const id = req.params.id
            const alcoolEspecifico = await BebidasAlcoolModel.findById(id)

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarCliente(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async atualizarCliente(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async deletarCliente(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default ClientesController