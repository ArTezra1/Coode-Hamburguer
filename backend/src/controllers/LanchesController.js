import LanchesModel from "../models/LanchesSchema.js"

class LanchesController{
    constructor(){

    }
    static async listarLanches(req, res, next){
        try {
            const lista = await BebidasAlcoolModel.find({})
            
        } catch (error) {
            next(error)
        }
    }

    static async listarLanchesPorId(req, res, next) {
        try {
            const id = req.params.id
            const alcoolEspecifico = await BebidasAlcoolModel.findById(id)

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarLanche(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async atualizarLanche(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async deletarLanche(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default LanchesController