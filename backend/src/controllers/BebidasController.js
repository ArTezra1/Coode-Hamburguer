import BebidasModel from "../models/BebidasSchema.js";
import { ErroNotFound } from "../error/ClasseDeErro.js";

class BebidasController{
    constructor(){

    }

    static async listarBebida(req, res, next){
        try {
            const listaBebidas = await BebidasModel.find()
            
            res.status(200).send(listaBebidas)

        } catch (error) {
            next(error)
        }
    }

    static async listarBebidaPorId(req, res, next) {
        try {
            const id = req.params.id
            const bebidaEspecifica = await BebidasModel.findById(id)

            if(bebidaEspecifica !== null){
                res.status(200).send(bebidaEspecifica)
            } else{
                next( new ErroNotFound("Bebida não encontrada."))
            }

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarBebida(req, res, next) {
        try {
            const bebidaNova = await BebidasModel.create(req.body)

            res.status(201).send(bebidaNova.toJSON())

        } catch (error) {
            next(error)
        }
    }

    static async atualizarBebida(req, res, next) {
        try {
            const idBebidaAtualizada = req.params.id
            const novaBebidaAtualizada = req.body
            const bebidaAtualizada = await BebidasModel.findByIdAndUpdate(idBebidaAtualizada, novaBebidaAtualizada)

            if(bebidaAtualizada !== null){
                res.status(200).send(bebidaAtualizada.toJSON())
            } else{
                next( new ErroNotFound("Bebida não encontrada."))
            }

        } catch (error) {
            next(error)
        }
    }

    static async deletarBebida(req, res, next) {
        try {
             const bebidaDeletada = await BebidasModel.findByIdAndDelete(req.params.id)
            
            if(bebidaDeletada !== null){
                res.status(200).send({
                    message: "Bebida deletada com sucesso."
                })
            } else{
                next( new ErroNotFound("Bebida não encontrada, não foi possivel deletar."))
            }

        } catch (error) {
            next(error)
        }
    }

    static async listarBebidaPorFiltro(req, res, next) {
        try {
            const busca = await filtrarPedido(req.query)

            if(busca !== null){
                const pedidoResultado = await BebidasModel.find(busca)
    
                res.status(200).send(pedidoResultado)
                
            } else{
                res.status(200).send([])
            }

        } catch (error) {
            next(error)
        }
    }
}

async function filtrarPedido(params){

    const { marca, tipo, sabor, precoMin, precoMax } = params

    const busca = {}

    if(marca) busca.marca = { $regex: marca, $options: "i" }
    if(tipo) busca.tipo = { $regex: tipo, $options: "i" }
    if(sabor) busca.sabor = { $regex: sabor, $options: "i" }

    if(precoMax || precoMin) busca.preco_unitario = {}

    if(precoMin) busca.preco_unitario.$gte = precoMin
    if(precoMax) busca.preco_unitario.$lte = precoMax

    return busca
}

export default BebidasController