import LanchesModel from "../models/LanchesSchema.js"
import { ErroNotFound } from "../error/ClasseDeErro.js"

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

            if(lancheEspecifico !== null){
                res.status(200).send(lancheEspecifico)            
            } else{
                next( new ErroNotFound("Lanche não encontrado."))
            }

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

            if(lancheAtualizado !== null){
                res.status(200).send(lancheAtualizado.toJSON())
            } else{
                next( new ErroNotFound("Lanche não encontrado, não foi possivel atualizar."))
            }

        } catch (error) {
            next(error)
        }
    }

    static async deletarLanche(req, res, next) {
        try {
            const lancheDeletado = await LanchesModel.findByIdAndDelete(req.params.id)

            if(lancheDeletado !== null){
                res.status(200).send({
                    message: `Lanche deletado com sucesso.`
                })
            } else{
                next( new ErroNotFound("Lanche não encontrado, não foi possivel deletar."))
            }

        } catch (error) {
            next(error)
        }
    }

    static async listarLanchesPorFiltro(req, res, next) {
        try {
            const busca = await filtrarPedido(req.query)

            if(busca !== null){
                const pedidoResultado = await LanchesModel.find(busca)
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