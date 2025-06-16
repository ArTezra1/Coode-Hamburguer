import ProductServices from "../services/ProductServices.js";

class ProductController{
    async createProduct(req, res, next) {
        try {
            const data = req.body;
            const file = req.file;

            await ProductServices.createProduct(data, file);

            res.status(201).json({ message: "Produto criado com sucesso!" })
        } catch (error) {
            next(error)
        }
    }
}

export default ProductController