import ClientesModel from "../models/ClientesSchema.js";

class ClientesController{
    constructor(){

    }
    static async listarClientes(req, res, next){
        try {
            const listaClientes = await ClientesModel.find()
            .populate("Enderecos")

            res.status(200).send(listaClientes)
        } catch (error) {
            // next(error)
        }
    }

    static async listarClientePorId(req, res, next) {
        try {
            const id = req.params.id
            const clienteEspecifico = await ClientesModel.findById(id).populate("Enderecos")

            res.status(200).send(clienteEspecifico)
        } catch (error) {
            next(error)
        }
    }

    static async cadastrarCliente(req, res, next) {
        try {
            const clienteCriado = await ClientesModel.create(req.body)

            res.send(200).send(clienteCriado.toJSON())
        } catch (error) {
            // next(error)
        }
    }

    static async atualizarCliente(req, res, next) {
        try {
            const idClienteAtualizado = req.params.id
            const novoClienteAtualizado = req.body

            const clienteAtualizado = await ClientesModel.findByIdAndUpdate(idClienteAtualizado, novoClienteAtualizado)

            res.status(200).send(clienteAtualizado.toJSON())

        } catch (error) {
            next(error)
        }
    }

    static async deletarCliente(req, res, next) {
        try {
            await ClientesModel.findByIdAndDelete(req.params.id)

            res.status(200).send({
                message: "Cliente deletado com sucesso."
            })
        } catch (error) {
            next(error)
        }
    }
}

export default ClientesController