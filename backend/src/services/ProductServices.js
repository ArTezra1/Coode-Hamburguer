import CrudServices from "./CrudServices.js";
import ProductModel from "../models/ProductModel.js";

import validateProduct from "../utils/validateProducts.js";
import buildMongoQuery from "../utils/buildMongoQuery.js";

const dataPerCategory = {
    burger: "-__v -updatedAt -createdAt -brand -itensCombo",
    drink: "-__v -updatedAt -createdAt -ingredients -itensCombo",
    combo: "-__v -updatedAt -createdAt -ingredients -brand",
    other: "-__v -updatedAt -createdAt -ingredients -itensCombo"
}

class ProductServices extends CrudServices{
    constructor() {
        super(ProductModel)
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

        const products = await ProductServices.getProductsByCategory(query.category, filter, sort)

        return products
    }

    static async getProductsByCategory(category, filter, sort) {
        if (!category) {
            return null
        }

        const projection = dataPerCategory[category] || "-__v -updatedAt -createdAt"

        let query = ProductModel.find({
            category,
            ...filter
        }, projection).sort(sort)

    
        if(category === "combo"){
            query = query.populate({
                path: "itensCombo",
                select: "-__v -updatedAt -createdAt -itensCombo -brand -category -description -isAvailable -quantity -ingredients -imageSrc"
            })
        }

        return query

    }
}

export default new ProductServices()