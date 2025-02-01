import PedidosModel from "../models/PedidosSchema.js"

class PedidosController{
    constructor(){

    }
    static async listarPedidos(req, res, next){
        try {
            const lista = await BebidasAlcoolModel.find({})
            
        } catch (error) {
            next(error)
        }
    }

    static async listarPedidoPorId(req, res, next) {
        try {
            const id = req.params.id
            const alcoolEspecifico = await BebidasAlcoolModel.findById(id)

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarPedido(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async atualizarPedido(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async deletarPedido(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default PedidosController