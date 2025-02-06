import ClientesModel from "../models/ClientesSchema.js";
import EnderecosModel from "../models/EnderecosSchema.js";

class ClientesController{
    constructor(){

    }
    static async listarClientes(req, res, next){
        try {
            const listaClientes = await ClientesModel.find()

            res.status(200).send(listaClientes)
        } catch (error) {
            next(error)
        }
    }

    static async listarClientePorId(req, res, next) {
        try {
            const id = req.params.id
            const clienteEspecifico = await ClientesModel.findById(id)

            res.status(200).send(clienteEspecifico)
        } catch (error) {
            next(error)
        }
    }

    static async cadastrarCliente(req, res, next) {
        const { nome, email, senha, role, telefone, endereco } = req.body
        try {
            const clienteCriado = await ClientesModel.create({ nome, email, senha, role, telefone })
            const enderecoCliente = await EnderecosModel.create({
                ...endereco,
                clienteId: clienteCriado._id
            })

            clienteCriado.endereco = enderecoCliente._id

            res.status(200).json({cliente: clienteCriado, endereco: enderecoCliente})
        } catch (error) {
            next(error)
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

    static async listarClientesPorFiltro(req, res, next) {
        try {
            const busca = await filtrarPedido(req.query)

            if(busca !== null){
                const pedidoResultado = await ClientesModel.find(busca)

                res.status(200).send(pedidoResultado)
            }else{
                res.status(200).send([])
            }

        } catch (error) {
            next(error)
        }
    }
}

async function filtrarPedido(params){

    const { nome, role, email } = params

    const busca = {}

    if(nome) busca.nome = { $regex: nome, $options: "i" }
    if(role) busca.role = { $regex: role, $options: "i" }
    if(email) busca.email = { $regex: email, $options: "i" }

    return busca
}

export default ClientesController