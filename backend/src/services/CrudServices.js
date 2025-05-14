import mongoose from "mongoose"
import filterRequest from "../middlewares/FilterRequest.js"

import {
    ErroNotFound,
    ErroValidation
} from "../error/ErrorClasses.js"

class CrudServices {
    constructor(model) {
        this.model = model
    }

    async create(data) {
        return await this.model.create(data)
    }

    async getAll() {
        return await this.model.find({})
    }

    async getById(id) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new ErroValidation("ID inválido.")
        }

        const data = await this.model.findById(id)

        if (!data) {
            throw new ErroNotFound("Registro não encontrado.")
        }

        return data
    }

    async getByParams(params) {

    }

    async update(id, data) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new ErroValidation("ID inválido.")
        }

        const updated = await this.model.findByIdAndUpdate(id, data, { 
            new: true,
            runValidators: true
        })

        if (!updated) {
            throw new ErroNotFound("Registro não encontrado.")
        }

        return updated
    }

    async delete(id) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new ErroValidation("ID inválido.")
        }

        const deleted = await this.model.findByIdAndDelete(id)

        if (!deleted) {
            throw new ErroNotFound("Registro não encontrado.")
        }

        return deleted
    }
}

export default CrudServices