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
            const busca = await filtrarPedido(req.query)
            const pedidoResultado = await LanchesModel.find(busca)

            res.status(200).send(pedidoResultado)

        } catch (error) {
            next(error)
        }
    }
}

async function filtrarPedido(params){

    const { nome, tipo, sabor, precoMin, precoMax } = params

    const busca = {}

    if(nome) busca.nome = { $regex: nome, $options: "i" }
    if(tipo) busca.tipo = { $regex: tipo, $options: "i" }
    if(sabor) busca.sabor = { $regex: sabor, $options: "i" }

    if(precoMax || precoMin) busca.preco_unitario = {}

    if(precoMin) busca.preco_unitario.$gte = precoMin
    if(precoMax) busca.preco_unitario.$lte = precoMax

    return busca
}

export default LanchesController