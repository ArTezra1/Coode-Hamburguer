import fs from "fs"
import path from "path"

import checkId from "../utils/checkMongooseId.js"
import buildMongoQuery from "../utils/buildMongoQuery.js"

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

    async getAll(query = {}) {
        const { filter, sort } = buildMongoQuery(query)

        return await this.model.find(filter, "-__v -updatedAt -createdAt").sort(sort)
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
            const fullPath = path.join(process.cwd(), imagePath)

            try {
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath)
                } else {
                    console.warn(`Arquivo de imagem não encontrado: ${fullPath}`)
                }
            } catch (error) {
                console.error("Erro ao deletar imagem:", error.message)
            }
        }

        await this.model.findByIdAndDelete(validId)

        return true
    }

    async deleteAll() {
        const modelName = this.model.modelName

        if (modelName === "Product") {
            const products = await this.model.find({})

            await Promise.all(
                products.map(async (product) => {
                    const imagePath = product[this.imageField]

                    if (imagePath) {
                        const fullPath = path.join(process.cwd(), imagePath)

                        try {
                            await fs.promises.access(fullPath)
                            await fs.promises.unlink(fullPath)

                        } catch (error) {
                            console.warn(`Erro ao deletar imagem ou arquivo não encontrado: ${fullPath} -> ${error.message}`)
                        }
                    }
                })
            )
        }

        await this.model.deleteMany({})
    }
}

export default CrudServices