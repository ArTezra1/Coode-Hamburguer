import fs from "fs"
import path from "path"
import filterRequest from "../middlewares/FilterRequest.js"
import checkId from "../utils/checkMongooseId.js"

import {
    ErroNotFound,
} from "../error/ErrorClasses.js"

class CrudServices {
    constructor(model) {
        this.model = model
        this.imageField = "imageSrc"
        this.imageFolder = "images"
    }

    async create(data, file) {
        if (file && file.filename) {
            data[this.imageField] = `${this.imageFolder}/${file.filename}`
        }

        return await this.model.create(data)
    }

    async getAll() {
        return await this.model.find({})
    }

    async getById(id) {
        const validId = checkId(id)

        const data = await this.model.findById(validId)

        if (!data) {
            throw new ErroNotFound("Registro não encontrado.")
        }

        return data
    }

    async update(id, data) {
        const validId = checkId(id)

        const updated = await this.model.findByIdAndUpdate(validId, data, {
            new: true,
            runValidators: true
        })

        if (!updated) {
            throw new ErroNotFound("Registro não encontrado.")
        }

        return true
    }

    async delete(id) {
        const validId = checkId(id)

        const item = await this.model.findById(validId)

        if (!item) {
            throw new ErroNotFound("Registro não encontrado.")
        }

        const imagePath = item[this.imageField]

        if (imagePath) {
            const fullPath = path.resolve(`.${imagePath}`)

            try {
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath)
                }
            } catch (error) {
                console.warn("Erro ao deletar imagem:", error.message)
            }
        }

        await this.model.findByIdAndDelete(id)

        return true
    }
}

export default CrudServices