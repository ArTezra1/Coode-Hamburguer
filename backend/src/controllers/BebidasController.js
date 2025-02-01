import BebidasModel from "../models/BebidasSchema.js";

class BebidasController{
    constructor(){

    }

    static async listarBebida(req, res, next){
        try {
            const lista = await BebidasModel.find({})
            
        } catch (error) {
            next(error)
        }
    }

    static async listarBebidaPorId(req, res, next) {
        try {
            const id = req.params.id
            const bebidaEspecifica = await BebidasModel.findById(id)

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarBebida(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async atualizarBebida(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async deletarBebida(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default BebidasController