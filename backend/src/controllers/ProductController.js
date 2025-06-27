import ProductServices from "../services/ProductServices.js";

import { ErroBadRequest } from "../error/ErrorClasses.js";

class ProductController {
    constructor() {

    }

    static async createProduct(req, res, next) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new ErroBadRequest("O corpo da requisição está vazio.")
            }

            const data = req.body;
            const file = req.file;

            const result = await ProductServices.createProduct(data, file);

            res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAll(req, res, next) {
        try {
            const category = req.query.category

            const result = category
                ? await ProductServices.getProductsByCategory(category, req.query)
                : await ProductServices.getAll(req.query)

            req.result = result

            next()

        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params

            const result = await ProductServices.getById(id)

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            await ProductServices.update(id, data)

            return res.status(204).send()

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            const deleted = await ProductServices.delete(id)

            return res.status(200).json({
                message: deleted.message
            })

        } catch (error) {
            next(error)
        }
    }

    static async deleteAll(req, res, next) {
        try {
            const deleted = await ProductServices.deleteAll()

            return res.status(200).json({
                message: deleted.message
            })

        } catch (error) {
            next(error)
        }
    }
}

export default ProductController