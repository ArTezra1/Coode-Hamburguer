import BebidasModel from "../models/BebidasSchema.js";

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

            res.status(200).send(bebidaEspecifica)

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

            res.status(200).send(bebidaAtualizada.toJSON())

        } catch (error) {
            next(error)
        }
    }

    static async deletarBebida(req, res, next) {
        try {
            await BebidasModel.findByIdAndDelete(req.params.id)
            
            res.status(200).send({
                message: "Bebida deletada com sucesso."
            })

        } catch (error) {
            next(error)
        }
    }

    static async listarBebidaPorFiltro(req, res, next) {
        try {
            const pedido = await FiltrarPedido(req.query)
            const pedidoResultado = await BebidasAlcoolModel.find(pedido)

            res.status(200).send(pedidoResultado)

        } catch (error) {
            next(error)
        }
    }
}

async function FiltrarPedido(params){

    const { marca, tipo, precoMin, precoMax } = params

    const busca = {}

    if(marca) busca.marca = { $regex: marca, $options: "i" }
    if(tipo) busca.tipo = { $regex: tipo, $options: "i" }

    if(precoMax || precoMin) busca.preco = {}

    if(precoMin) busca.preco.$gte = precoMin
    if(precoMax) busca.preco.$lte = precoMax

    return busca
}

export default BebidasController