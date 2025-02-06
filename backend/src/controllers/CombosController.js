import CombosModel from "../models/CombosSchema.js"
import { ErroNotFound } from "../error/ClasseDeErro.js"

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

            if(comboEspecifico !== null){
                res.status(200).send(comboEspecifico)
            } else{
                next( new ErroNotFound("Combo não encontrado."))
            }

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

            if(comboAtualizado !==  null){
                res.status(200).send(comboAtualizado.toJSON())
            } else{
                next( new ErroNotFound("Combo não encontrado, não foi possivel atualizar."))
            }
            
        } catch (error) {
            next(error)
        }
    }

    static async deletarCombo(req, res, next) {
        try {
            const comboDeletado = await CombosModel.findByIdAndDelete(req.params.id)

            if(comboDeletado !== null){
                res.tatus(200).send({
                    message: "Combo deletado com sucesso."
                })
            } else{
                next( new ErroNotFound("Combo não encontrado, não foi possivel deletar."))
            }
            
        } catch (error) {
            next(error)
        }
    }

    static async listarCombosPorFiltro(req, res, next) {
        try {
            const busca = await filtrarPedido(req.query)
            
            if(busca !== null){
                const pedidoResultado = await CombosModel.find(busca)
                
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

    const { nome, tipo, precoMin, precoMax } = params

    const busca = {}

    if(nome) busca.nome = { $regex: nome, $options: "i" }
    if(tipo) busca.tipo = { $regex: tipo, $options: "i" }

    if(precoMax || precoMin) busca.preco_unitario = {}

    if(precoMin) busca.preco_unitario.$gte = precoMin
    if(precoMax) busca.preco_unitario.$lte = precoMax

    return busca
}

export default CombosController