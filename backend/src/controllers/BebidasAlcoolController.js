import BebidasAlcoolModel from "../models/BebidasAlcoolSchema.js"
import { ErroNotFound }from "../error/ClasseDeErro.js"

class BebidasAlcoolController {
    constructor() {

    }
    static async listarAlcool(req, res, next) {
        try {
            const listaAlcool = await BebidasAlcoolModel.find()

            res.status(200).send(listaAlcool)

        } catch (error) {
            next(error)
        }
    }

    static async listarAlcoolPorId(req, res, next) {
        try {
            const id = req.params.id
            const alcoolEspecifico = await BebidasAlcoolModel.findById(id)

            if(alcoolEspecifico !== null){
                res.status(200).send(alcoolEspecifico)
            } else{
                next(new ErroNotFound("Bebida não encontrada."))
            }

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarAlcool(req, res, next) {
        try {
            const alcoolNovo = await BebidasAlcoolModel.create(req.body)

            res.status(201).send(alcoolNovo)

        } catch (error) {
            next(error)
        }
    }

    static async atualizarAlcool(req, res, next) {
        try {
            const idAlcoolAtualizado = req.params.id
            const alcoolAtualizado = req.body
            const novoAlcoolAtualizado = await BebidasAlcoolModel.findByIdAndUpdate(idAlcoolAtualizado, alcoolAtualizado)

            if(novoAlcoolAtualizado !== null){
                res.status(200).send("Bebida atualizado com sucesso.")
            } else{
                next( new ErroNotFound("Bebida não encontrada, não foi possivel atualizar."))
            }

        } catch (error) {
            next(error)
        }
    }

    static async deletarAlcool(req, res, next) {
        try {
            const bebidaDeletada = await BebidasAlcoolModel.findByIdAndDelete(req.params.id)

            if(bebidaDeletada !== null){
                res.status(200).send({
                    message: "Bebida alcólica deletada com sucesso."
                })
            } else{
                next( new ErroNotFound("Bebida não encontrada, não foi possivel deletar."))
            }

        } catch (error) {
            next(error)
        }
    }

    static async listarAlcoolPorFiltro(req, res, next) {
        try {
            const busca = await filtrarPedido(req.query)

            if(busca !== null){
                const pedidoResultado = await BebidasAlcoolModel.find(busca)
    
                res.status(200).send(pedidoResultado)
                
            } else{
                res.status(200).send([])
            }

        } catch (error) {
            next(error)
        }
    }
}

async function filtrarPedido(params) {

    const { marca, tipo, precoMin, precoMax } = params

    const busca = {}

    if (marca) busca.marca = { $regex: marca, $options: "i" }
    if (tipo) busca.tipo = { $regex: tipo, $options: "i" }

    if (precoMax || precoMin) busca.preco_unitario = {}

    if (precoMin) busca.preco_unitario.$gte = precoMin
    if (precoMax) busca.preco_unitario.$lte = precoMax

    return busca
}

export default BebidasAlcoolController