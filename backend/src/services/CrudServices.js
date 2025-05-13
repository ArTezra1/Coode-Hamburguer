import mongoose from "mongoose"
import filterRequest from "../middlewares/FilterRequest.js"

class ServicesController {
    constructor(model) {
        this.model = model
    }

    async create(req, res, next) {
        const { register } = req.body

        try {
            if (!register) {
                return res.status(400).json({
                    message: "Por favor, preencha todos os campos obrigatórios."
                })
            }

            const newRegister = await this.model.create(register)

            if (newRegister) {
                return res.status(201).json({
                    message: "Registro criado com sucesso.",
                    data: newRegister
                })
            }

        } catch (error) {
            console.error("Erro ao criar registro:", error)
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            req.result = this.model.find({})

            next()

        } catch (error) {
            console.error("Erro ao buscar registros:", error)
            next(error)
        }
    }

    async getById(req, res, next) {
        const { id } = req.params

        try {
            if (id && mongoose.Types.ObjectId.isValid(id)) {
                const register = await this.model.findById(id)

                if (register) {
                    return res.status(200).json(register)
                }
            }

            return res.status(404).json({
                message: "Registro não encontrado."
            })

        } catch (error) {
            console.error("Erro ao buscar registro:", error)
            next(error)
        }
    }

    async getByParams(req, res, next) {
        const { params } = req.query

        try {
            const filter = await filterRequest(params)

            req.result = this.model.find(filter)

            next()

        } catch (error) {
            console.error("Erro ao filtrar registros:", error)
            next(error)
        }
    }

    async update(req, res, next) {
        const { id } = req.params
        const { register } = req.body

        try {
            if (id && mongoose.Types.ObjectId.isValid(id)) {
                const registerUpdate = await this.model.findByIdAndUpdate(id, register, { new: true })

                if (registerUpdate) {
                    return res.status(200).json({
                        message: "Registro atualizado com sucesso.",
                        data: registerUpdate
                    })
                }
            }

            return res.status(404).json({
                message: "Registro não encontrado."
            })

        } catch (error) {
            console.error("Erro ao atualizar registro:", error)
            next(error)
        }
    }

    async delete(req, res, next) {
        const { id } = req.params

        try {
            if (id && mongoose.Types.ObjectId.isValid(id)) {
                const registerDeleted = await this.model.findByIdAndDelete(id)

                if (registerDeleted) {
                    return res.status(200).json({
                        message: "Registro deletado com sucesso."
                    })
                }
            }

            return res.status(404).json({
                message: "Registro não encontrado."
            })

        } catch (error) {
            console.error("Erro ao deletar registro:", error)
            next(error)
        }
    }
}

export default ServicesController