import ProductModel from "../models/ProductModel.js";

import { ErroBadRequest } from "../error/ErrorClasses.js";
import validateProduct from "../utils/validateProducts.js";

class ProductServices{
    constructor(){
        this.imageField = "imageSrc"
        this.imageFolder = "images"
    }

    async createProduct(data, file){
        validateProduct(data, file)

    }
}

export default new ProductServices()