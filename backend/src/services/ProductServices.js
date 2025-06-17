import ProductModel from "../models/ProductModel.js";

import { ErroNotFound } from "../error/ErrorClasses.js";
import validateProduct from "../utils/validateProducts.js";
import checkId from "../utils/checkMongooseId.js";
import buildMongoQuery from "../utils/buildMongoQuery.js";
import path from "path"
import fs from "fs"

class ProductServices {
    constructor() {
        this.imageField = "imageSrc"
        this.imageFolder = "images"
    }

    async createProduct(data, file) {
        validateProduct(data, file)

        data[this.imageField] = `${this.imageFolder}/${file.filename}`

        const product = await ProductModel.create(data)

        return product
    }

    async getAll(query = {}) {
        const { filter, sort } = buildMongoQuery(query)

        const products = await ProductModel.find(filter).sort(sort)

        return products
    }

    async getById(id) {
        const validId = checkId(id)

        const product = await ProductModel.findById(validId)

        if (!product) {
            throw new ErroNotFound("Produto não encontrado.")
        }

        return product
    }

    async update(id, data) {
        const validId = checkId(id)

        const updated = await ProductModel.findByIdAndUpdate(validId, data, {
            new: true,
            runValidators: true
        })

        if (!updated) {
            throw new ErroNotFound("Produto não encontrado.")
        }

        return true
    }

    async delete(id) {
        const validId = checkId(id)

        const item = await ProductModel.findById(validId)

        if (!item) {
            throw new ErroNotFound("Produto não encontrado.")
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

        await ProductModel.findByIdAndDelete(validId)

        return true
    }
}

export default new ProductServices()