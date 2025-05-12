import mongoose from "mongoose"
import filterRequest from "../middlewares/FilterRequest.js"

class ServicesController {
    constructor(model) {
        this.model = model
    }

    async create(req, res, next) {
        try {
            const newRegister = await this.model.create(req.body)

            if (newRegister) {
                return res.status(201).json({
                    message: "Registro criado com sucesso."
                })
            }

            return res.status(400).json({
                message: "Erro ao criar registro"
            })

        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const registers = await this.model.find({})

            if (registers.length > 0) {
                return res.status(200).json(registers)
            }

            return res.status(404).json({
                message: "Nenhum registro encontrado."
            })

        } catch (error) {
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
            next(error)
        }
    }

    async getByParams(req, res, next) {
        const { params } = req.query

        try {
            const search = await filterRequest(params)

            req.result = this.model.find(search)

            return res.status(200).json(req.result)

        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const registerUpdate = await this.model.findByIdAndUpdate(req.params.id, req.body)

            if (registerUpdate) {
                return res.status(200).json({
                    message: "Registro atualizado com sucesso."
                })
            }

            return res.status(404).json({
                message: "Registro não encontrado."
            })

        } catch (error) {
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
            next(error)
        }
    }
}

export default ServicesController