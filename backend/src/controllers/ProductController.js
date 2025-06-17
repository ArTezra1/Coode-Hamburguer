import ProductServices from "../services/ProductServices.js";

class ProductController {
    constructor() {

    }

    static async createProduct(req, res, next) {
        try {
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
            const { category } = req.query

            const result = await ProductServices.getAll(category)

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

            await ProductServices.delete(id)

            return res.status(204).send()

        } catch (error) {
            next(error)
        }
    }
}

export default ProductController