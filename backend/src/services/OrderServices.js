import CrudServices from "./CrudServices.js";
import OrderModel from "../models/OrderModel.js";

import BurgerModel from "../models/BurgerModel.js"
import DrinkModel from "../models/DrinkModel.js"
import PortionModel from "../models/PortionModel.js"
import ComboModel from "../models/ComboModel.js"
import {
    ErroBadRequest,
    ErroNotFound,
    ErroValidation
} from "../error/ErrorClasses.js";

class OrderServices extends CrudServices {
    constructor() {
        super(OrderModel)
    }

    async createOrder({ customer, address, items, isDelivery, paymentMethod }) {
        if (!items || items.length === 0) {
            throw new ErroBadRequest("O pedido deve conter pelo menos um item.")
        }

        const populatedItems = []

        let totalPrice = 0

        for (const item of items) {
            const { productType, product: productId, quantity } = item

            let ProductModel

            switch (productType) {
                case "Burger":
                    ProductModel = BurgerModel;
                    break
                case "Drink":
                    ProductModel = DrinkModel;
                    break
                case "Portion":
                    ProductModel = PortionModel;
                    break
                case "Combo":
                    ProductModel = ComboModel;
                    break
                default:
                    throw new ErroValidation(`Tipo de produto inválido: ${productType}`)
            }

            const product = await ProductModel.findById(productId)
            if (!product) {
                throw new ErroNotFound(`Produto não encontrado para o ID: ${productId}`)
            }

            const unitPrice = product.price

            const itemTotal = unitPrice * quantity
            totalPrice += itemTotal

            populatedItems.push({
                productType,
                product: productId,
                quantity,
                unitPrice,
            })
        }

        const newOrder = await OrderModel.create({
            customer,
            address,
            items: populatedItems,
            totalPrice,
            isDelivery,
            paymentMethod,
            paymentStatus: "pendente"
        })

        return newOrder

    }
}

export default new OrderServices()