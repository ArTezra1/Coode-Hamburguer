import ClientesModel from "../models/ClientesSchema.js";
import EnderecosModel from "../models/EnderecosSchema.js";
import { ErroNotFound } from "../error/ClasseDeErro.js";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken";
import ClientesServices from "../../services/ClientesServices.js";

const clienteNovo = new ClientesServices()


class ClientesController{
    constructor(){

    }
    static async listarClientes(req, res, next){
        try {
            const listaClientes = ClientesModel.find()

            req.resultado = listaClientes

            next()
        } catch (error) {
            next(error)
        }
    }

    static async listarClientePorId(req, res, next) {
        try {
            const id = req.params.id
            const clienteEspecifico = await ClientesModel.findById(id, "-senha")

            if(clienteEspecifico !== null){
                res.status(200).send(clienteEspecifico)
            } else{
                next( new ErroNotFound("Cliente não encontrado."))
            }

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarCliente(req, res, next) {
        const { nome, email, senha, role, telefone, endereco } = req.body
        try {
            const senhaCodificada = await codificarSenha(senha)

            const clienteCriado = await ClientesModel.create({ 
                nome, 
                email, 
                senha: senhaCodificada, 
                role, 
                telefone 
            })

            const enderecoNovo = criarEndereco(...endereco)

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

            if(clienteAtualizado !== null){
                res.status(200).send(clienteAtualizado.toJSON())
            } else{
                next( new ErroNotFound("Cliente não encontrado, não foi possivel atualizar."))
            }

        } catch (error) {
            next(error)
        }
    }

    static async deletarCliente(req, res, next) {
        try {
            const clienteDeletado = await ClientesModel.findByIdAndDelete(req.params.id)

            if(clienteDeletado !== null){
                res.status(200).send({
                    message: "Cliente deletado com sucesso."
                })
            } else{
                next( new ErroNotFound("Cliente não encontrado, não foi possivel deletar."))
            }

        } catch (error) {
            next(error)
        }
    }

    static async listarClientesPorFiltro(req, res, next) {
        try {
            const busca = await filtrarPedido(req.query)

            if(busca !== null){
                const pedidoResultado = ClientesModel.find(busca)

                req.resultado = pedidoResultado
                
                next()
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

async function codificarSenha(senha){
    const salt = bcrypt.genSalt(12)

    const senhaHash = bcrypt.hash(senha, salt)

    return senhaHash
}

function criarEndereco(endereco){

}

export default ClientesController