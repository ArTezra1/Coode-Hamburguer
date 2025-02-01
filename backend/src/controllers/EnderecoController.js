import EnderecosModel from "../models/EnderecosSchema.js"

class EnderecosController{
    constructor(){

    }
    static async listarEnderecos(req, res, next){
        try {
            const lista = await BebidasAlcoolModel.find({})
            
        } catch (error) {
            next(error)
        }
    }

    static async listarEnderecoPorId(req, res, next) {
        try {
            const id = req.params.id
            const alcoolEspecifico = await BebidasAlcoolModel.findById(id)

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarEndereco(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async atualizarEndereco(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async deletarEndereco(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default EnderecosController