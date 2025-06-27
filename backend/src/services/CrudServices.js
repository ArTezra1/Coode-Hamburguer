import fs from "fs/promises"
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

        return this.model.find(filter, "-__v -updatedAt -createdAt").sort(sort)
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

        return {
            message: "Registro atualizado com sucesso."
        }
    }

    async delete(id) {
        const validId = checkId(id)

        const item = await this.model.findById(validId)

        if (!item) {
            throw new ErroNotFound("Registro não encontrado.")
        }

        const imageUrl = item[this.imageField]

        if (imageUrl) {
            try {
                const pathname = new URL(imageUrl).pathname 
                const filename = path.basename(pathname)    
                
                const fullPath = path.join(process.cwd(), "uploads/images", filename)

                await fs.unlink(fullPath)

            } catch (error) {
                if (error.code === "ENOENT") {
                    console.warn("Arquivo de imagem não encontrado.")
                } else {
                    console.error("Erro ao deletar imagem:", error.message)
                    throw error
                }
            }
        }

        await this.model.findByIdAndDelete(validId)

        return {
            message: "Registro deletado com sucesso."
        }
    }

    async deleteAll() {
        const modelName = this.model.modelName

        if (modelName === "Product") {
            const products = await this.model.find({})

            await Promise.all(
                products.map(async (product) => {
                    const imageUrl = product[this.imageField]

                    if (imageUrl) {
                        try {
                            const pathname = new URL(imageUrl).pathname
                            const filename = path.basename(pathname)

                            const fullPath = path.join(process.cwd(), "uploads/images", filename)

                            await fs.access(fullPath)
                            await fs.unlink(fullPath)

                        } catch (error) {
                            console.warn(`Erro ao deletar imagem: ${imageUrl} -> ${error.message}`)
                        }
                    }
                })
            )
        }

        await this.model.deleteMany({})

        return {
            message: "Todos os registros foram deletados com sucesso."
        }
    }
}

export default CrudServices