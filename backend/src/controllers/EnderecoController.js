import EnderecosModel from "../models/EnderecosSchema.js"

class EnderecosController{
    constructor(){

    }
    static async listarEnderecos(req, res, next){
        try {
            const listaEnderecos = await EnderecosModel.find().populate("Clientes")
            
            res.status(200).send(listaEnderecos)

        } catch (error) {
            next(error)
        }
    }

    static async listarEnderecoPorId(req, res, next) {
        try {
            const id = req.params.id
            const enderecoEspecifico = await EnderecosModel.findById(id).populate("Clientes")

            res.status(200).send(enderecoEspecifico)

        } catch (error) {
            next(error)
        }
    }

    static async cadastrarEndereco(req, res, next) {
        try {
            const enderecoNovo = await EnderecosModel.create(req.body)

            res.status(200).send(enderecoNovo.toJSON())

        } catch (error) {
            next(error)
        }
    }

    static async atualizarEndereco(req, res, next) {
        try {
            const idEnderecoAtualizado = req.params.id
            const novoEnderecoAtualizado = req.body

            const enderecoAtualizado = await EnderecosModel.findByIdAndUpdate(idEnderecoAtualizado, novoEnderecoAtualizado)

            res.status(200).send(enderecoAtualizado.toJSON())

        } catch (error) {
            next(error)
        }
    }

    static async deletarEndereco(req, res, next) {
        try {
            await EnderecosModel.findByIdAndDelete(req.params.id)

            res.status(200).send({
                message: "Endereço deletado com sucesso."
            })
        } catch (error) {
            next(error)
        }
    }
}

export default EnderecosController