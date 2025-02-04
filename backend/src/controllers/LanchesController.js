import LanchesModel from "../models/LanchesSchema.js"

class LanchesController{
    constructor(){

    }
    static async listarLanches(req, res, next){
        try {
            const listaLanches = await LanchesModel.find()
            
            res.status(200).send(listaLanches)            

        } catch (error) {
            next(error)
        }
    }

    static async listarLanchesPorId(req, res, next) {
        try {
            const id = req.params.id
            const lancheEspecifico = await LanchesModel.findById(id)

            res.status(200).send(lancheEspecifico)            

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarLanche(req, res, next) {
        try {
            const lancheNovo = await LanchesModel.create(req.body)

            res.status(201).send(lancheNovo.toJSON())
        } catch (error) {
            // next(error)
        }
    }

    static async atualizarLanche(req, res, next) {
        try {
            const idLancheAtualizado = req.params.id
            const novoLancheAtualizado = req.body

            const lancheAtualizado = await LanchesModel.findByIdAndUpdate(idLancheAtualizado, novoLancheAtualizado)

            res.status(200).send(lancheAtualizado.toJSON())
        } catch (error) {
            next(error)
        }
    }

    static async deletarLanche(req, res, next) {
        try {
            await LanchesModel.findByIdAndDelete(req.params.id)

            res.status(200).send({
                message: `Lanche deletado com sucesso.`
            })
        } catch (error) {
            next(error)
        }
    }

    static async listarLanchesPorFiltro(req, res, next) {
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

export default LanchesController