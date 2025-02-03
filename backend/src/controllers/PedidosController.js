import CombosModel from "../models/CombosSchema.js"
import PedidosModel from "../models/PedidosSchema.js"

class PedidosController{
    constructor(){

    }
    static async listarPedidos(req, res, next){
        try {
            const listaPedidos = await PedidosModel.find()

            res.status(200).send(listaPedidos)
            
        } catch (error) {
            next(error)
        }
    }

    static async listarPedidoPorId(req, res, next) {
        try {
            const id = req.params.id
            const pedidoEspecifico = await PedidosModel.findById(id)

            res.status(200).send(pedidoEspecifico)

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarPedido(req, res, next) {
        try {
            const comboNovo = await CombosModel.create(req.body)

            res.status(201).send(comboNovo.toJSON())
        } catch (error) {
            next(error)
        }
    }

    static async atualizarPedido(req, res, next) {
        try {
            const idComboAtualizado = req.params.id
            const novoComboAtualizado = req.body

            const comboAtualizado = await CombosModel.findByIdAndUpdate(idComboAtualizado, novoComboAtualizado)

            res.status(200).send(comboAtualizado.toJSON())
        } catch (error) {
            next(error)
        }
    }

    static async deletarPedido(req, res, next) {
        try {
            await CombosModel.findByIdAndDelete(req.params.id)

            res.status(200).send({
                message: "Combo deletado com sucesso."
            })
        } catch (error) {
            next(error)
        }
    }
}

export default PedidosController