import CombosModel from "../models/CombosSchema.js"

class CombosController{
    constructor(){

    }
    static async listarCombos(req, res, next){
        try {
            const listaCombos = await CombosModel.find()

            res.status(200).send(listaCombos)
            
        } catch (error) {
            next(error)
        }
    }

    static async listarComboPorId(req, res, next) {
        try {
            const id = req.params.id
            const comboEspecifico = await CombosModel.findById(id)

            res.status(200).send(comboEspecifico)

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarCombo(req, res, next) {
        try {
            const comboNovo = await CombosModel.create(req.body)

            res.status(201).send(comboNovo.toJSON())
            
        } catch (error) {
            next(error)
        }
    }

    static async atualizarCombo(req, res, next) {
        try {
            const idComboAtualizado = req.params.id
            const novoComboAtualizado = req.body

            const comboAtualizado = await CombosModel.findByIdAndUpdate(idComboAtualizado, novoComboAtualizado)

            res.status(200).send(comboAtualizado.toJSON())
            
        } catch (error) {
            next(error)
        }
    }

    static async deletarCombo(req, res, next) {
        try {
            await CombosModel.findByIdAndDelete(req.params.id)

            res.tatus(200).send({
                message: "Combo deletado com sucesso."
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async listarCombosPorFiltro(req, res, next) {
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

export default CombosController