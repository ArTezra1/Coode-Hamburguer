import ClientesModel from "../models/ClientesSchema.js";

class ClientesController{
    constructor(){

    }
    static async listarClientes(req, res, next){
        try {
            const listaClientes = await ClientesModel.find()
            .populate("Enderecos")
            .exec()

            res.status(200).json(listaClientes)
        } catch (error) {
            // next(error)
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
            const clienteCriado = await ClientesModel.create(req.body)

            res.send(200).json(clienteCriado)
        } catch (error) {
            // next(error)
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