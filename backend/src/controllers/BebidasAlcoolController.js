import BebidasAlcoolModel from "../models/BebidasAlcoolSchema.js"

class BebidasAlcoolController{
    constructor(){
        
    }
    static async listarAlcool(req, res, next){
        try {
            const lista = await BebidasAlcoolModel.find({})
            
        } catch (error) {
            next(error)
        }
    }

    static async listarAlcoolPorId(req, res, next) {
        try {
            const id = req.params.id
            const alcoolEspecifico = await BebidasAlcoolModel.findById(id)

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarAlcool(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async atualizarAlcool(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async deletarAlcool(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default BebidasAlcoolController