import CombosModel from "../models/CombosSchema.js"

class CombosController{
    constructor(){

    }
    static async listarCombos(req, res, next){
        try {
            const lista = await BebidasAlcoolModel.find({})
            
        } catch (error) {
            next(error)
        }
    }

    static async listarComboPorId(req, res, next) {
        try {
            const id = req.params.id
            const alcoolEspecifico = await BebidasAlcoolModel.findById(id)

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarCombo(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async atualizarCombo(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async deletarCombo(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default CombosController