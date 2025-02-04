import BebidasAlcoolModel from "../models/BebidasAlcoolSchema.js"

class BebidasAlcoolController{
    constructor(){
        
    }
    static async listarAlcool(req, res, next){
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

            res.status(200).send(alcoolEspecifico)

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

            res.status(200).send(novoAlcoolAtualizado)

        } catch (error) {
            next(error)
        }
    }

    static async deletarAlcool(req, res, next) {
        try {
            await BebidasAlcoolModel.findByIdAndDelete(req.params.id)

            res.status(200).send({
                message: "Bebida alcólica deletada com sucesso."
            })

        } catch (error) {
            next(error)
        }
    }

    static async listarAlcoolPorFiltro(req, res, next) {
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

export default BebidasAlcoolController